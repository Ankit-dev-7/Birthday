# Implementation Tasks: Romantic Birthday Website

## Task List

- [x] 1. Project Scaffolding & Setup
  - [x] 1.1 Initialize Vite + React 18 project in workspace root
  - [x] 1.2 Install and configure Tailwind CSS v3
  - [x] 1.3 Install Framer Motion, GSAP (with ScrollTrigger, TextPlugin, DrawSVGPlugin), Three.js, @react-three/fiber, @react-three/drei
  - [x] 1.4 Install Howler.js, canvas-confetti, fast-check, Vitest
  - [x] 1.5 Install @fontsource/dancing-script for handwritten font
  - [x] 1.6 Configure Vite with code splitting, lazy imports, and vite-imagetools
  - [x] 1.7 Set up Tailwind config with custom colors (soft pink, lavender, deep purple, glowing white)
  - [x] 1.8 Create base index.html with meta tags, font preloads, and viewport settings

- [x] 2. Data & Configuration Files
  - [x] 2.1 Create `src/data/config.js` with AppConfig (partnerName, relationshipStartDate, birthdayDate, constellationName)
  - [x] 2.2 Create `src/data/memories.js` with 10+ placeholder Memory objects (id, date, caption, description, location, photos)
  - [x] 2.3 Create `src/data/reasons.js` with 20+ unique Reason objects (id, text, emoji, color)
  - [x] 2.4 Create `src/data/photos.js` with 12+ placeholder Photo objects (id, src, alt, caption, aspectRatio)
  - [x] 2.5 Create `src/data/stars.js` with 50+ Star objects (id, x, y, size, message, isConstellation, constellationOrder)
  - [x] 2.6 Create `src/data/tracks.js` with 3+ Track objects (id, title, artist, src, coverArt)
  - [x] 2.7 Create `src/data/quotes.js` with 10+ romantic quote strings
  - [x] 2.8 Create `src/data/mapLocations.js` with 5+ MapLocation objects (id, name, lat, lng, description, emoji)

- [x] 3. Global Context & Hooks
  - [x] 3.1 Create `src/context/AppContext.jsx` with reducedMotion, audioEnabled, secretUnlocked, constellationProgress, revealedReasons, miniGameScore, miniGameComplete state
  - [x] 3.2 Create `src/context/AudioContext.jsx` with Howler.js instance management, playlist state, play/pause/next/prev/crossfade functions
  - [x] 3.3 Create `src/hooks/useReducedMotion.js` using matchMedia prefers-reduced-motion
  - [x] 3.4 Create `src/hooks/useInView.js` Intersection Observer wrapper
  - [x] 3.5 Create `src/hooks/useInterval.js` setInterval hook with cleanup
  - [x] 3.6 Create `src/hooks/useCursorPosition.js` mouse position tracker with RAF lerp

- [x] 4. Utility Functions
  - [x] 4.1 Create `src/utils/timeUtils.js` with getDuration(startDate) returning {days, hours, minutes, seconds} and getCountdown(targetDate)
  - [x] 4.2 Create `src/utils/mathUtils.js` with lerp, clamp, randomInRange, parallaxOffset(input, factor), computeParticleVelocityDelta(particle, cursor)
  - [x] 4.3 Create `src/utils/audioUtils.js` with Howler helper wrappers
  - [x] 4.4 Create `src/animations/gsapTimelines.js` registering GSAP plugins and exporting named timeline factories
  - [x] 4.5 Create `src/animations/framerVariants.js` exporting fadeInUp, staggerContainer, cardFlip, and other shared variants

- [x] 5. UI Primitive Components
  - [x] 5.1 Create `src/components/ui/GlassCard.jsx` — glassmorphism card with backdrop-filter blur and semi-transparent background
  - [x] 5.2 Create `src/components/ui/NeonText.jsx` — glowing text with animated CSS text-shadow
  - [x] 5.3 Create `src/components/ui/FloatingHeart.jsx` — animated heart that floats upward and fades out
  - [x] 5.4 Create `src/components/ui/ProgressDots.jsx` — filled/empty dot progress indicator
  - [x] 5.5 Create `src/components/layout/SceneWrapper.jsx` — Intersection Observer + Framer AnimatePresence wrapper with data-scene attribute
  - [x] 5.6 Create `src/components/layout/SectionDivider.jsx` — decorative animated divider between sections

