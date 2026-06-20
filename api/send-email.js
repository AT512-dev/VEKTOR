import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'Vektor Studio <hello@studiovektor.com>';
const STUDIO_EMAIL = 'hello@studiovektor.com';

// ── Utility ─────────────────────────────────────────────────────────────────
function esc(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function nl2br(str) {
  return esc(str).replace(/\n/g, '<br />');
}

const year = new Date().getFullYear();

// ── Shared brand constants for emails ───────────────────────────────────────
const BRAND = {
  bg:        '#000000',
  surface:   '#08080a',
  elevated:  '#0f0f12',
  border:    '#1a1a1f',
  borderSub: '#111114',
  white:     '#ffffff',
  text:      '#e4e4e7',
  muted:     '#a1a1aa',
  dim:       '#52525b',
  ghost:     '#3f3f46',
  red:       '#ef4444',
  green:     '#22c55e',
  mono:      "'SF Mono', 'JetBrains Mono', 'Fira Code', 'Menlo', 'Consolas', monospace",
  sans:      "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

// ── Shared wrapper for all emails ───────────────────────────────────────────
function wrapEmail(title, bodyContent) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>${esc(title)}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    /* Reset */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* Dark mode overrides for email clients that support it */
    :root { color-scheme: dark; supported-color-schemes: dark; }
    @media (prefers-color-scheme: dark) {
      body, .body-bg { background-color: ${BRAND.bg} !important; }
    }

    /* Responsive */
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .fluid-padding { padding-left: 24px !important; padding-right: 24px !important; }
      .stack-col { display: block !important; width: 100% !important; }
      .data-value { font-size: 15px !important; }
    }
  </style>
</head>
<body class="body-bg" style="margin:0;padding:0;background-color:${BRAND.bg};font-family:${BRAND.sans};-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;">

  <!-- Preheader text (hidden, shows in inbox preview) -->
  <div style="display:none;font-size:1px;color:${BRAND.bg};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${esc(title)}
    ${'&zwnj;&nbsp;'.repeat(40)}
  </div>

  <!-- Full-width background wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND.bg};">
    <tr>
      <td align="center" style="padding:48px 16px;">

        <!-- Email container: 560px max -->
        <table role="presentation" class="email-container" cellpadding="0" cellspacing="0" width="560" style="max-width:560px;width:100%;">

${bodyContent}

        </table>
        <!-- /email-container -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}

