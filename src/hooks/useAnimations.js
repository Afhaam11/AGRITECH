import { useCallback } from 'react';

export const useAnimations = () => {
  const fadeIn = useCallback((element, duration = 300) => {
    return new Promise(resolve => {
      element.style.opacity = '0';
      element.style.display = 'block';
      
      const start = performance.now();
      const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        element.style.opacity = progress;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };
      
      requestAnimationFrame(animate);
    });
  }, []);

  const fadeOut = useCallback((element, duration = 300) => {
    return new Promise(resolve => {
      const start = performance.now();
      const startOpacity = parseFloat(getComputedStyle(element).opacity) || 1;
      
      const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        element.style.opacity = startOpacity * (1 - progress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.style.display = 'none';
          resolve();
        }
      };
      
      requestAnimationFrame(animate);
    });
  }, []);

  const slideIn = useCallback((element, direction = 'left', duration = 300) => {
    const transforms = {
      left: 'translateX(-100%)',
      right: 'translateX(100%)',
      up: 'translateY(-100%)',
      down: 'translateY(100%)'
    };

    element.style.transform = transforms[direction];
    element.style.transition = `transform ${duration}ms ease-out`;
    
    requestAnimationFrame(() => {
      element.style.transform = 'translate(0)';
    });

    setTimeout(() => {
      element.style.transition = '';
    }, duration);
  }, []);

  const bounce = useCallback((element) => {
    element.style.animation = 'bounce 0.6s ease-in-out';
    
    setTimeout(() => {
      element.style.animation = '';
    }, 600);
  }, []);

  return {
    fadeIn,
    fadeOut,
    slideIn,
    bounce
  };
};
