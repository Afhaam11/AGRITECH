import React from 'react';
import { motion } from 'framer-motion';

const QuickActions = ({ onActionClick }) => {
  const quickActions = [
    { icon: '🦠', text: 'Common Diseases', action: 'What are the most common rice diseases?' },
    { icon: '💊', text: 'Treatment Guide', action: 'How to treat rice diseases?' },
    { icon: '🛡️', text: 'Prevention Tips', action: 'How to prevent rice diseases?' },
    { icon: '🌱', text: 'Farming Tips', action: 'Give me rice farming tips' },
    { icon: '💧', text: 'Irrigation', action: 'Rice irrigation best practices' },
    { icon: '🌾', text: 'Harvest Time', action: 'When to harvest rice?' }
  ];

  return (
    <motion.div
      className="quick-actions"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h4 className="quick-actions-title">Quick Questions</h4>
      <div className="quick-actions-grid">
        {quickActions.map((action, index) => (
          <motion.button
            key={index}
            className="quick-action-btn"
            onClick={() => onActionClick(action.action)}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 5px 15px rgba(76, 175, 80, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
          >
            <span className="action-icon">{action.icon}</span>
            <span className="action-text">{action.text}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;
