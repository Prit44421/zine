import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Memoized floating element to avoid unnecessary re-renders
const FloatingElement = React.memo(({ children, depth = 0.1, position, size, rotation, className }) => {
  // Use a single scroll hook for each element instead of creating new ones
  const { scrollYProgress } = useScroll({ 
    // Lower update rate for better performance
    layoutEffect: false,
    smooth: 10 // Lower value = smoother but more performance cost
  });
  
  // Create transform values outside of useMemo since hooks can't be called inside callbacks
  const smootherYPosition = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, 400 * depth],
    { clamp: true } // Prevent extrapolation outside range
  );
  
  const rotateX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, rotation?.x || 0],
    { clamp: true }
  );
  
  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, rotation?.y || 0],
    { clamp: true }
  );
  
  // Compute the z-index value
  const zIndexValue = Math.round(10 - depth * 10);
  
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        top: position?.top,
        left: position?.left,
        right: position?.right,
        bottom: position?.bottom,
        width: size?.width,
        height: size?.height,
        y: smootherYPosition,
        rotateX,
        rotateY,
        zIndex: zIndexValue,
        willChange: 'transform' // Hint to browser for optimization
      }}
    >
      {children}
    </motion.div>
  );
});

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Visual elements that float with scroll */}
      <FloatingElement 
        depth={0.1} 
        position={{ top: '5%', right: '10%' }}
        size={{ width: '220px', height: '220px' }}
        rotation={{ x: 20, y: -15 }}
        className="opacity-25"
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="fill-current text-zine-highlight">
          <circle cx="50" cy="50" r="40" />
          <path d="M 20 20 C 50 100, 90 200, 20 290" stroke="currentColor" strokeWidth="5" fill="none" />
          <polygon points="50,10 90,50 50,90 10,50" />
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="20" />
            <path d="M 20 20 C 50 100, 90 200, 20 290" stroke="currentColor" strokeWidth="3" fill="none" />
          </svg>
        </svg>
      </FloatingElement>
      
      <FloatingElement 
        depth={0.2} 
        position={{ bottom: '15%', left: '7%' }}
        size={{ width: '150px', height: '150px' }}
        rotation={{ x: -10, y: 5 }}
        className="opacity-15"
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="fill-current text-zine-accent">
          <rect x="10" y="10" width="80" height="80" rx="10" />
          <circle cx="50" cy="50" r="30" />
          <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="5" />
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <rect x="20" y="20" width="60" height="60" rx="5" />
            <circle cx="50" cy="50" r="20" />
          </svg>
        </svg>
      </FloatingElement>
      
      <FloatingElement 
        depth={0.15} 
        position={{ top: '30%', left: '15%' }}
        size={{ width: '100px', height: '300px' }}
        rotation={{ x: 5, y: 15 }}
        className="opacity-10"
      >
        <svg width="100%" height="100%" viewBox="0 0 100 300" className="fill-current text-white">
          <path d="M 10 10 C 50 100, 90 200, 10 290" stroke="currentColor" strokeWidth="10" fill="none" />
          <rect x="10" y="10" width="80" height="280" rx="10" />
          <svg width="100%" height="100%" viewBox="0 0 100 300">
            <path d="M 20 20 C 50 100, 90 200, 20 290" stroke="currentColor" strokeWidth="5" fill="none" />
            <rect x="20" y="20" width="60" height="260" rx="5" />
          </svg>
        </svg>
      </FloatingElement>
      
      <FloatingElement 
        depth={0.3} 
        position={{ bottom: '10%', right: '15%' }}
        size={{ width: '250px', height: '250px' }}
        rotation={{ x: -5, y: -15 }}
        className="opacity-10"
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="fill-current text-zine-highlight">
          <polygon points="50,10 90,50 50,90 10,50" />
          <circle cx="50" cy="50" r="40" />
          <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="5" />
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <polygon points="50,20 90,60 50,100 10,60" />
            <circle cx="50" cy="50" r="20" />
          </svg>
        </svg>
      </FloatingElement>
      
      {/* Wireframe elements for design interest */}
      <FloatingElement 
        depth={0.25} 
        position={{ top: '15%', left: '25%' }}
        size={{ width: '100px', height: '100px' }}
        rotation={{ x: 40, y: 25 }}
        className="opacity-20"
      >
        <div className="w-full h-full border border-white/30 rounded-md" />
      </FloatingElement>
      
      <FloatingElement 
        depth={0.18} 
        position={{ bottom: '30%', right: '25%' }}
        size={{ width: '80px', height: '80px' }}
        rotation={{ x: -25, y: -40 }}
        className="opacity-15"
      >
        <div className="w-full h-full border border-white/20 rounded-full" />
      </FloatingElement>
    </div>
  );
};

export default FloatingElements;