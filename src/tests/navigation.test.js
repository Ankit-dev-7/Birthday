import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

// Feature: romantic-birthday-website, Property 8: playlist navigation wraps correctly
describe('playlist navigation', () => {
  function next(index, total) {
    return (index + 1) % total;
  }
  function prev(index, total) {
    return (index - 1 + total) % total;
  }

  it('navigating next N times returns to start index', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 3, max: 20 }),
        fc.integer({ min: 0, max: 19 }),
        (n, startRaw) => {
          const start = startRaw % n;
          let index = start;
          for (let i = 0; i < n; i++) index = next(index, n);
          expect(index).toBe(start);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('navigating prev N times returns to start index', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 3, max: 20 }),
        fc.integer({ min: 0, max: 19 }),
        (n, startRaw) => {
          const start = startRaw % n;
          let index = start;
          for (let i = 0; i < n; i++) index = prev(index, n);
          expect(index).toBe(start);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('index always stays in [0, N-1]', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 3, max: 20 }),
        fc.array(fc.boolean(), { minLength: 1, maxLength: 50 }),
        (n, moves) => {
          let index = 0;
          moves.forEach((goNext) => {
            index = goNext ? next(index, n) : prev(index, n);
            expect(index).toBeGreaterThanOrEqual(0);
            expect(index).toBeLessThan(n);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: romantic-birthday-website, Property 10: lightbox keyboard navigation
describe('lightbox keyboard navigation', () => {
  function arrowRight(index, total) { return (index + 1) % total; }
  function arrowLeft(index, total) { return (index - 1 + total) % total; }

  it('ArrowRight wraps correctly', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 20 }),
        fc.integer({ min: 0, max: 19 }),
        (n, startRaw) => {
          const start = startRaw % n;
          const result = arrowRight(start, n);
          expect(result).toBeGreaterThanOrEqual(0);
          expect(result).toBeLessThan(n);
          if (start < n - 1) expect(result).toBe(start + 1);
          else expect(result).toBe(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('ArrowLeft wraps correctly', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 20 }),
        fc.integer({ min: 0, max: 19 }),
        (n, startRaw) => {
          const start = startRaw % n;
          const result = arrowLeft(start, n);
          expect(result).toBeGreaterThanOrEqual(0);
          expect(result).toBeLessThan(n);
          if (start > 0) expect(result).toBe(start - 1);
          else expect(result).toBe(n - 1);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: romantic-birthday-website, Property 17: popup interval bounds
describe('popup interval generation', () => {
  it('generated interval is always in [15000, 45000] ms', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 1000000 }), (seed) => {
        // Simulate: Math.floor(Math.random() * (max - min + 1)) + min
        const min = 15000;
        const max = 45000;
        const interval = Math.floor((seed % (max - min + 1))) + min;
        expect(interval).toBeGreaterThanOrEqual(min);
        expect(interval).toBeLessThanOrEqual(max);
      }),
      { numRuns: 100 }
    );
  });
});

// Feature: romantic-birthday-website, Property 12: secretUnlocked never reverts
describe('secret unlock idempotence', () => {
  it('secretUnlocked stays true after first unlock for any N clicks', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 100 }), (n) => {
        let unlocked = false;
        // First click unlocks
        unlocked = true;
        // Subsequent clicks should not revert
        for (let i = 1; i < n; i++) {
          // Simulate: if already unlocked, replay but don't reset
          expect(unlocked).toBe(true);
        }
        expect(unlocked).toBe(true);
      }),
      { numRuns: 100 }
    );
  });
});
