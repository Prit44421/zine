import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled 
          ? 'backdrop-blur-xl bg-black/20 py-3 border-b border-white/10 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <motion.div
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm shadow-md flex items-center justify-center mr-3"
            whileHover={{ boxShadow: '0 0 20px rgba(255,255,255,0.3)' }}
          >
            <span className="text-black text-lg font-medium">Z</span>
          </motion.div>
          <span className="text-white font-sans text-xl font-light tracking-wide">ZINE</span>
        </motion.div>
        
        <div className="flex space-x-1 md:space-x-2">
          {['About', 'Gallery', 'Archive', 'Contact'].map((item, index) => (
            <motion.a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="text-white/80 hover:text-white px-3 py-2 rounded-full transition-all duration-300 cursor-pointer font-sans tracking-wide text-sm md:text-base relative overflow-hidden group"
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10">{item}</span>
              <motion.div 
                className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              />
            </motion.a>
          ))}
          
          {/* Premium action button */}
          <motion.button
            className="ml-2 px-4 py-1.5 bg-white/90 text-black rounded-full text-sm font-medium shadow-md"
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: 'rgba(255, 255, 255, 1)',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Subscribe
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;