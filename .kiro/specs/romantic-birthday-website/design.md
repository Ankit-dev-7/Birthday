# Design Document: Romantic Birthday Website

## Overview

A single-page cinematic love letter built as a React static web application. The site is structured as a vertical scroll journey — each section is a self-contained "scene" that the visitor moves through, from the dramatic black-screen entry all the way to the aurora-lit ending. The design philosophy is **emotional immersion first**: every technical decision serves the goal of making the experience feel magical, personal, and alive.

The application is entirely client-side with no backend. All personal data (memories, reasons, photos, messages) is stored in static configuration files that the developer fills in before deployment. The site is deployed as a static bundle (Vite build output) to any CDN or static host (Netlify, Vercel, GitHub Pages).

### Key Design Principles

- **Scene-based architecture**: Each major section is an isolated React component that manages its own animation lifecycle.
- **Progressive enhancement**: Core content is readable without JavaScript; animations layer on top.
- **Mobile-first**: All layouts are designed for 320px first, then scaled up.
- **Reduced-motion respect**: A global context flag disables non-essential animations when `prefers-reduced-motion: reduce` is detected.
- **Configuration-driven content**: All personal data lives in `src/data/` files, never hardcoded in components.

---

## Architecture

### Technology Stack

| Concern | Library | Rationale |
|---|---|---|
| UI framework | React 18 | Component model, hooks, concurrent features |
| Styling | Tailwind CSS v3 | Utility-first, purged CSS, responsive breakpoints |
| Declarative animation | Framer Motion | Scroll-triggered entrance animations, layout transitions, gesture handling |
| Imperative animation | GSAP (with ScrollTrigger) | Complex timeline sequences, morphing, stagger effects |
| 3D rendering | Three.js (via @react-three/fiber + @react-three/drei) | Star-field, opening animation, 3D gift box |
| Build tool | Vite | Fast HMR, code splitting, asset optimization |
| Audio | Howler.js | Cross-browser audio, fade/crossfade, playlist management |
| Map | Leaflet.js (or custom SVG map) | Memory Map markers; fallback to illustrated SVG if no tile server |

### Application Structure

```
src/
├── main.jsx                    # React root, global providers
├── App.jsx                     # Scene orchestrator, scroll container
├── data/                       # All personal content (edit before deploy)
│   ├── memories.js
│   ├── reasons.js
│   ├── photos.js
│   ├── stars.js
│   ├── tracks.js
│   ├── quotes.js
│   ├── mapLocations.js
│   └── config.js               # Relationship start date, names, etc.
├── context/
│   ├── AppContext.jsx           # Global state (audio, reduced-motion, unlocked)
│   └── AudioContext.jsx        # Howler.js instance management
├── hooks/
│   ├── useReducedMotion.js
│   ├── useInView.js             # Intersection Observer wrapper
│   ├── useInterval.js
│   └── useCursorPosition.js
├── components/
│   ├── layout/
│   │   ├── SceneWrapper.jsx     # Common scroll-trigger wrapper for all scenes
│   │   └── SectionDivider.jsx
│   ├── ui/
│   │   ├── GlassCard.jsx        # Glassmorphism card primitive
│   │   ├── NeonText.jsx         # Glowing text primitive
│   │   ├── FloatingHeart.jsx    # Reusable animated heart
│   │   └── ProgressDots.jsx
│   ├── effects/
│   │   ├── ParticleSystem.jsx   # Canvas-based particle engine
│   │   ├── CursorGlow.jsx       # Mouse-following radial glow
│   │   ├── DynamicSky.jsx       # Animated gradient background
│   │   ├── RainEffect.jsx       # Rain → hearts transition
│   │   └── AuroraEffect.jsx     # Ending scene aurora layers
│   ├── scenes/
│   │   ├── LandingPage.jsx
│   │   ├── OpeningAnimation.jsx # Three.js scene
│   │   ├── MemoryTimeline.jsx
│   │   ├── LoveLetter.jsx
│   │   ├── ReasonsCards.jsx
│   │   ├── PhotoGallery.jsx
│   │   ├── SecretSurprise.jsx
│   │   ├── LoveCounter.jsx
│   │   ├── MiniGame.jsx
│   │   ├── NightSky.jsx
│   │   └── EndingScene.jsx
│   ├── extras/
│   │   ├── MusicPlayer.jsx
│   │   ├── LoveMessagesPopup.jsx
│   │   ├── VoiceNotePlayer.jsx
│   │   ├── GiftBox.jsx
│   │   ├── AILoveQuotes.jsx
│   │   ├── MemoryMap.jsx
│   │   └── EasterEgg.jsx
│   └── three/
│       ├── StarField.jsx        # Three.js star-zoom scene
│       ├── PolaroidFrames.jsx   # Floating 3D polaroids
│       └── GiftBox3D.jsx        # 3D gift box model
├── animations/
│   ├── gsapTimelines.js         # Named GSAP timeline factories
│   ├── framerVariants.js        # Shared Framer Motion variants
│   └── threeScenes.js           # Three.js scene setup helpers
├── utils/
│   ├── timeUtils.js             # Duration calculation, countdown
│   ├── audioUtils.js            # Howler helpers
│   └── mathUtils.js             # Lerp, clamp, random helpers
└── assets/
    ├── fonts/
    ├── audio/
    ├── images/
    └── icons/
```

