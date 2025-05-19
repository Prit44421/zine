import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get scroll progress for animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.05], [0, 8]);
  const navBackground = useTransform(
    scrollYProgress,
    [0, 0.05],
    ['rgba(10, 10, 20, 0)', 'rgba(10, 10, 20, 0.8)']
  );

  // Navigation items
  const navItems = ['Home', 'Gallery', 'About', 'Contact'];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6"
      style={{ 
        backgroundColor: navBackground,
        backdropFilter: `blur(${blur}px)`,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 100, 
        damping: 20,
        delay: 0.5 
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">Z</span>
          </div>
          <span className="text-white text-xl font-light tracking-widest">ZINE</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/80 hover:text-white text-sm uppercase tracking-widest font-light"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.8 + (index * 0.1),
                type: 'spring',
                stiffness: 100,
                damping: 20
              }}
            >
              {item}
            </motion.a>
          ))}

          {/* CTA Button */}
          <motion.button
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium tracking-wide"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 20px rgba(79, 70, 229, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 1.2,
              type: 'spring',
              stiffness: 100,
              damping: 20
            }}
          >
            Subscribe
          </motion.button>
        </div>

        {/* Progress indicator */}
        <motion.div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-600"
          style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
        />
      </div>
    </motion.nav>
  );
};

export default Navbar;