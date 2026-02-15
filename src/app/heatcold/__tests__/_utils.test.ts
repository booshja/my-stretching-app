import { describe, expect, it } from 'vitest';
import { HEAT_COLD_FORM_STEPS, HEAT_COLD_ROUNDS } from '../_utils';

describe('heatcold _utils', () => {
    it('defines rounds and form steps', () => {
        expect(HEAT_COLD_ROUNDS.ONE).toBe(1);
        expect(HEAT_COLD_ROUNDS.THREE).toBe(3);
        expect('FOUR' in HEAT_COLD_ROUNDS).toBe(false);
        expect(HEAT_COLD_FORM_STEPS.ROUNDS).toBe('rounds');
        expect(HEAT_COLD_FORM_STEPS.START).toBe('start');
    });
});
