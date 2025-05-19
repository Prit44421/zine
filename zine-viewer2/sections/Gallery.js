import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Modern high-quality images for our gallery
const zineData = [
  {
    id: 1,
    title: 'Cinematic Visions',
    subtitle: 'A Visual Journey Through Film',
    description: 'An exploration of cinematography and visual storytelling through the lens of contemporary filmmakers.',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    coverImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2225&q=80',
    featured: true,
    tags: ['cinema', 'visual', 'storytelling', 'film'],
    year: 2023,
    pages: 84
  },
  {
    id: 2,
    title: 'Urban Fragments',
    subtitle: 'City Life in Monochrome',
    description: 'A black and white photographic study of urban architecture and the poetry of city spaces.',
    image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2369&q=80',
    coverImage: 'https://images.unsplash.com/photo-1553708881-112abc53fe54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    featured: true,
    tags: ['urban', 'architecture', 'monochrome', 'photography'],
    year: 2023,
    pages: 62
  },
  {
    id: 3,
    title: 'Digital Dreamscapes',
    subtitle: 'The Art of Immersive Worlds',
    description: 'Exploring the intersection of technology and art through digital landscapes and virtual environments.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    coverImage: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    featured: false,
    tags: ['digital', 'art', 'technology', 'virtual'],
    year: 2022,
    pages: 76
  },
  {
    id: 4,
    title: 'Botanical Chronicles',
    subtitle: "Nature's Intimate Details",
    description: 'A close examination of plant life and natural patterns through macro photography and illustration.',
    image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    coverImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2380&q=80',
    featured: false,
    tags: ['nature', 'botanical', 'macro', 'patterns'],
    year: 2023,
    pages: 58
  },
  {
    id: 5,
    title: 'Chromatic Emotions',
    subtitle: 'A Study in Color Psychology',
    description: 'Examining how color influences mood and perception through a series of visual experiments.',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    coverImage: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    featured: true,
    tags: ['color', 'psychology', 'visual', 'art'],
    year: 2022,
    pages: 72
  },
  {
    id: 6,
    title: 'Sonic Visualizations',
    subtitle: 'Music Translated to Form',
    description: 'Translating audio frequencies and musical compositions into visual patterns and structures.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    featured: false,
    tags: ['music', 'sound', 'visualization', 'patterns'],
    year: 2023,
    pages: 64
  }
];

const Gallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedZine, setSelectedZine] = useState(null);
  const [cursorType, setCursorType] = useState('default');
  const featuredRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect for featured section
  const featuredY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const featuredOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);
  
  // Filter featured and regular zines
  const featuredZines = zineData.filter(zine => zine.featured);
  const regularZines = zineData.filter(zine => !zine.featured);

  // Animation variants for gallery items
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 15
      }
    },
    tap: { scale: 0.98 }
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  // Memoize particle colors for better performance
  const getParticleColors = useMemo(() => {
    // Cache colors to avoid recalculating them on every render
    if (cursorType.includes('glow')) return ['#dc2626', '#ef4444', '#f87171'];
    if (cursorType.includes('link')) return ['#dc2626', '#6366f1', '#a855f7'];
    if (cursorType.includes('view')) return ['#6366f1', '#818cf8', '#a855f7'];
    if (cursorType.includes('expand')) return ['#a855f7', '#d946ef', '#f0abfc'];
    if (cursorType.includes('image')) return ['#10b981', '#34d399', '#6ee7b7'];
    return ['#dc2626', '#6366f1', '#a855f7']; // Default colors
  }, [cursorType]);

  // Handle opening the modal with the selected zine
  const openModal = (zine) => {
    setSelectedZine(zine);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  
  // Cursor interaction handlers
  const handleMouseEnter = (type) => {
    setCursorType(type);
  };
  
  const handleMouseLeave = () => {
    setCursorType('default');
  };

  // Handle closing the modal
  const closeModal = () => {
    setSelectedZine(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <section id="gallery" className="py-24 px-8 bg-gradient-to-b from-primary to-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-24">
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-4 font-playfair"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Featured Collections
            </span>
          </motion.h2>
          
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto my-6"
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 96 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
          
          <motion.p
            className="text-white/70 text-xl max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Explore our curated selection of premium visual narratives and cinematic experiences
          </motion.p>
        </div>
        
        {/* Featured Section - Magazine Style Layout */}
        <motion.div 
          ref={featuredRef}
          style={{ y: featuredY, opacity: featuredOpacity }}
          className="mb-32"
        >
          <motion.h3 
            className="text-3xl font-playfair mb-12 inline-block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="border-b-2 border-indigo-500 pb-2">Editor's Picks</span>
          </motion.h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Hero Feature - 8 columns */}
            <motion.div 
              className="lg:col-span-8 relative overflow-hidden rounded-2xl group h-[600px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -200px 0px' }}
              transition={{ duration: 0.8 }}
              whileHover="hover"
              variants={{
                hover: { scale: 1.02 }
              }}
              onMouseEnter={() => handleMouseEnter('view')}
              onMouseLeave={handleMouseLeave}
              onClick={() => openModal(featuredZines[0])}
            >
              <div className="absolute inset-0 overflow-hidden">
                <motion.img 
                  src={featuredZines[0].coverImage} 
                  alt={featuredZines[0].title}
                  className="w-full h-full object-cover transition-transform duration-700"
                  variants={{
                    hover: { scale: 1.05 }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 p-10 w-full">
                <div className="flex items-center mb-4">
                  <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full mr-3">FEATURED</span>
                  <span className="text-white/70 text-sm">{featuredZines[0].year}</span>
                </div>
                <h3 className="text-4xl font-bold text-white mb-2 font-playfair">{featuredZines[0].title}</h3>
                <p className="text-xl text-white/80 mb-4 italic">{featuredZines[0].subtitle}</p>
                <p className="text-white/60 line-clamp-2 mb-6 max-w-2xl">{featuredZines[0].description}</p>
                <div className="flex items-center">
                  <div className="mr-auto flex space-x-2">
                    {featuredZines[0].tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-xs text-white/60 border border-white/20 px-2 py-1 rounded-full">#{tag}</span>
                    ))}
                  </div>
                  <span className="text-white/80 flex items-center gap-2 group-hover:text-indigo-400 transition-colors">
                    Read more <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </motion.div>
            
            {/* Secondary Features - 4 columns */}
            <div className="lg:col-span-4 grid grid-rows-2 gap-8">
              {featuredZines.slice(1, 3).map((zine, idx) => (
                <motion.div 
                  key={zine.id}
                  className="relative overflow-hidden rounded-2xl group h-[280px]"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -200px 0px' }}
                  transition={{ duration: 0.8, delay: 0.1 * (idx + 1) }}
                  whileHover="hover"
                  variants={{
                    hover: { scale: 1.02 }
                  }}
                  onClick={() => openModal(zine)}
                  onMouseEnter={() => handleMouseEnter('view')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.img 
                      src={zine.image} 
                      alt={zine.title}
                      className="w-full h-full object-cover transition-transform duration-700"
                      variants={{
                        hover: { scale: 1.05 }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-2xl font-bold text-white mb-1 font-playfair">{zine.title}</h3>
                    <p className="text-sm text-white/80 mb-3 italic">{zine.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-xs">{zine.year} • {zine.pages} pages</span>
                      <span className="text-white/80 flex items-center gap-1 text-sm group-hover:text-indigo-400 transition-colors">
                        View <span className="transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Regular Collections Grid */}
        <div className="mb-16">
          <motion.h3 
            className="text-3xl font-playfair mb-12 inline-block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="border-b-2 border-purple-500 pb-2">Explore All Collections</span>
          </motion.h3>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -250px 0px' }}
          >
            {regularZines.map((zine, index) => (
              <motion.div
                key={zine.id}
                className="glassmorphism overflow-hidden rounded-2xl cursor-pointer group"
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => openModal(zine)}
                onMouseEnter={() => handleMouseEnter('view')}
                onMouseLeave={handleMouseLeave}
              >
                {/* Card background with parallax effect */}
                <div className="aspect-[3/4] overflow-hidden rounded-t-2xl">
                  <motion.img
                    src={zine.image}
                    alt={zine.title}
                    className="w-full h-full object-cover"
                    variants={{
                      hover: { scale: 1.1, rotate: -2 }
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-indigo-500/20 opacity-0 transition-opacity duration-300"
                    variants={{
                      hover: { opacity: 1 }
                    }}
                  />
                </div>
                
                {/* Content section */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-white/60 px-2 py-1 rounded-full border border-white/10">{zine.year}</span>
                    <span className="text-xs text-white/60 px-2 py-1 rounded-full border border-white/10">{zine.pages} pages</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2 font-playfair">{zine.title}</h3>
                  <p className="text-white/70 mb-4 text-sm italic">{zine.subtitle}</p>
                  
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">{zine.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {zine.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* View button */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <span className="text-white/80 flex items-center gap-2 group-hover:text-indigo-400 transition-colors text-sm">
                      View collection <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Modal */}
      <AnimatePresence>
        {selectedZine && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative bg-[#12121e] rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] shadow-2xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center"
                onClick={closeModal}
              >
                ✕
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Image section */}
                <div className="h-[300px] md:h-full relative">
                  <img
                    src={selectedZine.coverImage || selectedZine.image}
                    alt={selectedZine.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                </div>
                
                {/* Content section */}
                <div className="p-8 flex flex-col space-y-6 overflow-y-auto max-h-[90vh] md:max-h-none">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2 font-playfair">{selectedZine.title}</h2>
                    <h3 className="text-xl text-white/70 italic mb-4">{selectedZine.subtitle}</h3>
                  </div>
                  
                  <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-white/80 leading-relaxed mb-6">{selectedZine.description}</p>
                    <p className="text-white/80 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur ipsum, in egestas libero. Aliquam erat volutpat. Nullam quis risus eget urna mollis ornare vel eu leo.
                    </p>
                    
                    {/* Callout box */}
                    <div className="my-6 p-4 border-l-4 border-indigo-500 bg-indigo-500/10 rounded-r-lg">
                      <p className="italic text-white/90">
                        "Through careful observation and technical mastery, this work reveals new perspectives on familiar subjects."
                      </p>
                    </div>
                    
                    <p className="text-white/80 leading-relaxed">
                      Through a series of iterative drafts and refinements, the final piece emerged as a testament to both technical skill and conceptual depth. The interplay of light and shadow creates a dynamic visual experience.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedZine.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="pt-4 border-t border-white/10 mt-auto">
                    <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-medium tracking-wide flex items-center gap-2">
                      <span>Read Full Story</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;