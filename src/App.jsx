import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import VektorNav from './components/VektorNav';
import VektorHero from './components/VektorHero';
import VektorServices from './components/VektorServices';
import VektorFooter from './components/VektorFooter';
import VektorStudio from './components/VektorStudio';

function MainLayout() {
  const { currentTheme } = useTheme();

  return (
    <div style={{ 
      backgroundColor: currentTheme.base, 
      minHeight: '100vh', 
      color: currentTheme.primary,
      transition: 'background-color 0.3s ease, color 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden'
    }}>
      <VektorNav />

      <main style={{ flex: 1 }}> 
        <VektorHero />
        <VektorServices />
        <VektorStudio />
      </main>

      <VektorFooter />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}