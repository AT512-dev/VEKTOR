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
