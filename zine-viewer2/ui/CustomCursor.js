import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  // State for cursor visibility and interaction
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [trailPoints, setTrailPoints] = useState([]);
  
  // Refs for cursor elements
  const cursorRef = useRef(null);
  
  // Mouse position tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Trail configuration - optimized for performance
  const trailLength = 18; // Reduced number of particles for better performance
  const trailUpdateInterval = 12; // Slightly increased interval for less CPU usage
  
  // Throttle function for better performance
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
  
  // Update mouse position with throttling
  useEffect(() => {
    let trailTimer;
    
    const updateTrail = () => {
      setTrailPoints(prevPoints => {
        const newPoint = { 
          x: mousePosition.x, 
          y: mousePosition.y,
          timestamp: Date.now(),
          id: Math.random().toString(36).substr(2, 9)
        };
        const updatedPoints = [newPoint, ...prevPoints.slice(0, trailLength - 1)];
        return updatedPoints;
      });
      
      trailTimer = setTimeout(updateTrail, trailUpdateInterval);
    };
    
    // Start trail effect
    if (isVisible) {
      updateTrail();
    }
    
    return () => {
      clearTimeout(trailTimer);
    };
  }, [mousePosition, isVisible, trailLength, trailUpdateInterval]);
  
  useEffect(() => {
    // Mouse move handler
    const onMouseMove = throttle((e) => {
      setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over interactive elements
      const element = document.elementFromPoint(e.clientX, e.clientY);
      
      if (element) {
        // Check for custom data attributes
        const customText = element.dataset.cursorText || 
                         (element.closest('[data-cursor-text]')?.dataset.cursorText);
        
        if (customText) {
          setHoverText(customText);
          setIsHovering(true);
        } else {
          setHoverText('');
          
          // Check for interactive elements
          const isInteractive = element.tagName.toLowerCase() === 'a' || 
                              element.tagName.toLowerCase() === 'button' || 
                              element.closest('a') || 
                              element.closest('button');
                              
          setIsHovering(isInteractive);
        }
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    }, 5); // Very low throttle for smooth movement
    
    // Mouse event handlers
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);
    
    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    
    // Clean up event listeners
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);
  
  // Generate fire particles for the comet tail
  const generateFireParticles = (count) => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = (Math.random() * 0.5 + 0.75) * Math.PI; // Mostly behind the cursor
      const distance = 5 + Math.random() * 10;
      return {
        id: i,
        angle,
        distance,
        size: 3 + Math.random() * 8,
        opacity: 0.7 + Math.random() * 0.3,
        color: i % 3 === 0 ? '#ff4d00' : i % 3 === 1 ? '#ff9500' : '#ffcc00', // Fire colors
        animationDuration: 0.5 + Math.random() * 1.5
      };
    });
  };
  
  // Generate ember particles (smaller, faster moving)
  const generateEmberParticles = (count) => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2; // All directions
      const distance = 15 + Math.random() * 25;
      return {
        id: i + 100, // Avoid ID collisions
        angle,
        distance,
        size: 1 + Math.random() * 3,
        opacity: 0.5 + Math.random() * 0.5,
        color: i % 2 === 0 ? '#ff9500' : '#ffcc00', // Ember colors
        animationDuration: 0.3 + Math.random() * 0.7
      };
    });
  };
  
  // Combine fire and ember particles
  const fireParticles = generateFireParticles(12);
  const emberParticles = generateEmberParticles(8);
  const allParticles = [...fireParticles, ...emberParticles];
  
  return (
    <>
      {/* Comet trail effect */}
      {trailPoints.map((point, index) => {
        // Calculate size and opacity based on position in trail
        const size = Math.max(3, 20 - index * 0.8);
        const opacity = Math.max(0.05, 1 - (index / trailLength));
        
        // Calculate color based on position (hotter to cooler)
        let color;
        if (index < 5) color = '#ffcc00'; // Yellow core
        else if (index < 10) color = '#ff9500'; // Orange middle
        else if (index < 15) color = '#ff4d00'; // Red-orange outer
        else color = '#ff2d00'; // Red tail end
        
        return (
          <motion.div
            key={point.id || index}
            className="fixed top-0 left-0 pointer-events-none z-[9997]"
            style={{
              position: 'fixed',
              left: point.x,
              top: point.y,
              transform: 'translate(-50%, -50%)',
              opacity,
            }}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 0.9, 1] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
          >
            <div
              className="rounded-full blur-[2px]"
              style={{
                width: size,
                height: size,
                backgroundColor: color,
                boxShadow: `0 0 ${size * 1.5}px ${color}`,
              }}
            />
          </motion.div>
        );
      })}
      
      {/* Main comet head */}
      <motion.div
        ref={cursorRef}
        className={`fixed top-0 left-0 z-[9999] pointer-events-none ${!isVisible ? 'opacity-0' : ''}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        {/* Comet core */}
        <motion.div
          className="relative"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            rotate: {
              repeat: Infinity,
              duration: 8,
              ease: 'linear',
            }
          }}
        >
          {/* Main fireball */}
          <div className="relative">
            {/* Core glow */}
            <motion.div
              className="absolute rounded-full blur-[8px]"
              style={{
                width: 24,
                height: 24,
                backgroundColor: '#ffcc00',
                boxShadow: '0 0 15px #ffcc00, 0 0 30px #ff9500',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Core */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 16,
                height: 16,
                backgroundColor: '#ffffff',
                boxShadow: '0 0 10px #ffffff, 0 0 20px #ffcc00',
                zIndex: 1,
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Fire particles */}
            {allParticles.map((particle) => (
              <motion.div
                key={`particle-${particle.id}`}
                className="absolute rounded-full blur-[1px]"
                style={{
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  boxShadow: `0 0 ${particle.size}px ${particle.color}`,
                  opacity: particle.opacity,
                  zIndex: 0,
                }}
                animate={{
                  x: [
                    Math.cos(particle.angle) * particle.distance,
                    Math.cos(particle.angle + 0.2) * (particle.distance * 1.2),
                    Math.cos(particle.angle) * particle.distance
                  ],
                  y: [
                    Math.sin(particle.angle) * particle.distance,
                    Math.sin(particle.angle + 0.2) * (particle.distance * 1.2),
                    Math.sin(particle.angle) * particle.distance
                  ],
                  opacity: [particle.opacity, particle.opacity * 0.7, particle.opacity],
                  scale: isClicking ? [1, 1.3, 1] : [1, 1.1, 1],
                }}
                transition={{
                  duration: particle.animationDuration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
      
      {/* Interactive text bubble */}
      <AnimatePresence>
        {hoverText && (
          <motion.div
            className="fixed z-[10000] pointer-events-none"
            style={{
              left: mousePosition.x,
              top: mousePosition.y - 40,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm whitespace-nowrap">
              {hoverText}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;