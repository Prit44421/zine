import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValue } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import zineData from '../data/zineData';

const ZinePage = ({ data, index, onOpenModal }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
  const containerRef = useRef(null);
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [bgOpacity, setBgOpacity] = useState(0.6);
  // eslint-disable-next-line no-unused-vars
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Apply unique styles to the first page - moved up to fix reference error
  const isFirstPage = index === 0;
  
  // Parallax effect with enhanced scroll responsiveness
  // eslint-disable-next-line no-unused-vars
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  // Smooth motion values for mouse interactions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Mouse interaction configuration
  
  // Throttle function to limit execution rate
  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    }
  };
  
  // Define the throttled function inline to fix ESLint warning
  const throttledFunction = (e, currentMousePosition, currentContainerRef, setMousePositionFn, mouseXVal, mouseYVal, setBgOpacityFn) => {
    if (!currentContainerRef.current) return;
    
    const { clientX, clientY } = e;
    const rect = currentContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Only update state if there's a significant change in position
    if (Math.abs(x - currentMousePosition.x) > 5 || Math.abs(y - currentMousePosition.y) > 5) {
      setMousePositionFn({ x, y });
      mouseXVal.set(clientX);
      mouseYVal.set(clientY);
      
      // Optimize calculation by reducing precision
      const centerX = Math.floor(rect.width / 2);
      const centerY = Math.floor(rect.height / 2);
      const distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      const maxDistance = Math.sqrt(Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2));
      const normalizedDistance = distanceFromCenter / maxDistance;
      
      setBgOpacityFn(0.6 + (normalizedDistance * 0.2));
    }
  };
  
  // Create throttle function with inline definition
  const throttledMouseMoveHandler = useCallback((e, currentMousePosition, currentContainerRef, setMousePositionFn, mouseXVal, mouseYVal, setBgOpacityFn) => {
    throttle(throttledFunction, 16)(e, currentMousePosition, currentContainerRef, setMousePositionFn, mouseXVal, mouseYVal, setBgOpacityFn);
  }, []);

  // Memoize the mouse move handler with proper dependencies
  const handleMouseMove = useCallback((e) => {
    throttledMouseMoveHandler(e, mousePosition, containerRef, setMousePosition, mouseX, mouseY, setBgOpacity);
  }, [mousePosition, throttledMouseMoveHandler, containerRef, mouseX, mouseY]);
  
  // Handle mouse enter/leave events
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };
  
  useEffect(() => {
    const handleWindowMouseMove = (e) => {
      if (isHovered) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };
    
    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, [isHovered, mouseX, mouseY]);
  
  // Slideshow state for first page background
  useEffect(() => {
    if (!isFirstPage) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % zineData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isFirstPage]);
  
  // New design for the first page
  const newTitleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } }
  };
  const newSubtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3, ease: 'easeOut' } }
  };

  useEffect(() => {
    if (isFirstPage && !vantaEffect) {
      setVantaEffect(NET({
        el: vantaRef.current,
        THREE,
        color: 0xff7eb3,
        backgroundColor: 0x161a2e,
        maxDistance: 20.0,
        spacing: 20.0
      }));
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [isFirstPage, vantaEffect]);

  return (
    <section 
      ref={vantaRef}
      className={`snap-section flex items-center justify-center relative ${isFirstPage ? 'first-page' : ''}`}
      style={{ 
        padding: isFirstPage ? '150px 0' : '100px 0',
        minHeight: '100vh',
        height: 'auto'
      }}
      id={`section-${index}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isFirstPage ? (
        // Brand new hero section design
        <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden">
          {/* Animated background elements */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Animated circles */}
            <motion.div 
              className="absolute top-[20%] left-[15%] w-[300px] h-[300px] rounded-full" 
              style={{ background: 'radial-gradient(circle, rgba(255,0,150,0.4) 0%, rgba(255,0,150,0) 70%)' }}
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div 
              className="absolute bottom-[25%] right-[10%] w-[250px] h-[250px] rounded-full" 
              style={{ background: 'radial-gradient(circle, rgba(0,150,255,0.3) 0%, rgba(0,150,255,0) 70%)' }}
              animate={{ 
                scale: [1, 0.8, 1],
                x: [0, -20, 0],
                y: [0, 20, 0]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
            <motion.div 
              className="absolute top-[50%] right-[25%] w-[200px] h-[200px] rounded-full" 
              style={{ background: 'radial-gradient(circle, rgba(255,200,0,0.25) 0%, rgba(255,200,0,0) 70%)' }}
              animate={{ 
                scale: [1, 1.3, 1],
                x: [0, -15, 0],
                y: [0, -25, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
          </motion.div>
          
          {/* Cinematic lines */}
          <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.8) 100%)' }}></div>
          <div className="absolute inset-0 z-10 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)' }}></div>
          
          {/* Main content */}
          <div className="container z-20 px-8 flex flex-col items-center">
            <motion.div
              className="mb-8 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div className="text-[120px] md:text-[180px] font-black text-white leading-none tracking-tighter relative z-20 text-center">
                <div className="relative inline-block">
                  <span className="relative z-20 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-white/80">ZINE</span>
                  <div className="absolute -inset-1 -top-12 -bottom-12 -left-8 -right-8 bg-gradient-to-r from-pink-600/70 via-purple-600/70 to-blue-500/70 rounded-3xl blur-3xl opacity-60 z-10">
                    <motion.div
                      className="w-full h-full"
                      animate={{ 
                        opacity: [0.5, 0.7, 0.5],
                        scale: [0.95, 1.05, 0.95]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </div>
              </div>
              <motion.div 
                className="text-[80px] md:text-[120px] font-black text-white leading-none tracking-tighter text-center mt-4 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <span className="relative z-20">VIEWER</span>
                <div className="absolute -inset-1 -top-8 -bottom-8 -left-4 -right-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-40 z-10 animate-pulse"></div>
              </motion.div>
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/80 max-w-2xl text-center mb-12 font-light tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Immerse yourself in a cinematic journey through visual storytelling and editorial design
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="flex gap-6 flex-wrap justify-center"
            >
              <motion.button 
                className="px-8 py-4 bg-white/90 backdrop-blur-sm text-black rounded-full font-medium text-lg shadow-lg"
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: '0 15px 30px -5px rgba(0,0,0,0.3)', 
                  backgroundColor: 'rgba(255,255,255,1)'
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                Explore Zines
              </motion.button>
              <motion.button 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-medium text-lg"
                whileHover={{ 
                  scale: 1.03, 
                  backgroundColor: 'rgba(255,255,255,0.15)', 
                  borderColor: 'rgba(255,255,255,0.3)'
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                About the Project
              </motion.button>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <motion.div 
              className="w-8 h-12 border border-white/30 rounded-full flex justify-center backdrop-blur-sm bg-white/5"
              animate={{ 
                boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 10px rgba(255,255,255,0.3)', '0 0 0px rgba(255,255,255,0)'],
                borderColor: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div 
                className="w-1.5 h-3 bg-white/70 rounded-full mt-2"
                animate={{ y: [0, 16, 0] }}
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
      ) : (
        // Magazine-inspired zine page design
        <div className="w-full min-h-screen relative overflow-visible">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0 opacity-90"></div>
          <div className="absolute inset-0 z-0 opacity-5" style={{ backgroundImage: 'url("/patterns/dot-pattern.png")' }}></div>
          
          {/* Main content container */}
          <div className="relative w-full flex flex-col md:flex-row z-10 px-6 md:px-12 py-12 overflow-visible">
            {/* Left column - Premium Notion-inspired sidebar */}
            <div className="w-full md:w-1/4 flex flex-col justify-between pr-0 md:pr-8 mb-8 md:mb-0">
              {/* Issue number and date - Apple-inspired design */}
              <motion.div 
                className="mb-8 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.07)' }}
              >
                <div className="text-xs uppercase tracking-widest text-white/50 mb-2 font-light">Issue {index}</div>
                <div className="text-2xl font-light text-white tracking-tight">May 2025</div>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent my-5"></div>
                
                {/* Table of contents - Notion-inspired */}
                <div className="space-y-3 mt-6">
                  <h3 className="text-white/60 text-xs font-medium mb-3 flex items-center">
                    <motion.span
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"
                    />
                    <span className="uppercase tracking-wider">Inside this issue</span>
                  </h3>
                  {['Introduction', 'Feature Story', 'Gallery', 'Interview', 'Closing Notes'].map((item, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-center gap-3 text-white/70 hover:text-white transition-all cursor-pointer rounded-lg px-2 py-1.5 -mx-2 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.07)' }}
                    >
                      <motion.div 
                        className="w-0.5 h-4 bg-white/20 group-hover:bg-white/60 group-hover:h-5"
                        transition={{ duration: 0.2 }}
                      />
                      <div className="font-light tracking-wide">{item}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Tags - Apple-inspired design */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="hidden md:block mt-6 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.07)' }}
              >
                <h3 className="text-white/60 text-xs font-medium mb-4 flex items-center">
                  <motion.span
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"
                  />
                  <span className="uppercase tracking-wider">Topics</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.tags && data.tags.map((tag, i) => (
                    <motion.span 
                      key={i} 
                      className="px-3 py-1.5 text-xs font-light text-white/80 bg-white/10 rounded-full hover:bg-white/20 transition-all cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Main content area - Magazine spread */}
            <div className="w-full md:w-3/4 flex flex-col space-y-8 overflow-visible">
              {/* Header with title - Apple-inspired design */}
              <motion.div 
                className="relative bg-gradient-to-br from-black/30 to-black/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl flex flex-col border border-white/10 overflow-visible"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)' }}
              >
                {/* Subtle background glow - positioned below content */}
                <motion.div
                  className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl z-0"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
              
                <motion.div className="overflow-visible py-2">
                  <motion.h1 
                    className="text-5xl md:text-7xl font-light leading-tight tracking-tight relative z-10 text-white"
                    variants={newTitleVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                  >
                    {data.title}
                  </motion.h1>
                </motion.div>
                <motion.div
                  className="h-px w-40 bg-gradient-to-r from-transparent via-white/30 to-transparent my-5 relative z-10"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '40%', opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div className="overflow-visible py-1">
                  <motion.h2
                    className="text-xl md:text-2xl font-extralight mt-2 text-white/70 tracking-wide relative z-10"
                    variants={newSubtitleVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                  >
                    {data.subtitle}
                  </motion.h2>
                </motion.div>
              </motion.div>
              
              {/* Magazine spread layout - completely restructured for better display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10 overflow-visible">
                {/* Left page - Feature image with Apple-inspired design */}
                <motion.div 
                  className="w-full relative"
                  initial={{ opacity: 0, rotateY: -5 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden group">
                    <motion.div className="w-full h-full relative overflow-hidden rounded-2xl border border-white/10 shadow-xl">
                      <motion.img
                        src={data.image}
                        alt={data.title}
                        className="w-full h-full object-cover"
                        style={{
                          objectPosition: isHovered ? `calc(50% + ${(mousePosition.x / window.innerWidth - 0.5) * 10}px) calc(50% + ${(mousePosition.y / window.innerHeight - 0.5) * 10}px)` : '50% 50%',
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      />
                      
                      {/* Premium subtle overlay gradient */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 mix-blend-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                      />
                      
                      {/* Subtle glass highlight on hover */}
                      <motion.div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/5 to-transparent"
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                    
                    {/* Subtle grain overlay */}
                    <div className="absolute inset-0 bg-black/5 mix-blend-multiply backdrop-blur-[1px]"></div>
                    
                    {/* Caption - Apple-style */}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      <div className="text-sm text-white/90 font-light tracking-wide">Featured artwork for {data.title}</div>
                    </motion.div>
                  </div>
                  
                  {/* Page number - Notion-inspired */}
                  <motion.div 
                    className="absolute top-4 left-4 text-white/40 font-light text-sm bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10"
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.6)' }}
                    transition={{ duration: 0.3 }}
                  >
                    {index * 2 - 1}
                  </motion.div>
                </motion.div>
                
                {/* Right page - Content */}
                <motion.div 
                  ref={ref}
                  className="w-full relative"
                  initial={{ opacity: 0, rotateY: 5 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {/* Content with magazine-style typography */}
                  <div className="h-full flex flex-col relative z-10">
                    {/* Article intro - with premium styling */}
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="text-xl font-serif text-white/90 leading-relaxed first-letter:text-6xl first-letter:font-light first-letter:mr-2 first-letter:float-left first-letter:mt-1 first-letter:text-transparent first-letter:bg-clip-text first-letter:bg-gradient-to-br first-letter:from-white first-letter:to-white/60">{data.description}</p>
                    </motion.div>
                    
                    {/* Article body - Apple-style typography */}
                    <motion.div
                      className="prose prose-invert prose-sm max-w-none text-white/70 mb-6 font-light relative z-10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="leading-relaxed tracking-wide">The creative process behind this work involved extensive research and experimentation with various techniques and materials. The artist sought to capture the essence of the subject matter while also pushing the boundaries of conventional representation.</p>
                      
                      {/* Notion-style callout */}
                      <div className="my-4 p-3 bg-white/5 border-l-2 border-blue-400/70 rounded-r-lg relative z-10">
                        <p className="!mt-0 text-white/80 italic">"Through careful observation and technical mastery, the artwork reveals new perspectives on familiar subjects."</p>
                      </div>
                      
                      <p className="leading-relaxed tracking-wide">Through a series of iterative drafts and refinements, the final piece emerged as a testament to both technical skill and conceptual depth. The interplay of light and shadow creates a dynamic visual experience that rewards prolonged engagement.</p>
                    </motion.div>
                    
                    {/* Continue reading button - Apple/Notion inspired */}
                    <motion.div 
                      className="mt-auto pt-4 border-t border-white/10 relative z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.button
                        className="px-6 py-3 bg-white/90 backdrop-blur-sm text-black font-medium text-sm tracking-wide flex items-center gap-2 rounded-full shadow-lg"
                        whileHover={{ 
                          scale: 1.02, 
                          backgroundColor: 'rgba(255, 255, 255, 1)',
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event bubbling
                          onOpenModal && onOpenModal();
                        }}
                      >
                        <span>Continue Reading</span>
                        <motion.span 
                          className="text-lg"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
                        >→</motion.span>
                      </motion.button>
                    </motion.div>
                  </div>
                  
                  {/* Page number - Notion-inspired */}
                  <motion.div 
                    className="absolute top-4 right-4 text-white/40 font-light text-sm bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10"
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.6)' }}
                    transition={{ duration: 0.3 }}
                  >
                    {index * 2}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Magazine footer - with premium glass effect */}
          <motion.div 
            className="fixed bottom-0 left-0 right-0 h-14 bg-black/30 backdrop-blur-xl z-20 flex items-center justify-between px-8 text-white/70 text-sm border-t border-white/10"
            initial={{ y: 14 }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>ZINE VIEWER • ISSUE {index}</div>
            <div className="flex items-center gap-6">
              <motion.button 
                className="hover:text-white transition-all flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-white/10"
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (index > 0) {
                    window.location.hash = `#section-${index - 1}`;
                  }
                }}
                disabled={index === 0}
                style={{ opacity: index === 0 ? 0.5 : 1 }}
              >
                <motion.span
                  animate={index > 0 ? { x: [-2, 0, -2] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
                >←</motion.span> Previous
              </motion.button>
              <motion.button 
                className="hover:text-white transition-all flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-white/10"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  const totalZines = zineData.length;
                  if (index < totalZines - 1) {
                    window.location.hash = `#section-${index + 1}`;
                  }
                }}
                disabled={index === zineData.length - 1}
                style={{ opacity: index === zineData.length - 1 ? 0.5 : 1 }}
              >
                Next <motion.span
                  animate={index < zineData.length - 1 ? { x: [0, 2, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
                >→</motion.span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default ZinePage;