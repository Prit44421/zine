import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ZineDetail = ({ data, isOpen, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  // Close on escape key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Modal Content */}
            <motion.div
              className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black bg-opacity-30 text-white flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
              >
                ✕
              </motion.button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Image Section */}
                <motion.div
                  className="h-[300px] md:h-full relative"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <img 
                    src={`${process.env.PUBLIC_URL}${data.image}`} 
                    alt={data.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Content Section */}
                <div className="p-8 flex flex-col space-y-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h2 className="text-3xl font-playfair font-bold mb-2">{data.title}</h2>
                    <h3 className="text-xl font-playfair italic text-gray-600 mb-4">{data.subtitle}</h3>
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <p className="text-gray-800 leading-relaxed mb-6">{data.description}</p>
                    <p className="text-gray-800 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur ipsum, in egestas libero. Aliquam erat volutpat. Nullam quis risus eget urna mollis ornare vel eu leo. Donec in efficitur ipsum, in egestas libero. 
                    </p>
                  </motion.div>
                  
                  <motion.div
                    className="flex flex-wrap gap-2 mt-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {data.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-200 text-gray-800 px-3 py-1 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ZineDetail;