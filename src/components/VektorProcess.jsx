import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { typography, glass, transitions } from '../tokens';
import { cardHover, itemReveal, sectionReveal } from '../motionPresets';

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
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(null);

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
          <span style={{ ...styles.sectionIndex, color: currentTheme.muted }}>// MODULE_03</span>
          <h2 style={{ ...styles.sectionTitle, color: currentTheme.primary }}>IDEA TO LAUNCH</h2>
          <p style={{ ...styles.sectionText, color: currentTheme.muted }}>
            A lean process built for small teams that need momentum, clarity, and a finished product.
          </p>
        </motion.div>

        <motion.div variants={sectionReveal} className="vektor-process-grid" style={styles.grid}>
          {STEPS.map((step) => {
            const isActive = activeStep === step.index;

            return (
              <motion.article
                className="vektor-interactive-card"
                key={step.index}
                variants={itemReveal}
                onMouseEnter={() => setActiveStep(step.index)}
                onMouseLeave={() => setActiveStep(null)}
                onFocus={() => setActiveStep(step.index)}
                onBlur={() => setActiveStep(null)}
                whileHover={shouldReduceMotion ? undefined : cardHover}
                whileFocus={shouldReduceMotion ? undefined : cardHover}
                style={{
                  ...styles.stepCard,
                  background: isActive ? currentTheme.surface : currentTheme.panel,
                  borderColor: isActive ? currentTheme.borderHover : currentTheme.border,
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
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
