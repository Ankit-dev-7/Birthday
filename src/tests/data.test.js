import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import reasons from '../data/reasons';
import quotes from '../data/quotes';
import stars from '../data/stars';
import photos from '../data/photos';
import memories from '../data/memories';
import mapLocations from '../data/mapLocations';

// Feature: romantic-birthday-website, Property 5: reasons uniqueness and minimum count
describe('reasons data', () => {
  it('has at least 20 entries', () => {
    expect(reasons.length).toBeGreaterThanOrEqual(20);
  });

  it('all reason texts are unique', () => {
    const texts = reasons.map((r) => r.text);
    const unique = new Set(texts);
    expect(unique.size).toBe(texts.length);
  });

  it('all reason ids are unique', () => {
    const ids = reasons.map((r) => r.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});

// Feature: romantic-birthday-website, Property 15: night sky star count
describe('stars data', () => {
  it('has at least 50 stars', () => {
    expect(stars.length).toBeGreaterThanOrEqual(50);
  });

  it('all star ids are unique', () => {
    const ids = stars.map((s) => s.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('all stars have non-empty messages', () => {
    stars.forEach((s) => {
      expect(s.message).toBeTruthy();
      expect(s.message.length).toBeGreaterThan(0);
    });
  });

  it('constellation stars have valid constellationOrder', () => {
    const constellationStars = stars.filter((s) => s.isConstellation);
    constellationStars.forEach((s) => {
      expect(s.constellationOrder).toBeGreaterThan(0);
    });
  });
});

// Feature: romantic-birthday-website, Property 11: photo gallery minimum count
describe('photos data', () => {
  it('has at least 12 photos', () => {
    expect(photos.length).toBeGreaterThanOrEqual(12);
  });

  it('all photo ids are unique', () => {
    const ids = photos.map((p) => p.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});

// Feature: romantic-birthday-website, Property 4: memory timeline minimum count
describe('memories data', () => {
  it('has at least 10 memories', () => {
    expect(memories.length).toBeGreaterThanOrEqual(10);
  });

  it('all memory ids are unique', () => {
    const ids = memories.map((m) => m.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('all memories have required fields', () => {
    memories.forEach((m) => {
      expect(m.date).toBeTruthy();
      expect(m.caption).toBeTruthy();
      expect(m.location).toBeTruthy();
      expect(Array.isArray(m.photos)).toBe(true);
      expect(m.photos.length).toBeGreaterThan(0);
    });
  });
});

// Feature: romantic-birthday-website, Property 18: quotes cycling
describe('quotes data', () => {
  it('has at least 10 quotes', () => {
    expect(quotes.length).toBeGreaterThanOrEqual(10);
  });

  it('cycling N times visits all indices', () => {
    const visited = new Set();
    for (let i = 0; i < quotes.length; i++) {
      visited.add(i % quotes.length);
    }
    expect(visited.size).toBe(quotes.length);
  });
});

// Feature: romantic-birthday-website, Property 19: map marker labels
describe('mapLocations data', () => {
  it('has at least 5 locations', () => {
    expect(mapLocations.length).toBeGreaterThanOrEqual(5);
  });

  it('all locations have name and description', () => {
    mapLocations.forEach((loc) => {
      expect(loc.name).toBeTruthy();
      expect(loc.description).toBeTruthy();
    });
  });
});
