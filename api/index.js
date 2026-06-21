import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import sendEmailHandler, { contactFormLimiter } from './send-email.js';

dotenv.config();

// ── Constants ────────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'https://studiovektor.com',
  'https://www.studiovektor.com',
];

// Allow localhost in development
if (process.env.NODE_ENV !== 'production') {
  ALLOWED_ORIGINS.push('http://localhost:5173', 'http://localhost:3000');
}

const RATE_LIMIT_WINDOW_MS = 60 * 1000;  // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20;       // per window per IP
const MAX_MESSAGES_PER_REQUEST = 20;      // conversation history cap
const MAX_MESSAGE_CONTENT_LENGTH = 2000;  // chars per message
const ALLOWED_ROLES = new Set(['user', 'assistant']);

// ── App Setup ────────────────────────────────────────────────────────────────
const app = express();

app.use(cors({
  origin(origin, callback) {
    // Allow requests with no origin (server-to-server, curl, Vercel rewrites)
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['POST'],
  credentials: false,
}));

app.use(express.json({ limit: '64kb' }));

// ── Rate Limiter (in-memory, per-IP) ─────────────────────────────────────────
const rateLimitStore = new Map();

function rateLimit(req, res, next) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
           || req.socket?.remoteAddress
           || 'unknown';

  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    // New window
    rateLimitStore.set(ip, { windowStart: now, count: 1 });
    return next();
  }

  entry.count += 1;

  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.windowStart + RATE_LIMIT_WINDOW_MS - now) / 1000);
    res.set('Retry-After', String(retryAfter));
    return res.status(429).json({
      error: 'Too many requests. Please wait a moment and try again.',
    });
  }

  return next();
}

// Periodic cleanup of expired entries (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
      rateLimitStore.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// ── OpenAI Client ────────────────────────────────────────────────────────────
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ── System Prompt (cached at module scope) ───────────────────────────────────
let SYSTEM_PROMPT = '';
try {
  const knowledgePath = path.join(process.cwd(), 'bot_knowledge.md');
  SYSTEM_PROMPT = fs.readFileSync(knowledgePath, 'utf8');
} catch (err) {
  console.error('[Vektor] Failed to load bot_knowledge.md:', err.message);
  SYSTEM_PROMPT = 'You are a helpful assistant for Vektor Studio, a web development agency.';
}

// ── Contact form ──────────────────────────────────────────────────────────
// Rate limited to 3 requests per IP per 15 minutes (see send-email.js)
app.post('/api/send-email', contactFormLimiter, sendEmailHandler);

// ── Validation Helpers ───────────────────────────────────────────────────────
function validateMessages(messages) {
  if (!Array.isArray(messages)) {
    return 'The "messages" field must be an array.';
  }

  if (messages.length === 0) {
    return 'At least one message is required.';
  }

  if (messages.length > MAX_MESSAGES_PER_REQUEST) {
    return `Conversation exceeds the maximum of ${MAX_MESSAGES_PER_REQUEST} messages. Please start a new conversation.`;
  }

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];

    if (!msg || typeof msg !== 'object') {
      return `Message at index ${i} is invalid.`;
    }

    if (!ALLOWED_ROLES.has(msg.role)) {
      return `Message at index ${i} has an invalid role. Allowed: user, assistant.`;
    }

    if (typeof msg.content !== 'string' || !msg.content.trim()) {
      return `Message at index ${i} must have non-empty string content.`;
    }

    if (msg.content.length > MAX_MESSAGE_CONTENT_LENGTH) {
      return `Message at index ${i} exceeds the ${MAX_MESSAGE_CONTENT_LENGTH} character limit.`;
    }
  }

  return null;
}

// ── Chat Endpoint ────────────────────────────────────────────────────────────
app.post('/api/chat', rateLimit, async (req, res) => {
  try {
    const { messages } = req.body || {};

    const validationError = validateMessages(messages);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Sanitize: only pass role + content to OpenAI
    const sanitizedMessages = messages.map(({ role, content }) => ({
      role,
      content: content.trim(),
    }));

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...sanitizedMessages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return res.json({ reply: completion.choices[0].message });
  } catch (error) {
    console.error('[Vektor] OpenAI Error:', error.message || error);

    // Surface rate-limit errors from OpenAI
    if (error?.status === 429) {
      return res.status(429).json({
        error: 'Our AI assistant is temporarily busy. Please try again shortly.',
      });
    }

    return res.status(500).json({
      error: 'Failed to communicate with the AI server. Please try again later.',
    });
  }
});

export default app;