- [x] 6. Global Effect Components
  - [x] 6.1 Create `src/components/effects/ParticleSystem.jsx` — fixed canvas particle engine with star, petal, butterfly, heart types; cursor proximity repulsion; pauses on reducedMotion
  - [x] 6.2 Create `src/components/effects/CursorGlow.jsx` — fixed div with radial gradient following cursor via RAF lerp; hidden on touch devices
  - [x] 6.3 Create `src/components/effects/DynamicSky.jsx` — fixed animated gradient background cycling sunset→night over 60s loop
  - [x] 6.4 Create `src/components/effects/RainEffect.jsx` — GSAP animated rain drops morphing into hearts after 3 seconds
  - [x] 6.5 Create `src/components/effects/AuroraEffect.jsx` — layered div aurora with CSS keyframes in greens, purples, pinks; parallax via GSAP ScrollTrigger

- [x] 7. Three.js Components
  - [x] 7.1 Create `src/components/three/StarField.jsx` — R3F Canvas with 5000 star points; GSAP camera zoom on Z-axis
  - [x] 7.2 Create `src/components/three/PolaroidFrames.jsx` — 6-8 instanced mesh planes with photo textures; mouse parallax via useFrame
  - [x] 7.3 Create `src/components/three/GiftBox3D.jsx` — 3D gift box mesh with GSAP lid-open animation on click; CSS 3D fallback if WebGL unavailable

- [x] 8. Landing Page Scene
  - [x] 8.1 Create `src/components/scenes/LandingPage.jsx` — full-viewport black screen
  - [x] 8.2 Implement GSAP TextPlugin typing animation for three phrases with blinking cursor and 1.5s pauses between phrases
  - [x] 8.3 Implement Framer Motion fade-in of glowing "Open Your Surprise" CTA button after typing completes
  - [x] 8.4 Implement piano audio autoplay at ≤40% volume via AudioContext; show muted icon if autoplay blocked
  - [x] 8.5 Wire CTA button click to trigger OpeningAnimation sequence

- [x] 9. Opening Animation Scene
  - [x] 9.1 Create `src/components/scenes/OpeningAnimation.jsx` — mount StarField + PolaroidFrames in R3F Canvas
  - [x] 9.2 Implement 4-6 second camera zoom through star field using GSAP
  - [x] 9.3 Implement mouse-driven parallax offset on polaroid frames proportional to cursor position
  - [x] 9.4 Implement crossfade from piano to romantic instrumental over 2 seconds via AudioContext
  - [x] 9.5 Implement cross-fade transition to main content on animation complete; unmount Three.js canvas

- [x] 10. Memory Timeline Scene
  - [x] 10.1 Create `src/components/scenes/MemoryTimeline.jsx` — vertical timeline with alternating left/right on md+ breakpoint, single column on mobile
  - [x] 10.2 Implement Framer Motion whileInView slide-and-fade entrance for each MemoryCard
  - [x] 10.3 Implement MemoryCard with date, caption, location, and photo display using GlassCard primitive
  - [x] 10.4 Implement Framer Motion layoutId shared layout animation for cinematic full-screen card expand on click
  - [x] 10.5 Implement FloatingHeart particle burst (20 hearts) emitted from card position on expand
  - [x] 10.6 Render all 10+ memory entries from src/data/memories.js

- [x] 11. Love Letter Scene
  - [x] 11.1 Create `src/components/scenes/LoveLetter.jsx` — section with Dancing Script font applied
  - [x] 11.2 Implement GSAP paper-unfold animation (scaleY 0→1, transformOrigin top) triggered on viewport entry
  - [x] 11.3 Implement 200+ word placeholder love letter with line-by-line Framer Motion stagger fade-in (100ms between lines)
  - [x] 11.4 Implement animated glowing candle SVG with CSS keyframes flicker animation and radial glow box-shadow

- [x] 12. Reasons I Love You Scene
  - [x] 12.1 Create `src/components/scenes/ReasonsCards.jsx` — deck layout with stacked card rotation offsets
  - [x] 12.2 Implement Framer Motion rotateY flip animation (0→180) revealing reason text on card click
  - [x] 12.3 Load 20+ reasons from src/data/reasons.js; track revealed set in AppContext
  - [x] 12.4 Play soft chime sound effect via AudioContext on each card flip
  - [x] 12.5 Render ProgressDots showing revealed count / total
  - [x] 12.6 Implement Framer Motion AnimatePresence completion celebration overlay when all cards revealed

- [x] 13. Music Player Component
  - [x] 13.1 Create `src/components/extras/MusicPlayer.jsx` — fixed bottom-right floating panel
  - [x] 13.2 Implement spinning vinyl disc CSS animation (paused when not playing)
  - [x] 13.3 Display current track title and artist from AudioContext
  - [x] 13.4 Implement play/pause toggle wired to AudioContext
  - [x] 13.5 Implement next/previous track navigation with 300ms crossfade
  - [x] 13.6 Implement 5-bar CSS keyframes equalizer animation (active while playing, static while paused)
  - [x] 13.7 Show "Music unavailable" label on Howler load/play error

