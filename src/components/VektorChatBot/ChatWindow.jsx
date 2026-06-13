import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../../context/ThemeContext';

export default function ChatWindow() {
  const { currentTheme } = useTheme();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Vektor's Senior Account Manager. How can I help you build something amazing today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      if (data.reply) {
        setMessages(prev => [...prev, data.reply]);
      } else {
        throw new Error('No reply in response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I am having trouble connecting right now. Please try again later or reach out via our contact form.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      <div 
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
        className="vektor-chat-scroll"
      >
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              background: msg.role === 'user' ? currentTheme.primary : 'rgba(255, 255, 255, 0.05)',
              color: msg.role === 'user' ? currentTheme.inverseBase : currentTheme.primary,
              padding: '12px 16px',
              borderRadius: '12px',
              borderBottomRightRadius: msg.role === 'user' ? '4px' : '12px',
              borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '12px',
              fontSize: '14px',
              lineHeight: 1.5,
              border: msg.role === 'assistant' ? `1px solid ${currentTheme.border}` : 'none'
            }}
          >
            <div className="vektor-markdown">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </motion.div>
        ))}
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              alignSelf: 'flex-start',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '12px 16px',
              borderRadius: '12px',
              borderBottomLeftRadius: '4px',
              border: `1px solid ${currentTheme.border}`,
              display: 'flex',
              gap: '4px',
              alignItems: 'center',
              height: '46px'
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: currentTheme.muted
                }}
              />
            ))}
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form 
        onSubmit={handleSubmit}
        style={{
          padding: '16px',
          borderTop: `1px solid ${currentTheme.border}`,
          background: currentTheme.surface,
          display: 'flex',
          gap: '8px'
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          style={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '8px',
            padding: '12px 16px',
            color: currentTheme.primary,
            fontSize: '14px',
            outline: 'none'
          }}
          className="vektor-form-control"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          style={{
            background: currentTheme.primary,
            color: currentTheme.inverseBase,
            border: 'none',
            borderRadius: '8px',
            width: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: (!input.trim() || isLoading) ? 'not-allowed' : 'pointer',
            opacity: (!input.trim() || isLoading) ? 0.5 : 1,
            transition: 'opacity 0.2s'
          }}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
