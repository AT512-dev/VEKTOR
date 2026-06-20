import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { typography, glass, transitions } from '../tokens';
import { itemReveal, sectionReveal } from '../motionPresets';

const PROJECT_TYPES = ['One Page Website', 'Multi Page Website', 'Booking / Web App'];

const INITIAL_FORM = { name: '', email: '', projectType: '', message: '' };

const MAX_MESSAGE_LENGTH = 2000;

export default function VektorContact() {
  const { currentTheme } = useTheme();

  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [touched, setTouched] = useState({});
  const formRef = useRef(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > MAX_MESSAGE_LENGTH) return;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on edit
    if (status === 'error') {
      setStatus('idle');
      setErrorMsg('');
    }
  }, [status]);

  const handleBlur = useCallback((e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }, []);

  // Field-level validation
  const getFieldError = useCallback((field) => {
    if (!touched[field]) return null;
    switch (field) {
      case 'name':
        return !form.name.trim() ? 'Name is required' : null;
      case 'email': {
        if (!form.email.trim()) return 'Email is required';
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !re.test(form.email) ? 'Enter a valid email' : null;
      }
      case 'projectType':
        return !form.projectType ? 'Select a project type' : null;
      case 'message':
        return !form.message.trim() ? 'Tell us about your project' : null;
      default:
        return null;
    }
  }, [form, touched]);

  const isFormValid = form.name.trim() &&
    form.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.projectType &&
    form.message.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Touch all fields
    setTouched({ name: true, email: true, projectType: true, message: true });

    if (!isFormValid) {
      setStatus('error');
      setErrorMsg('Please complete all fields before sending.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      // Safely parse JSON — server may return non-JSON on errors (e.g. 502)
      let data;
      try {
        data = await res.json();
      } catch {
        // Response body wasn't valid JSON
        data = null;
      }

      if (!res.ok) {
        throw new Error(
          data?.error || 'Unable to send your message right now. Please try again later.'
        );
      }

      setStatus('success');
      setForm(INITIAL_FORM);
      setTouched({});
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to send. Please try again.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMsg('');
    setTouched({});
  };

  const isSending = status === 'sending';

  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      variants={sectionReveal}
      style={{
        ...styles.section,
        backgroundColor: currentTheme.base,
        borderTop: `1px solid ${currentTheme.border}`,
      }}
    >
      <motion.div variants={sectionReveal} className="vektor-contact-layout" style={styles.innerContent}>
        {/* ── Left Copy Block ─────────────────────────────────────── */}
        <motion.div variants={itemReveal} style={styles.copyBlock}>
          <div style={{ ...styles.headerBlock, borderLeft: `2px solid ${currentTheme.primary}` }}>
            <span style={{ ...styles.sectionIndex, color: currentTheme.muted }}>// MODULE_06</span>
            <h2 style={{ ...styles.sectionTitle, color: currentTheme.primary }}>START A BUILD</h2>
            <p style={{ ...styles.sectionText, color: currentTheme.muted }}>
              Send the basics. We will respond with the right package, timeline, and first-step recommendation.
            </p>
          </div>

          <div style={{ ...styles.signalPanel, borderColor: currentTheme.border, background: currentTheme.panel }}>
            <span style={{ ...styles.signalLabel, color: currentTheme.dim }}>RESPONSE WINDOW</span>
            <strong style={{ ...styles.signalValue, color: currentTheme.primary }}>24 - 48 HOURS</strong>
          </div>

          {/* Direct email fallback */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ ...styles.signalLabel, color: currentTheme.dim, margin: 0 }}>OR EMAIL DIRECTLY</span>
            <a
              href="mailto:hello@studiovektor.com"
              className="vektor-focus-ring vektor-text-link"
              style={{
                fontFamily: typography.mono,
                fontSize: '12px',
                color: currentTheme.muted,
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
            >
              hello@studiovektor.com
            </a>
          </div>
        </motion.div>

        {/* ── Right Form Block ────────────────────────────────────── */}
        <motion.div variants={itemReveal} style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              /* ── Success State ────────────────────────────────── */
              <motion.div
                key="success-state"
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  ...styles.form,
                  borderColor: currentTheme.border,
                  background: currentTheme.panel,
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  minHeight: '460px',
                  gap: '0',
                }}
              >
                {/* Animated ring + check */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 180, damping: 14 }}
                  style={{
                    width: '72px',
                    height: '72px',
                    border: `1.5px solid ${currentTheme.border}`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '28px',
                    position: 'relative',
                  }}
                >
                  {/* Pulsing ring */}
                  <motion.div
                    initial={{ scale: 1, opacity: 0.4 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      border: `1px solid ${currentTheme.primary}`,
                      borderRadius: '50%',
                    }}
                  />
                  <motion.svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={currentTheme.primary}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.polyline
                      points="20 6 9 17 4 12"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.45, ease: 'easeOut' }}
                    />
                  </motion.svg>
                </motion.div>

                {/* Status badge */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    border: `1px solid ${currentTheme.border}`,
                    fontFamily: typography.mono,
                    fontSize: '9px',
                    letterSpacing: '0.14em',
                    color: currentTheme.muted,
                    marginBottom: '20px',
                  }}>
                    <span style={{ width: '5px', height: '5px', background: '#22c55e', borderRadius: '50%', flexShrink: 0 }} />
                    DELIVERED
                  </span>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  style={{
                    fontFamily: typography.display,
                    fontSize: '24px',
                    fontWeight: 800,
                    color: currentTheme.primary,
                    margin: '12px 0 12px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  MESSAGE SENT
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  style={{
                    fontFamily: typography.body,
                    fontSize: '14px',
                    color: currentTheme.muted,
                    lineHeight: 1.7,
                    maxWidth: '360px',
                    margin: '0 0 32px',
                  }}
                >
                  We&apos;ve received your inquiry and sent a confirmation to your email. Expect our response within 24–48 hours.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.4 }}
                  type="button"
                  onClick={handleReset}
                  className="vektor-focus-ring"
                  style={{
                    background: 'transparent',
                    border: `1px solid ${currentTheme.border}`,
                    color: currentTheme.dim,
                    fontFamily: typography.mono,
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    padding: '13px 32px',
                    cursor: 'pointer',
                    transition: transitions.fast,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = currentTheme.borderHover;
                    e.currentTarget.style.color = currentTheme.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = currentTheme.border;
                    e.currentTarget.style.color = currentTheme.dim;
                  }}
                >
                  SEND ANOTHER MESSAGE
                </motion.button>
              </motion.div>
            ) : (
              /* ── Form State ──────────────────────────────────── */
              <motion.form
                key="form-state"
                ref={formRef}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={handleSubmit}
                noValidate
                style={{
                  ...styles.form,
                  borderColor: currentTheme.border,
                  background: currentTheme.panel,
                  opacity: isSending ? 0.7 : 1,
                  transition: `opacity 300ms ease, ${transitions.fast}`,
                }}
              >
                {/* Name + Email row */}
                <div className="vektor-form-grid" style={styles.formGridWrapper}>
                  <FormField
                    id="contact-name"
                    label="NAME"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSending}
                    error={getFieldError('name')}
                    theme={currentTheme}
                  />
                  <FormField
                    id="contact-email"
                    label="EMAIL"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSending}
                    error={getFieldError('email')}
                    theme={currentTheme}
                  />
                </div>

                {/* Project Type */}
                <FormField
                  id="contact-type"
                  label="PROJECT TYPE"
                  name="projectType"
                  type="select"
                  placeholder="Select build type"
                  options={PROJECT_TYPES}
                  value={form.projectType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSending}
                  error={getFieldError('projectType')}
                  theme={currentTheme}
                />

                {/* Message */}
                <FormField
                  id="contact-notes"
                  label="PROJECT NOTES"
                  name="message"
                  type="textarea"
                  placeholder="What do you need built, and when do you want to launch?"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSending}
                  error={getFieldError('message')}
                  theme={currentTheme}
                  maxLength={MAX_MESSAGE_LENGTH}
                  showCount
                />

                {/* Global error banner */}
                <AnimatePresence>
                  {status === 'error' && errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '13px 16px',
                        border: `1px solid rgba(239, 68, 68, 0.2)`,
                        background: 'rgba(239, 68, 68, 0.04)',
                        fontFamily: typography.mono,
                        fontSize: '11px',
                        color: '#ef4444',
                        letterSpacing: '0.02em',
                        lineHeight: 1.5,
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {errorMsg}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="vektor-focus-ring vektor-cta-link vektor-submit-button"
                  style={{
                    ...styles.submitButton,
                    pointerEvents: isSending ? 'none' : 'auto',
                  }}
                >
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}>
                    {isSending && <Spinner />}
                    {isSending ? 'TRANSMITTING...' : 'SEND US AN EMAIL'}
                  </span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FormField — Reusable field component with error state and character count
