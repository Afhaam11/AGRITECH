import { APP_CONFIG } from './constants';

export const validateImageFile = (file) => {
  const errors = [];

  // Check file type
  if (!APP_CONFIG.ACCEPTED_FILE_TYPES.includes(file.type)) {
    errors.push('Please upload a valid image file (JPEG, JPG, PNG, or WEBP)');
  }

  // Check file size
  if (file.size > APP_CONFIG.MAX_FILE_SIZE) {
    errors.push(`File size must be less than ${APP_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB`);
  }

  return {
    isValid: errors.length === 0,
    error: errors.length > 0 ? errors[0] : null,
    errors
  };
};

export const validateMessage = (message) => {
  const trimmedMessage = message.trim();
  
  if (!trimmedMessage) {
    return {
      isValid: false,
      error: 'Message cannot be empty'
    };
  }

  if (trimmedMessage.length > 1000) {
    return {
      isValid: false,
      error: 'Message is too long (maximum 1000 characters)'
    };
  }

  return {
    isValid: true,
    error: null
  };
};

export const sanitizeInput = (input) => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim();
};
