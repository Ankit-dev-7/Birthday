# 💜 Romantic Birthday Website

An ultra-aesthetic, cinematic, interactive birthday website built with React, Framer Motion, GSAP, and Three.js.

## Quick Start

```bash
npm install --legacy-peer-deps
npm run dev
```

Then open http://localhost:5173

## Personalise It

Before deploying, edit these files with your real content:

### 1. `src/data/config.js`
```js
partnerName: 'Her Name',
relationshipStartDate: '2023-02-14',  // YYYY-MM-DD
birthdayDate: '2025-06-15',           // YYYY-MM-DD
constellationName: 'LOVE',            // 4-6 letters
yourName: 'Your Name',
```

### 2. `src/data/memories.js`
Replace the 12 placeholder memories with your real ones. Add photos to `public/images/`.

### 3. `src/data/reasons.js`
Replace the 22 reasons with your personal ones.

### 4. `src/data/photos.js`
Add your photos to `public/images/` and update the `src` paths.

### 5. `src/data/tracks.js`
Add your audio files to `public/audio/` and update the `src` paths.

### 6. `src/data/mapLocations.js`
Replace with real coordinates of places you've visited together.

### 7. `public/audio/voice-note.mp3`
Add a personal voice recording for the Voice Note Player section.

## Build for Deployment

```bash
npm run build
```

The output is in `dist/` — deploy to Netlify, Vercel, or GitHub Pages.

## Features

- 🌟 Cinematic landing page with typing animation
- 🚀 Three.js star-zoom opening animation
- 💜 Memory timeline with 12+ memories
- 💌 Animated love letter with candle
- 🃏 22 flip cards "Reasons I Love You"
- 🎵 Floating music player with vinyl animation
- 📸 Masonry photo gallery with lightbox
- 🔒 Secret surprise with confetti
- ⏱️ Live love counter
- 🎮 "Catch the Hearts" mini game
- ⭐ Interactive night sky with constellation
- 🎁 3D gift box
- 🗺️ Memory map
- 💬 Rotating love quotes
- 🎙️ Voice note player
- 🥚 3 hidden easter eggs
- 💌 Fake love message popups
- 🌌 Aurora borealis ending scene

## Tech Stack

- React 18 + Vite
- Tailwind CSS v3
- Framer Motion
- GSAP + ScrollTrigger + TextPlugin
- Three.js + @react-three/fiber
- Howler.js
- canvas-confetti
