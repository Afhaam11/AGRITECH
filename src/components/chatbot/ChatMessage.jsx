import React from 'react';
import { motion } from 'framer-motion';

const ChatMessage = ({ message, index, onSuggestionClick }) => {
  const isBot = message.type === 'bot';

  return (
    <motion.div
      className={`message message-${message.type}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="message-avatar">
        {isBot ? '🤖' : '👨‍🌾'}
      </div>
      
      <div className="message-content">
        <div className="message-bubble">
          <div className="message-text">
            {message.text}
          </div>
          
          {/* ✅ Enhanced info for RAG responses */}
          {isBot && message.confidence && (
            <div className="confidence-indicator">
              Confidence: {Math.round(message.confidence * 100)}%
            </div>
          )}
          
          {isBot && message.processingTime && (
            <div className="processing-time">
              Response time: {message.processingTime}s
            </div>
          )}
          
          {isBot && message.responseType && (
            <div className={`response-type ${message.responseType}`}>
              {message.responseType === 'rag' ? '📚 Research-based' : '💡 Built-in'}
            </div>
          )}
          
          {/* ✅ Sources section */}
          {isBot && message.sources && message.sources.length > 0 && (
            <div className="sources-section">
              <details>
                <summary>📚 Sources ({message.sources.length})</summary>
                {message.sources.map((source, idx) => (
                  <div key={idx} className="source-item">
                    <strong>{source.title}</strong>
                    <p>{source.content}</p>
                  </div>
                ))}
              </details>
            </div>
          )}
          
          {/* ✅ Fixed suggestions handling */}
          {message.suggestions && message.suggestions.length > 0 && (
            <div className="message-suggestions">
              {message.suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  className="suggestion-chip"
                  onClick={() => onSuggestionClick?.(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="message-time">
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
