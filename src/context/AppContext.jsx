import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Detect reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    // Apply/remove global class on <html>
    document.documentElement.classList.toggle('reduced-motion', mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('reduced-motion', reducedMotion);
  }, [reducedMotion]);

  // Audio enabled (user has interacted / unmuted)
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Secret Surprise unlock state (persists for session)
  const [secretUnlocked, setSecretUnlocked] = useState(false);

  // Constellation progress — array of star IDs clicked in sequence
  const [constellationProgress, setConstellationProgress] = useState([]);
  const [constellationComplete, setConstellationComplete] = useState(false);

  // Revealed reasons — Set of reason IDs
  const [revealedReasons, setRevealedReasons] = useState(new Set());

  // Mini game state
  const [miniGameScore, setMiniGameScore] = useState(0);
  const [miniGameComplete, setMiniGameComplete] = useState(false);

  // Easter egg tracking
  const [triggeredEasterEggs, setTriggeredEasterEggs] = useState(new Set());

  // ── Actions ──────────────────────────────────────────────────────────────────

  const unlockSecret = () => setSecretUnlocked(true);

  const revealReason = (id) => {
    setRevealedReasons((prev) => new Set([...prev, id]));
  };

  const addConstellationStar = (starId, totalConstellationStars) => {
    setConstellationProgress((prev) => {
      const next = [...prev, starId];
      if (next.length >= totalConstellationStars) {
        setConstellationComplete(true);
      }
      return next;
    });
  };

  const resetConstellation = () => {
    setConstellationProgress([]);
    setConstellationComplete(false);
  };

  const incrementGameScore = () => {
    setMiniGameScore((s) => s + 1);
  };

  const completeGame = () => setMiniGameComplete(true);

  const resetGame = () => {
    setMiniGameScore(0);
    setMiniGameComplete(false);
  };

  const triggerEasterEgg = (id) => {
    setTriggeredEasterEggs((prev) => new Set([...prev, id]));
  };

  const value = {
    reducedMotion,
    audioEnabled,
    setAudioEnabled,
    secretUnlocked,
    unlockSecret,
    constellationProgress,
    constellationComplete,
    addConstellationStar,
    resetConstellation,
    revealedReasons,
    revealReason,
    miniGameScore,
    miniGameComplete,
    incrementGameScore,
    completeGame,
    resetGame,
    triggeredEasterEggs,
    triggerEasterEgg,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export default AppContext;