// ════════════════════════════════════════════════════════════════════════════
// NOTIFICATION EMAIL — sent to hello@studiovektor.com
// ════════════════════════════════════════════════════════════════════════════
function buildNotificationHtml({ name, email, projectType, message }) {
  const timestamp = new Date().toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  const body = `
          <!-- ▸ Header Bar -->
          <tr>
            <td class="fluid-padding" style="padding:0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:28px 0;border-bottom:1px solid ${BRAND.border};">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td>
                          <span style="font-family:${BRAND.sans};font-size:18px;font-weight:800;letter-spacing:0.08em;color:${BRAND.white};">VEKTOR STUDIO</span>
                        </td>
                        <td align="right">
                          <span style="font-family:${BRAND.mono};font-size:9px;letter-spacing:0.08em;color:${BRAND.ghost};">INCOMING_SIGNAL</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ▸ Title Block -->
          <tr>
            <td class="fluid-padding" style="padding:36px 40px 0;">
              <span style="display:inline-block;font-family:${BRAND.mono};font-size:9px;letter-spacing:0.14em;color:${BRAND.dim};margin-bottom:12px;">NEW INQUIRY</span>
              <h1 style="margin:0;font-family:${BRAND.sans};font-size:26px;font-weight:700;color:${BRAND.white};line-height:1.2;letter-spacing:-0.02em;">
                ${esc(name)}
              </h1>
              <p style="margin:8px 0 0;font-family:${BRAND.mono};font-size:12px;color:${BRAND.muted};letter-spacing:0.01em;">
                <a href="mailto:${esc(email)}" style="color:${BRAND.muted};text-decoration:underline;text-underline-offset:3px;">${esc(email)}</a>
              </p>
            </td>
          </tr>

          <!-- ▸ Metadata Grid -->
          <tr>
            <td class="fluid-padding" style="padding:28px 40px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid ${BRAND.border};border-radius:0;">
                <!-- Project Type -->
                <tr>
                  <td class="stack-col" style="padding:16px 20px;border-bottom:1px solid ${BRAND.borderSub};width:140px;vertical-align:top;">
                    <span style="font-family:${BRAND.mono};font-size:9px;letter-spacing:0.14em;color:${BRAND.dim};text-transform:uppercase;">PROJECT TYPE</span>
                  </td>
                  <td class="stack-col" style="padding:16px 20px;border-bottom:1px solid ${BRAND.borderSub};vertical-align:top;">
                    <span class="data-value" style="font-family:${BRAND.sans};font-size:16px;font-weight:600;color:${BRAND.white};letter-spacing:-0.01em;">${esc(projectType)}</span>
                  </td>
                </tr>
                <!-- Received -->
                <tr>
                  <td class="stack-col" style="padding:16px 20px;width:140px;vertical-align:top;">
                    <span style="font-family:${BRAND.mono};font-size:9px;letter-spacing:0.14em;color:${BRAND.dim};text-transform:uppercase;">RECEIVED</span>
                  </td>
                  <td class="stack-col" style="padding:16px 20px;vertical-align:top;">
                    <span style="font-family:${BRAND.mono};font-size:12px;color:${BRAND.muted};">${timestamp}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ▸ Message Body -->
          <tr>
            <td class="fluid-padding" style="padding:28px 40px 0;">
              <span style="display:block;font-family:${BRAND.mono};font-size:9px;letter-spacing:0.14em;color:${BRAND.dim};margin-bottom:12px;text-transform:uppercase;">PROJECT NOTES</span>
              <div style="padding:20px 24px;background:${BRAND.surface};border:1px solid ${BRAND.border};border-left:2px solid ${BRAND.white};">
                <p style="margin:0;font-family:${BRAND.sans};font-size:14px;color:${BRAND.text};line-height:1.75;white-space:pre-wrap;">${nl2br(message)}</p>
              </div>
            </td>
          </tr>

          <!-- ▸ CTA -->
          <tr>
            <td class="fluid-padding" style="padding:32px 40px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding:16px 0;background:${BRAND.white};">
                    <a href="mailto:${esc(email)}" style="font-family:${BRAND.mono};font-size:11px;font-weight:700;letter-spacing:0.1em;color:${BRAND.bg};text-decoration:none;">REPLY TO ${esc(name.split(' ')[0].toUpperCase())}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ▸ Footer -->
          <tr>
            <td class="fluid-padding" style="padding:36px 40px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid ${BRAND.border};">
                <tr>
                  <td style="padding-top:20px;">
                    <span style="font-family:${BRAND.mono};font-size:9px;letter-spacing:0.12em;color:${BRAND.ghost};">
                      This notification was generated by your contact form at studiovektor.com
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;

  return wrapEmail(`New inquiry from ${name} — ${projectType}`, body);
}

// ════════════════════════════════════════════════════════════════════════════
// CONFIRMATION EMAIL — sent to the client
// ════════════════════════════════════════════════════════════════════════════
function buildConfirmationHtml({ name, projectType }) {
  const firstName = name.split(' ')[0];

  const body = `
          <!-- ▸ Header Bar -->
          <tr>
            <td class="fluid-padding" style="padding:0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:28px 0;border-bottom:1px solid ${BRAND.border};">
                    <span style="font-family:${BRAND.sans};font-size:18px;font-weight:800;letter-spacing:0.08em;color:${BRAND.white};">VEKTOR STUDIO</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ▸ Hero Block -->
          <tr>
            <td class="fluid-padding" style="padding:48px 40px 0;">
              <!-- Status indicator -->
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 14px;border:1px solid ${BRAND.border};">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:6px;height:6px;background:${BRAND.green};border-radius:50%;"></td>
                        <td style="padding-left:8px;">
                          <span style="font-family:${BRAND.mono};font-size:9px;letter-spacing:0.14em;color:${BRAND.muted};text-transform:uppercase;">MESSAGE RECEIVED</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <h1 style="margin:24px 0 0;font-family:${BRAND.sans};font-size:28px;font-weight:700;color:${BRAND.white};line-height:1.2;letter-spacing:-0.02em;">
                We got your message,&nbsp;${esc(firstName)}.
              </h1>
            </td>
          </tr>

          <!-- ▸ Body Text -->
          <tr>
            <td class="fluid-padding" style="padding:20px 40px 0;">
              <p style="margin:0 0 18px;font-family:${BRAND.sans};font-size:15px;color:${BRAND.muted};line-height:1.75;">
                Thank you for reaching out about your <strong style="color:${BRAND.text};font-weight:600;">${esc(projectType)}</strong> project. We review every inquiry personally and will get back to you within <strong style="color:${BRAND.white};font-weight:600;">24–48 hours</strong> with the right package, timeline, and first-step recommendation.
              </p>
            </td>
          </tr>

          <!-- ▸ What Happens Next -->
          <tr>
            <td class="fluid-padding" style="padding:24px 40px 0;">
              <span style="display:block;font-family:${BRAND.mono};font-size:9px;letter-spacing:0.14em;color:${BRAND.dim};margin-bottom:16px;text-transform:uppercase;">WHAT HAPPENS NEXT</span>

              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <!-- Step 1 -->
                <tr>
                  <td style="padding:16px 20px;border:1px solid ${BRAND.border};border-bottom:none;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="width:32px;vertical-align:top;">
                          <span style="font-family:${BRAND.mono};font-size:11px;font-weight:700;color:${BRAND.dim};">01</span>
                        </td>
                        <td style="vertical-align:top;">
                          <span style="font-family:${BRAND.sans};font-size:14px;font-weight:600;color:${BRAND.white};">Review</span>
                          <p style="margin:4px 0 0;font-family:${BRAND.sans};font-size:13px;color:${BRAND.muted};line-height:1.6;">We analyze your requirements and scope the build.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Step 2 -->
                <tr>
                  <td style="padding:16px 20px;border:1px solid ${BRAND.border};border-bottom:none;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="width:32px;vertical-align:top;">
                          <span style="font-family:${BRAND.mono};font-size:11px;font-weight:700;color:${BRAND.dim};">02</span>
                        </td>
                        <td style="vertical-align:top;">
                          <span style="font-family:${BRAND.sans};font-size:14px;font-weight:600;color:${BRAND.white};">Proposal</span>
                          <p style="margin:4px 0 0;font-family:${BRAND.sans};font-size:13px;color:${BRAND.muted};line-height:1.6;">You'll receive a clear quote with scope, timeline, and deliverables.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Step 3 -->
                <tr>
                  <td style="padding:16px 20px;border:1px solid ${BRAND.border};">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="width:32px;vertical-align:top;">
                          <span style="font-family:${BRAND.mono};font-size:11px;font-weight:700;color:${BRAND.dim};">03</span>
                        </td>
                        <td style="vertical-align:top;">
                          <span style="font-family:${BRAND.sans};font-size:14px;font-weight:600;color:${BRAND.white};">Build</span>
                          <p style="margin:4px 0 0;font-family:${BRAND.sans};font-size:13px;color:${BRAND.muted};line-height:1.6;">We begin development with milestone check-ins until launch.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ▸ CTA -->
          <tr>
            <td class="fluid-padding" style="padding:32px 40px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding:16px 0;border:1px solid ${BRAND.border};">
                    <a href="https://studiovektor.com/#work" style="font-family:${BRAND.mono};font-size:11px;font-weight:600;letter-spacing:0.1em;color:${BRAND.white};text-decoration:none;">VIEW OUR WORK →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ▸ Footer -->
          <tr>
            <td class="fluid-padding" style="padding:40px 40px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid ${BRAND.border};">
                <tr>
                  <td style="padding-top:20px;">
                    <p style="margin:0 0 8px;font-family:${BRAND.sans};font-size:12px;color:${BRAND.ghost};line-height:1.6;">
                      This is an automated confirmation — no need to reply.<br/>
                      When we respond, it will come from a real person.
                    </p>
                    <span style="font-family:${BRAND.mono};font-size:9px;letter-spacing:0.12em;color:${BRAND.ghost};">
                      © ${year} VEKTOR STUDIO · studiovektor.com
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;

  return wrapEmail(`We received your message — Vektor Studio`, body);
}

