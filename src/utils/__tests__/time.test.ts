import { describe, it, expect } from 'vitest';
import {
    TRANSITION_SECONDS,
    formatDurationPhrase,
    totalStretchSeconds,
    totalRoundsSeconds,
} from '../time';

describe('time utils', () => {
    it('formats durations as phrases', () => {
        expect(formatDurationPhrase(5)).toBe('5 sec');
        expect(formatDurationPhrase(65)).toBe('1 min 5 sec');
        expect(formatDurationPhrase(3665)).toBe('1 hr 1 min 5 sec');
    });

    it('computes total stretch seconds with transitions', () => {
        const numItems = 3;
        const per = 60;
        const expected = numItems * per + (numItems - 1) * TRANSITION_SECONDS;
        expect(totalStretchSeconds(numItems, per)).toBe(expected);
    });

    it('computes total rounds seconds with transitions across rounds', () => {
        const perItemTimes = [70, 130];
        const rounds = 3;
        const items = perItemTimes.length * rounds; // 6
        const transitions = items - 1; // 5
        const expected =
            perItemTimes.reduce((s, t) => s + t, 0) * rounds +
            transitions * TRANSITION_SECONDS;
        expect(totalRoundsSeconds(rounds, perItemTimes)).toBe(expected);
    });
});