### Scene Rendering Order (App.jsx)

```
<AppProvider>
  <AudioProvider>
    <CursorGlow />              {/* fixed, always on top */}
    <MusicPlayer />             {/* fixed floating panel */}
    <LoveMessagesPopup />       {/* fixed notification layer */}
    <ParticleSystem />          {/* fixed full-viewport canvas */}
    <DynamicSky />              {/* fixed background gradient */}

    <main>
      <LandingPage />           {/* scene 1 - full viewport */}
      <OpeningAnimation />      {/* scene 2 - full viewport, Three.js */}
      <MemoryTimeline />        {/* scene 3 */}
      <LoveLetter />            {/* scene 4 */}
      <ReasonsCards />          {/* scene 5 */}
      <PhotoGallery />          {/* scene 6 */}
      <LoveCounter />           {/* scene 7 */}
      <NightSky />              {/* scene 8 */}
      <MiniGame />              {/* scene 9 */}
      <GiftBox />               {/* scene 10 */}
      <MemoryMap />             {/* scene 11 */}
      <AILoveQuotes />          {/* scene 12 */}
      <VoiceNotePlayer />       {/* scene 13 */}
      <SecretSurprise />        {/* scene 14 */}
      <EndingScene />           {/* scene 15 - final */}
    </main>
  </AudioProvider>
</AppProvider>
```

---

## Components and Interfaces

### Global Context (AppContext)

```js
// AppContext state shape
{
  reducedMotion: boolean,       // from prefers-reduced-motion
  audioEnabled: boolean,        // user has interacted / unmuted
  secretUnlocked: boolean,      // Secret Surprise has been triggered
  constellationProgress: number[], // indices of clicked constellation stars
  revealedReasons: Set<number>, // which reason cards have been flipped
  miniGameScore: number,
  miniGameComplete: boolean,
}
```

### SceneWrapper

Every scene component is wrapped in `SceneWrapper`, which provides:
- Intersection Observer entry detection
- Framer Motion `AnimatePresence` boundary
- `data-scene` attribute for GSAP ScrollTrigger targeting
- Reduced-motion passthrough prop

```jsx
<SceneWrapper id="memory-timeline" threshold={0.15}>
  {(isInView) => <MemoryTimeline isInView={isInView} />}
</SceneWrapper>
```

### LandingPage

- Full-viewport black screen
- Uses GSAP `TextPlugin` for the typing animation sequence
- Three phrases typed sequentially with cursor blink between each
- Framer Motion `AnimatePresence` fades in the CTA button after typing completes
- Emits `onReveal` callback to App.jsx to trigger OpeningAnimation mount

### OpeningAnimation

- Rendered via `@react-three/fiber` `<Canvas>`
- `StarField` component: 5000 star points, camera animates forward on Z-axis using GSAP
- `PolaroidFrames`: 6–8 instanced mesh planes with photo textures, parallax offset applied via `useFrame` + mouse position ref
- On animation complete (4–6s), emits `onComplete` → App.jsx unmounts this scene and scrolls to main content
- Audio crossfade triggered at animation start via AudioContext

### ParticleSystem