// ═══════════════════════════════════════════════════════════════════════════
function FormField({
  id, label, name, type, placeholder, value, onChange, onBlur,
  disabled, error, theme, options, maxLength, showCount,
}) {
  const hasError = !!error;

  const baseFieldStyle = {
    width: '100%',
    minHeight: '48px',
    border: `1px solid ${hasError ? 'rgba(239, 68, 68, 0.4)' : theme.border}`,
    background: theme.surface,
    color: theme.primary,
    padding: '13px 14px',
    fontFamily: typography.body,
    fontSize: '14px',
    outline: 'none',
    borderRadius: 0,
    transition: transitions.fast,
    opacity: disabled ? 0.5 : 1,
  };

  let input;
  if (type === 'select') {
    input = (
      <select
        id={id}
        className="vektor-form-control"
        style={baseFieldStyle}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    );
  } else if (type === 'textarea') {
    input = (
      <textarea
        id={id}
        className="vektor-form-control"
        style={{ ...baseFieldStyle, minHeight: '140px', resize: 'vertical', lineHeight: 1.65 }}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        maxLength={maxLength}
      />
    );
  } else {
    input = (
      <input
        id={id}
        className="vektor-form-control"
        style={baseFieldStyle}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
    );
  }

  return (
    <label style={styles.fieldLabel} htmlFor={id}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ ...styles.labelText, color: hasError ? '#ef4444' : theme.dim }}>{label}</span>
        {showCount && maxLength && (
          <span style={{
            fontFamily: typography.mono,
            fontSize: '9px',
            letterSpacing: '0.08em',
            color: value.length > maxLength * 0.9 ? '#ef4444' : theme.dim,
            transition: transitions.fast,
          }}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      {input}
      <AnimatePresence>
        {hasError && (
          <motion.span
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: typography.mono,
              fontSize: '10px',
              color: '#ef4444',
              letterSpacing: '0.04em',
              overflow: 'hidden',
            }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Spinner — CSS-animated loading indicator
// ═══════════════════════════════════════════════════════════════════════════
function Spinner() {
  return (
    <>
      <style>{`@keyframes vektor-spin { to { transform: rotate(360deg); } }`}</style>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: 'vektor-spin 0.7s linear infinite' }}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.2" />
        <path d="M12 2 A10 10 0 0 1 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Styles
// ═══════════════════════════════════════════════════════════════════════════
const styles = {
  section: {
    width: '100%',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  },
  innerContent: {
    padding: 'max(60px, 8vw) max(20px, 4vw)',
    maxWidth: '1440px',
    margin: '0 auto',
  },
  copyBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
  },
  headerBlock: {
    paddingLeft: '20px',
  },
  sectionIndex: {
    fontFamily: typography.mono,
    fontSize: '11px',
    letterSpacing: '0.1em',
  },
  sectionTitle: {
    fontFamily: typography.display,
    fontSize: 'clamp(30px, 5vw, 56px)',
    fontWeight: 900,
    lineHeight: 0.98,
    margin: '8px 0 0 0',
    letterSpacing: '0',
  },
  sectionText: {
    maxWidth: '500px',
    fontFamily: typography.body,
    fontSize: 'clamp(14px, 1.8vw, 17px)',
    lineHeight: 1.65,
    margin: '16px 0 0 0',
  },
  signalPanel: {
    border: '1px solid',
    padding: '20px',
    maxWidth: '360px',
  },
  signalLabel: {
    display: 'block',
    fontFamily: typography.mono,
    fontSize: '10px',
    letterSpacing: '0.14em',
    marginBottom: '10px',
  },
  signalValue: {
    fontFamily: typography.display,
    fontSize: '24px',
    letterSpacing: '0',
  },
  form: {
    border: '1px solid',
    backdropFilter: glass.blur,
    WebkitBackdropFilter: glass.blur,
    padding: 'clamp(24px, 4vw, 36px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGridWrapper: {},
  fieldLabel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  labelText: {
    fontFamily: typography.mono,
    fontSize: '10px',
    letterSpacing: '0.14em',
    transition: transitions.fast,
  },
  submitButton: {
    minHeight: '52px',
    border: '1px solid',
    fontFamily: typography.mono,
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    cursor: 'pointer',
    transition: transitions.fast,
  },
};