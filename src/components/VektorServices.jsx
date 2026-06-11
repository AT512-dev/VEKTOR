import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { typography, glass, transitions } from '../tokens';

const CARD_DATA = [
  {
    index: '01',
    title: 'FULL-STACK CORE',
    desc: 'Bespoke architectural logic layers built for speed and computational resilience. Custom data engineering with strict payload validation routines.'
  },
  {
    index: '02',
    title: 'SYSTEM DESIGN',
    desc: 'High-conversion interactive software interfaces mapped completely inside mathematical clamps. Zero dependencies, total performance layout control.'
  },
  {
    index: '03',
    title: 'PIPELINE LOGISTICS',
    desc: 'Integrated secure environment setups, deployment automations, and custom API connector integrations engineered to operate at absolute zero configuration error.'
  }
];

export default function VektorServices() {
  const { currentTheme } = useTheme();

  return (
    <section id="services" style={{ ...styles.sectionWrapper, backgroundColor: currentTheme.base }}>
      <div style={styles.innerContent}>
        <div style={{ ...styles.headerBlock, borderLeft: `2px solid ${currentTheme.primary}` }}>
          <span style={{ ...styles.sectionIndex, color: currentTheme.muted }}>// MODULE_02</span>
          <h2 style={{ ...styles.sectionTitle, color: currentTheme.primary }}>CAPABILITIES MANIFEST</h2>
        </div>

        <div style={styles.gridContainer}>
          {CARD_DATA.map((card) => (
            <div key={card.index} style={{ 
              ...styles.serviceCard, 
              background: currentTheme.panel, 
              borderColor: currentTheme.border 
            }}>
              <div style={styles.cardHeader}>
                <span style={{ ...styles.cardIndex, color: currentTheme.muted }}>{card.index}</span>
                <h3 style={{ ...styles.cardTitle, color: currentTheme.primary }}>{card.title}</h3>
              </div>
              <p style={{ ...styles.cardDesc, color: currentTheme.muted }}>{card.desc}</p>
              <div style={{ ...styles.cardFooter, borderTop: `1px solid ${currentTheme.border}` }}>
                <span style={{ ...styles.systemLink, color: currentTheme.primary }}>EXECUTE_BOUNDS _</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
    letterSpacing: '-0.01em',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  serviceCard: {
    border: '1px solid',
    backdropFilter: glass.blur,
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '340px',
    transition: transitions.smooth,
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  cardIndex: {
    fontFamily: typography.mono,
    fontSize: '13px',
    fontWeight: 600,
  },
  cardTitle: {
    fontFamily: typography.display,
    fontSize: '20px',
    fontWeight: 700,
    margin: 0,
    letterSpacing: '0.02em',
  },
  cardDesc: {
    fontFamily: typography.body,
    fontSize: '13.5px',
    lineHeight: '1.6',
    margin: '24px 0',
  },
  cardFooter: {
    paddingTop: '16px',
  },
  systemLink: {
    fontFamily: typography.mono,
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.1em',
  },
};