import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useMotionValue, motion } from 'framer-motion';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  
  // Using refs for better performance instead of state
  const isHoveringLink = useRef(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Throttle mousemove for better performance
  const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };
  
  useEffect(() => {
    const onMouseMove = throttle((e) => {
      // Update motion values for better performance
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Update CSS variables for position
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      
      // Direct DOM manipulation is faster than React state
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      
      // Update trail elements
      const trailElements = document.querySelectorAll('.cursor-trail');
      trailElements.forEach((el, index) => {
        setTimeout(() => {
          el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }, index * 50); // Staggered delay for trail effect
      });
      
      // Check hover state less frequently
      if (e.clientX % 5 === 0) { // Only check every few pixels moved
        const element = document.elementFromPoint(e.clientX, e.clientY);
        const isLink = element && (
          element.tagName.toLowerCase() === 'a' || 
          element.tagName.toLowerCase() === 'button' ||
          element.closest('a') ||
          element.closest('button') ||
          element.dataset.cursorPointer
        );
        
        if (isLink !== isHoveringLink.current) {
          isHoveringLink.current = isLink;
          setLinkHovered(isLink);
        }
      }
    }, 10); // 10ms throttle

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    // Passive event listeners for better performance
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('mousedown', onMouseDown, { passive: true });
    document.addEventListener('mouseup', onMouseUp, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [mouseX, mouseY]); // Added missing dependencies

  // Cursor configuration - used in the styling below

  // Premium cursor configuration
  const sparkCount = 12; // Reduced for more minimal aesthetic
  const trailLength = 8; // Slightly shorter trail for cleaner look
  
  // Colors for the premium aesthetic - Apple/Notion inspired
  const sparkColors = useMemo(() => [
    'rgba(255, 255, 255, 0.8)', // White with transparency
    'rgba(191, 219, 254, 0.7)', // Light blue with transparency
    'rgba(221, 214, 254, 0.7)', // Light purple with transparency
    'rgba(249, 250, 251, 0.7)', // Very light gray with transparency
    'rgba(209, 213, 219, 0.6)'  // Light gray with transparency
  ], []);
  
  // Memoize spark positions for better performance
  const sparkPositions = useMemo(() => {
    return Array.from({ length: sparkCount }).map(() => ({
      // Random angle for 360-degree distribution
      angle: Math.random() * Math.PI * 2,
      // Random distance from cursor center
      distance: Math.random() * 12 + 3,
      // Random size for variety
      size: Math.random() * 2.5 + 0.8,
      // Random opacity for depth
      opacity: Math.random() * 0.9 + 0.5,
      // Pick a random color from our festive palette
      color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
      // Random animation delay
      delay: Math.random() * 1.5
    }));
  }, [sparkColors]);
  
  return (
    <div className="cursor-container">
      {/* Premium main cursor dot */}
      <motion.div
        ref={dotRef}
        className={`cursor-dot ${clicked ? 'cursor-clicked' : ''} ${linkHovered ? 'cursor-hover' : ''} ${hidden ? 'cursor-hidden' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          transform: 'translate(0px, 0px)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'normal',
          backdropFilter: 'blur(1px)',
          transition: 'transform 0.05s cubic-bezier(0.22, 1, 0.36, 1), width 0.2s, height 0.2s'
        }}
        animate={{
          scale: clicked ? 0.7 : linkHovered ? 1.2 : 1,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 20 }
        }}
      />
      
      {/* Premium cursor ring */}
      <motion.div
        ref={ringRef}
        className={`cursor-ring ${clicked ? 'cursor-clicked' : ''} ${linkHovered ? 'cursor-hover' : ''} ${hidden ? 'cursor-hidden' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transform: 'translate(0px, 0px) translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'transform 0.15s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease'
        }}
        animate={{
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
          opacity: clicked ? 0.5 : linkHovered ? 0.8 : 0.6
        }}
        transition={{
          scale: { type: 'spring', stiffness: 200, damping: 15 },
          opacity: { duration: 0.2 }
        }}
      />
      
      {/* Premium subtle particles */}
      {sparkPositions.map((spark, index) => (
        <motion.div
          key={`spark-${index}`}
          className="cursor-spark"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${spark.size * 0.8}px`,
            height: `${spark.size * 0.8}px`,
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: `1px solid ${spark.color}`,
            opacity: hidden ? 0 : spark.opacity * 0.7 * (clicked ? 1.2 : 1) * (linkHovered ? 1.1 : 1),
            transform: `translate(calc(var(--mouse-x) + ${Math.cos(spark.angle) * spark.distance * (clicked ? 1.3 : 1)}px), calc(var(--mouse-y) + ${Math.sin(spark.angle) * spark.distance * (clicked ? 1.3 : 1)}px))`,
            pointerEvents: 'none',
            zIndex: 9997,
            transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
          animate={{
            opacity: [spark.opacity * 0.5, spark.opacity * 0.8, spark.opacity * 0.5],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{
            duration: 2 + spark.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
      
      {/* Premium subtle trail */}
      {Array.from({ length: trailLength }).map((_, index) => (
        <motion.div
          key={`trail-${index}`}
          className="cursor-trail"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${6 - (index * 0.6)}px`,
            height: `${6 - (index * 0.6)}px`,
            borderRadius: '50%',
            backgroundColor: index === 0 ? 'rgba(255, 255, 255, 0.7)' : `rgba(255, 255, 255, ${0.7 - (index * 0.08)})`,
            transform: 'translate(0px, 0px)',
            transition: `transform ${0.05 + (index * 0.015)}s cubic-bezier(0.22, 1, 0.36, 1)`,
            pointerEvents: 'none',
            zIndex: 9996 - index,
            opacity: hidden ? 0 : 0.8 - (index * 0.09),
            mixBlendMode: 'normal',
            backdropFilter: index < 2 ? 'blur(1px)' : 'none'
          }}
          animate={{
            scale: clicked ? 0.8 : linkHovered ? 1.1 : 1
          }}
          transition={{
            scale: { duration: 0.2 }
          }}
        />
      ))}
      
      {/* Add a global style for animations */}
      <style jsx global>{`
        @keyframes subtle-pulse {
          0% { opacity: 0.6; transform: scale(0.95); }
          50% { opacity: 0.9; transform: scale(1.05); }
          100% { opacity: 0.6; transform: scale(0.95); }
        }
        
        @keyframes subtle-fade {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.6; }
        }
        
        .cursor-dot {
          animation: subtle-fade 2s infinite alternate;
          will-change: transform, opacity;
        }
        
        .cursor-ring {
          animation: subtle-pulse 3s infinite alternate;
          will-change: transform, opacity;
        }
        
        .cursor-hover {
          backdrop-filter: blur(4px) !important;
        }
        
        .cursor-clicked {
          background-color: rgba(255, 255, 255, 0.9) !important;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.3) !important;
        }
        
        .cursor-hidden {
          opacity: 0 !important;
        }
        
        /* Smooth transitions for all cursor elements */
        .cursor-container * {
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </div>
  );
};

export default CustomCursor;