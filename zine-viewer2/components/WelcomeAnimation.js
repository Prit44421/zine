import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeAnimation = ({ onComplete }) => {
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-[100] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 4.5, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={onComplete}
      >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Premium glass morphism background */}
        <motion.div 
          className="absolute inset-0 backdrop-blur-[80px]" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        
        {/* Subtle grid pattern */}
        <motion.div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.3] }}
          transition={{ duration: 3.5, times: [0, 0.5, 1] }}
        />
        
        {/* Subtle glow effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-[120px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5 }}
        />

        {/* Central logo reveal with premium design */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Apple-inspired logo reveal */}
          <motion.div
            className="relative overflow-hidden mb-2"
            initial={{ width: 0 }}
            animate={{ width: '80vw', maxWidth: '600px' }}
            transition={{ 
              duration: 1.8, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.5
            }}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              transition={{ 
                duration: 1.8, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.5
              }}
            >
              <motion.div
                className="flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2 }}
              >
                {/* Minimalist icon */}
                <motion.div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm shadow-lg flex items-center justify-center mr-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 2.2 }}
                >
                  <span className="text-black text-3xl md:text-4xl font-medium">Z</span>
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-7xl font-sans font-light text-white tracking-tight"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.4 }}
                >
                  ZINE
                </motion.h1>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Notion-inspired separator */}
          <motion.div
            className="h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent w-full max-w-[400px] mt-8"
            initial={{ opacity: 0, width: '40%' }}
            animate={{ opacity: 1, width: '100%' }}
            transition={{ 
              duration: 1.5, 
              delay: 2.8,
              ease: [0.22, 1, 0.36, 1]
            }}
          />
          
          <motion.p 
            className="text-white/80 text-sm md:text-base text-center mt-8 font-sans tracking-wide uppercase font-light"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.2 }}
          >
            Interactive Editorial Experience
          </motion.p>
          
          {/* Apple-inspired tagline */}
          <motion.p 
            className="text-white text-2xl md:text-3xl text-center mt-4 font-sans font-light tracking-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.6 }}
          >
            Beautifully Crafted Stories
          </motion.p>
          
          {/* Loading indicator */}
          <motion.div 
            className="mt-12 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              duration: 2, 
              delay: 4,
              times: [0, 0.5, 1],
              ease: "easeInOut"
            }}
          >
            <div className="w-2 h-2 bg-white/70 rounded-full mx-1 animate-pulse" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-white/70 rounded-full mx-1 animate-pulse" style={{ animationDelay: "300ms" }} />
            <div className="w-2 h-2 bg-white/70 rounded-full mx-1 animate-pulse" style={{ animationDelay: "600ms" }} />
          </motion.div>
        </div>
        
        {/* Premium animated particles */}
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.random() * 3 + 1;
          return (
            <motion.div 
              key={i}
              className={`absolute rounded-full ${i % 3 === 0 ? 'bg-blue-400/30' : i % 3 === 1 ? 'bg-purple-400/30' : 'bg-white/30'}`}
              style={{ width: `${size}px`, height: `${size}px`, backdropFilter: 'blur(4px)' }}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                opacity: 0,
                boxShadow: i % 4 === 0 ? '0 0 8px rgba(255,255,255,0.5)' : 'none'
              }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0, 1, i % 2 === 0 ? 2 : 1.5],
                x: `calc(${Math.random() * window.innerWidth}px + ${(Math.random() - 0.5) * 100}px)`,
                y: `calc(${Math.random() * window.innerHeight}px + ${(Math.random() - 0.5) * 100}px)`
              }}
              transition={{ 
                duration: Math.random() * 3 + 3, 
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut'
              }}
            />
          );
        })}
      </div>
    </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeAnimation;