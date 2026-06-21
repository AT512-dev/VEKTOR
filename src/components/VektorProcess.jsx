import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { typography, glass, transitions } from '../tokens';
import { itemReveal, sectionReveal } from '../motionPresets';

const STEPS = [
  {
    index: '01',
    title: 'Signal Intake',
    text: 'We map your offer, audience, pages, features, and launch constraints before design starts.',
  },
  {
    index: '02',
    title: 'Interface Blueprint',
    text: 'You get a clear structure for sections, conversion paths, content, and required functionality.',
  },
  {
    index: '03',
    title: 'Build Sprint',
    text: 'We design and develop the responsive site or app with fast feedback checkpoints.',
  },
  {
    index: '04',
    title: 'Launch Protocol',
    text: 'Final polish, deployment, performance checks, and a clean handoff so the system is ready.',
  },
];

export default function VektorProcess() {
  const { currentTheme } = useTheme();

  return (
    <motion.section
      id="process"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.24 }}
      variants={sectionReveal}
      style={{
        ...styles.section,
        backgroundColor: currentTheme.base,
        borderTop: `1px solid ${currentTheme.border}`,
      }}
    >
      <motion.div variants={sectionReveal} style={styles.innerContent}>
        <motion.div variants={itemReveal} style={{ ...styles.headerBlock, borderLeft: `2px solid ${currentTheme.primary}` }}>
          <span style={{ ...styles.sectionIndex, color: currentTheme.muted }}></span>
          <h2 style={{ ...styles.sectionTitle, color: currentTheme.primary }}>IDEA TO LAUNCH</h2>
          <p style={{ ...styles.sectionText, color: currentTheme.muted }}>
            A lean process built for small teams that need momentum, clarity, and a finished product.
          </p>
        </motion.div>

        {/*
          FIX: Removed `gridTemplateColumns` from the inline `style` prop here.
          The grid layout is now controlled entirely by the `.vektor-process-grid`
          class in index.css, which already has the correct 4-column desktop rule
          and collapses to 1-column at ≤920px via a media query.
          The inline style was overriding the media query and preventing collapse.
        */}
        <motion.div variants={sectionReveal} className="vektor-process-grid" style={styles.grid}>
          {STEPS.map((step) => {
            return (
              <motion.article
                className="vektor-interactive-card"
                key={step.index}
                variants={itemReveal}
                style={{
                  ...styles.stepCard,
                }}
              >
                <span style={{ ...styles.stepIndex, color: currentTheme.dim }}>{step.index}</span>
                <h3 style={{ ...styles.stepTitle, color: currentTheme.primary }}>{step.title}</h3>
                <p style={{ ...styles.stepText, color: currentTheme.muted }}>{step.text}</p>
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
    width: '100%',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
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
    maxWidth: '560px',
    fontFamily: typography.body,
    fontSize: 'clamp(14px, 1.8vw, 17px)',
    lineHeight: 1.65,
    margin: '14px 0 0 0',
  },
  // FIX: `gridTemplateColumns` removed from here. The class handles it.
  // All other grid properties (gap, display) that don't conflict are kept.
  grid: {
    gap: '1px',
  },
  stepCard: {
    border: '1px solid',
    backdropFilter: glass.blur,
    WebkitBackdropFilter: glass.blur,
    padding: 'clamp(20px, 4vw, 30px)',
    minHeight: '250px',
    display: 'flex',
    flexDirection: 'column',
    transition: transitions.smooth,
    willChange: 'transform, background',
  },
  stepIndex: {
    fontFamily: typography.mono,
    fontSize: '11px',
    letterSpacing: '0.14em',
    marginBottom: '48px',
  },
  stepTitle: {
    fontFamily: typography.display,
    fontSize: 'clamp(19px, 2.4vw, 24px)',
    lineHeight: 1.12,
    fontWeight: 800,
    margin: 0,
    letterSpacing: '0',
  },
  stepText: {
    fontFamily: typography.body,
    fontSize: '13.5px',
    lineHeight: 1.6,
    margin: '14px 0 0 0',
  },
};