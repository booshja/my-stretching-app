import { describe, expect, it } from 'vitest';
import { NIGHTTIME } from '../nighttimeStretch';

describe('nighttimeStretch routine data', () => {
    it('uses public string image paths', () => {
        expect(NIGHTTIME.length).toBeGreaterThan(0);
        for (const item of NIGHTTIME) {
            expect(typeof item.image).toBe('string');
            expect(item.image).toMatch(/^\/images\//);
        }
    });
});