// ════════════════════════════════════════════════════════════════════════════
// HANDLER
// ════════════════════════════════════════════════════════════════════════════
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, projectType, message } = req.body || {};

  // Validate required fields
  const missing = [];
  if (!name?.trim()) missing.push('name');
  if (!email?.trim()) missing.push('email');
  if (!projectType?.trim()) missing.push('project type');
  if (!message?.trim()) missing.push('project notes');

  if (missing.length > 0) {
    return res.status(400).json({
      error: `Missing required field${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}.`,
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  // Sanitize
  const clean = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    projectType: projectType.trim(),
    message: message.trim(),
  };

  try {
    // Send both emails concurrently
    const [notification, confirmation] = await Promise.all([
      // 1) Notification to studio
      resend.emails.send({
        from: FROM_EMAIL,
        to: STUDIO_EMAIL,
        replyTo: clean.email,
        subject: `New inquiry from ${clean.name} — ${clean.projectType}`,
        html: buildNotificationHtml(clean),
      }),

      // 2) Confirmation to client
      resend.emails.send({
        from: FROM_EMAIL,
        to: clean.email,
        subject: `We received your message — Vektor Studio`,
        html: buildConfirmationHtml(clean),
      }),
    ]);

    // Check for Resend-level errors
    if (notification.error || confirmation.error) {
      console.error('Resend API error:', notification.error || confirmation.error);
      return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully.',
      ids: {
        notification: notification.data?.id,
        confirmation: confirmation.data?.id,
      },
    });
  } catch (error) {
    console.error('Send email error:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
}
