/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
    theme: {
      extend: {
        fontFamily: {
          'playfair': ['Playfair Display', 'serif'],
          'sans': ['Inter', 'sans-serif'],
          'display': ['DM Sans', 'sans-serif'],
        },
        colors: {
          // Modern color palette for hackathon-winning design
          'primary': '#0a0a14',
          'secondary': '#12121e',
          'indigo': {
            100: '#e0e7ff',
            200: '#c7d2fe',
            300: '#a5b4fc',
            400: '#818cf8',
            500: '#6366f1', // Primary accent
            600: '#4f46e5',
            700: '#4338ca',
            800: '#3730a3',
            900: '#312e81',
          },
          'purple': {
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7', // Secondary accent
            600: '#9333ea',
            700: '#7e22ce',
            800: '#6b21a8',
            900: '#581c87',
          },
          // Legacy colors for backward compatibility
          'zine-primary': '#0a0a14',
          'zine-secondary': '#12121e',
          'zine-accent': '#6366f1',
          'zine-highlight': '#a855f7',
        },
        animation: {
          'fade-in': 'fadeIn 1.2s ease-in-out forwards',
          'slide-up': 'slideUp 0.8s ease-out forwards',
          'slide-down': 'slideDown 0.8s ease-out forwards',
          'float': 'float 6s ease-in-out infinite',
          'pulse-glow': 'pulseGlow 2s infinite',
          'spin-slow': 'spin 8s linear infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(50px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideDown: {
            '0%': { transform: 'translateY(-50px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          float: {
            '0%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
            '100%': { transform: 'translateY(0px)' },
          },
          pulseGlow: {
            '0%': { boxShadow: '0 0 0 0 rgba(99, 102, 241, 0.7)' },
            '70%': { boxShadow: '0 0 0 10px rgba(99, 102, 241, 0)' },
            '100%': { boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)' },
          },
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'gradient-angular': 'conic-gradient(var(--tw-gradient-stops))',
        },
        // Enhanced blur effects for glassmorphism
        backdropBlur: {
          'xs': '2px',
          'sm': '4px',
          DEFAULT: '8px',
          'lg': '12px',
          'xl': '16px',
          '2xl': '24px',
          '3xl': '32px',
        },
        // Enhanced typography for desktop focus
        fontSize: {
          '7xl': ['4.5rem', { lineHeight: '1' }],
          '8xl': ['6rem', { lineHeight: '1' }],
          '9xl': ['8rem', { lineHeight: '1' }],
          '10xl': ['10rem', { lineHeight: '1' }],
        },
        // Enhanced spacing for desktop layouts
        spacing: {
          '128': '32rem',
          '144': '36rem',
        },
        // Enhanced border radius
        borderRadius: {
          '4xl': '2rem',
          '5xl': '2.5rem',
          '6xl': '3rem',
        },
        // Enhanced box shadows
        boxShadow: {
          'glow': '0 0 15px 5px rgba(99, 102, 241, 0.3)',
          'glow-lg': '0 0 30px 10px rgba(99, 102, 241, 0.3)',
          'inner-glow': 'inset 0 0 15px 5px rgba(99, 102, 241, 0.2)',
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'), // For rich text styling
      require('@tailwindcss/forms'), // For form styling
    ],
  }