- Single `<canvas>` element, fixed position, full viewport, `pointer-events: none`
- Vanilla JS canvas loop (not Three.js) for performance — avoids WebGL context competition with OpeningAnimation
- Particle types: `star`, `petal`, `butterfly`, `heart` — each with distinct movement curves
- Cursor proximity effect: particles within 100px radius receive a velocity nudge away from cursor
- Particle count scales with viewport: ~80 on mobile, ~200 on desktop
- Paused when `reducedMotion` is true

### CursorGlow

- `<div>` with `position: fixed`, `pointer-events: none`, `z-index: 9999`
- Position updated via `requestAnimationFrame` lerp toward actual cursor position (50ms lag = lerp factor ~0.15)
- Radial gradient CSS background, 200px diameter
- Hidden on touch devices (no cursor)

### MemoryTimeline

- Vertical scroll layout; alternating left/right on `md:` breakpoint
- Each `MemoryCard` uses Framer Motion `whileInView` with `viewport={{ once: true }}`
- Click → Framer Motion `layoutId` shared layout animation expands card to full-screen overlay
- Heart particle burst on expand: spawns 20 `FloatingHeart` components at card's bounding rect origin
- Data driven from `src/data/memories.js`

### LoveLetter

- Paper unfold: GSAP timeline animates `scaleY` from 0→1 on a folded paper div, with `transformOrigin: top`
- Handwritten font: Dancing Script loaded via `@fontsource/dancing-script`
- Line-by-line stagger: each `<p>` line wrapped in a `<span>` with Framer Motion stagger container
- Candle: CSS `@keyframes` flicker animation on a flame SVG, with a radial glow `box-shadow`

### ReasonsCards

- Deck layout: cards stacked with slight rotation offsets using CSS transforms
- Flip animation: Framer Motion `rotateY` 0→180 on click, back face reveals reason text
- Progress: `ProgressDots` component shows filled/empty dots
- Completion: when `revealedReasons.size === reasons.length`, Framer Motion `AnimatePresence` shows celebration overlay
- Chime sound: triggered via AudioContext on each flip

### MusicPlayer

- Fixed bottom-right panel, `z-index: 1000`
- Vinyl disc: CSS `animation: spin 3s linear infinite`, paused when not playing
- Equalizer bars: 5 `<div>` bars with CSS `@keyframes` height animation, paused when not playing
- Howler.js playlist: `new Howl({ src, html5: true })` per track, crossfade on track change
- Error state: Howler `onloaderror` callback sets `trackError` state

### PhotoGallery

- CSS columns layout (`columns-2 md:columns-3 lg:columns-4`) for masonry effect
- Hover: Framer Motion `whileHover={{ scale: 1.05 }}` + CSS `box-shadow` glow
- Lightbox: Framer Motion `AnimatePresence` + `layoutId` shared layout transition
- Lightbox backdrop: `backdrop-filter: blur(20px)` + semi-transparent black overlay
- Keyboard: `useEffect` attaches `keydown` listener when lightbox is open; cleans up on close
- Floating drift: CSS `@keyframes` with randomized `translateY` and `rotate` on select images

### SecretSurprise

- Locked heart: Framer Motion `animate={{ scale: [1, 1.1, 1] }}` pulse loop
- Unlock animation: GSAP timeline — heart splits open (two halves rotate outward), then fireworks canvas activates
- Fireworks: canvas-based particle burst (reuses ParticleSystem particle logic)
- Confetti: `canvas-confetti` library for the 3-second burst
- Text reveal: GSAP `stagger` on individual letter `<span>` elements
- Session lock: `secretUnlocked` in AppContext; subsequent clicks replay reveal without reset

### LoveCounter

- `useInterval(1000)` hook updates displayed values
- Duration calculated in `timeUtils.js`: `getDuration(startDate)` returns `{ days, hours, minutes, seconds }`
- Countdown mode: if `startDate > now`, renders `CountdownTimer` sub-component instead
- Neon glow: `NeonText` primitive with CSS `text-shadow` animation

### MiniGame

- Canvas-based game loop using `requestAnimationFrame`
- Hearts spawn at random X positions, fall at random speeds (2–6px/frame)
- Click/tap detection: canvas `mousedown` + `touchstart` events, hit-test against heart bounding circles
- 30-second timer: `useInterval(1000)` countdown, game loop stops at 0
- Score ≥ 15: unlocks hidden message via local state, displayed in result screen
- Fully paused/cleaned up when component unmounts

