/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom romantic palette
        'soft-pink': '#FFB6C1',
        'lavender': '#E6E6FA',
        'deep-purple': '#1a0533',
        'glowing-white': '#f8f0ff',
        // Extended shades for flexibility
        'pink': {
          50: '#fff0f3',
          100: '#ffe0e8',
          200: '#ffc1d0',
          300: '#FFB6C1', // soft-pink
          400: '#ff8fa3',
          500: '#ff6b8a',
          600: '#e84d6f',
          700: '#c73558',
          800: '#a52847',
          900: '#8a1f3a',
        },
        'purple': {
          50: '#f8f0ff',  // glowing-white
          100: '#ede0ff',
          200: '#d9c0ff',
          300: '#c49fff',
          400: '#a87eff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#1a0533', // deep-purple
        },
        'lavender': {
          DEFAULT: '#E6E6FA',
          light: '#f0f0ff',
          dark: '#c8c8f0',
        },
      },

      fontFamily: {
        // Handwritten font for love letter
        'dancing': ['"Dancing Script"', 'cursive'],
        // Fallback sans
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        'display': ['clamp(2.5rem, 8vw, 6rem)', { lineHeight: '1.1' }],
        'hero': ['clamp(1.5rem, 4vw, 3rem)', { lineHeight: '1.2' }],
      },

      backgroundImage: {
        // Romantic gradient presets
        'romantic-gradient': 'linear-gradient(135deg, #1a0533 0%, #2d1b4e 30%, #4a1942 60%, #1a0533 100%)',
        'pink-glow': 'radial-gradient(ellipse at center, rgba(255,182,193,0.3) 0%, transparent 70%)',
        'purple-glow': 'radial-gradient(ellipse at center, rgba(138,92,246,0.3) 0%, transparent 70%)',
      },

      boxShadow: {
        // Neon glow effects
        'neon-pink': '0 0 10px #FFB6C1, 0 0 20px #FFB6C1, 0 0 40px rgba(255,182,193,0.5)',
        'neon-purple': '0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 40px rgba(139,92,246,0.5)',
        'neon-white': '0 0 10px #f8f0ff, 0 0 20px #f8f0ff, 0 0 40px rgba(248,240,255,0.5)',
        // Glassmorphism shadow
        'glass': '0 8px 32px rgba(0, 0, 0, 0.37)',
      },

      backdropBlur: {
        'glass': '12px',
      },

      animation: {
        // Pulsing glow for buttons
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        // Floating animation
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        // Twinkling stars
        'twinkle': 'twinkle 2s ease-in-out infinite',
        // Vinyl spin
        'spin-slow': 'spin 3s linear infinite',
        // Candle flicker
        'flicker': 'flicker 1.5s ease-in-out infinite',
        // Equalizer bars
        'eq-bar': 'eqBar 0.8s ease-in-out infinite alternate',
        // Aurora shift
        'aurora': 'aurora 15s ease-in-out infinite',
        // Typing cursor blink
        'blink': 'blink 1s step-end infinite',
      },

      keyframes: {
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 10px #FFB6C1, 0 0 20px #FFB6C1',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: '0 0 20px #FFB6C1, 0 0 40px #FFB6C1, 0 0 60px rgba(255,182,193,0.5)',
            transform: 'scale(1.05)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.8)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1', transform: 'scaleY(1) scaleX(1)' },
          '25%': { opacity: '0.9', transform: 'scaleY(0.95) scaleX(1.05)' },
          '50%': { opacity: '0.85', transform: 'scaleY(1.05) scaleX(0.95)' },
          '75%': { opacity: '0.95', transform: 'scaleY(0.98) scaleX(1.02)' },
        },
        eqBar: {
          '0%': { height: '4px' },
          '100%': { height: '20px' },
        },
        aurora: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
            opacity: '0.6',
          },
          '50%': {
            backgroundPosition: '100% 50%',
            opacity: '0.9',
          },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },

      transitionTimingFunction: {
        'romantic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      screens: {
        'xs': '320px',
      },
    },
  },
  plugins: [],
};
