import type { DisplayItem, Transition } from '@/types';

const isTransition = (item: DisplayItem | null): item is Transition => {
    return item !== null && item.kind === 'transition';
};

export const shouldPauseTransition = (
    prev: DisplayItem | null,
    current: DisplayItem | null
): boolean => {
    if (!isTransition(current)) return false;
    if (!prev || prev.kind !== 'stretch') return false;
    return !!prev.pauseForNext;
};