### NightSky

- SVG-based star field (not Three.js) for interactivity — each `<circle>` is individually clickable
- 50+ stars with randomized positions, sizes, and twinkle animation delays
- Click → Framer Motion `AnimatePresence` tooltip/modal with star's memory data
- Constellation: a subset of ~8 stars with defined positions; clicking them in sequence (tracked in AppContext) draws SVG `<path>` lines between them using GSAP `drawSVG`
- Completion sparkle: GSAP `stagger` on sparkle SVG elements around the constellation

### EndingScene

- Aurora: 4 layered `<div>` elements with CSS `@keyframes` gradient animations at different speeds and opacities
- Parallax: GSAP ScrollTrigger `scrub` moves each aurora layer at a different `y` offset
- Text fade-in: Framer Motion `whileInView` with `opacity: 0 → 1` over 2 seconds
- Floating heart: Framer Motion `animate={{ y: [-10, 10, -10] }}` loop after 1-second delay

### MusicPlayer (Audio Management Detail)

See Audio Management Strategy section below.

### LoveMessagesPopup

- `useInterval` fires at random interval between 15–45 seconds
- Notification rendered as Framer Motion slide-in from right edge
- Auto-dismiss: `setTimeout(5000)` triggers exit animation
- Queue: max 1 popup visible at a time; next queued after current dismisses

### GiftBox

- `@react-three/fiber` canvas, isolated from main OpeningAnimation canvas
- Box lid animates open on click using GSAP rotation on the Three.js mesh
- Reveal: after lid opens, a Framer Motion overlay fades in with the message/image
- Fallback: CSS 3D transform version if WebGL unavailable

### MemoryMap

- Leaflet.js with a dark tile layer (CartoDB Dark Matter) OR a custom illustrated SVG map
- Custom SVG preferred for offline/static deployment — no tile server dependency
- Markers: custom heart-shaped SVG markers; click → Framer Motion tooltip with location label
- At least 5 locations from `src/data/mapLocations.js`

### AILoveQuotes

- Array of 10+ quotes in `src/data/quotes.js`
- `useInterval(8000)` cycles index
- Framer Motion `AnimatePresence` with `opacity` fade between quotes
- No actual AI API call — quotes are pre-written and stored statically

### EasterEgg

- 3 instances hidden in decorative elements across the page
- Each `EasterEgg` component wraps a decorative element with an invisible click target
- Triggers: unique GSAP animation (e.g., rainbow burst, floating text, spinning hearts)
- Tracked in AppContext to avoid re-triggering

---

## Data Models

### Memory

```ts
interface Memory {
  id: string;
  date: string;           // "YYYY-MM-DD"
  caption: string;        // Short title
  description: string;    // Full memory text
  location: string;       // Location label
  photos: string[];       // Array of image paths (src/assets/images/)
  emoji?: string;         // Optional decorative emoji
}
```

### Reason

```ts
interface Reason {
  id: number;
  text: string;           // The reason text
  emoji?: string;         // Optional emoji decoration
  color?: string;         // Optional card accent color (Tailwind class)
}
```

### Photo

```ts
interface Photo {
  id: string;
  src: string;            // Image path
  alt: string;            // Accessibility description
  caption?: string;
  aspectRatio?: "portrait" | "landscape" | "square";
}
```

### Star (Night Sky)

```ts
interface Star {
  id: string;
  x: number;              // Percentage 0–100 of viewport width
  y: number;              // Percentage 0–100 of viewport height
  size: number;           // 1–4 (relative size)
  message: string;        // Memory or message shown on click
  isConstellation: boolean;
  constellationOrder?: number; // 1-based order for sequence click
}
```

### Track (Music Player)

```ts
interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;            // Audio file path (src/assets/audio/)
  coverArt?: string;      // Optional album art path
}
```

### MapLocation

```ts
interface MapLocation {
  id: string;
  name: string;           // Display label
  lat: number;
  lng: number;
  description: string;    // Shown in tooltip on click
  emoji?: string;
}
```

### AppConfig

```ts
interface AppConfig {
  partnerName: string;        // "Baby", "My Love", etc.
  relationshipStartDate: string; // ISO date string "YYYY-MM-DD"
  birthdayDate: string;          // ISO date string
  constellationName: string;     // Name to spell in the night sky
}
```

