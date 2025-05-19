import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';

// Import essential components immediately
import Navbar from './layout/Navbar';
import CustomCursor from './ui/CustomCursor';

// Lazy load other components for better performance
const Hero = lazy(() => import('./sections/Hero'));
const Gallery = lazy(() => import('./sections/Gallery'));
const About = lazy(() => import('./sections/About'));
const Contact = lazy(() => import('./sections/Contact'));
const Footer = lazy(() => import('./layout/Footer'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading for resources
  useEffect(() => {
    // Simulate loading time for dramatic effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Smooth scroll behavior for navigation
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      // Get all section elements
      const sections = document.querySelectorAll('section[id]');
      if (!sections.length) return;
      
      // Get current scroll position
      const scrollPosition = window.scrollY;
      
      // Find the current section
      let currentSectionIndex = 0;
      sections.forEach((section, index) => {
        if (scrollPosition >= section.offsetTop - 100) {
          currentSectionIndex = index;
        }
      });
      
      // Navigate with arrow keys
      if (e.key === 'ArrowDown' && currentSectionIndex < sections.length - 1) {
        sections[currentSectionIndex + 1].scrollIntoView();
      } else if (e.key === 'ArrowUp' && currentSectionIndex > 0) {
        sections[currentSectionIndex - 1].scrollIntoView();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="relative bg-[#0a0a14] text-white overflow-x-hidden">
      {/* Custom Cursor - Desktop-focused interactive element */}
      <CustomCursor />
      
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a14]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-24 h-24 mb-8 relative">
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-indigo-500 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute inset-2 rounded-full border-2 border-purple-500 border-b-transparent"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <motion.h2 
                className="text-2xl font-light tracking-widest"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ZINE VIEWER
              </motion.h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <AnimatePresence>
        {!isLoading && (
          <>
            {/* Navigation Bar */}
            <Navbar />
            
            {/* Main Content with Suspense for lazy-loaded components */}
            <main>
              {/* Loading fallback for lazy-loaded components */}
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="w-16 h-16 relative">
                    <motion.div 
                      className="absolute inset-0 rounded-full border-2 border-red-600 border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </div>
              }>
                {/* Hero Section with 3D background */}
                <section id="home">
                  <Hero />
                </section>
                
                {/* Gallery Section */}
                <section id="gallery">
                  <Gallery />
                </section>
                
                {/* About Section */}
                <About />
                
                {/* Contact Section */}
                <Contact />
                
                {/* Footer */}
                <Footer />
              </Suspense>
            </main>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;