import React, { useState, useRef, useEffect } from 'react';
import chatbotService from '../../services/chatbotService';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! I\'m your Rice AI Assistant. I can help you with rice diseases, farming tips, and agricultural guidance. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getChatBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('disease') || message.includes('blast') || message.includes('blight')) {
      return {
        text: `Rice diseases can significantly impact your harvest. The most common ones include:

🦠 **Rice Blast** - Causes diamond-shaped lesions with gray centers
🦠 **Bacterial Leaf Blight** - Creates water-soaked lesions along leaf margins  
🦠 **Brown Spot** - Small circular brown spots with yellow halos
🦠 **False Smut** - Transforms grains into green, velvety balls
🦠 **Tungro Virus** - Causes yellow/orange discoloration and stunting
🦠 **Sheath Blight** - Oval lesions on leaf sheaths near waterline

Would you like detailed information about any specific disease?`,
        suggestions: ['Rice Blast treatment', 'Prevention tips', 'Symptoms identification']
      };
    }

    if (message.includes('treatment') || message.includes('cure')) {
      return {
        text: `Treatment approaches for rice diseases:

💊 **Fungicides**: Tricyclazole for blast, Mancozeb for brown spot
💊 **Bactericides**: Copper compounds for bacterial diseases
💊 **Preventive**: Use resistant varieties and proper nutrition
💊 **Cultural**: Improve drainage, reduce plant density
💊 **Biological**: Neem-based treatments for eco-friendly control

The key is early detection and immediate action. Which disease are you dealing with?`,
        suggestions: ['Fungicide application', 'Organic treatments', 'Prevention methods']
      };
    }

    if (message.includes('prevent') || message.includes('avoid')) {
      return {
        text: `Prevention is always better than cure! Here are key prevention strategies:

🛡️ **Seed Management**: Use certified, disease-free seeds
🛡️ **Resistant Varieties**: Choose varieties resistant to local diseases
🛡️ **Field Hygiene**: Remove crop residues and weeds
🛡️ **Water Management**: Maintain proper irrigation and drainage
🛡️ **Nutrition**: Balanced fertilization, avoid excess nitrogen
🛡️ **Monitoring**: Regular field inspection for early detection`,
        suggestions: ['Resistant varieties', 'Water management', 'Field sanitation']
      };
    }

    if (message.includes('fertilizer') || message.includes('nutrition')) {
      return {
        text: `Rice fertilizer recommendations:

🌱 **Basal Application** (at transplanting):
   - Urea: 50% of total
   - DAP: 100% 
   - MOP: 50%

🌱 **First Top Dressing** (21 days):
   - Urea: 25% of total

🌱 **Second Top Dressing** (42 days):
   - Urea: 25% of total
   - MOP: 50%

Apply zinc sulfate 25 kg/hectare if deficiency symptoms appear.`,
        suggestions: ['Micronutrient deficiency', 'Organic fertilizers', 'Application timing']
      };
    }

    return {
      text: `I'm here to help with all your rice farming questions! I can provide guidance on:

🌾 Disease identification and treatment
🌾 Farming best practices and techniques  
🌾 Fertilizer recommendations and timing
🌾 Irrigation and water management
🌾 Harvest timing and post-harvest care
🌾 Pest control and prevention methods

What would you like to know about rice cultivation?`,
      suggestions: ['Disease problems', 'Farming techniques', 'Fertilizer guidance']
    };
  };

  const handleSendMessage = async (message = inputMessage) => {
  if (!message.trim()) return;

  // Add user message
  const userMsg = {
    id: Date.now(),
    type: 'user',
    text: message,
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMsg]);
  setInputMessage('');
  setIsTyping(true);

  try {
    // Call backend
    const response = await chatbotService.getChatResponse(message);
    const botMsg = {
      id: Date.now() + 1,
      type: 'bot',
      text: response.text || response.response || 'Sorry, I could not get an answer.',
      timestamp: new Date(),
      suggestions: response.suggestions || []
    };
    setMessages(prev => [...prev, botMsg]);
  } catch (err) {
    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      type: 'bot',
      text: 'Sorry, there was a problem contacting the backend.',
      timestamp: new Date()
    }]);
  }
  setIsTyping(false);
};
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { icon: '🦠', text: 'Common Diseases', action: 'What are the most common rice diseases?' },
    { icon: '💊', text: 'Treatment Guide', action: 'How to treat rice diseases?' },
    { icon: '🛡️', text: 'Prevention Tips', action: 'How to prevent rice diseases?' },
    { icon: '🌱', text: 'Farming Tips', action: 'Give me rice farming tips' }
  ];

  return (
    <div className="chatbot-page">
      <div className="chat-container">
        {/* Chat Header - Matches CSS structure */}
        <div className="chat-header">
          <div className="bot-avatar-header">
            🤖
          </div>
          <div className="bot-info">
            <h3>Rice AI Assistant</h3>
            <span className="bot-status">Online • Ready to help</span>
          </div>
        </div>

        {/* Messages Area - Matches CSS structure */}
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message message-${message.type}`}
            >
              {/* Message Avatar - Always visible */}
              <div className="message-avatar">
                {message.type === 'bot' ? '🤖' : '👨‍🌾'}
              </div>
              
              <div className="message-content">
                <div className="message-bubble">
                  <div className="message-text">
                    {message.text}
                  </div>
                  
                  {/* Message Suggestions - Only for bot messages */}
                  {message.type === 'bot' && message.suggestions && (
                    <div className="message-suggestions">
                      {message.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          className="suggestion-chip"
                          onClick={() => handleSendMessage(suggestion)}
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
            </div>
          ))}

          {/* Typing Indicator - Matches CSS structure */}
          {isTyping && (
            <div className="typing-indicator">
              <div className="typing-avatar">🤖</div>
              <div className="typing-bubble">
                <div className="typing-dots">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions Section - Matches CSS structure */}
        <div className="quick-actions">
          <h4 className="quick-actions-title">Quick Questions</h4>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="quick-action-btn"
                onClick={() => handleSendMessage(action.action)}
              >
                <span className="action-icon">{action.icon}</span>
                <span className="action-text">{action.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Area - Matches CSS structure */}
        <div className="chat-input">
          <div className="chat-input-wrapper">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about rice diseases, farming tips, or any agricultural question..."
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
