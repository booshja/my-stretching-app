import { describe, expect, it } from 'vitest';
import type { DisplayItem, Stretch, Transition } from '@/types';
import { shouldPauseTransition } from '../shouldPauseTransition';

const transition: Transition = {
    kind: 'transition',
    name: 'Transition',
    description: 'get ready',
    time: 5,
};

const baseStretch: Stretch = {
    kind: 'stretch',
    name: 'Hamstring stretch',
    description: 'stretch your hamstring',
    image: '/images/hamstring.jpg',
};

describe('shouldPauseTransition', () => {
    it('returns true when previous stretch requires manual pause and current item is transition', () => {
        const previous: Stretch = { ...baseStretch, pauseForNext: true };
        expect(
            shouldPauseTransition(previous as DisplayItem, transition as DisplayItem)
        ).toBe(true);
    });

    it('returns false when previous stretch does not request pause', () => {
        expect(
            shouldPauseTransition(baseStretch as DisplayItem, transition as DisplayItem)
        ).toBe(false);
    });

    it('returns false when current item is not a transition', () => {
        const previous: Stretch = { ...baseStretch, pauseForNext: true };
        expect(
            shouldPauseTransition(previous as DisplayItem, baseStretch as DisplayItem)
        ).toBe(false);
    });

    it('returns false when there is no previous item', () => {
        expect(shouldPauseTransition(null, transition as DisplayItem)).toBe(false);
    });
});
