import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],

  build: {
    // Code splitting: separate vendor chunks for heavy libraries
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],
          // Animation libraries
          'framer-motion': ['framer-motion'],
          'gsap': ['gsap'],
          // Three.js ecosystem (only loaded when needed via lazy imports)
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          // Audio
          'howler': ['howler'],
        },
      },
    },
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Increase chunk size warning limit for Three.js
    chunkSizeWarningLimit: 1000,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'howler', 'canvas-confetti'],
    exclude: ['three', '@react-three/fiber', '@react-three/drei'],
  },

  // Test configuration (Vitest)
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.js'],
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