---

## Animation Strategy

### Library Assignment

Each animation concern is assigned to exactly one library to avoid conflicts:

| Animation Type | Library | Reason |
|---|---|---|
| Scroll-triggered entrance (fade, slide) | Framer Motion `whileInView` | Declarative, integrates with React lifecycle |
| Complex multi-step timelines (typing, paper unfold, unlock) | GSAP | Precise sequencing, `stagger`, `TextPlugin` |
| 3D scenes (star-field, polaroids, gift box) | Three.js via R3F | WebGL required for 3D |
| Layout transitions (card expand, lightbox) | Framer Motion `layoutId` | Shared layout animation is Framer's strength |
| Gesture-driven (hover scale, drag) | Framer Motion | Built-in gesture support |
| Looping CSS animations (vinyl spin, candle flicker, aurora) | CSS `@keyframes` | Zero JS overhead for simple loops |
| Particle system | Vanilla Canvas API | Avoids WebGL context limit; full control |
| Scroll parallax | GSAP ScrollTrigger | Precise scrub control across multiple layers |

### GSAP Usage

GSAP is initialized once in `animations/gsapTimelines.js` with plugins registered:

```js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin, DrawSVGPlugin);
```

Named timeline factories are exported and called from component `useEffect` hooks. All GSAP timelines are killed in the `useEffect` cleanup function to prevent memory leaks.

### Framer Motion Usage

A shared `framerVariants.js` exports reusable variant objects:

```js
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

export const cardFlip = {
  front: { rotateY: 0 },
  back: { rotateY: 180 }
};
```

### Reduced Motion

The `useReducedMotion` hook reads `window.matchMedia('(prefers-reduced-motion: reduce)')` and stores the result in AppContext. Components check this flag:

- Framer Motion: `useReducedMotion()` hook from Framer disables spring/inertia animations automatically
- GSAP: timelines check `reducedMotion` and set `duration: 0` or skip non-essential sequences
- ParticleSystem: pauses the canvas loop entirely
- CSS animations: a global `.reduced-motion *` class is toggled on `<html>` that sets `animation-duration: 0.01ms !important`

---

## Error Handling

### Audio Failures

- Howler.js `onloaderror` and `onplayerror` callbacks set `trackError: true` in AudioContext
- MusicPlayer renders "Music unavailable" label; all other functionality continues
- Autoplay blocked: detected via `Howl.play()` returning a rejected promise; sets `audioEnabled: false` and shows muted icon

### WebGL Unavailability

- `@react-three/fiber` `<Canvas>` wrapped in an error boundary
- If WebGL context creation fails, error boundary renders a CSS fallback (static star image for OpeningAnimation, CSS 3D transform box for GiftBox)

### Image Load Failures

- All `<img>` elements have `onError` handlers that swap `src` to a placeholder gradient image
- Photo gallery gracefully handles missing photos without breaking masonry layout

### Component Error Boundaries

- Each scene component is wrapped in a React `ErrorBoundary`
- On error, the scene renders a minimal fallback (blank section with correct height) so the rest of the page remains functional

---

## Audio Management Strategy

### Howler.js Setup

A single `AudioContext` (React context, not Web Audio API) manages all Howler instances:

```js
// AudioContext state
{
  currentTrack: Track | null,
  isPlaying: boolean,
  isMuted: boolean,
  volume: number,           // 0.0 – 1.0
  trackError: boolean,
  playlist: Track[],
  currentIndex: number,
}
```

### Autoplay Policy Handling

1. On page load, attempt `howl.play()` at volume 0.4
2. If the browser blocks autoplay (promise rejection or `onplayerror`), set `audioEnabled: false`
3. Show muted icon in LandingPage; clicking it calls `howl.play()` after user gesture
4. Once user has interacted, `audioEnabled: true` persists for the session

### Crossfade

When the OpeningAnimation begins, a GSAP tween fades the piano track volume from 0.4 → 0 over 1 second while simultaneously fading the romantic instrumental from 0 → 0.4 over 2 seconds.

### Track Switching

`next()` and `prev()` functions in AudioContext:
1. Fade current track volume to 0 over 300ms
2. Stop current Howl
3. Load and play next Howl at volume 0.4

