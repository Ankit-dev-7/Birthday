import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// DrawSVGPlugin requires a Club GreenSock license; we use a CSS stroke-dashoffset
// fallback instead. If you have the license, uncomment the import below.
// import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ─── Typing Animation ─────────────────────────────────────────────────────────
/**
 * Creates the landing page typing animation timeline.
 * @param {string[]} phrases - array of phrases to type
 * @param {string} targetSelector - CSS selector for the text element
 * @param {Function} onComplete - called when all phrases are done
 * @returns {gsap.core.Timeline}
 */
export function createTypingTimeline(phrases, targetSelector, onComplete) {
  const tl = gsap.timeline({ onComplete });

  phrases.forEach((phrase, i) => {
    tl.to(targetSelector, {
      duration: phrase.length * 0.06,
      text: { value: phrase, delimiter: '' },
      ease: 'none',
    });
    // Pause between phrases (except after last)
    if (i < phrases.length - 1) {
      tl.to({}, { duration: 1.5 }); // pause
      tl.to(targetSelector, {
        duration: 0.3,
        text: { value: '', delimiter: '' },
        ease: 'none',
      });
      tl.to({}, { duration: 0.3 }); // brief gap
    }
  });

  return tl;
}

// ─── Paper Unfold ─────────────────────────────────────────────────────────────
/**
 * Animates a paper unfolding from top.
 * @param {HTMLElement} el - the paper element
 * @param {Function} onComplete
 * @returns {gsap.core.Timeline}
 */
export function createPaperUnfoldTimeline(el, onComplete) {
  const tl = gsap.timeline({ onComplete });
  tl.fromTo(
    el,
    { scaleY: 0, transformOrigin: 'top center', opacity: 0 },
    { scaleY: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }
  );
  return tl;
}

// ─── Secret Unlock ────────────────────────────────────────────────────────────
/**
 * Heart unlock animation — splits heart into two halves rotating outward.
 * @param {HTMLElement} leftHalf
 * @param {HTMLElement} rightHalf
 * @param {Function} onComplete
 * @returns {gsap.core.Timeline}
 */
export function createUnlockTimeline(leftHalf, rightHalf, onComplete) {
  const tl = gsap.timeline({ onComplete });
  tl.to(leftHalf, { rotation: -45, x: -30, duration: 0.5, ease: 'back.out(1.7)' }, 0);
  tl.to(rightHalf, { rotation: 45, x: 30, duration: 0.5, ease: 'back.out(1.7)' }, 0);
  tl.to([leftHalf, rightHalf], { opacity: 0, duration: 0.3 }, 0.4);
  return tl;
}

// ─── Letter-by-letter text reveal ────────────────────────────────────────────
/**
 * Staggers letter spans into view.
 * @param {NodeList|HTMLElement[]} letters
 * @param {Function} onComplete
 * @returns {gsap.core.Timeline}
 */
export function createLetterRevealTimeline(letters, onComplete) {
  const tl = gsap.timeline({ onComplete });
  tl.fromTo(
    letters,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.05, stagger: 0.05, ease: 'power2.out' }
  );
  return tl;
}

// ─── Constellation line draw ──────────────────────────────────────────────────
/**
 * Animates SVG path stroke-dashoffset to simulate drawing a line.
 * @param {SVGPathElement} path
 * @param {number} duration
 * @returns {gsap.core.Tween}
 */
export function drawConstellationLine(path, duration = 0.8) {
  const length = path.getTotalLength();
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  return gsap.to(path, {
    strokeDashoffset: 0,
    duration,
    ease: 'power2.inOut',
  });
}

// ─── Sparkle burst ────────────────────────────────────────────────────────────
/**
 * Staggers sparkle elements into view with scale + opacity.
 * @param {NodeList|HTMLElement[]} sparkles
 * @returns {gsap.core.Timeline}
 */
export function createSparkleBurst(sparkles) {
  const tl = gsap.timeline();
  tl.fromTo(
    sparkles,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(2)' }
  );
  tl.to(sparkles, { scale: 0, opacity: 0, duration: 0.3, stagger: 0.05, delay: 0.5 });
  return tl;
}

// ─── Aurora parallax ─────────────────────────────────────────────────────────
/**
 * Sets up GSAP ScrollTrigger parallax for aurora layers.
 * @param {HTMLElement[]} layers - array of layer elements
 * @param {HTMLElement} container - scroll container / trigger element
 */
export function setupAuroraParallax(layers, container) {
  layers.forEach((layer, i) => {
    const factor = (i + 1) * 0.15; // each layer moves at different speed
    gsap.to(layer, {
      yPercent: -30 * factor,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  });
}

export { gsap, ScrollTrigger };
