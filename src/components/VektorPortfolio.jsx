import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { typography, glass, transitions } from '../tokens';
import { cardHover, itemReveal, sectionReveal } from '../motionPresets';

const PROJECTS = [
  {
    index: '01',
    title: 'Cafe Ordering Site',
    type: 'MULTI PAGE WEBSITE',
    result: 'Menu, location, offer pages, and a direct inquiry path for local search traffic.',
    tags: ['LOCAL SEO', 'MENU UX', 'MOBILE FIRST'],
  },
  {
    index: '02',
    title: 'Salon Booking Interface',
    type: 'BOOKING / WEB APP',
    result: 'Service selection, calendar-ready booking flow, and admin-friendly request capture.',
    tags: ['BOOKING FLOW', 'FORMS', 'DASHBOARD'],
  },
  {
    index: '03',
    title: 'Creator Launch Page',
    type: 'ONE PAGE WEBSITE',
    result: 'Offer narrative, proof blocks, newsletter capture, and fast deployment.',
    tags: ['LANDING PAGE', 'LEAD CAPTURE', 'LAUNCH'],
  },
];

function ProjectVisual({ project, theme }) {
  return (
    <div style={{ ...styles.visual, borderColor: theme.border, background: theme.surface }}>
      <div style={{ ...styles.visualTop, borderBottom: `1px solid ${theme.border}` }}>
        <span style={{ background: theme.primary }} />
        <span style={{ background: theme.dim }} />
        <span style={{ background: theme.muted }} />
      </div>
      <div style={styles.visualGrid}>
        <div style={{ ...styles.visualBlock, borderColor: theme.border, gridColumn: 'span 3' }} />
        <div style={{ ...styles.visualBlock, borderColor: theme.border, gridColumn: 'span 2' }} />
        <div style={{ ...styles.visualBlock, borderColor: theme.border, gridColumn: 'span 1' }} />
        <div style={{ ...styles.visualLine, background: theme.primary, gridColumn: 'span 2' }} />
        <div style={{ ...styles.visualLine, background: theme.dim, gridColumn: 'span 1' }} />
        <div style={{ ...styles.visualPanel, borderColor: theme.border, gridColumn: 'span 3' }}>
          <span style={{ color: theme.dim }}>{project.index}</span>
        </div>
      </div>
    </div>
  );
}

export default function VektorPortfolio() {
  const { currentTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [activeProject, setActiveProject] = useState(null);

  return (
    <motion.section
      id="work"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionReveal}
      style={{
        ...styles.section,
        background: `linear-gradient(180deg, ${currentTheme.base} 0%, ${currentTheme.surface} 100%)`,
        borderTop: `1px solid ${currentTheme.border}`,
      }}
    >
      <motion.div variants={sectionReveal} style={styles.innerContent}>
        <motion.div variants={itemReveal} style={{ ...styles.headerBlock, borderLeft: `2px solid ${currentTheme.primary}` }}>
          <span style={{ ...styles.sectionIndex, color: currentTheme.muted }}>// MODULE_04</span>
          <h2 style={{ ...styles.sectionTitle, color: currentTheme.primary }}>EXAMPLE BUILDS</h2>
          <p style={{ ...styles.sectionText, color: currentTheme.muted }}>
            Premium placeholders for the kinds of systems Vektor ships for local businesses, creators, and operators.
          </p>
        </motion.div>

        <motion.div variants={sectionReveal} className="vektor-card-grid" style={styles.grid}>
          {PROJECTS.map((project) => {
            const isActive = activeProject === project.index;

            return (
              <motion.article
                className="vektor-interactive-card"
                key={project.index}
                variants={itemReveal}
                onMouseEnter={() => setActiveProject(project.index)}
                onMouseLeave={() => setActiveProject(null)}
                onFocus={() => setActiveProject(project.index)}
                onBlur={() => setActiveProject(null)}
                whileHover={shouldReduceMotion ? undefined : cardHover}
                whileFocus={shouldReduceMotion ? undefined : cardHover}
                style={{
                  ...styles.projectCard,
                  background: isActive ? currentTheme.surface : currentTheme.panel,
                  borderColor: isActive ? currentTheme.borderHover : currentTheme.border,
                }}
              >
                <ProjectVisual project={project} theme={currentTheme} />
                <div style={styles.projectBody}>
                  <span style={{ ...styles.projectType, color: currentTheme.dim }}>{project.type}</span>
                  <h3 style={{ ...styles.projectTitle, color: currentTheme.primary }}>{project.title}</h3>
                  <p style={{ ...styles.projectResult, color: currentTheme.muted }}>{project.result}</p>
                  <div style={styles.tagRow}>
                    {project.tags.map((tag) => (
                      <span key={tag} style={{ ...styles.tag, color: currentTheme.secondary, borderColor: currentTheme.border }}>
                        {tag}
                      </span>
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
    maxWidth: '620px',
    fontFamily: typography.body,
    fontSize: 'clamp(14px, 1.8vw, 17px)',
    lineHeight: 1.65,
    margin: '14px 0 0 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
    gap: '24px',
  },
  projectCard: {
    border: '1px solid',
    backdropFilter: glass.blur,
    WebkitBackdropFilter: glass.blur,
    transition: transitions.smooth,
    overflow: 'hidden',
    willChange: 'transform, background',
  },
  visual: {
    minHeight: '220px',
    borderBottom: '1px solid',
  },
  visualTop: {
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0 14px',
  },
  visualGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '12px',
    padding: '18px',
  },
  visualBlock: {
    height: '54px',
    border: '1px solid',
  },
  visualLine: {
    height: '8px',
    opacity: 0.62,
  },
  visualPanel: {
    height: '70px',
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '12px',
    fontFamily: typography.mono,
    fontSize: '28px',
  },
  projectBody: {
    padding: 'clamp(20px, 4vw, 28px)',
  },
  projectType: {
    fontFamily: typography.mono,
    fontSize: '10px',
    letterSpacing: '0.14em',
  },
  projectTitle: {
    fontFamily: typography.display,
    fontSize: 'clamp(21px, 3vw, 28px)',
    lineHeight: 1.1,
    fontWeight: 800,
    margin: '12px 0 0 0',
    letterSpacing: '0',
  },
  projectResult: {
    fontFamily: typography.body,
    fontSize: '14px',
    lineHeight: 1.6,
    margin: '16px 0 22px 0',
  },
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  tag: {
    fontFamily: typography.mono,
    fontSize: '9px',
    letterSpacing: '0.12em',
    border: '1px solid',
    padding: '6px 8px',
  },
};
