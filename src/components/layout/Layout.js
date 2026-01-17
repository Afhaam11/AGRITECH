import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../common/Navbar';
import ParticleSystem from './ParticleSystem';
import { useApp } from '../../context/AppContext';

const Layout = ({ children }) => {
  const { state } = useApp();

  useEffect(() => {
    // Initialize particles and global animations
    const initializeLayout = () => {
      document.body.classList.add('layout-initialized');
    };

    initializeLayout();

    return () => {
      document.body.classList.remove('layout-initialized');
    };
  }, []);

  return (
    <div className="layout-container">
      <ParticleSystem />
      <Navbar />
      
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.5,
              ease: [0.645, 0.045, 0.355, 1]
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Glassmorphism background overlay */}
      <div className="glass-overlay" />
    </div>
  );
};

export default Layout;
