import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import { AudioProvider } from './context/AudioContext';
import { LandingPage } from './components/scenes/LandingPage';
import { DynamicSky } from './components/effects/DynamicSky';
import { ParticleSystem } from './components/effects/ParticleSystem';
import { CursorGlow } from './components/effects/CursorGlow';
import { SectionDivider } from './components/layout/SectionDivider';

// Lazy load all heavy scenes
const MemoryTimeline   = lazy(() => import('./components/scenes/MemoryTimeline'));
const LoveLetter       = lazy(() => import('./components/scenes/LoveLetter'));
const ReasonsCards     = lazy(() => import('./components/scenes/ReasonsCards'));
const PhotoGallery     = lazy(() => import('./components/scenes/PhotoGallery'));
const LoveCounter      = lazy(() => import('./components/scenes/LoveCounter'));
const NightSky         = lazy(() => import('./components/scenes/NightSky'));
const MiniGame         = lazy(() => import('./components/scenes/MiniGame'));
const SecretSurprise   = lazy(() => import('./components/scenes/SecretSurprise'));
const EndingScene      = lazy(() => import('./components/scenes/EndingScene'));
const GiftBox          = lazy(() => import('./components/extras/GiftBox'));
const MemoryMap        = lazy(() => import('./components/extras/MemoryMap'));
const AILoveQuotes     = lazy(() => import('./components/extras/AILoveQuotes'));
const VoiceNotePlayer  = lazy(() => import('./components/extras/VoiceNotePlayer'));
const MusicPlayer      = lazy(() => import('./components/extras/MusicPlayer'));
const LoveMessagesPopup = lazy(() => import('./components/extras/LoveMessagesPopup'));

// Safe wrapper — if a scene crashes, show nothing instead of breaking the page
class Safe extends React.Component {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() {
    if (this.state.error) return null;
    return this.props.children;
  }
}

function Scene({ component: Component }) {
  return (
    <Safe>
      <Suspense fallback={null}>
        <Component />
      </Suspense>
    </Safe>
  );
}

function AppContent() {
  const [phase, setPhase] = useState('landing');

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000' }}>
      {/* Always-on background effects */}
      <DynamicSky />
      <ParticleSystem />
      <CursorGlow />

      {/* Phase 1: Landing */}
      {phase === 'landing' && (
        <LandingPage onReveal={() => setPhase('main')} />
      )}

      {/* Phase 2: Main content */}
      {phase === 'main' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Floating UI */}
          <Scene component={MusicPlayer} />
          <Scene component={LoveMessagesPopup} />

          {/* Scenes */}
          <Scene component={MemoryTimeline} />
          <SectionDivider />
          <Scene component={LoveLetter} />
          <SectionDivider />
          <Scene component={ReasonsCards} />
          <SectionDivider />
          <Scene component={PhotoGallery} />
          <SectionDivider />
          <Scene component={LoveCounter} />
          <SectionDivider />
          <Scene component={NightSky} />
          <SectionDivider />
          <Scene component={MiniGame} />
          <SectionDivider />
          <Scene component={GiftBox} />
          <SectionDivider />
          <Scene component={MemoryMap} />
          <SectionDivider />
          <Scene component={AILoveQuotes} />
          <SectionDivider />
          <Scene component={VoiceNotePlayer} />
          <SectionDivider />
          <Scene component={SecretSurprise} />
          <SectionDivider />
          <Scene component={EndingScene} />
        </motion.div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AudioProvider>
        <AppContent />
      </AudioProvider>
    </AppProvider>
  );
}