### Error Handling

- `onloaderror`: sets `trackError: true`, MusicPlayer shows "Music unavailable"
- `onplayerror`: same as above
- All Howl instances are unloaded in the AudioContext cleanup effect

---

## Performance Optimizations

### Code Splitting

Vite's dynamic `import()` is used for heavy scenes:

```js
const OpeningAnimation = lazy(() => import('./components/scenes/OpeningAnimation'));
const NightSky = lazy(() => import('./components/scenes/NightSky'));
const MiniGame = lazy(() => import('./components/scenes/MiniGame'));
```

Three.js and its R3F wrappers are only loaded when the OpeningAnimation/GiftBox scenes are mounted.

### Image Optimization

- All `<img>` elements use `loading="lazy"` and `decoding="async"`
- Images are served in WebP format with JPEG fallback
- Vite's `vite-imagetools` plugin generates responsive srcsets at build time
- Placeholder: low-quality inline SVG blur-up while full image loads

### Animation Performance

- All animated properties use only `transform` and `opacity` (GPU-composited layers)
- `will-change: transform` applied to elements with continuous animations (vinyl, particles)
- ParticleSystem canvas uses `requestAnimationFrame` with `cancelAnimationFrame` cleanup
- GSAP ScrollTrigger uses `invalidateOnRefresh: true` to handle resize correctly

### Responsive Breakpoints

Following Tailwind's default breakpoints, mobile-first:

| Breakpoint | Min Width | Key Layout Changes |
|---|---|---|
| (default) | 320px | Single column, stacked layout, reduced particle count |
| `sm` | 640px | Slightly larger typography, 2-column gallery |
| `md` | 768px | Timeline alternates left/right, 3-column gallery |
| `lg` | 1024px | Full desktop layout, 4-column gallery, wider cards |
| `xl` | 1280px | Max content width capped, larger Three.js canvas |
| `2xl` | 1536px | Ultra-wide centering, decorative side elements visible |

### WebGL Context Management

The browser limits WebGL contexts per page (typically 8–16). To stay well within limits:
- OpeningAnimation canvas is unmounted after the animation completes
- GiftBox canvas is only mounted when the GiftBox section is in view (Intersection Observer)
- Only 2 WebGL contexts are active at any one time maximum

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

This feature is primarily UI/animation-driven, but several pure utility functions and logic layers have universal properties worth testing with property-based testing. The chosen PBT library is **fast-check** (TypeScript-compatible, works with Vitest), configured to run a minimum of 100 iterations per property test.

---

### Property 1: Parallax offset proportionality

*For any* input value (cursor position component or scroll position) and any set of layers with distinct parallax factors, the computed Y offset for each layer should equal `input * factor`. Layers with different factors must produce different offsets for the same input, and the offset should scale linearly with the input.

**Validates: Requirements 2.3, 13.5**

---

### Property 2: Particle proximity repulsion

*For any* particle position and cursor position where the Euclidean distance between them is less than 100px, the resulting velocity delta applied to the particle should be non-zero and directed away from the cursor (the dot product of the velocity delta vector and the vector from cursor to particle should be positive). For any distance ≥ 100px, the velocity delta should be zero.

**Validates: Requirements 3.6**

---

### Property 3: Memory card required fields

*For any* valid Memory object with all four required fields populated (date, caption, location, photos), the rendered MemoryCard component should display all four fields. No Memory object with all fields present should produce a card missing any of them.

**Validates: Requirements 4.3**

---

### Property 4: Timeline scales to any number of entries

*For any* array of 10 or more Memory objects, the MemoryTimeline component should render exactly that many card elements without throwing errors, without omitting any entries, and without producing duplicate React keys.

**Validates: Requirements 4.6**

---

### Property 5: Reasons data uniqueness and minimum count

*For any* reasons data array used by ReasonsCards, all reason `text` values should be unique (no two cards share the same text), and the array length should be at or above the minimum of 20.

**Validates: Requirements 6.3**

---

### Property 6: Progress indicator accuracy

*For any* Set of revealed reason IDs of size K drawn from a total reasons array of length N, the progress indicator should display K as the revealed count and N as the total. The displayed fraction should always equal `K / N`.

**Validates: Requirements 6.5**

---

