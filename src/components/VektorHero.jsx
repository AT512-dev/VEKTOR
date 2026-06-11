import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { typography, transitions } from '../tokens';

export default function VektorHero() {
  const { isDark, currentTheme } = useTheme();

  return (
    <section style={{ ...styles.heroSection, backgroundColor: currentTheme.base }}>
      {/* Background Graphic Framework */}
      <div style={styles.meshWrap}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dynamic-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke={currentTheme.mesh} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dynamic-grid)" />
        </svg>
        <div style={{
          ...styles.topLight,
          background: isDark 
            ? 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)'
        }} />
      </div>
      
      <div style={styles.contentContainer}>
        <div style={{ ...styles.terminalBadge, borderColor: currentTheme.border, background: currentTheme.panel }}>
          <span style={{ ...styles.badgeDot, backgroundColor: currentTheme.primary }} />
          <span style={{ ...styles.badgeText, color: currentTheme.primary }}>SYSTEMS_ACTIVE // REV_2026</span>
        </div>

        <h1 style={{ ...styles.mainTitle, color: currentTheme.primary }}>
          WE BUILD<br />
          <span style={{ ...styles.outlineText, WebkitTextStroke: `1.5px ${currentTheme.primary}` }}>DIGITAL FORTRESSES</span>
        </h1>

        <p style={{ ...styles.subParagraph, color: currentTheme.muted }}>
          Elite full-stack architecture and automated pipeline deployment systems. Custom-engineered software environments engineered to eliminate complexity.
        </p>

        <div style={styles.actionRow}>
          <button style={{ ...styles.primaryBtn, background: currentTheme.primary, borderColor: currentTheme.primary, color: currentTheme.inverseBase }}>
            INITIALIZE PROJECT
          </button>
          <button style={{ ...styles.secondaryBtn, borderColor: currentTheme.border, color: currentTheme.primary }}>
            VIEW MANIFESTO
          </button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  heroSection: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '80px max(20px, 4vw) 40px max(20px, 4vw)',
    transition: 'background-color 0.3s ease',
  },
  meshWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    pointerEvents: 'none',
  },
  topLight: {
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '600px',
    height: '300px',
  },
  contentContainer: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '1000px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  terminalBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 14px',
    border: '1px solid',
    marginBottom: '24px',
  },
  badgeDot: {
    width: '6px',
    height: '6px',
  },
  badgeText: {
    fontFamily: typography.mono,
    fontSize: '10px',
    letterSpacing: '0.15em',
  },
  mainTitle: {
    fontFamily: typography.display,
    fontSize: 'clamp(34px, 7.2vw, 84px)',
    fontWeight: 900,
    lineHeight: '1.0',
    letterSpacing: '-0.03em',
    margin: '0 0 24px 0',
  },
  outlineText: {
    color: 'transparent',
  },
  subParagraph: {
    fontFamily: typography.body,
    fontSize: 'clamp(14px, 1.8vw, 18px)',
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 0 36px 0',
  },
  actionRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  primaryBtn: {
    fontFamily: typography.mono,
    fontSize: '12px',
    fontWeight: 600,
    border: '1px solid',
    padding: '16px 28px',
    cursor: 'pointer',
    letterSpacing: '0.08em',
    flex: '1 1 auto',
    maxWidth: '280px',
  },
  secondaryBtn: {
    fontFamily: typography.mono,
    fontSize: '12px',
    fontWeight: 600,
    background: 'transparent',
    border: '1px solid',
    padding: '16px 28px',
    cursor: 'pointer',
    letterSpacing: '0.08em',
    flex: '1 1 auto',
    maxWidth: '280px',
    transition: transitions.fast,
  },
};