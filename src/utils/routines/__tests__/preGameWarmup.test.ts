import { describe, expect, it } from 'vitest';
import { PRE_GAME_WARMUP } from '../preGameWarmup';

describe('preGameWarmup routine data', () => {
    it('uses public string image paths', () => {
        expect(PRE_GAME_WARMUP.length).toBeGreaterThan(0);
        for (const item of PRE_GAME_WARMUP) {
            expect(typeof item.image).toBe('string');
            expect(item.image).toMatch(/^\/images\//);
        }
    });
});
