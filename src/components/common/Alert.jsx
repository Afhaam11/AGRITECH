import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Alert = ({ 
  type = 'info', 
  message, 
  autoClose = true, 
  duration = 5000,
  onClose,
  className = ''
}) => {
  const [visible, setVisible] = useState(true);

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      setTimeout(onClose, 300); // Wait for animation
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`alert alert-${type} ${className}`}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className="alert-content">
            <span className="alert-icon">{icons[type]}</span>
            <span className="alert-message">{message}</span>
          </div>
          <motion.button
            className="alert-close"
            onClick={handleClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ×
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
