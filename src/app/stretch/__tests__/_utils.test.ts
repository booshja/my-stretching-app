import { describe, expect, it } from 'vitest';
import {
    ROUTINE_OPTIONS,
    ROUTINE_STRINGS,
    STRETCH_FORM_STEPS,
    STRETCH_TIMES,
} from '../_utils';

describe('stretch _utils', () => {
    it('defines expected routine options and labels', () => {
        expect(ROUTINE_OPTIONS.HOCKEY).toBe('hockey');
        expect(ROUTINE_STRINGS.nighttime).toMatch(/nighttime/i);
    });

    it('defines stretch durations and steps', () => {
        expect(STRETCH_TIMES.FORTY_FIVE_SECONDS).toBe(45);
        expect(STRETCH_FORM_STEPS.START).toBe('start');
    });
});
