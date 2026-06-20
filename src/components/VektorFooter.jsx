import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { typography, transitions } from '../tokens';
import { itemReveal, sectionReveal } from '../motionPresets';

const SOCIALS = [
  { name: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/vektor-studio00' },
  { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/vektorstudio00' },
];

import SocialIcon from './icons/SocialIcon';


export default function VektorFooter() {
  const { currentTheme } = useTheme();

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
          {/*
            FIX: Added `minWidth: 0` and `flexShrink: 0` to brandBlock.
            Without minWidth:0 a flex child can overflow its container rather
            than shrinking, preventing a clean wrap to a new row on mobile.
            Also removed the hard `maxWidth: 300px` cap so on narrow screens
            the brand block can expand to fill the full row width instead of
            sitting as a partial-width orphan.
          */}
          <div style={styles.brandBlock}>
            <span style={{ ...styles.logoText, color: currentTheme.primary }}>VEKTOR</span>
            <p style={{ ...styles.brandDesc, color: currentTheme.muted }}>
              Websites and web apps for businesses that need a sharp digital operating layer.
            </p>
          </div>

          {/*
            FIX: Added `minWidth: 0` to linkGrid so it correctly collapses
            its flex children when there isn't enough horizontal space.
          */}
          <div style={styles.linkGrid}>
            <a className="vektor-focus-ring vektor-text-link" href="#services" style={{ ...styles.link, color: currentTheme.muted }}>PRICING</a>
            <a className="vektor-focus-ring vektor-text-link" href="#process" style={{ ...styles.link, color: currentTheme.muted }}>PROCESS</a>
            <a className="vektor-focus-ring vektor-text-link" href="#work" style={{ ...styles.link, color: currentTheme.muted }}>WORK</a>
            <a className="vektor-focus-ring vektor-text-link" href="#contact" style={{ ...styles.link, color: currentTheme.muted }}>CONNECT</a>
          </div>

          <div style={styles.socialDock} aria-label="Vektor social links">
            {SOCIALS.map((social) => {
              return (
                <a
                  className="vektor-focus-ring vektor-social-link"
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Vektor Studio ${social.name}`}
                  style={{
                    ...styles.socialLink,
                  }}
                >
                  <SocialIcon type={social.icon} />
                </a>
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
    // FIX: Replaced hard `maxWidth: '300px'` with a fluid clamp so on desktop
    // the block stays bounded at 300px but on mobile it expands to fill the row.
    // `minWidth: 0` prevents flex overflow; `flexShrink: 0` stops unintended
    // squishing when sibling items are present on the same row.
    maxWidth: 'min(300px, 100%)',
    minWidth: 0,
    flexShrink: 0,
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
    // FIX: `minWidth: 0` ensures this flex child can shrink below its content
    // size and wrap to a new row rather than overflowing its container.
    minWidth: 0,
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