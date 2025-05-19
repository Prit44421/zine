import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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

  // Team members data
  const teamMembers = [
    {
      name: 'Alex Morgan',
      role: 'Lead Designer',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&h=350'
    },
    {
      name: 'Jamie Rivera',
      role: 'Frontend Developer',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&h=350'
    },
    {
      name: 'Taylor Chen',
      role: 'UX Researcher',
      image: 'https://images.pexels.com/photos/3771807/pexels-photo-3771807.jpeg?auto=compress&cs=tinysrgb&h=350'
    },
    {
      name: 'Jordan Smith',
      role: 'Creative Director',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&h=350'
    }
  ];

  // Features data
  const features = [
    {
      title: 'Immersive Experience',
      description: 'Fully interactive and responsive design that creates a cinematic viewing experience.',
      icon: '✨'
    },
    {
      title: 'Premium Animations',
      description: 'Smooth, sophisticated animations and transitions that bring content to life.',
      icon: '🎬'
    },
    {
      title: 'Editorial Design',
      description: 'Magazine-inspired layouts with attention to typography, white space, and visual hierarchy.',
      icon: '📐'
    },
    {
      title: 'Interactive Gallery',
      description: 'Dynamic gallery with hover effects, previews, and fullscreen viewing options.',
      icon: '🖼️'
    }
  ];

  return (
    <section className="min-h-screen py-24 px-8 bg-gradient-to-b from-[#12121e] to-[#0a0a14]" id="about">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              About the Project
            </span>
          </h2>
          
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto my-8"
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 96 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
          
          <p className="text-white/70 text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Zine Viewer is a revolutionary approach to digital magazine experiences, combining cutting-edge web technologies with cinematic design principles.
          </p>
        </motion.div>
        
        {/* Vision and mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="aspect-square rounded-2xl overflow-hidden relative group">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 z-10 group-hover:opacity-70"
                initial={{ opacity: 0.4 }}
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.5 }}
              />
              
              <motion.img 
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" 
                alt="Team working on the project" 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
              
              {/* Decorative elements */}
              <div className="absolute top-6 left-6 w-20 h-20 border-2 border-white/20 rounded-lg z-0" />
              <div className="absolute bottom-6 right-6 w-20 h-20 border-2 border-indigo-500/30 rounded-lg z-0" />
            </div>
          </motion.div>
          
          <motion.div
            className="prose prose-invert prose-lg max-w-none"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-3xl font-bold mb-6 text-white">Our Vision</h3>
            
            <p className="text-white/80 font-light leading-relaxed">
              The Zine Viewer project was created to revolutionize how we experience digital magazines and visual storytelling. By combining cutting-edge web technologies with cinematic design principles, we've created an immersive platform that brings stories to life.
            </p>
            
            <blockquote className="border-l-4 border-indigo-500 pl-6 my-8 italic text-white/90">
              "We believe in the power of visual storytelling to connect, inspire, and transform. Our mission is to create the most immersive digital zine experience possible."
            </blockquote>
            
            <p className="text-white/80 font-light leading-relaxed">
              Our team of designers and developers worked tirelessly to craft an experience that feels both modern and timeless, with attention to every detail from typography to micro-interactions.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <motion.button 
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-medium tracking-wide"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Meet the Team
              </motion.button>
              
              <motion.button 
                className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-full text-sm font-medium tracking-wide"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Features section */}
        <motion.div
          className="mb-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h3 
            className="text-3xl font-bold mb-12 text-center text-white"
            variants={itemVariants}
          >
            Key Features
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-indigo-500/30 transition-colors duration-300"
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-2 text-white">{feature.title}</h4>
                <p className="text-white/70 font-light">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Team section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h3 
            className="text-3xl font-bold mb-12 text-center text-white"
            variants={itemVariants}
          >
            Meet the Team
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="group"
                variants={itemVariants}
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <motion.img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full aspect-[3/4] object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <div className="flex gap-4">
                      {['Twitter', 'LinkedIn', 'Dribbble'].map((social, idx) => (
                        <motion.a 
                          key={idx} 
                          href="#" 
                          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {social[0]}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                <h4 className="text-xl font-medium text-white group-hover:text-indigo-400 transition-colors">{member.name}</h4>
                <p className="text-white/60 font-light">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;