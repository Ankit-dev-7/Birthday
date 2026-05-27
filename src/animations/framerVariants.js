/**
 * Shared Framer Motion animation variants.
 * Import these in components to keep animations consistent.
 */

// ─── Entrance animations ──────────────────────────────────────────────────────

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

// ─── Stagger containers ───────────────────────────────────────────────────────

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

// ─── Card flip ────────────────────────────────────────────────────────────────

export const cardFront = {
  front: { rotateY: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  back: { rotateY: 180, transition: { duration: 0.6, ease: 'easeInOut' } },
};

export const cardBack = {
  front: { rotateY: -180, transition: { duration: 0.6, ease: 'easeInOut' } },
  back: { rotateY: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
};

// ─── Floating heart ───────────────────────────────────────────────────────────

export const floatingHeart = {
  initial: { opacity: 1, y: 0, scale: 1 },
  animate: {
    opacity: 0,
    y: -120,
    scale: 0.5,
    transition: { duration: 1.5, ease: 'easeOut' },
  },
};

// ─── Popup slide-in ───────────────────────────────────────────────────────────

export const slideInRight = {
  hidden: { opacity: 0, x: 120 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  },
  exit: {
    opacity: 0,
    x: 120,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

// ─── Lightbox ─────────────────────────────────────────────────────────────────

export const lightboxOverlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ─── Pulsing glow ─────────────────────────────────────────────────────────────

export const pulseGlow = {
  animate: {
    scale: [1, 1.08, 1],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

// ─── Cinematic text reveal ────────────────────────────────────────────────────

export const cinematicReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 2, ease: 'easeInOut' },
  },
};

// ─── Floating loop ────────────────────────────────────────────────────────────

export const floatLoop = {
  animate: {
    y: [-10, 10, -10],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};
