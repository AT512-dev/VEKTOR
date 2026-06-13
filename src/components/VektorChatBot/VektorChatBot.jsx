import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import ChatWindow from './ChatWindow';

export default function VektorChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme } = useTheme();

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '16px'
        }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{
                width: '380px',
                height: '600px',
                maxHeight: '80vh',
                maxWidth: 'calc(100vw - 48px)',
                backgroundColor: currentTheme.panel,
                backdropFilter: 'blur(24px) saturate(180%)',
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 24px 70px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{
                padding: '16px 20px',
                borderBottom: `1px solid ${currentTheme.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: currentTheme.surface,
              }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: currentTheme.primary }}>Vektor Assistant</h3>
                  <p style={{ margin: 0, fontSize: '12px', color: currentTheme.muted }}>Senior Account Manager</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: currentTheme.muted,
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px'
                  }}
                  className="vektor-social-link"
                >
                  <X size={20} />
                </button>
              </div>
              
              <ChatWindow />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '30px',
            backgroundColor: currentTheme.primary,
            color: currentTheme.inverseBase,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            position: 'relative'
          }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                style={{ position: 'absolute' }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
                style={{ position: 'absolute' }}
              >
                <MessageSquare size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
