import { describe, expect, it } from 'vitest';
import { HOCKEY_HEAT_COLD } from '../hockeyHeatCold';

describe('hockeyHeatCold routine data', () => {
    it('includes valid heat/cold timed segments', () => {
        expect(HOCKEY_HEAT_COLD.length).toBeGreaterThan(0);
        for (const item of HOCKEY_HEAT_COLD) {
            expect(typeof item.name).toBe('string');
            expect(item.name).toMatch(/^(Heat|Cold)$/);
            expect(typeof item.time).toBe('number');
            expect(item.time).toBeGreaterThan(0);
        }
    });
});
