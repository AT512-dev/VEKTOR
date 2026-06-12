import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { typography, transitions } from '../tokens';
import { itemReveal, sectionReveal } from '../motionPresets';

const SOCIALS = [
  { name: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/vektor-studio00' },
  { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/vektorstudio00' },
];

function SocialIcon({ type }) {
  if (type === 'github') {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5v-1.74c-2.78.62-3.37-1.37-3.37-1.37-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.71 0 0 .84-.28 2.75 1.05A9.35 9.35 0 0 1 12 6.95c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .28.18.6.69.5A10.13 10.13 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
        />
      </svg>
    );
  }

  if (type === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path
          fill="currentColor"
          d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.76 3.76 0 0 0 4 7.75v8.5A3.76 3.76 0 0 0 7.75 20h8.5A3.76 3.76 0 0 0 20 16.25v-8.5A3.76 3.76 0 0 0 16.25 4h-8.5Zm8.75 2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5ZM3 9.75h4v10.75H3V9.75Zm6.25 0h3.83v1.47h.05c.53-1 1.84-1.72 3.78-1.72 4.04 0 4.79 2.66 4.79 6.12v4.88h-4v-4.33c0-1.03-.02-2.36-1.44-2.36-1.44 0-1.66 1.12-1.66 2.28v4.41h-4V9.75Z"
      />
    </svg>
  );
}

export default function VektorFooter() {
  const { currentTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [activeSocial, setActiveSocial] = useState(null);

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={sectionReveal}
      style={{ ...styles.footerWrapper, backgroundColor: currentTheme.surface, borderTop: `1px solid ${currentTheme.border}` }}
    >
      <motion.div variants={sectionReveal} style={styles.footerInner}>
        
        {/* Top Segment: Logo & CTA */}
        <motion.div variants={itemReveal} style={styles.topSection}>
          <div style={styles.brandBlock}>
            <span style={{ ...styles.logoText, color: currentTheme.primary }}>VEKTOR</span>
            <p style={{ ...styles.brandDesc, color: currentTheme.muted }}>
              Websites and web apps for businesses that need a sharp digital operating layer.
            </p>
          </div>
          <div style={styles.linkGrid}>
            <a className="vektor-focus-ring vektor-text-link" href="#services" style={{ ...styles.link, color: currentTheme.muted }}>PRICING</a>
            <a className="vektor-focus-ring vektor-text-link" href="#process" style={{ ...styles.link, color: currentTheme.muted }}>PROCESS</a>
            <a className="vektor-focus-ring vektor-text-link" href="#work" style={{ ...styles.link, color: currentTheme.muted }}>WORK</a>
            <a className="vektor-focus-ring vektor-text-link" href="#contact" style={{ ...styles.link, color: currentTheme.muted }}>CONNECT</a>
          </div>

          <div style={styles.socialDock} aria-label="Vektor social links">
            {SOCIALS.map((social) => {
              const isActive = activeSocial === social.name;

              return (
                <motion.a
                  className="vektor-focus-ring"
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Vektor Studio ${social.name}`}
                  onMouseEnter={() => setActiveSocial(social.name)}
                  onMouseLeave={() => setActiveSocial(null)}
                  onFocus={() => setActiveSocial(social.name)}
                  onBlur={() => setActiveSocial(null)}
                  whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                  whileFocus={shouldReduceMotion ? undefined : { y: -3 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  style={{
                    ...styles.socialLink,
                    color: isActive ? currentTheme.inverseBase : currentTheme.primary,
                    borderColor: isActive ? currentTheme.primary : currentTheme.border,
                    background: isActive ? currentTheme.primary : currentTheme.panel,
                  }}
                >
                  <SocialIcon type={social.icon} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Middle Segment: Logo Strip */}
        <motion.div variants={itemReveal} style={{ ...styles.logoStrip, borderTop: `1px solid ${currentTheme.mesh}`, borderBottom: `1px solid ${currentTheme.mesh}` }}>
          <span style={{ ...styles.stripLabel, color: currentTheme.dim }}>CORE_STACK:</span>
          <div style={styles.logos}>
            {/* React */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={currentTheme.muted} strokeWidth="1.5">
              <circle cx="12" cy="12" r="2.5" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
            </svg>
            {/* Python (Abstracted) */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={currentTheme.muted} strokeWidth="1.5">
              <path d="M12 2C8.686 2 8 4 8 4H16V6H8C6 6 4 7 4 10C4 13 6 14 8 14H10V12C10 10.895 10.895 10 12 10H16C17.105 10 18 9.105 18 8V4C18 2 15.314 2 12 2Z" />
              <path d="M12 22C15.314 22 16 20 16 20H8V18H16C18 18 20 17 20 14C20 11 18 10 16 10H14V12C14 13.105 13.105 14 12 14H8C6.895 14 6 14.895 6 16V20C6 22 8.686 22 12 22Z" />
            </svg>
            {/* C++ */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={currentTheme.muted} strokeWidth="1.5" strokeLinecap="round">
               <path d="M9 16.5C6.5 16.5 4.5 14.5 4.5 12C4.5 9.5 6.5 7.5 9 7.5" />
               <path d="M14 12H18M16 10V14" />
               <path d="M19 12H23M21 10V14" />
            </svg>
            {/* SQL */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={currentTheme.muted} strokeWidth="1.5">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5V19C3 20.6569 7.02944 22 12 22C16.9706 22 21 20.6569 21 19V5" />
              <path d="M3 12C3 13.6569 7.02944 15 12 15C16.9706 15 21 13.6569 21 12" />
            </svg>
            {/* Git */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={currentTheme.muted} strokeWidth="1.5">
              <circle cx="15" cy="6" r="3" />
              <circle cx="9" cy="18" r="3" />
              <circle cx="9" cy="10" r="3" />
              <path d="M15 9V18" />
              <path d="M9 13V15" />
              <path d="M9 10L13.5 6.5" />
            </svg>
          </div>
        </motion.div>

        {/* Bottom Segment: Copyright */}
        <motion.div variants={itemReveal} style={styles.bottomSection}>
          <span style={{ ...styles.copyText, color: currentTheme.dim }}>© 2026 Vektor Software. All rights reserved.</span>
          <span style={{ ...styles.systemStatus, color: currentTheme.dim }}>STATUS: ONLINE</span>
        </motion.div>
        
      </motion.div>
    </motion.footer>
  );
}

const styles = {
  footerWrapper: {
    width: '100%',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  },
  footerInner: {
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '60px max(20px, 4vw) 30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '40px',
  },
  brandBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '300px',
  },
  logoText: {
    fontFamily: typography.display,
    fontSize: '24px',
    fontWeight: 800,
    letterSpacing: '0.05em',
  },
  brandDesc: {
    fontFamily: typography.body,
    fontSize: '13px',
    lineHeight: '1.5',
    margin: 0,
  },
  linkGrid: {
    display: 'flex',
    gap: '32px',
    flexWrap: 'wrap',
  },
  link: {
    fontFamily: typography.mono,
    fontSize: '12px',
    textDecoration: 'none',
    letterSpacing: '0.1em',
    fontWeight: 500,
  },
  socialDock: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  socialLink: {
    width: '36px',
    height: '36px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid',
    textDecoration: 'none',
    transition: transitions.fast,
    willChange: 'transform, background, color',
  },
  logoStrip: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '24px 0',
    flexWrap: 'wrap',
  },
  stripLabel: {
    fontFamily: typography.mono,
    fontSize: '11px',
    letterSpacing: '0.1em',
  },
  logos: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
    flexWrap: 'wrap',
    opacity: 0.7,
  },
  bottomSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  copyText: {
    fontFamily: typography.body,
    fontSize: '12px',
  },
  systemStatus: {
    fontFamily: typography.mono,
    fontSize: '10px',
    letterSpacing: '0.1em',
  },
};
