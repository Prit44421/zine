import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <footer className="py-16 px-8 bg-[#0a0a14] border-t border-white/10">
      <motion.div 
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand and description */}
          <motion.div 
            className="col-span-1 md:col-span-2"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">Z</span>
              </div>
              <span className="text-white text-xl font-light tracking-widest">ZINE</span>
            </div>
            <p className="text-white/60 font-light max-w-md">
              An immersive journey through visual storytelling and cinematic design experiences. Created for the 2025 Design Hackathon.
            </p>
            
            {/* Newsletter signup */}
            <div className="mt-8">
              <h3 className="text-white font-medium mb-4">Subscribe to our newsletter</h3>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/5 border border-white/10 rounded-l-full px-4 py-2 text-white focus:outline-none focus:border-indigo-500 w-full"
                />
                <motion.button 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-r-full px-4 py-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
          
          {/* Navigation links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              {['Home', 'Gallery', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <motion.a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-white/60 hover:text-white transition-colors duration-300 flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2 opacity-0 group-hover:opacity-100"></span>
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Social links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-medium mb-4">Connect</h3>
            <ul className="space-y-2">
              {[
                { name: 'Twitter', icon: '🐦' },
                { name: 'Instagram', icon: '📷' },
                { name: 'Dribbble', icon: '🏀' },
                { name: 'GitHub', icon: '💻' }
              ].map((item) => (
                <li key={item.name}>
                  <motion.a 
                    href="#" 
                    className="text-white/60 hover:text-white transition-colors duration-300 flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Copyright and credits */}
        <motion.div 
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <p className="text-white/40 text-sm">&copy; 2025 Zine Viewer. All rights reserved.</p>
          
          {/* Hackathon badge */}
          <motion.div 
            className="mt-4 md:mt-0 px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-full border border-indigo-500/30 text-white/70 text-sm flex items-center"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)' }}
          >
            <span className="mr-2">✨</span>
            Created for the 2025 Design Hackathon
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;