### Property 7: Music player track display

*For any* Track object in the playlist, when that track is set as the current track, the MusicPlayer component's rendered output should contain that track's `title` string and that track's `artist` string.

**Validates: Requirements 7.3**

---

### Property 8: Playlist navigation wraps correctly

*For any* playlist of N tracks (N ≥ 3) and any starting index I in [0, N-1], navigating "next" exactly N times should return the active index to I. Navigating "previous" exactly N times from I should also return to I. The active index should always remain in the range [0, N-1] after any navigation operation.

**Validates: Requirements 7.5**

---

### Property 9: Love counter calculation and mode selection

*For any* date in the past, `getDuration(date)` should return an object where `hours` ∈ [0, 23], `minutes` ∈ [0, 59], `seconds` ∈ [0, 59], `days` ≥ 0, and the total elapsed seconds equals `days × 86400 + hours × 3600 + minutes × 60 + seconds` (within a 1-second tolerance). *For any* date in the future, `getCountdown(date)` should return positive remaining values satisfying the same decomposition invariants, and the counter should be in countdown mode rather than elapsed-time mode.

**Validates: Requirements 10.1, 10.5**

---

### Property 10: Photo gallery keyboard navigation

*For any* photo index I in a gallery of N photos (N ≥ 2), pressing ArrowRight should advance the active index to `(I + 1) % N`, pressing ArrowLeft should move it to `(I - 1 + N) % N`, and pressing Escape should set the lightbox to closed. The active index should always remain in [0, N-1] after any navigation.

**Validates: Requirements 8.4**

---

### Property 11: Photo gallery scales to minimum count

*For any* array of 12 or more Photo objects, the PhotoGallery component should render exactly that many photo elements without errors, without omitting any entries, and without producing duplicate React keys.

**Validates: Requirements 8.5**

---

### Property 12: Secret surprise unlock idempotence

*For any* number of clicks N ≥ 1 on the Secret Surprise button after the initial unlock, the `secretUnlocked` state in AppContext should remain `true` and never revert to `false`. The locked state must not be restored by any subsequent interaction.

**Validates: Requirements 9.6**

---

### Property 13: Mini game score monotonicity

*For any* sequence of N successful heart catches during a game round, the score after all N catches should equal N. The score should never decrease during a round, and each individual catch should increment the score by exactly 1.

**Validates: Requirements 11.2**

---

### Property 14: Mini game score threshold unlock

*For any* final score value S, the hidden romantic message should be visible if and only if S ≥ 15. For all S < 15 the message must not be visible; for all S ≥ 15 the message must be visible.

**Validates: Requirements 11.5**

---

### Property 15: Night sky star rendering completeness

*For any* array of N stars (N ≥ 50), the NightSky component should render exactly N clickable star elements, each with a unique identifier, without omitting any entries.

**Validates: Requirements 12.1**

---

### Property 16: Star click reveals correct message

*For any* Star object with a non-empty `message` field, clicking the rendered star element should cause a tooltip or modal to appear containing that star's exact message text. No star's click should display a different star's message.

**Validates: Requirements 12.2**

---

### Property 17: Popup interval within bounds

*For any* randomly generated popup interval value produced by the LoveMessagesPopup scheduling logic, the value should be ≥ 15,000ms and ≤ 45,000ms. No generated interval should fall outside this range.

**Validates: Requirements 14.1**

---

### Property 18: Quote cycling completeness

*For any* quotes array of N items (N ≥ 10), after N complete 8-second cycles, every quote index from 0 to N-1 should have been the active index at least once. The cycling should cover all entries without skipping any.

**Validates: Requirements 14.4**

---

### Property 19: Map marker click reveals correct label

*For any* MapLocation object, clicking its rendered marker element should display a tooltip or label containing that location's `name` field. No marker click should display a different location's name.

**Validates: Requirements 14.6**

---

### Property 20: Reduced motion disables non-essential animations

*For any* animated component, when `useReducedMotion()` returns `true`, all non-essential animation durations should be 0ms or the animation should be skipped entirely, while the component's core content (text, images, interactive elements) remains visible and accessible in the DOM.

**Validates: Requirements 15.5**

---

## Testing Strategy

### PBT Applicability Assessment

