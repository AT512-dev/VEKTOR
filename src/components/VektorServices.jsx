import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { typography, glass, transitions } from '../tokens';
import { itemReveal, sectionReveal } from '../motionPresets';

const CARD_DATA = [
  {
    index: '01',
    title: 'ONE PAGE WEBSITE',
    target: 'Small businesses, personal brands, and solo offers that need a focused launch page.',
    scope: 'Single responsive page, conversion copy structure, contact path, deployment.',
    price: '$150 - $300',
    badge: 'FAST LAUNCH',
    image: 'images/1.png',
  },
  {
    index: '02',
    title: 'MULTI PAGE WEBSITE',
    target: 'Cafes, salons, contractors, creators, and service providers with several offers.',
    scope: '3-5 pages, navigation system, service pages, contact flow, SEO-ready structure.',
    price: '$350 - $700',
    badge: 'MOST REQUESTED',
    image: 'images/2.png',
  },
  {
    index: '03',
    title: 'BOOKING / WEB APP',
    target: 'Teams that need booking logic, dashboards, tools, workflows, or custom operations.',
    scope: 'Custom interface, business logic, data flow, auth-ready architecture, deployment.',
    price: '$800 - $1,500',
    badge: 'CUSTOM SYSTEM',
    image: 'images/3.png',
  },
];

