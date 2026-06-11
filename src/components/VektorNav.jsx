import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { typography, glass, transitions, radii } from '../tokens';

export default function VektorNav() {
  const { isDark, currentTheme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      ...styles.navContainer,
      background: scrolled ? (isDark ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)') : 'transparent',
      borderBottom: scrolled ? `1px solid ${currentTheme.border}` : '1px solid transparent',
      backdropFilter: scrolled ? glass.blur : 'none',
    }}>
      <div style={styles.navInner}>
        {/* Brand Logo */}
        <a href="#" style={styles.logoWrap} aria-label="Vektor Studio Home">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L16 26L28 6" stroke={currentTheme.primary} strokeWidth="2.5" strokeLinecap="square"/>
            <path d="M10 6L16 16L22 6" stroke={currentTheme.primary} strokeWidth="1.25" strokeLinecap="square" opacity="0.4"/>
          </svg>
          <span style={{ ...styles.logoText, color: currentTheme.primary }}>
            VEKTOR<span style={{ ...styles.logoSub, color: currentTheme.muted }}>SOFTWARE</span>
          </span>
        </a>

        {/* Desktop Controls Menu */}
        <div style={styles.desktopControls}>
          <a href="#services" style={{ ...styles.link, color: currentTheme.muted }}>SERVICES</a>
          
          {/* Custom Premium Toggle Switch */}
          <button 
            onClick={toggleTheme} 
            style={{ ...styles.toggleTrack, borderColor: currentTheme.border }}
            aria-label="Toggle structural theme interface"
          >
            <div style={{
              ...styles.toggleThumb,
              background: currentTheme.primary,
              transform: isDark ? 'translateX(18px)' : 'translateX(0px)',
            }} />
          </button>

          <button style={{ ...styles.ctaButton, background: currentTheme.primary, color: currentTheme.inverseBase }}>
            CONNECT
          </button>
        </div>

        {/* Mobile Hamburger / Toggle Container */}
        <div style={styles.mobileControls}>
          <button 
            onClick={toggleTheme} 
            style={{ ...styles.toggleTrack, borderColor: currentTheme.border, marginRight: '12px' }}
          >
            <div style={{
              ...styles.toggleThumb,
              background: currentTheme.primary,
              transform: isDark ? 'translateX(18px)' : 'translateX(0px)',
            }} />
          </button>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            style={{ ...styles.mobileMenuBtn, color: currentTheme.primary }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Smartphone Responsive Dropdown Drawer */}
      {mobileMenuOpen && (
        <div style={{ ...styles.mobileDrawer, background: currentTheme.base, borderBottom: `1px solid ${currentTheme.border}` }}>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} style={{ ...styles.mobileLink, color: currentTheme.primary }}>SERVICES</a>
          <button style={{ ...styles.mobileCta, background: currentTheme.primary, color: currentTheme.inverseBase }}>CONNECT</button>
        </div>
      )}
    </nav>
  );
}

const styles = {
  navContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '72px',
    zIndex: 1000,
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  },
  navInner: {
    maxWidth: '1440px',
    height: '100%',
    margin: '0 auto',
    padding: '0 max(20px, 4vw)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
  },
  logoText: {
    fontFamily: typography.display,
    fontSize: '16px',
    fontWeight: 800,
    letterSpacing: '0.08em',
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1,
  },
  logoSub: {
    fontFamily: typography.mono,
    fontSize: '8px',
    fontWeight: 400,
    letterSpacing: '0.28em',
    marginTop: '2px',
  },
  desktopControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    '@media (maxWidth: 768px)': { display: 'none' }, // Handled via global responsiveness rules below
  },
  link: {
    fontFamily: typography.mono,
    fontSize: '11px',
    fontWeight: 500,
    textDecoration: 'none',
    letterSpacing: '0.1em',
    transition: transitions.fast,
  },
  toggleTrack: {
    width: '42px',
    height: '24px',
    borderRadius: radii.full,
    border: '1px solid',
    background: 'transparent',
    position: 'relative',
    cursor: 'pointer',
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
  },
  toggleThumb: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  ctaButton: {
    fontFamily: typography.mono,
    fontSize: '11px',
    fontWeight: 600,
    border: 'none',
    padding: '8px 18px',
    borderRadius: radii.none,
    cursor: 'pointer',
    letterSpacing: '0.08em',
  },
  mobileControls: {
    display: 'none',
  },
  mobileMenuBtn: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '4px',
  },
  mobileDrawer: {
    position: 'absolute',
    top: '72px',
    left: 0,
    right: 0,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  mobileLink: {
    fontFamily: typography.mono,
    fontSize: '14px',
    textDecoration: 'none',
    letterSpacing: '0.1em',
  },
  mobileCta: {
    fontFamily: typography.mono,
    fontSize: '13px',
    fontWeight: 600,
    border: 'none',
    padding: '12px',
    width: '100%',
    cursor: 'pointer',
  },
};

// Inject simple viewport layout rule handling for native smartphone execution
if (typeof window !== 'undefined') {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = `
    @media (max-width: 768px) {
      div[style*="desktopControls"] { display: none !important; }
      div[style*="mobileControls"] { display: flex !important; align-items: center; }
    }
  `;
  document.head.appendChild(styleTag);
}