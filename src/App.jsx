import React, { useState, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import { AudioProvider } from './context/AudioContext';
import { ErrorBoundary } from './components/ErrorBoundary';

// ── Always-loaded global effects ─────────────────────────────────────────────
import { DynamicSky } from './components/effects/DynamicSky';
import { CursorGlow } from './components/effects/CursorGlow';
import { ParticleSystem } from './components/effects/ParticleSystem';
import { MusicPlayer } from './components/extras/MusicPlayer';
import { LoveMessagesPopup } from './components/extras/LoveMessagesPopup';
import { SectionDivider } from './components/layout/SectionDivider';

// ── Eagerly loaded scenes (above the fold) ───────────────────────────────────
import { LandingPage } from './components/scenes/LandingPage';

// ── Lazily loaded scenes (below the fold / heavy) ────────────────────────────
const OpeningAnimation = lazy(() => import('./components/scenes/OpeningAnimation'));
const MemoryTimeline   = lazy(() => import('./components/scenes/MemoryTimeline'));
const LoveLetter       = lazy(() => import('./components/scenes/LoveLetter'));
const ReasonsCards     = lazy(() => import('./components/scenes/ReasonsCards'));
const PhotoGallery     = lazy(() => import('./components/scenes/PhotoGallery'));
const LoveCounter      = lazy(() => import('./components/scenes/LoveCounter'));
const NightSky         = lazy(() => import('./components/scenes/NightSky'));
const MiniGame         = lazy(() => import('./components/scenes/MiniGame'));
const SecretSurprise   = lazy(() => import('./components/scenes/SecretSurprise'));
const EndingScene      = lazy(() => import('./components/scenes/EndingScene'));

// ── Lazily loaded extras ─────────────────────────────────────────────────────
const GiftBox          = lazy(() => import('./components/extras/GiftBox'));
const MemoryMap        = lazy(() => import('./components/extras/MemoryMap'));
const AILoveQuotes     = lazy(() => import('./components/extras/AILoveQuotes'));
const VoiceNotePlayer  = lazy(() => import('./components/extras/VoiceNotePlayer'));

// ── Scene loading fallback ───────────────────────────────────────────────────
function SceneFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        className="text-soft-pink/40 text-2xl"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ✦
      </motion.div>
    </div>
  );
}

function AppContent() {
  const [phase, setPhase] = useState('landing'); // 'landing' | 'opening' | 'main'

  const handleReveal = () => setPhase('opening');
  const handleOpeningComplete = () => setPhase('main');

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* ── Fixed global layers ─────────────────────────────────────────── */}
      <DynamicSky />
      <CursorGlow />
      <ParticleSystem />

      {/* Music player & popups only after landing */}
      {phase !== 'landing' && (
        <>
          <MusicPlayer />
          <LoveMessagesPopup />
        </>
      )}

      {/* ── Phase: Landing ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {phase === 'landing' && (
          <LandingPage onReveal={handleReveal} />
        )}
      </AnimatePresence>

      {/* ── Phase: Opening Animation ────────────────────────────────────── */}
      <AnimatePresence>
        {phase === 'opening' && (
          <Suspense fallback={<SceneFallback />}>
            <ErrorBoundary>
              <OpeningAnimation onComplete={handleOpeningComplete} />
            </ErrorBoundary>
          </Suspense>
        )}
      </AnimatePresence>

      {/* ── Phase: Main content ─────────────────────────────────────────── */}
      <AnimatePresence>
        {phase === 'main' && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <Suspense fallback={<SceneFallback />}>

              <ErrorBoundary><MemoryTimeline /></ErrorBoundary>
              <SectionDivider />

              <ErrorBoundary><LoveLetter /></ErrorBoundary>
              <SectionDivider />

              <ErrorBoundary><ReasonsCards /></ErrorBoundary>
              <SectionDivider />

              <ErrorBoundary><PhotoGallery /></ErrorBoundary>
              <SectionDivider />

              <ErrorBoundary><LoveCounter /></ErrorBoundary>
              <SectionDivider />

              <ErrorBoundary><NightSky /></ErrorBoundary>
              <SectionDivider />

              <ErrorBoundary><MiniGame /></ErrorBoundary>
              <SectionDivider />

              <ErrorBoundary><GiftBox /></ErrorBoundary>
              <SectionDivider />

              <ErrorBoundary><MemoryMap /></ErrorBoundary>
              <SectionDivider />

              <ErrorBoundary><AILoveQuotes /></ErrorBoundary>
              <SectionDivider />

              <ErrorBoundary><VoiceNotePlayer /></ErrorBoundary>
              <SectionDivider />

              <ErrorBoundary><SecretSurprise /></ErrorBoundary>
              <SectionDivider />

              <ErrorBoundary><EndingScene /></ErrorBoundary>

            </Suspense>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AudioProvider>
        <AppContent />
      </AudioProvider>
    </AppProvider>
  );
}

export default App;
