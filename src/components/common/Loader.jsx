import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ 
  type = 'spinner', 
  size = 'medium', 
  message = 'Loading...',
  overlay = false 
}) => {
  const LoaderComponent = () => {
    switch (type) {
      case 'dots':
        return (
          <div className={`loader-dots loader-${size}`}>
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="dot"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        );
      
      case 'pulse':
        return (
          <motion.div
            className={`loader-pulse loader-${size}`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        );
      
      default:
        return (
          <motion.div
            className={`loader-spinner loader-${size}`}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        );
    }
  };

  const content = (
    <div className="loader-container">
      <LoaderComponent />
      {message && <p className="loader-message">{message}</p>}
    </div>
  );

  if (overlay) {
    return (
      <div className="loader-overlay">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
