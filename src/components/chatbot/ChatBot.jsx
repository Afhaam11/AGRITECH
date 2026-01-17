import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import QuickActions from './QuickActions';
import { useChatBot } from '../../hooks/useChatBot';
import { useApp } from '../../context/AppContext';


console.log('🔥 ChatBot.jsx file loaded at:', new Date());

const ChatBot = () => {
  console.log('🔥 ChatBot component rendering');

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const { messages, sendMessage, clearChat, connectionStatus } = useChatBot();
  const { state } = useApp();

  // ✅ TEST: Add this to verify console works
  useEffect(() => {
    console.log('🔥 ChatBot component mounted!');
    console.log('🔥 Messages from hook:', messages);
    console.log('🔥 SendMessage function:', sendMessage);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;

    // ✅ TEST: Add explicit logging
    console.log('🔵 handleSendMessage called with:', message);
    console.log('🔵 About to call sendMessage from hook');

    setIsTyping(true);
    await sendMessage(message);
    setInputMessage('');
    setIsTyping(false);

    console.log('🔵 sendMessage completed');

    // Focus back to input
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action) => {
    console.log('🎯 [COMPONENT] Quick action clicked:', action);
    handleSendMessage(action);
  };

  // ✅ Add connection status indicator
  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return '#4CAF50';
      case 'processing': return '#FF9800';
      case 'local': return '#2196F3';
      case 'error': return '#F44336';
      default: return '#666';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'RAG Powered';
      case 'processing': return 'Processing...';
      case 'local': return 'Local Mode';
      case 'error': return 'Connection Issues';
      default: return 'Unknown';
    }
  };


  return (
    <div className="chatbot-page">
      <div className="chat-container">
        <button
          onClick={() => {
            console.log('🧪 Test button clicked');
            handleSendMessage('What are rice diseases?');
          }}
          style={{ margin: '10px', padding: '10px', background: 'red', color: 'white' }}
        >
          🧪 TEST BACKEND
        </button>
        {/* Header with status indicator */}
        <div className="chat-header">
          <div className="bot-avatar-header">🤖</div>
          <div className="bot-info">
            <h3>Rice AI Assistant</h3>
            <span style={{ color: getStatusColor() }}>
              {getStatusText()}
            </span>
          </div>
          <button onClick={clearChat} className="clear-button">
            Clear Chat
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          <AnimatePresence>
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                index={index}
                onSuggestionClick={handleSendMessage} // ✅ Pass suggestion handler
              />
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              className="typing-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="typing-avatar">🤖</div>
              <div className="typing-bubble">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <QuickActions onActionClick={handleQuickAction} />

        {/* Input */}
        <div className="chat-input">
          <div className="chat-input-wrapper">
            <textarea
              id="chatbot-input"
              name="chatbot-input"
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about rice diseases, farming tips..."
              rows="2"
              disabled={isTyping}
              className="chat-textarea"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isTyping}
              className="send-button"
            >
              📤
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};

export default ChatBot;
