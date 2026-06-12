import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { typography, glass, transitions } from '../tokens';
import { cardHover, itemReveal, sectionReveal } from '../motionPresets';

const CARD_DATA = [
  {
    index: '01',
    title: 'ONE PAGE WEBSITE',
    target: 'Small businesses, personal brands, and solo offers that need a focused launch page.',
    scope: 'Single responsive page, conversion copy structure, contact path, deployment.',
    price: '$150 - $300',
    badge: 'FAST LAUNCH'
  },
  {
    index: '02',
    title: 'MULTI PAGE WEBSITE',
    target: 'Cafes, salons, contractors, creators, and service providers with several offers.',
    scope: '3-5 pages, navigation system, service pages, contact flow, SEO-ready structure.',
    price: '$350 - $700',
    badge: 'MOST REQUESTED'
  },
  {
    index: '03',
    title: 'BOOKING / WEB APP',
    target: 'Teams that need booking logic, dashboards, tools, workflows, or custom operations.',
    scope: 'Custom interface, business logic, data flow, auth-ready architecture, deployment.',
    price: '$800 - $1,500',
    badge: 'CUSTOM SYSTEM'
  }
];

export default function VektorServices() {
  const { currentTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [activeCard, setActiveCard] = useState(null);

  return (
    <motion.section
      id="services"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      variants={sectionReveal}
      style={{ ...styles.sectionWrapper, backgroundColor: currentTheme.base }}
    >
      <motion.div variants={sectionReveal} style={styles.innerContent}>
        <motion.div variants={itemReveal} style={{ ...styles.headerBlock, borderLeft: `2px solid ${currentTheme.primary}` }}>
          <span style={{ ...styles.sectionIndex, color: currentTheme.muted }}>// MODULE_02</span>
          <h2 style={{ ...styles.sectionTitle, color: currentTheme.primary }}>SERVICES / PRICING</h2>
          <p style={{ ...styles.sectionText, color: currentTheme.muted }}>
            Clear builds for real businesses. Each package is scoped to launch cleanly, load fast, and make the next action obvious.
          </p>
        </motion.div>

        <motion.div variants={sectionReveal} className="vektor-card-grid" style={styles.gridContainer}>
          {CARD_DATA.map((card) => {
            const isActive = activeCard === card.index;

            return (
            <motion.article
              className="vektor-interactive-card"
              key={card.index}
              variants={itemReveal}
              onMouseEnter={() => setActiveCard(card.index)}
              onMouseLeave={() => setActiveCard(null)}
              onFocus={() => setActiveCard(card.index)}
              onBlur={() => setActiveCard(null)}
              whileHover={shouldReduceMotion ? undefined : cardHover}
              whileFocus={shouldReduceMotion ? undefined : cardHover}
              style={{
                ...styles.serviceCard,
                background: isActive ? currentTheme.surface : currentTheme.panel,
                borderColor: isActive ? currentTheme.borderHover : currentTheme.border,
                boxShadow: isActive ? `0 24px 70px ${currentTheme.mesh}` : 'none',
              }}
            >
              <div
                style={{
                  ...styles.cardGlow,
                  opacity: isActive ? 1 : 0,
                  background: `linear-gradient(90deg, transparent, ${currentTheme.borderHover}, transparent)`,
                }}
              />

              <div style={styles.cardHeader}>
                <div style={styles.cardMetaRow}>
                  <span style={{ ...styles.cardIndex, color: currentTheme.muted }}>{card.index}</span>
                  <span style={{ ...styles.badge, color: currentTheme.primary, borderColor: currentTheme.border }}>{card.badge}</span>
                </div>
                <h3 style={{ ...styles.cardTitle, color: currentTheme.primary }}>{card.title}</h3>
                <p style={{ ...styles.price, color: currentTheme.primary }}>{card.price}</p>
              </div>

              <div style={styles.cardBody}>
                <p style={{ ...styles.cardDesc, color: currentTheme.muted }}>{card.target}</p>
                <div style={{ ...styles.scopeBox, borderColor: currentTheme.border, background: currentTheme.panel }}>
                  <span style={{ ...styles.scopeLabel, color: currentTheme.dim }}>SCOPE</span>
                  <p style={{ ...styles.scopeText, color: currentTheme.secondary }}>{card.scope}</p>
                </div>
              </div>

              <div style={{ ...styles.cardFooter, borderTop: `1px solid ${currentTheme.border}` }}>
                <a className="vektor-focus-ring vektor-cta-link" href="#contact" style={{ ...styles.systemLink, color: currentTheme.primary }}>REQUEST QUOTE _</a>
              </div>
            </motion.article>
          )})}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

const styles = {
  sectionWrapper: {
    width: '100%',
    transition: 'background-color 0.3s ease',
  },
  innerContent: {
    padding: 'max(60px, 8vw) max(20px, 4vw)',
    maxWidth: '1440px',
    margin: '0 auto',
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
    maxWidth: '620px',
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
  serviceCard: {
    position: 'relative',
    border: '1px solid',
    backdropFilter: glass.blur,
    WebkitBackdropFilter: glass.blur,
    padding: 'clamp(22px, 4vw, 32px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '420px',
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
  cardHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  cardMetaRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    flexWrap: 'wrap',
  },
  cardIndex: {
    fontFamily: typography.mono,
    fontSize: '13px',
    fontWeight: 600,
  },
  badge: {
    fontFamily: typography.mono,
    fontSize: '9px',
    letterSpacing: '0.12em',
    border: '1px solid',
    padding: '5px 8px',
  },
  cardTitle: {
    fontFamily: typography.display,
    fontSize: 'clamp(21px, 3vw, 28px)',
    lineHeight: 1.08,
    fontWeight: 800,
    margin: 0,
    letterSpacing: '0',
  },
  price: {
    fontFamily: typography.mono,
    fontSize: 'clamp(18px, 3vw, 24px)',
    lineHeight: 1,
    fontWeight: 700,
    margin: '6px 0 0 0',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    margin: '28px 0',
  },
  cardDesc: {
    fontFamily: typography.body,
    fontSize: '14px',
    lineHeight: '1.6',
    margin: 0,
  },
  scopeBox: {
    border: '1px solid',
    padding: '16px',
  },
  scopeLabel: {
    display: 'block',
    fontFamily: typography.mono,
    fontSize: '10px',
    letterSpacing: '0.14em',
    marginBottom: '10px',
  },
  scopeText: {
    fontFamily: typography.body,
    fontSize: '13px',
    lineHeight: 1.55,
    margin: 0,
  },
  cardFooter: {
    paddingTop: '16px',
  },
  systemLink: {
    fontFamily: typography.mono,
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textDecoration: 'none',
  },
};
