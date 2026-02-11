import { describe, expect, it } from 'vitest';
import { NECK_STRETCHES } from '../neckStretches';

describe('neckStretches routine data', () => {
    it('uses public string image paths', () => {
        expect(NECK_STRETCHES.length).toBeGreaterThan(0);
        for (const item of NECK_STRETCHES) {
            expect(typeof item.image).toBe('string');
            expect(item.image).toMatch(/^\/images\//);
        }
    });
});
