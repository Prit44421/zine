import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ProgressIndicator = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Determine which section is currently in view
      sections.forEach((_, index) => {
        const sectionElement = document.getElementById(`section-${index}`);
        if (sectionElement) {
          const sectionTop = sectionElement.offsetTop;
          const sectionHeight = sectionElement.offsetHeight;
          
          if (
            scrollPosition >= sectionTop - windowHeight / 2 &&
            scrollPosition < sectionTop + sectionHeight - windowHeight / 2
          ) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <motion.div 
      className="fixed right-10 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div className="flex flex-col space-y-4">
        {sections.map((section, index) => {
          const isActive = index === activeSection;
          
          return (
            <div key={index} className="flex items-center group">
              <a 
                href={`#section-${index}`}
                className="relative flex items-center"
              >
                <motion.div 
                  className={`w-3 h-3 rounded-full mr-3 ${isActive ? 'bg-zine-highlight' : 'bg-white bg-opacity-50'} transition-all duration-300`}
                  animate={{
                    scale: isActive ? 1.2 : 1
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                />
                
                <motion.span 
                  className={`font-sans text-sm transition-all duration-300 whitespace-nowrap ${isActive ? 'text-white opacity-100' : 'text-white opacity-0 group-hover:opacity-70'}`}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: isActive ? 'auto' : 0,
                    opacity: isActive ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {section.title}
                </motion.span>
              </a>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProgressIndicator;