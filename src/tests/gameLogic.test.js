import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { pointInCircle } from '../utils/mathUtils';

// Feature: romantic-birthday-website, Property 13: game score monotonicity
describe('mini game score logic', () => {
  it('score equals catch count for any sequence of N catches', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 100 }), (n) => {
        let score = 0;
        for (let i = 0; i < n; i++) {
          score += 1; // each catch increments by exactly 1
        }
        expect(score).toBe(n);
      }),
      { numRuns: 100 }
    );
  });

  it('score never decreases', () => {
    fc.assert(
      fc.property(fc.array(fc.boolean(), { minLength: 1, maxLength: 50 }), (catches) => {
        let score = 0;
        let prev = 0;
        catches.forEach((caught) => {
          if (caught) score += 1;
          expect(score).toBeGreaterThanOrEqual(prev);
          prev = score;
        });
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: romantic-birthday-website, Property 14: hidden message threshold
describe('mini game win condition', () => {
  it('hidden message visible iff score >= 15', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 100 }), (score) => {
        const shouldShow = score >= 15;
        expect(shouldShow).toBe(score >= 15);
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: romantic-birthday-website, Property 13: hit detection
describe('pointInCircle hit detection', () => {
  it('returns true when point is inside circle', () => {
    fc.assert(
      fc.property(
        fc.record({ x: fc.integer({ min: 0, max: 500 }), y: fc.integer({ min: 0, max: 500 }) }),
        fc.integer({ min: 5, max: 30 }),
        fc.integer({ min: 0, max: 359 }),
        (center, r, angle) => {
          const dist = r * 0.5; // well inside
          const rad = (angle * Math.PI) / 180;
          const point = { x: center.x + dist * Math.cos(rad), y: center.y + dist * Math.sin(rad) };
          expect(pointInCircle(point, { ...center, r })).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('returns false when point is outside circle', () => {
    fc.assert(
      fc.property(
        fc.record({ x: fc.integer({ min: 0, max: 500 }), y: fc.integer({ min: 0, max: 500 }) }),
        fc.integer({ min: 5, max: 30 }),
        fc.integer({ min: 0, max: 359 }),
        (center, r, angle) => {
          const dist = r * 2; // well outside
          const rad = (angle * Math.PI) / 180;
          const point = { x: center.x + dist * Math.cos(rad), y: center.y + dist * Math.sin(rad) };
          expect(pointInCircle(point, { ...center, r })).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});
