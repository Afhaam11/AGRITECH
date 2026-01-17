import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  title, 
  className = '', 
  hoverable = true,
  glassEffect = false,
  ...props 
}) => {
  const cardClasses = `card ${className} ${glassEffect ? 'glass-card' : ''}`;

  return (
    <motion.div
      className={cardClasses}
      whileHover={hoverable ? { 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      } : {}}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {title && (
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;
