/**
 * Audio utility helpers for Howler.js integration.
 */

/**
 * Attempt to play a Howl instance, handling autoplay policy gracefully.
 * @param {Howl} howl
 * @param {Function} onBlocked - called if autoplay is blocked
 * @returns {number|null} - Howl sound ID or null if blocked
 */
export function safePlay(howl, onBlocked) {
  if (!howl) return null;
  try {
    const id = howl.play();
    // Howler returns undefined if autoplay is blocked in some browsers
    if (id === undefined || id === null) {
      onBlocked?.();
      return null;
    }
    return id;
  } catch (err) {
    onBlocked?.();
    return null;
  }
}

/**
 * Fade a Howl from one volume to another over a duration.
 * @param {Howl} howl
 * @param {number} from - 0–1
 * @param {number} to - 0–1
 * @param {number} duration - ms
 */
export function fadeHowl(howl, from, to, duration) {
  if (!howl) return;
  howl.fade(from, to, duration);
}

/**
 * Create a one-shot sound effect (chime, click, etc.)
 * @param {string} src - audio file path
 * @param {number} volume - 0–1
 * @returns {Howl}
 */
export function createSfx(src, volume = 0.5) {
  const { Howl } = require('howler');
  return new Howl({ src: [src], volume, html5: false });
}

/**
 * Generate a random interval between min and max milliseconds.
 * Used for the LoveMessagesPopup scheduling.
 * @param {number} minMs
 * @param {number} maxMs
 * @returns {number}
 */
export function randomInterval(minMs, maxMs) {
  return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
}
