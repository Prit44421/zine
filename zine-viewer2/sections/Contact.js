import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    subject: 'General Inquiry'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
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
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after submission
      setFormState({
        name: '',
        email: '',
        message: '',
        subject: 'General Inquiry'
      });
      
      // Reset success message after a delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  // Contact information
  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      details: 'hello@zineviewer.com',
      link: 'mailto:hello@zineviewer.com'
    },
    {
      icon: '📱',
      title: 'Phone',
      details: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: '📍',
      title: 'Location',
      details: 'San Francisco, CA',
      link: 'https://maps.google.com/?q=San+Francisco,+CA'
    }
  ];

  return (
    <section className="min-h-screen py-24 px-8 bg-gradient-to-b from-[#0a0a14] to-[#12121e]" id="contact">
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
              Get In Touch
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
            Have questions or want to collaborate? We'd love to hear from you.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              variants={itemVariants}
              whileHover={{ boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
              
              {/* Success message */}
              {isSubmitted && (
                <motion.div 
                  className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30 text-white"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <p className="flex items-center">
                    <span className="mr-2">✓</span>
                    Your message has been sent successfully! We'll get back to you soon.
                  </p>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-white/70 text-sm mb-2" htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </motion.div>
                  
                  {/* Email field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-white/70 text-sm mb-2" htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="john@example.com"
                    />
                  </motion.div>
                </div>
                
                {/* Subject field */}
                <motion.div className="mb-6" variants={itemVariants}>
                  <label className="block text-white/70 text-sm mb-2" htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Support">Support</option>
                  </select>
                </motion.div>
                
                {/* Message field */}
                <motion.div className="mb-6" variants={itemVariants}>
                  <label className="block text-white/70 text-sm mb-2" htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="How can we help you?"
                  ></textarea>
                </motion.div>
                
                {/* Submit button */}
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg px-6 py-3 font-medium flex items-center justify-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
          
          {/* Contact information and map */}
          <div>
            {/* Contact cards */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex flex-col items-center text-center group"
                  variants={itemVariants}
                  whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-3xl mb-3">{info.icon}</div>
                  <h4 className="text-white text-lg font-medium mb-1">{info.title}</h4>
                  <p className="text-white/70 font-light group-hover:text-indigo-300 transition-colors">{info.details}</p>
                </motion.a>
              ))}
            </motion.div>
            
            {/* Map or image */}
            <motion.div
              className="rounded-2xl overflow-hidden border border-white/10 h-[300px] relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
            >
              {/* Map placeholder - in a real app, you'd use Google Maps or similar */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 z-10"></div>
              <img 
                src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" 
                alt="Map location" 
                className="w-full h-full object-cover"
              />
              
              {/* Location marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div 
                  className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(99, 102, 241, 0.7)',
                      '0 0 0 10px rgba(99, 102, 241, 0)',
                      '0 0 0 0 rgba(99, 102, 241, 0)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  📍
                </motion.div>
              </div>
            </motion.div>
            
            {/* Social media links */}
            <motion.div 
              className="mt-10 flex justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {['Twitter', 'Instagram', 'LinkedIn', 'GitHub'].map((platform, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:border-transparent transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {platform[0]}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;