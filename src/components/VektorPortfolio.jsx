import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { typography, glass, transitions } from '../tokens';
import { itemReveal, sectionReveal } from '../motionPresets';

const PROJECTS = [
  {
    index: '01',
    title: 'Cafe Ordering Site',
    type: 'MULTI PAGE WEBSITE',
    result: 'Menu, location, offer pages, and a direct inquiry path for local search traffic.',
    tags: ['LOCAL SEO', 'MENU UX', 'MOBILE FIRST'],
    image: 'images/2.png',
  },
  {
    index: '02',
    title: 'Salon Booking Interface',
    type: 'BOOKING / WEB APP',
    result: 'Service selection, calendar-ready booking flow, and admin-friendly request capture.',
    tags: ['BOOKING FLOW', 'FORMS', 'DASHBOARD'],
    image: 'images/3.png',
  },
  {
    index: '03',
    title: 'Creator Launch Page',
    type: 'ONE PAGE WEBSITE',
    result: 'Offer narrative, proof blocks, newsletter capture, and fast deployment.',
    tags: ['LANDING PAGE', 'LEAD CAPTURE', 'LAUNCH'],
    image: 'images/1.png',
  },
];

export default function VektorPortfolio() {
  const { currentTheme } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox  = (project) => setSelectedImage(project);
  const closeLightbox = ()        => setSelectedImage(null);

  return (
    // Fragment wraps the section + the portal-level lightbox so both live at
    // the same React tree depth — required for layoutId to resolve correctly.
    <>
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
            <span style={{ ...styles.sectionIndex, color: currentTheme.muted }}></span>
            <h2 style={{ ...styles.sectionTitle, color: currentTheme.primary }}>EXAMPLE BUILDS</h2>
            <p style={{ ...styles.sectionText, color: currentTheme.muted }}>
              Premium placeholders for the kinds of systems Vektor ships for local businesses, creators, and operators.
            </p>
          </motion.div>

          <motion.div variants={sectionReveal} className="vektor-card-grid" style={styles.grid}>
            {PROJECTS.map((project) => {
              return (
                <motion.article
                  className="vektor-interactive-card"
                  key={project.index}
                  variants={itemReveal}
                  // overflow visible so the layout transition isn't clipped
                  style={{ ...styles.projectCard, overflow: 'visible' }}
                >
                  {/* ── Project image ──────────────────────────────────── */}
                  {/* The wrapper clips & rounds; the motion.img animates layout */}
                  <div style={styles.imageWrapper}>
                    <motion.img
                      layoutId={`project-image-${project.index}`}
                      src={project.image}
                      alt={`${project.title} preview`}
                      onClick={() => openLightbox(project)}
                      style={styles.projectImage}
                      // Subtle scale-up on hover so it reads as interactive
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                    {/* Zoom hint badge */}
                    <span style={{ ...styles.zoomHint, color: currentTheme.primary, borderColor: currentTheme.border }}>
                      VIEW ↗
                    </span>
                  </div>

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

      {/* ── Lightbox ─────────────────────────────────────────────────────────
          AnimatePresence lets Framer Motion coordinate the exit animation
          before the node is removed from the DOM.
      ──────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedImage && (
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
              layoutId={`project-image-${selectedImage.index}`}
              src={selectedImage.image}
              alt={`${selectedImage.title} full preview`}
              style={styles.lightboxImage}
              onClick={(e) => e.stopPropagation()}
              // Give the image a slightly springy settle
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
    willChange: 'transform, background',
  },

  // ── Project image ───────────────────────────────────────────────────────
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '220px',
    overflow: 'hidden',      // clips the image to card edges
    cursor: 'zoom-in',
  },
  projectImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
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
};