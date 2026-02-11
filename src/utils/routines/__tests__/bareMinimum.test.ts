import { describe, expect, it } from 'vitest';
import { BARE_MINIMUM } from '../bareMinimum';

describe('bareMinimum routine data', () => {
    it('uses public string image paths', () => {
        expect(BARE_MINIMUM.length).toBeGreaterThan(0);
        for (const item of BARE_MINIMUM) {
            expect(typeof item.image).toBe('string');
            expect(item.image).toMatch(/^\/images\//);
        }
    });
});
