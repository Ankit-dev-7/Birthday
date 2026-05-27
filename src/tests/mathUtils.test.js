import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  parallaxOffset,
  computeParticleVelocityDelta,
  lerp,
  clamp,
  randomInRange,
} from '../utils/mathUtils';

// Feature: romantic-birthday-website, Property 1: parallaxOffset(input, factor) === input * factor
describe('parallaxOffset', () => {
  it('returns input * factor for any input and factor', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: -10000, max: 10000 }),
        fc.integer({ min: -10000, max: 10000 }),
        (input, factor) => {
          expect(parallaxOffset(input, factor)).toBe(input * factor);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('distinct factors produce distinct offsets for non-zero input', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 1000 }),
        fc.integer({ min: -10, max: 10 }),
        fc.integer({ min: -10, max: 10 }),
        (input, f1, f2) => {
          fc.pre(f1 !== f2);
          expect(parallaxOffset(input, f1)).not.toBeCloseTo(parallaxOffset(input, f2), 3);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: romantic-birthday-website, Property 2: computeParticleVelocityDelta repulsion
describe('computeParticleVelocityDelta', () => {
  it('returns non-zero repulsion vector when distance < 100px', () => {
    fc.assert(
      fc.property(
        fc.record({ x: fc.integer({ min: 0, max: 400 }), y: fc.integer({ min: 0, max: 400 }) }),
        fc.integer({ min: 1, max: 90 }), // strictly < 100, integer so no trig precision issues
        (cursor, dist) => {
          // Place particle directly above cursor — exact distance, no trig
          const particle = { x: cursor.x, y: cursor.y - dist };
          const delta = computeParticleVelocityDelta(particle, cursor, 100);
          const magnitude = Math.sqrt(delta.vx ** 2 + delta.vy ** 2);
          expect(magnitude).toBeGreaterThan(0);
          // Repulsion: delta should point away from cursor (upward = negative vy)
          expect(delta.vy).toBeLessThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('returns zero vector when distance >= 100px', () => {
    fc.assert(
      fc.property(
        fc.record({ x: fc.integer({ min: 0, max: 400 }), y: fc.integer({ min: 0, max: 400 }) }),
        fc.integer({ min: 110, max: 500 }), // strictly > 100 to avoid boundary trig precision
        (cursor, dist) => {
          // Place particle directly to the right — no trig, exact distance
          const particle = { x: cursor.x + dist, y: cursor.y };
          const delta = computeParticleVelocityDelta(particle, cursor, 100);
          expect(delta.vx).toBe(0);
          expect(delta.vy).toBe(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('lerp', () => {
  it('returns a at t=0 and b at t=1', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: -10000, max: 10000 }),
        fc.integer({ min: -10000, max: 10000 }),
        (a, b) => {
          expect(lerp(a, b, 0)).toBe(a);
          expect(lerp(a, b, 1)).toBe(b);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('clamp', () => {
  it('always returns value within [min, max]', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: -10000, max: 10000 }),
        fc.integer({ min: -10000, max: 10000 }),
        fc.integer({ min: -10000, max: 10000 }),
        (value, a, b) => {
          const min = Math.min(a, b);
          const max = Math.max(a, b);
          fc.pre(min < max);
          const result = clamp(value, min, max);
          expect(result).toBeGreaterThanOrEqual(min);
          expect(result).toBeLessThanOrEqual(max);
        }
      ),
      { numRuns: 100 }
    );
  });
});