This feature is primarily a **UI/animation-heavy single-page application** with:
- CSS and Framer Motion animations (UI rendering)
- GSAP timeline sequences (imperative side effects)
- Three.js 3D scenes (WebGL rendering)
- Canvas-based particle system and mini game
- Static configuration data (no transformation logic)
- Audio playback management

The majority of the codebase consists of UI rendering, animation orchestration, and side-effect-only operations. However, there are **pure utility functions** in `timeUtils.js` and `mathUtils.js` that contain real logic amenable to property-based testing, and the **MiniGame score tracking**, **LoveCounter duration calculation**, **playlist navigation**, and **parallax math** have universal properties worth testing.

### Property-Based Tests (fast-check, minimum 100 iterations each)

Each property test references its design document property via a comment tag:
`// Feature: romantic-birthday-website, Property N: <property_text>`

- **Property 1** — `parallaxOffset(input, factor)` returns `input * factor`; distinct factors produce distinct offsets
- **Property 2** — `computeParticleVelocityDelta(particle, cursor)` returns non-zero repulsion vector when distance < 100px, zero otherwise
- **Property 3** — `MemoryCard` renders all four required fields for any valid Memory object
- **Property 4** — `MemoryTimeline` renders all N entries for any array of N ≥ 10 memories
- **Property 5** — reasons array has all unique text values and length ≥ 20
- **Property 6** — progress indicator displays `revealedCount / totalCount` correctly for any subset
- **Property 7** — `MusicPlayer` displays title and artist for any Track object
- **Property 8** — playlist next/previous navigation wraps correctly for any N ≥ 3 tracks
- **Property 9** — `getDuration` / `getCountdown` decompose elapsed/remaining time correctly for any date
- **Property 10** — lightbox keyboard navigation wraps correctly for any gallery of N ≥ 2 photos
- **Property 11** — `PhotoGallery` renders all N entries for any array of N ≥ 12 photos
- **Property 12** — `secretUnlocked` never reverts to false after first unlock, for any N clicks
- **Property 13** — game score equals catch count for any sequence of N catches
- **Property 14** — hidden message visible iff score ≥ 15, for any score value
- **Property 15** — `NightSky` renders all N stars for any array of N ≥ 50 stars
- **Property 16** — clicking any star shows that star's message, not another's
- **Property 17** — generated popup interval is always in [15000, 45000] ms
- **Property 18** — quote cycling visits all N indices after N cycles
- **Property 19** — clicking any map marker shows that location's name
- **Property 20** — all animation durations are 0ms when `reducedMotion` is true

### Unit Tests

Focus on pure utility functions and specific example behaviors:

- `timeUtils.getDuration(startDate)` — correct days/hours/minutes/seconds calculation
- `timeUtils.getCountdown(targetDate)` — correct countdown values
- `mathUtils.lerp`, `clamp`, `randomInRange` — mathematical correctness
- `NightSky` constellation sequence validation — correct order detection
- `MiniGame` hit detection — circle-point intersection math
- Typing animation sequence fires phrases in correct order
- CTA button appears only after typing completes
- Autoplay blocked state shows muted icon

### Integration Tests

- MusicPlayer renders "Music unavailable" when Howler fails to load
- SecretSurprise only triggers unlock once per session (subsequent clicks replay)
- LoveCounter switches to countdown mode when start date is in the future
- PhotoGallery lightbox opens/closes correctly and keyboard navigation works
- ReasonsCards completion message appears after all cards are revealed
- Rain effect transitions to hearts after 3 seconds

### Visual / Snapshot Tests

- Storybook stories for all UI primitive components (GlassCard, NeonText, FloatingHeart, ProgressDots)
- Snapshot tests for static layout components to catch unintended regressions
- Responsive snapshots at 320px, 768px, 1024px, 1440px, 2560px

### Manual Testing Checklist

- All animations play correctly on Chrome, Firefox, Safari (desktop)
- Touch interactions work on iOS Safari and Android Chrome
- `prefers-reduced-motion` disables animations correctly
- Audio autoplay blocked state shows muted icon
- WebGL fallbacks render when WebGL is disabled
- All keyboard navigation works in lightbox and mini game
- Page loads within 5 seconds on throttled 4G connection (Chrome DevTools)
- Easter eggs are discoverable and trigger unique animations
- Constellation sequence completes correctly and draws name

