import { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { typography, glass, transitions } from '../tokens';
import { itemReveal, sectionReveal } from '../motionPresets';

const PROJECT_TYPES = ['One Page Website', 'Multi Page Website', 'Booking / Web App'];

export default function VektorContact() {
  const { currentTheme } = useTheme();
  const [activeButton, setActiveButton] = useState(false);

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
        </motion.div>

        <motion.form variants={itemReveal} style={{ ...styles.form, borderColor: currentTheme.border, background: currentTheme.panel }}>
          <div className="vektor-form-grid" style={styles.formGrid}>
            <label style={styles.fieldLabel}>
              <span style={{ ...styles.labelText, color: currentTheme.dim }}>NAME</span>
              <input className="vektor-form-control" style={fieldStyle(currentTheme)} name="name" type="text" placeholder="Your name" />
            </label>

            <label style={styles.fieldLabel}>
              <span style={{ ...styles.labelText, color: currentTheme.dim }}>EMAIL</span>
              <input className="vektor-form-control" style={fieldStyle(currentTheme)} name="email" type="email" placeholder="you@domain.com" />
            </label>
          </div>

          <label style={styles.fieldLabel}>
            <span style={{ ...styles.labelText, color: currentTheme.dim }}>PROJECT TYPE</span>
            <select className="vektor-form-control" style={fieldStyle(currentTheme)} name="projectType" defaultValue="">
              <option value="" disabled>Select build type</option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>

          <label style={styles.fieldLabel}>
            <span style={{ ...styles.labelText, color: currentTheme.dim }}>PROJECT NOTES</span>
            <textarea
              className="vektor-form-control"
              style={{ ...fieldStyle(currentTheme), ...styles.textarea }}
              name="message"
              placeholder="What do you need built, and when do you want to launch?"
            />
          </label>

          <button
            type="button"
            className="vektor-focus-ring vektor-cta-link"
            onMouseEnter={() => setActiveButton(true)}
            onMouseLeave={() => setActiveButton(false)}
            onFocus={() => setActiveButton(true)}
            onBlur={() => setActiveButton(false)}
            style={{
              ...styles.submitButton,
              background: activeButton ? currentTheme.surface : currentTheme.primary,
              borderColor: activeButton ? currentTheme.borderHover : currentTheme.primary,
              color: activeButton ? currentTheme.primary : currentTheme.inverseBase,
              transform: activeButton ? 'translateY(-3px)' : 'translateY(0)',
            }}
          >
            SEND PROJECT SIGNAL
          </button>
        </motion.form>
      </motion.div>
    </motion.section>
  );
}

function fieldStyle(theme) {
  return {
    width: '100%',
    minHeight: '48px',
    border: `1px solid ${theme.border}`,
    background: theme.surface,
    color: theme.primary,
    padding: '13px 14px',
    fontFamily: typography.body,
    fontSize: '14px',
    outline: 'none',
    borderRadius: 0,
  };
}

const styles = {
  section: {
    width: '100%',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  },
  innerContent: {
    padding: 'max(60px, 8vw) max(20px, 4vw)',
    maxWidth: '1440px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
    gap: 'clamp(32px, 7vw, 90px)',
    alignItems: 'start',
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
    padding: 'clamp(20px, 4vw, 32px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '18px',
  },
  fieldLabel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  labelText: {
    fontFamily: typography.mono,
    fontSize: '10px',
    letterSpacing: '0.14em',
  },
  textarea: {
    minHeight: '132px',
    resize: 'vertical',
  },
  submitButton: {
    minHeight: '52px',
    border: '1px solid',
    fontFamily: typography.mono,
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    cursor: 'pointer',
    transition: transitions.fast,
  },
};
