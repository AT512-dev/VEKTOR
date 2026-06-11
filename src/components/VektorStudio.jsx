import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { typography, glass, transitions } from '../tokens';

const FOUNDERS = [
  {
    name: 'Aleksandre Tkeshelashvili',
    image: '/images/icon.png',
    role: 'Full-Stack Core',
    signal: 'FRONTEND / API / DEPLOY',
    metric: '99.9% BUILD INTEGRITY',
  },
  {
    name: 'Karl',
    image: '/images/karl.jpg',
    role: 'Logic Architecture',
    signal: 'SYSTEM DESIGN / FLOW / SCALE',
    metric: 'ZERO-FRICTION OPS',
  },
  {
    name: 'Arseni',
    image: '/images/arseni.jpg',
    role: 'Systems Engineering',
    signal: 'INFRA / SECURITY / PERFORMANCE',
    metric: 'FORTRESS-GRADE STACK',
  },
];

const SOCIALS = [
  { name: 'LinkedIn', icon: 'linkedin', href: '#' },
  { name: 'GitHub', icon: 'github', href: '#' },
  { name: 'Instagram', icon: 'instagram', href: '#' },
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

export default function VektorStudio() {
  const { isDark, currentTheme } = useTheme();
  const [activeCard, setActiveCard] = useState(null);
  const [activeSocial, setActiveSocial] = useState(null);

  return (
    <section
      id="studio"
      style={{
        ...styles.section,
        background: `linear-gradient(180deg, ${currentTheme.base} 0%, ${currentTheme.surface} 100%)`,
        color: currentTheme.primary,
        borderTop: `1px solid ${currentTheme.border}`,
        borderBottom: `1px solid ${currentTheme.border}`,
      }}
    >
      <div style={styles.scanlineWrap} aria-hidden="true">
        <div
          style={{
            ...styles.scanline,
            background: `linear-gradient(90deg, transparent, ${currentTheme.borderHover}, transparent)`,
          }}
        />
      </div>

      <span style={{ ...styles.crosshair, top: 24, left: 24, color: currentTheme.dim }}>+</span>
      <span style={{ ...styles.crosshair, top: 24, right: 24, color: currentTheme.dim }}>+</span>
      <span style={{ ...styles.crosshair, bottom: 24, left: 24, color: currentTheme.dim }}>+</span>
      <span style={{ ...styles.crosshair, bottom: 24, right: 24, color: currentTheme.dim }}>+</span>

      <div style={styles.innerContent}>
        <div style={styles.metaRow}>
          <span style={{ color: currentTheme.muted }}>VEKTOR.STUDIO // OPERATORS</span>
        </div>

        <div style={{ ...styles.headerBlock, borderLeft: `2px solid ${currentTheme.primary}` }}>
          <span style={{ ...styles.sectionIndex, color: currentTheme.muted }}>// MODULE_03</span>
          <h2 style={{ ...styles.sectionTitle, color: currentTheme.primary }}>STUDIO OPERATORS</h2>
          <p style={{ ...styles.sectionText, color: currentTheme.muted }}>
            A focused technical crew building fast, secure, high-conversion digital systems.
          </p>
        </div>

        <div style={styles.gridContainer}>
          {FOUNDERS.map((founder, index) => {
            const isActive = activeCard === founder.name;

            return (
              <article
                key={founder.name}
                style={{
                  ...styles.founderCard,
                  background: isActive ? currentTheme.surface : currentTheme.panel,
                  borderColor: isActive ? currentTheme.borderHover : currentTheme.border,
                  transform: isActive ? 'translateY(-10px) scale(1.025)' : 'translateY(0) scale(1)',
                  boxShadow: isActive
                    ? `0 28px 70px ${isDark ? currentTheme.base : currentTheme.dim}`
                    : 'none',
                }}
                onMouseEnter={() => setActiveCard(founder.name)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div
                  style={{
                    ...styles.cardGlow,
                    opacity: isActive ? 1 : 0,
                    background: `linear-gradient(90deg, transparent, ${currentTheme.borderHover}, transparent)`,
                  }}
                />

                <div style={styles.profileRow}>
                  <img
                    src={founder.image}
                    alt={`${founder.name} profile`}
                    style={{
                      ...styles.avatar,
                      borderColor: currentTheme.border,
                      backgroundColor: currentTheme.surface,
                      transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    }}
                    loading="lazy"
                    decoding="async"
                  />

                  <div style={styles.identityBlock}>
                    <h3 style={{ ...styles.founderName, color: currentTheme.primary }}>
                      {founder.name}
                    </h3>
                    <p style={{ ...styles.founderRole, color: currentTheme.muted }}>
                      {founder.role}
                    </p>
                  </div>
                </div>

                <div style={{ ...styles.divider, background: currentTheme.border }} />

                <span style={{ ...styles.cardIndex, color: currentTheme.dim }}>
                  CORE.0{index + 1} // {founder.signal}
                </span>

                <p style={{ ...styles.founderSignal, color: currentTheme.muted }}>
                  {founder.signal}
                </p>

                <div style={{ ...styles.cardFooter, borderTop: `1px solid ${currentTheme.border}` }}>
                  <span style={{ ...styles.metric, color: currentTheme.primary }}>
                    {founder.metric}
                  </span>

                  <div style={styles.socialRow} aria-label={`${founder.name} social links`}>
                    {SOCIALS.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        aria-label={`${founder.name} ${social.name}`}
                        onMouseEnter={() => setActiveSocial(`${founder.name}-${social.name}`)}
                        onMouseLeave={() => setActiveSocial(null)}
                        style={{
                          ...styles.socialLink,
                          color:
                            activeSocial === `${founder.name}-${social.name}`
                              ? currentTheme.inverseBase
                              : currentTheme.primary,
                          borderColor:
                            activeSocial === `${founder.name}-${social.name}`
                              ? currentTheme.primary
                              : currentTheme.border,
                          background:
                            activeSocial === `${founder.name}-${social.name}`
                              ? currentTheme.primary
                              : currentTheme.panel,
                          transform:
                            activeSocial === `${founder.name}-${social.name}`
                              ? 'translateY(-3px)'
                              : 'translateY(0)',
                        }}
                      >
                        <SocialIcon type={social.icon} />
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    fontFamily: typography.body,
    transition: 'background-color 0.3s ease, color 0.3s ease',
    isolation: 'isolate',
  },
  scanlineWrap: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    zIndex: 50,
    pointerEvents: 'none',
  },
  scanline: {
    width: '100%',
    height: '1px',
  },
  crosshair: {
    position: 'absolute',
    zIndex: 1,
    fontFamily: typography.mono,
    fontSize: '18px',
    lineHeight: 1,
    opacity: 0.55,
    userSelect: 'none',
    pointerEvents: 'none',
  },
  innerContent: {
    position: 'relative',
    zIndex: 2,
    padding: 'max(60px, 8vw) max(20px, 4vw)',
    maxWidth: '1440px',
    margin: '0 auto',
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '32px',
    fontFamily: typography.mono,
    fontSize: 'clamp(9px, 2.4vw, 11px)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  headerBlock: {
    marginBottom: '48px',
    paddingLeft: '20px',
  },
  sectionIndex: {
    fontFamily: typography.mono,
    fontSize: '11px',
    letterSpacing: '0.1em',
  },
  sectionTitle: {
    fontFamily: typography.display,
    fontSize: 'clamp(24px, 4.5vw, 40px)',
    fontWeight: 800,
    margin: '6px 0 0 0',
    letterSpacing: '0',
  },
  sectionText: {
    maxWidth: '560px',
    fontFamily: typography.body,
    fontSize: 'clamp(14px, 1.8vw, 17px)',
    lineHeight: 1.65,
    margin: '14px 0 0 0',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
    gap: '24px',
  },
  founderCard: {
    position: 'relative',
    border: '1px solid',
    backdropFilter: glass.blur,
    WebkitBackdropFilter: glass.blur,
    padding: 'clamp(18px, 4vw, 28px)',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    transition: transitions.smooth,
    overflow: 'hidden',
    willChange: 'transform, box-shadow, background',
  },
  cardGlow: {
    position: 'absolute',
    top: 0,
    left: '12%',
    right: '12%',
    height: '1px',
    transition: transitions.smooth,
    pointerEvents: 'none',
  },
  profileRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    minWidth: 0,
  },
  avatar: {
    width: 'clamp(48px, 12vw, 64px)',
    height: 'clamp(48px, 12vw, 64px)',
    flex: '0 0 auto',
    border: '1px solid',
    objectFit: 'cover',
    mixBlendMode: 'luminosity',
    transition: transitions.smooth,
  },
  identityBlock: {
    minWidth: 0,
  },
  founderName: {
    fontFamily: typography.display,
    fontSize: 'clamp(18px, 4.8vw, 24px)',
    lineHeight: 1.05,
    fontWeight: 800,
    margin: 0,
    letterSpacing: '0',
    overflowWrap: 'anywhere',
  },
  founderRole: {
    fontFamily: typography.body,
    fontSize: '13px',
    lineHeight: 1.4,
    margin: '6px 0 0 0',
  },
  divider: {
    width: '100%',
    height: '1px',
    margin: '24px 0',
  },
  cardIndex: {
    fontFamily: typography.mono,
    fontSize: '10px',
    letterSpacing: '0.14em',
  },
  founderSignal: {
    fontFamily: typography.mono,
    fontSize: '11px',
    lineHeight: 1.55,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    margin: '16px 0 28px',
  },
  cardFooter: {
    marginTop: 'auto',
    paddingTop: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    flexWrap: 'wrap',
  },
  metric: {
    fontFamily: typography.mono,
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  socialRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  socialLink: {
    width: '34px',
    height: '34px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid',
    textDecoration: 'none',
    transition: transitions.fast,
    willChange: 'transform, background, color',
  },
};
