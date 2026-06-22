import { useEffect } from 'react';
import { MotionConfig, motion, useScroll, useSpring } from 'motion/react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import VektorNav from './components/VektorNav';
import VektorHero from './components/VektorHero';
import VektorServices from './components/VektorServices';
import VektorFooter from './components/VektorFooter';
import VektorStudio from './components/VektorStudio';
import VektorProcess from './components/VektorProcess';
import VektorPortfolio from './components/VektorPortfolio';
import VektorContact from './components/VektorContact';
import VektorChatBot from './components/VektorChatBot/VektorChatBot';

/** Height of the fixed navbar — used to offset hash-scroll targets. */
const NAV_HEIGHT = 72;

/**
 * Scroll to the element identified by `window.location.hash`.
 * Uses a short delay to let Framer Motion finish initial layout animations
 * so the target element is in the DOM and correctly positioned.
 */
function scrollToHash() {
  const hash = window.location.hash;
  if (!hash) return;

  // Small delay lets React + Motion finish mounting / animating
  setTimeout(() => {
    const el = document.querySelector(hash);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, 100);
}

function ScrollProgress() {
  const { currentTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 1200,
        transformOrigin: '0% 50%',
        scaleX,
        background: currentTheme.primary,
      }}
    />
  );
}

function MainLayout() {
  const { currentTheme } = useTheme();

  // Handle hash-based navigation on initial load and on hash changes
  useEffect(() => {
    // On mount: scroll to the hash target (if any)
    scrollToHash();

    // Listen for in-page hash changes (e.g., from pushState or manual URL edits)
    window.addEventListener('hashchange', scrollToHash);

    /**
     * Global click delegate: intercept ALL clicks on <a href="#..."> links
     * anywhere in the app tree, scrolling with the proper navbar offset.
     * This avoids adding onClick to every individual hash link in the codebase.
     */
    function handleHashLinkClick(e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
        window.scrollTo({ top, behavior: 'smooth' });
        history.pushState(null, '', href);
      }
    }

    document.addEventListener('click', handleHashLinkClick);

    return () => {
      window.removeEventListener('hashchange', scrollToHash);
      document.removeEventListener('click', handleHashLinkClick);
    };
  }, []);

  return (
    <div id="top" style={{ 
      backgroundColor: currentTheme.base, 
      minHeight: '100vh', 
      color: currentTheme.primary,
      transition: 'background-color 0.3s ease, color 0.3s ease',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <ScrollProgress />
      <VektorNav />

      <main style={{ flex: 1 }}> 
        <VektorHero />
        <VektorServices />
        <VektorProcess />
        <VektorPortfolio />
        <VektorStudio />
        <VektorContact />
      </main>

      <VektorFooter />
      <VektorChatBot />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <ErrorBoundary>
          <MainLayout />
        </ErrorBoundary>
      </ThemeProvider>
    </MotionConfig>
  );
}
