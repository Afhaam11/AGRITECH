import { useState, useCallback, useEffect } from 'react';
import chatbotService from '../services/chatbotService';

export const useChatBot = () => {
  console.log('🎯 useChatBot hook initialized');

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! I\'m your Rice AI Assistant powered by research papers. Ask me about rice diseases!',
      timestamp: new Date()
    }
  ]);

  const [connectionStatus, setConnectionStatus] = useState('checking'); // ✅ ADD THIS

  const sendMessage = useCallback(async (messageText) => {
    console.log('🎯 [HOOK] sendMessage called with:', messageText);
    
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setConnectionStatus('processing'); // ✅ ADD THIS

    try {
      console.log('🎯 [HOOK] Calling chatbotService...');
      const response = await chatbotService.getChatResponse(messageText);
      console.log('🎯 [HOOK] Got response:', response);

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: response.text,
        timestamp: new Date(),
        suggestions: response.suggestions || [],
        confidence: response.confidence,
        sources: response.sources || [],
        processingTime: response.processingTime,
        responseType: response.type
      };

      setMessages(prev => [...prev, botMessage]);
      setConnectionStatus(response.type === 'rag' ? 'connected' : 'local'); // ✅ ADD THIS

    } catch (error) {
      console.error('🎯 [HOOK] Error:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: "Error occurred. Check console.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setConnectionStatus('error'); // ✅ ADD THIS
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        text: 'Chat cleared. How can I help you?',
        timestamp: new Date()
      }
    ]);
  }, []);

  return {
    messages,
    sendMessage,
    clearChat,
    connectionStatus // ✅ ADD THIS
  };
};
