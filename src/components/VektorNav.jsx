import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { typography, glass, transitions, radii } from '../tokens';


const NAV_LINKS = [
  { label: 'SERVICES', href: '#services' },
  { label: 'PROCESS', href: '#process' },
  { label: 'WORK', href: '#work' },
  { label: 'STUDIO', href: '#studio' },
];

export default function VektorNav() {
  const { isDark, currentTheme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);



  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        ...styles.navContainer,
        background: scrolled
          ? isDark
            ? 'rgba(0, 0, 0, 0.85)'
            : 'rgba(255, 255, 255, 0.85)'
          : 'transparent',
        borderBottom: scrolled ? `1px solid ${currentTheme.border}` : '1px solid transparent',
        backdropFilter: scrolled ? glass.blur : 'none',
      }}
    >
      <div style={styles.navInner}>
        <a href="#top" style={styles.logoWrap} aria-label="Vektor Studio Home">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L16 26L28 6" stroke={currentTheme.primary} strokeWidth="2.5" strokeLinecap="square" />
            <path d="M10 6L16 16L22 6" stroke={currentTheme.primary} strokeWidth="1.25" strokeLinecap="square" opacity="0.4" />
          </svg>
          <span style={{ ...styles.logoText, color: currentTheme.primary }}>
            VEKTOR<span style={{ ...styles.logoSub, color: currentTheme.muted }}>SOFTWARE</span>
          </span>
        </a>

        <div className="vektor-desktop-controls" style={styles.desktopControls}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="vektor-focus-ring vektor-text-link"
              onMouseEnter={() => setActiveLink(link.href)}
              onMouseLeave={() => setActiveLink(null)}
              style={{
                ...styles.link,
                color: activeLink === link.href ? currentTheme.primary : currentTheme.muted,
              }}
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={toggleTheme}
            className="vektor-focus-ring"
            style={{ ...styles.toggleTrack, borderColor: currentTheme.border }}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <div
              style={{
                ...styles.toggleThumb,
                background: currentTheme.primary,
                transform: isDark ? 'translateX(18px)' : 'translateX(0px)',
              }}
            />
          </button>

          <a className="vektor-focus-ring vektor-cta-link" href="#contact" style={{ ...styles.ctaButton, background: currentTheme.primary, color: currentTheme.inverseBase }}>
            CONNECT
          </a>
        </div>

        <div className="vektor-mobile-controls" style={styles.mobileControls}>
          <button
            onClick={toggleTheme}
            className="vektor-focus-ring"
            style={{ ...styles.toggleTrack, borderColor: currentTheme.border, marginRight: '12px' }}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <div
              style={{
                ...styles.toggleThumb,
                background: currentTheme.primary,
                transform: isDark ? 'translateX(18px)' : 'translateX(0px)',
              }}
            />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="vektor-focus-ring"
            style={styles.mobileMenuBtn}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <div style={styles.hamburger}>
              <span style={{
                ...styles.hamBar,
                background: currentTheme.primary,
                transform: mobileMenuOpen
                  ? 'translateY(7px) rotate(45deg)'
                  : 'translateY(0) rotate(0deg)',
              }} />
              <span style={{
                ...styles.hamBar,
                background: currentTheme.primary,
                opacity: mobileMenuOpen ? 0 : 1,
                transform: mobileMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
              }} />
              <span style={{
                ...styles.hamBar,
                background: currentTheme.primary,
                transform: mobileMenuOpen
                  ? 'translateY(-7px) rotate(-45deg)'
                  : 'translateY(0) rotate(0deg)',
              }} />
            </div>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div style={{ ...styles.mobileDrawer, background: currentTheme.base, borderBottom: `1px solid ${currentTheme.border}` }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="vektor-focus-ring vektor-text-link"
              style={{ ...styles.mobileLink, color: currentTheme.primary }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="vektor-focus-ring vektor-cta-link"
            style={{ ...styles.mobileCta, background: currentTheme.primary, color: currentTheme.inverseBase }}
          >
            CONNECT
          </a>
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
    gap: '26px',
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
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: typography.mono,
    fontSize: '11px',
    fontWeight: 600,
    border: 'none',
    padding: '8px 18px',
    borderRadius: radii.none,
    cursor: 'pointer',
    letterSpacing: '0.08em',
    textDecoration: 'none',
    transition: transitions.fast,
  },
  mobileControls: {},
  mobileMenuBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hamburger: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    width: '22px',
  },
  hamBar: {
    display: 'block',
    width: '22px',
    height: '2px',
    borderRadius: '1px',
    transition: 'transform 220ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms ease, background 180ms ease',
    transformOrigin: 'center',
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
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: typography.mono,
    fontSize: '13px',
    fontWeight: 600,
    border: 'none',
    padding: '12px',
    width: '100%',
    cursor: 'pointer',
    textDecoration: 'none',
  },
};