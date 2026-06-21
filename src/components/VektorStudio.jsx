import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { typography, glass, transitions } from '../tokens';
import { itemReveal, sectionReveal } from '../motionPresets';

const FOUNDERS = [
  {
    name: 'Aleksandre',
    image: '/images/icon.png',
    role: 'Full-Stack Core',
    signal: 'FRONTEND / API / DEPLOY',
    metric: '99.9% BUILD INTEGRITY',
    socials: [
      { name: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/aleks--aleks/' },
      { name: 'GitHub', icon: 'github', href: 'https://github.com/AT512-dev' },
    ],
  },
  {
    name: 'Austin',
    image: '/images/Austin.jpg',
    role: 'Logic Architecture',
    signal: 'SYSTEM DESIGN / FLOW / SCALE',
    metric: 'ZERO-FRICTION OPS',
    socials: [
      { name: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/karl-austin-pavia-032814324' },
      { name: 'GitHub', icon: 'github', href: 'https://github.com/auxomeness' },
      { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/thatguyaustinn/' },
    ],
  },
  {
    name: 'Harshal',
    image: '/images/harshal.jpg',
    role: 'Systems Engineering',
    signal: 'INFRA / SECURITY / PERFORMANCE',
    metric: 'FORTRESS-GRADE STACK',
    socials: [
      { name: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/harshal-andhale/' },
      { name: 'GitHub', icon: 'github', href: 'https://github.com/HarshalAndhale9657' },
      { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/harshal_9657/' },
    ],
  },
  {
    name: 'Ali Jan',
    image: '/images/ALI.jpg',
    role: 'Full-Stack Developer',
    signal: 'REACT / NODE / FULL-STACK',
    metric: 'END-TO-END SHIP SPEED',
    socials: [
      { name: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com/in/ali-jan-16872a306/' },
      { name: 'GitHub', icon: 'github', href: 'https://github.com/AleyJan' },
    ],
  },
  {
    name: 'Sumeet Gite',
    image: '/images/sumeet.jpg',
    role: 'Marketing & Growth',
    signal: 'GROWTH / SEO / BRAND STRATEGY',
    metric: 'CONVERSION-FIRST CAMPAIGNS',
    socials: [
      { name: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com/in/sumeet-gite-0668a8297/' },
      { name: 'GitHub', icon: 'github', href: 'https://github.com/Sumeet2386' },
    ],
  },
];

import SocialIcon from './icons/SocialIcon';


export default function VektorStudio() {
  const { currentTheme } = useTheme();

  return (
    <motion.section
      id="studio"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionReveal}
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

      <motion.div variants={sectionReveal} style={styles.innerContent}>
        <motion.div variants={itemReveal} style={styles.metaRow}>
          <span style={{ color: currentTheme.muted }}>VEKTOR.STUDIO // OPERATORS</span>
        </motion.div>

        <motion.div variants={itemReveal} style={{ ...styles.headerBlock, borderLeft: `2px solid ${currentTheme.primary}` }}>
          <span style={{ ...styles.sectionIndex, color: currentTheme.muted }}></span>
          <h2 style={{ ...styles.sectionTitle, color: currentTheme.primary }}>STUDIO OPERATORS</h2>
          <p style={{ ...styles.sectionText, color: currentTheme.muted }}>
            A focused technical crew building fast, secure, high-conversion digital systems.
          </p>
        </motion.div>

        <motion.div variants={sectionReveal} style={styles.gridContainer}>
          {FOUNDERS.map((founder, index) => {
            return (
              <motion.article
                className="vektor-interactive-card"
                key={founder.name}
                variants={itemReveal}
                style={{
                  ...styles.founderCard,
                }}
              >
                <div
                  className="vektor-card-glow"
                  style={{
                    ...styles.cardGlow,
                    background: `linear-gradient(90deg, transparent, ${currentTheme.borderHover}, transparent)`,
                  }}
                />

                <div style={styles.profileRow}>
                  <img
                    src={founder.image}
                    alt={`${founder.name} profile`}
                    className="vektor-avatar"
                    style={{
                      ...styles.avatar,
                      borderColor: currentTheme.border,
                      backgroundColor: currentTheme.surface,
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
                    {founder.socials.map((social) => (
                      <a
                        className="vektor-focus-ring vektor-social-link"
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${founder.name} ${social.name}`}
                        style={{
                          ...styles.socialLink,
                        }}
                      >
                        <SocialIcon type={social.icon} />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.section>
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
  /*
    FIX: Raised the minmax floor from 280px to 320px.
    With 5 cards and a 280px floor, auto-fit was fitting 2 columns
    on viewports between ~580px and ~900px, leaving cards too narrow
    and causing content overlap. At 320px the grid drops to a single
    column at ~680px, giving every card enough breathing room on mobile.
    The `min(100%, 320px)` inner clamp ensures the card never exceeds
    the container on very small screens, identical to the pattern used
    in the other grids throughout the site.
  */
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
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