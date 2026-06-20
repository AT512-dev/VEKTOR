import { Component } from 'react';
import { typography, transitions } from '../tokens';

/**
 * ErrorBoundary — Catches unhandled React rendering errors and displays
 * a branded fallback UI instead of a white screen.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <App />
 *   </ErrorBoundary>
 *
 * Must be a class component — React does not support error boundaries
 * via hooks as of React 19.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[Vektor] Uncaught render error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div style={styles.container}>
        <div style={styles.card}>
          {/* Brand mark */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '24px' }}>
            <path d="M4 6L16 26L28 6" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="square" />
            <path d="M10 6L16 16L22 6" stroke="#ffffff" strokeWidth="1.25" strokeLinecap="square" opacity="0.4" />
          </svg>

          {/* Status badge */}
          <span style={styles.badge}>
            <span style={styles.badgeDot} />
            SYSTEM ERROR
          </span>

          <h1 style={styles.title}>Something went wrong</h1>

          <p style={styles.description}>
            An unexpected error occurred while rendering the page.
            This has been logged and our team will be notified.
          </p>

          {/* Error detail (dev only) */}
          {import.meta.env.DEV && this.state.error && (
            <pre style={styles.errorDetail}>
              {this.state.error.message || String(this.state.error)}
            </pre>
          )}

          <button
            onClick={this.handleReload}
            style={styles.reloadButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#000000';
            }}
          >
            RELOAD PAGE
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#000000',
    padding: '24px',
    fontFamily: typography.body,
  },
  card: {
    maxWidth: '480px',
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 14px',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    fontFamily: typography.mono,
    fontSize: '9px',
    letterSpacing: '0.14em',
    color: '#ef4444',
    marginBottom: '20px',
  },
  badgeDot: {
    width: '6px',
    height: '6px',
    backgroundColor: '#ef4444',
    borderRadius: '50%',
    flexShrink: 0,
  },
  title: {
    fontFamily: typography.display,
    fontSize: '28px',
    fontWeight: 800,
    color: '#ffffff',
    margin: '0 0 16px 0',
    letterSpacing: '-0.02em',
  },
  description: {
    fontFamily: typography.body,
    fontSize: '15px',
    color: '#a1a1aa',
    lineHeight: 1.7,
    margin: '0 0 32px 0',
    maxWidth: '380px',
  },
  errorDetail: {
    width: '100%',
    padding: '16px',
    background: '#08080a',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    fontFamily: typography.mono,
    fontSize: '11px',
    color: '#ef4444',
    textAlign: 'left',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    margin: '0 0 24px 0',
  },
  reloadButton: {
    background: '#ffffff',
    color: '#000000',
    border: '1px solid #ffffff',
    fontFamily: typography.mono,
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    padding: '14px 32px',
    cursor: 'pointer',
    transition: transitions.fast,
  },
};
