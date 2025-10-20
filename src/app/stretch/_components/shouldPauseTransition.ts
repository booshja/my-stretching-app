import type { DisplayItem, Transition } from '@/types';

const isTransition = (item: DisplayItem | null): item is Transition => {
    return (
        item !== null &&
        'time' in item &&
        'description' in item &&
        (item as { name: string }).name === 'Transition'
    );
};

export const shouldPauseTransition = (
    prev: DisplayItem | null,
    current: DisplayItem | null
): boolean => {
    if (!isTransition(current)) return false;
    if (!prev || !('image' in prev)) return false;
    return !!(prev as unknown as { pauseForNext?: boolean }).pauseForNext;
};
