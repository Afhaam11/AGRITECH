export const APP_CONFIG = {
  APP_NAME: 'Rice AI Detection',
  VERSION: '1.0.0',
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  
  // File upload constraints
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_FILE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  
  // Animation settings
  ANIMATION_DURATION: {
    FAST: 200,
    MEDIUM: 300,
    SLOW: 500
  },
  
  // Breakpoints
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1200
  },
  
  // Colors
  COLORS: {
    PRIMARY: '#4CAF50',
    SECONDARY: '#8BC34A',
    SUCCESS: '#4CAF50',
    WARNING: '#FF9800',
    ERROR: '#F44336',
    INFO: '#2196F3'
  }
};

export const ROUTES = {
  HOME: '/',
  DETECTION: '/detection',
  CHATBOT: '/chatbot',
  ABOUT: '/about'
};

export const LOCAL_STORAGE_KEYS = {
  DETECTION_HISTORY: 'rice_ai_detection_history',
  CHAT_HISTORY: 'rice_ai_chat_history',
  USER_PREFERENCES: 'rice_ai_preferences'
};
APP_CONFIG = {
  APP_NAME: 'Rice AI Detection',
  VERSION: '1.0.0',
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  
  // File upload constraints
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_FILE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  
  // Animation settings
  ANIMATION_DURATION: {
    FAST: 200,
    MEDIUM: 300,
    SLOW: 500
  },
  
  // Breakpoints
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1200
  },
  
  // Colors
  COLORS: {
    PRIMARY: '#4CAF50',
    SECONDARY: '#8BC34A',
    SUCCESS: '#4CAF50',
    WARNING: '#FF9800',
    ERROR: '#F44336',
    INFO: '#2196F3'
  }
};

export const ROUTES = {
  HOME: '/',
  DETECTION: '/detection',
  CHATBOT: '/chatbot',
  ABOUT: '/about'
};

export const LOCAL_STORAGE_KEYS = {
  DETECTION_HISTORY: 'rice_ai_detection_history',
  CHAT_HISTORY: 'rice_ai_chat_history',
  USER_PREFERENCES: 'rice_ai_preferences'
};