- [x] 14. Photo Gallery Scene
  - [x] 14.1 Create `src/components/scenes/PhotoGallery.jsx` — CSS columns masonry layout (2 cols mobile → 4 cols desktop)
  - [x] 14.2 Implement Framer Motion whileHover scale-up and CSS glow box-shadow on each photo
  - [x] 14.3 Implement Framer Motion layoutId lightbox overlay with backdrop-filter blur background on photo click
  - [x] 14.4 Implement keyboard navigation in lightbox (ArrowLeft/ArrowRight to navigate, Escape to close)
  - [x] 14.5 Render 12+ photos from src/data/photos.js with lazy loading and onError placeholder fallback
  - [x] 14.6 Add CSS keyframes floating drift animation to select gallery images

- [x] 15. Secret Surprise Scene
  - [x] 15.1 Create `src/components/scenes/SecretSurprise.jsx` — centered section with locked heart button
  - [x] 15.2 Implement Framer Motion pulsing glow loop animation on locked heart button
  - [x] 15.3 Implement GSAP unlock animation (heart halves rotate outward) on first click
  - [x] 15.4 Trigger canvas-confetti full-screen burst lasting 3+ seconds on unlock
  - [x] 15.5 Implement GSAP letter-by-letter stagger reveal of "I Love You Forever" text
  - [x] 15.6 Display hidden personal message beneath reveal text
  - [x] 15.7 Persist secretUnlocked in AppContext; replay reveal animation on subsequent clicks without resetting

- [x] 16. Love Counter Scene
  - [x] 16.1 Create `src/components/scenes/LoveCounter.jsx` — centered section with romantic label
  - [x] 16.2 Implement useInterval(1000) updating days/hours/minutes/seconds from timeUtils.getDuration
  - [x] 16.3 Render each value unit with NeonText glowing animation
  - [x] 16.4 Implement countdown mode using timeUtils.getCountdown when start date is in the future

- [x] 17. Mini Game Scene
  - [x] 17.1 Create `src/components/scenes/MiniGame.jsx` — canvas-based game with requestAnimationFrame loop
  - [x] 17.2 Implement heart spawning at random X positions falling at random speeds (2-6px/frame)
  - [x] 17.3 Implement click/tap hit detection using circle-point intersection math
  - [x] 17.4 Implement score tracking (increment by 1 per catch, never decreases)
  - [x] 17.5 Implement 30-second countdown timer with useInterval; stop game loop at 0
  - [x] 17.6 Implement animated result screen with final score display
  - [x] 17.7 Unlock and display hidden romantic message when score ≥ 15
  - [x] 17.8 Ensure full touch/tap support for mobile play

- [x] 18. Interactive Night Sky Scene
  - [x] 18.1 Create `src/components/scenes/NightSky.jsx` — full-viewport SVG star field
  - [x] 18.2 Render 50+ individually clickable SVG circle stars from src/data/stars.js with randomized twinkling (opacity/scale keyframes)
  - [x] 18.3 Implement Framer Motion AnimatePresence tooltip/modal showing star's message on click
  - [x] 18.4 Implement constellation sequence tracking in AppContext; draw SVG path lines between stars using GSAP DrawSVGPlugin on correct sequence completion
  - [x] 18.5 Implement sparkle animation and congratulatory message on constellation completion

- [x] 19. Ending Scene
  - [x] 19.1 Create `src/components/scenes/EndingScene.jsx` — full-viewport final section
  - [x] 19.2 Implement AuroraEffect with 4 layered divs using CSS keyframes at different speeds; GSAP ScrollTrigger scrub parallax on each layer
  - [x] 19.3 Implement Framer Motion whileInView fade-in of "In every universe, I'd still choose you." over 2 seconds
  - [x] 19.4 Implement floating glowing heart + "Happy Birthday My Love ❤️" text appearing 1 second after main text

- [x] 20. Extra Feature Components
  - [x] 20.1 Create `src/components/extras/LoveMessagesPopup.jsx` — useInterval random 15-45s trigger; Framer Motion slide-in notification; auto-dismiss after 5s
  - [x] 20.2 Create `src/components/extras/VoiceNotePlayer.jsx` — styled audio player for personal voice recording with play/pause and waveform visualization
  - [x] 20.3 Create `src/components/extras/GiftBox.jsx` — mount GiftBox3D R3F canvas; Framer Motion overlay reveals message after lid opens; CSS 3D fallback
  - [x] 20.4 Create `src/components/extras/AILoveQuotes.jsx` — useInterval(8000) cycling 10+ quotes from src/data/quotes.js with Framer Motion fade transition
  - [x] 20.5 Create `src/components/extras/MemoryMap.jsx` — custom illustrated SVG map with heart-shaped markers; Framer Motion tooltip on marker click showing location name
  - [x] 20.6 Create `src/components/extras/EasterEgg.jsx` — 3 hidden instances wrapping decorative elements; each triggers unique GSAP animation on click; tracked in AppContext

