import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

const Hero = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  
  // Set up the 3D background effect with optimized settings
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xdc2626, // Red color (red-600)
          backgroundColor: 0x0a0a14, // Dark background
          points: 10.00, // Reduced point count for better performance
          maxDistance: 22.00, // Slightly reduced for performance
          spacing: 20.00, // Increased spacing for better performance
          showDots: false,
          fps: 30 // Cap framerate for better performance
        })
      );
    }
    
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    }
  };
  
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1, 
        delay: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: 1.2, 
        ease: [0.22, 1, 0.36, 1] 
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: '0 0 25px rgba(99, 102, 241, 0.6)',
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.95 }
  };

  // Split title into letters for individual animation
  const titleText = "ZINE VIEWER";
  const titleLetters = titleText.split('');

  return (
    <div 
      ref={vantaRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40 z-10"></div>
      
      {/* Cinematic lines effect */}
      <div className="absolute inset-0 z-10 opacity-10" 
        style={{ 
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)' 
        }}>
      </div>
      
      {/* Animated glow effects */}
      {/* Red accent glow */}
      <motion.div 
        className="absolute top-1/3 right-1/3 w-[450px] h-[450px] rounded-full bg-red-600/20 blur-[150px] z-0"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{ 
          duration: 9, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
      />
      
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/20 blur-[120px] z-0"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 30, 0],
          y: [0, -30, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-purple-500/20 blur-[100px] z-0"
        animate={{ 
          scale: [1, 0.8, 1],
          opacity: [0.2, 0.3, 0.2],
          x: [0, -20, 0],
          y: [0, 20, 0]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity, 
          ease: 'easeInOut',
          delay: 1 
        }}
      />
      
      {/* Main content */}
      <div className="relative z-20 text-center px-8 max-w-7xl mx-auto">
        {/* Animated title with letter-by-letter animation */}
        <motion.h1 
          className="text-[120px] md:text-[180px] font-black text-white leading-none tracking-tighter mb-8"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="inline-block relative">
            {titleLetters.map((letter, index) => (
              <motion.span 
                key={index}
                className="inline-block relative"
                variants={letterVariants}
                style={{
                  textShadow: '0 0 40px rgba(99, 102, 241, 0.5)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.2)'
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
                {/* Individual letter glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-red-600/30 to-purple-600/20 rounded-full blur-xl -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.6, 0],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: index * 0.2,
                    ease: 'easeInOut'
                  }}
                />
              </motion.span>
            ))}
          </div>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          className="text-2xl md:text-3xl text-white/80 font-light max-w-3xl mx-auto mb-12 leading-relaxed tracking-wide"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          An immersive journey through visual storytelling and cinematic design experiences
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-6"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button 
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-full text-lg font-medium tracking-wide shadow-lg relative overflow-hidden group"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <span className="relative z-10">Explore Collection</span>
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.button>
          
          <motion.button 
            className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-lg font-medium tracking-wide"
            variants={buttonVariants}
            whileHover={{
              scale: 1.05,
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderColor: 'rgba(255,255,255,0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            About the Project
          </motion.button>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div 
            className="w-8 h-14 border-2 border-white/30 rounded-full flex justify-center"
            animate={{ 
              boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 10px rgba(255,255,255,0.3)', '0 0 0px rgba(255,255,255,0)'],
              borderColor: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div 
              className="w-1.5 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
            />
          </motion.div>
          <motion.p 
            className="text-white/70 text-sm mt-2 text-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;