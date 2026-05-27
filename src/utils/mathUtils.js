/**
 * Math utility functions for animations and interactions.
 */

/**
 * Linear interpolation between a and b by factor t.
 * @param {number} a - start value
 * @param {number} b - end value
 * @param {number} t - factor 0–1
 * @returns {number}
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Clamp a value between min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate a random number between min (inclusive) and max (exclusive).
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Generate a random integer between min (inclusive) and max (inclusive).
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Compute parallax offset for a layer.
 * @param {number} input - scroll position or cursor offset
 * @param {number} factor - parallax speed multiplier
 * @returns {number} - pixel offset to apply
 */
export function parallaxOffset(input, factor) {
  return input * factor;
}

/**
 * Compute velocity delta for a particle based on cursor proximity.
 * Returns a repulsion vector if distance < 100px, zero vector otherwise.
 *
 * @param {{ x: number, y: number }} particle - particle position
 * @param {{ x: number, y: number }} cursor - cursor position
 * @param {number} [radius=100] - repulsion radius in px
 * @param {number} [strength=2] - repulsion strength multiplier
 * @returns {{ vx: number, vy: number }}
 */
export function computeParticleVelocityDelta(particle, cursor, radius = 100, strength = 2) {
  const dx = particle.x - cursor.x;
  const dy = particle.y - cursor.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance >= radius || distance === 0) {
    return { vx: 0, vy: 0 };
  }

  // Repulsion force: stronger when closer
  const force = (1 - distance / radius) * strength;
  const vx = (dx / distance) * force;
  const vy = (dy / distance) * force;

  return { vx, vy };
}

/**
 * Euclidean distance between two points.
 */
export function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

/**
 * Check if a point is inside a circle (for mini game hit detection).
 * @param {{ x: number, y: number }} point
 * @param {{ x: number, y: number, r: number }} circle
 * @returns {boolean}
 */
export function pointInCircle(point, circle) {
  return distance(point, circle) <= circle.r;
}

/**
 * Map a value from one range to another.
 */
export function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}