- [x] 21. App Assembly
  - [x] 21.1 Create `src/App.jsx` assembling all scenes in order with AppProvider and AudioProvider wrapping
  - [x] 21.2 Mount fixed global components (CursorGlow, MusicPlayer, LoveMessagesPopup, ParticleSystem, DynamicSky)
  - [x] 21.3 Implement lazy loading with React.lazy + Suspense for OpeningAnimation, NightSky, MiniGame
  - [x] 21.4 Add React ErrorBoundary wrapper around each scene component
  - [x] 21.5 Apply global reduced-motion class toggle on html element based on AppContext
  - [x] 21.6 Create `src/main.jsx` React root with StrictMode

- [x] 22. Property-Based Tests
  - [x] 22.1 Set up Vitest config and fast-check dependency; create `src/tests/` directory
  - [x] 22.2 Write PBT for Property 1: parallaxOffset(input, factor) === input * factor; distinct factors produce distinct offsets
  - [x] 22.3 Write PBT for Property 2: computeParticleVelocityDelta returns repulsion vector when distance < 100px, zero otherwise
  - [x] 22.4 Write PBT for Property 3: MemoryCard renders all 4 required fields for any valid Memory object
  - [x] 22.5 Write PBT for Property 4: MemoryTimeline renders exactly N cards for any array of N ≥ 10 memories without duplicate keys
  - [x] 22.6 Write PBT for Property 5: reasons array has all unique text values and length ≥ 20
  - [x] 22.7 Write PBT for Property 6: ProgressDots displays correct K/N fraction for any revealed subset
  - [x] 22.8 Write PBT for Property 7: MusicPlayer displays title and artist for any Track object
  - [x] 22.9 Write PBT for Property 8: playlist next/prev navigation wraps correctly for any N ≥ 3 tracks; index always in [0, N-1]
  - [x] 22.10 Write PBT for Property 9: getDuration/getCountdown decompose time correctly; hours ∈ [0,23], minutes ∈ [0,59], seconds ∈ [0,59]
  - [x] 22.11 Write PBT for Property 10: lightbox keyboard navigation wraps correctly for any gallery of N ≥ 2 photos
  - [x] 22.12 Write PBT for Property 11: PhotoGallery renders exactly N photos for any array of N ≥ 12 without duplicate keys
  - [x] 22.13 Write PBT for Property 12: secretUnlocked never reverts to false after first unlock for any N clicks
  - [x] 22.14 Write PBT for Property 13: game score equals catch count for any sequence of N catches; never decreases
  - [x] 22.15 Write PBT for Property 14: hidden message visible iff score ≥ 15 for any score value
  - [x] 22.16 Write PBT for Property 15: NightSky renders exactly N clickable stars for any array of N ≥ 50
  - [x] 22.17 Write PBT for Property 16: clicking any star shows that star's message, not another's
  - [x] 22.18 Write PBT for Property 17: generated popup interval always in [15000, 45000] ms
  - [x] 22.19 Write PBT for Property 18: quote cycling visits all N indices after N cycles for any N ≥ 10
  - [x] 22.20 Write PBT for Property 19: clicking any map marker shows that location's name
  - [x] 22.21 Write PBT for Property 20: all animation durations are 0ms when reducedMotion is true

- [x] 23. Performance & Polish
  - [x] 23.1 Add loading="lazy" and decoding="async" to all img elements; add onError placeholder fallback
  - [x] 23.2 Verify all animated properties use only transform and opacity; add will-change: transform to continuous animations
  - [x] 23.3 Confirm WebGL context count stays ≤ 2 simultaneously; unmount OpeningAnimation canvas after completion
  - [x] 23.4 Add GSAP ScrollTrigger invalidateOnRefresh: true for resize handling
  - [x] 23.5 Test and verify mobile responsiveness at 320px, 768px, 1024px, 1440px, 2560px
  - [x] 23.6 Verify prefers-reduced-motion disables all non-essential animations while preserving content
  - [x] 23.7 Run Vitest suite and confirm all 20 PBT properties pass with ≥ 100 iterations each
  - [x] 23.8 Final cross-browser check: Chrome, Firefox, Safari desktop + iOS Safari + Android Chrome