export default function VektorServices() {
  const { currentTheme } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox  = (card)  => setSelectedImage(card);
  const closeLightbox = ()      => setSelectedImage(null);

  return (
    // Fragment wraps the section + the portal-level lightbox so both live at
    // the same React tree depth — required for layoutId to resolve correctly.
    <>
      <motion.section
        id="services"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
        variants={sectionReveal}
        style={{ ...styles.sectionWrapper, backgroundColor: currentTheme.base }}
      >
        <motion.div variants={sectionReveal} style={styles.innerContent}>

          {/* ── Section header ─────────────────────────────────────────────── */}
          <motion.div
            variants={itemReveal}
            style={{ ...styles.headerBlock, borderLeft: `2px solid ${currentTheme.primary}` }}
          >
            <span style={{ ...styles.sectionIndex, color: currentTheme.muted }}></span>
            <h2 style={{ ...styles.sectionTitle, color: currentTheme.primary }}>SERVICES / PRICING</h2>
            <p style={{ ...styles.sectionText, color: currentTheme.muted }}>
              Clear builds for real businesses. Each package is scoped to launch cleanly, load fast,
              and make the next action obvious.
            </p>
          </motion.div>

          {/* ── Card grid ──────────────────────────────────────────────────── */}
          <motion.div variants={sectionReveal} className="vektor-card-grid" style={styles.gridContainer}>
            {CARD_DATA.map((card) => (
              <motion.article
                className="vektor-interactive-card"
                key={card.index}
                variants={itemReveal}
                // overflow visible so the layout transition isn't clipped
                style={{ ...styles.serviceCard, overflow: 'visible' }}
              >
                {/* Top-edge accent glow */}
                <div
                  className="vektor-card-glow"
                  style={{
                    ...styles.cardGlow,
                    background: `linear-gradient(90deg, transparent, ${currentTheme.borderHover}, transparent)`,
                  }}
                />

                {/* ── Card image ─────────────────────────────────────────── */}
                {/* The wrapper clips & rounds; the motion.img animates layout */}
                <div style={styles.cardImageWrapper}>
                  <motion.img
                    layoutId={`service-image-${card.index}`}
                    src={card.image}
                    alt={`${card.title} preview`}
                    onClick={() => openLightbox(card)}
                    style={styles.cardImage}
                    // Subtle scale-up on hover so it reads as interactive
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                  {/* Zoom hint badge */}
                  <span style={{ ...styles.zoomHint, color: currentTheme.primary, borderColor: currentTheme.border }}>
                    VIEW ↗
                  </span>
                </div>

                {/* ── Card header ────────────────────────────────────────── */}
                <div style={styles.cardHeader}>
                  <div style={styles.cardMetaRow}>
                    <span style={{ ...styles.cardIndex, color: currentTheme.muted }}>{card.index}</span>
                    <span style={{ ...styles.badge, color: currentTheme.primary, borderColor: currentTheme.border }}>
                      {card.badge}
                    </span>
                  </div>
                  <h3 style={{ ...styles.cardTitle, color: currentTheme.primary }}>{card.title}</h3>
                  <p style={{ ...styles.price, color: currentTheme.primary }}>{card.price}</p>
                </div>

                {/* ── Card body ──────────────────────────────────────────── */}
                <div style={styles.cardBody}>
                  <p style={{ ...styles.cardDesc, color: currentTheme.muted }}>{card.target}</p>
                  <div style={{ ...styles.scopeBox, borderColor: currentTheme.border, background: currentTheme.panel }}>
                    <span style={{ ...styles.scopeLabel, color: currentTheme.dim }}>SCOPE</span>
                    <p style={{ ...styles.scopeText, color: currentTheme.secondary }}>{card.scope}</p>
                  </div>
                </div>

                {/* ── Card footer ────────────────────────────────────────── */}
                <div style={{ ...styles.cardFooter, borderTop: `1px solid ${currentTheme.border}` }}>
                  <a
                    className="vektor-focus-ring vektor-cta-link"
                    href="#contact"
                    style={{ ...styles.systemLink, color: currentTheme.primary }}
                  >
                    REQUEST QUOTE _
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>

        </motion.div>
      </motion.section>

      {/* ── Lightbox ─────────────────────────────────────────────────────────
          AnimatePresence lets Framer Motion coordinate the exit animation
          before the node is removed from the DOM.
      ──────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedImage && (
          <>
            {/* Dark glass-morphism backdrop */}
            <motion.div
              key="lightbox-overlay"
              style={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              onClick={closeLightbox}
            >
              {/* Close button — appears after the overlay fades in */}
              <motion.button
                type="button"
                aria-label="Close preview"
                style={styles.closeButton}
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ delay: 0.18, duration: 0.22 }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
              >
                ✕
              </motion.button>

            
             
              {/* Shared-layout image — same layoutId as the card thumbnail.
                  stopPropagation prevents clicking the image from closing. */}
              <motion.img
                layoutId={`service-image-${selectedImage.index}`}
                src={selectedImage.image}
                alt={`${selectedImage.title} full preview`}
                style={styles.lightboxImage}
                onClick={(e) => e.stopPropagation()}
                // Give the image a slightly springy settle
                transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = {
  // ── Section ──────────────────────────────────────────────────────────────
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

  // ── Grid ─────────────────────────────────────────────────────────────────
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
    gap: '24px',
  },

  // ── Service card ─────────────────────────────────────────────────────────
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
    // overflow moved to 'visible' inline so layout animation isn't clipped
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

  // ── Card image ───────────────────────────────────────────────────────────
  cardImageWrapper: {
    position: 'relative',
    width: '100%',
    height: '180px',
    overflow: 'hidden',       // clips the image to rounded corners
    borderRadius: '6px',
    marginBottom: '22px',
    cursor: 'zoom-in',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    borderRadius: '6px',
  },
  zoomHint: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    fontFamily: typography.mono,
    fontSize: '9px',
    letterSpacing: '0.12em',
    border: '1px solid',
    padding: '4px 7px',
    background: 'rgba(0,0,0,0.45)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    pointerEvents: 'none',
  },

  // ── Card header / body / footer (unchanged) ───────────────────────────
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

  // ── Lightbox ─────────────────────────────────────────────────────────────
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // Dark glass-morphism backdrop
    background: 'rgba(4, 4, 8, 0.82)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
  },
  lightboxImage: {
    // Constrain to 90% of the viewport while preserving aspect ratio
    maxWidth: '90vw',
    maxHeight: '90vh',
    objectFit: 'contain',
    borderRadius: '8px',
    // Prevent it from catching the overlay click
    cursor: 'default',
    // Subtle shadow so it pops off the dark backdrop
    boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '24px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.18)',
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    color: '#fff',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10000,
    // Reset browser button styles
    padding: 0,
    lineHeight: 1,
  },
  lightboxCaption: {
    position: 'absolute',
    bottom: '28px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    padding: '10px 20px',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
  },
  lightboxIndex: {
    fontFamily: typography.mono,
    fontSize: '11px',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: '0.1em',
  },
  lightboxTitle: {
    fontFamily: typography.mono,
    fontSize: '12px',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: '0.08em',
  },
  lightboxPrice: {
    fontFamily: typography.mono,
    fontSize: '11px',
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: '0.06em',
  },
};