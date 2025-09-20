import { describe, expect, it } from 'vitest';
import { HOCKEY } from '../hockeyStretch';

describe('hockeyStretch routine data', () => {
    it('uses public string image paths', () => {
        expect(HOCKEY.length).toBeGreaterThan(0);
        for (const item of HOCKEY) {
            expect(typeof item.image).toBe('string');
            expect(item.image).toMatch(/^\/images\//);
        }
    });
});
