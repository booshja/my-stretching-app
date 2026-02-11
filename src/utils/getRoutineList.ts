import type { DisplayItem } from '@/types';
import { TRANSITION_SECONDS } from './time';

export const getRoutineList = (routine: DisplayItem[]) => {
    const routineWithTransitions: DisplayItem[] = [];

    routine.forEach((item, index) => {
        routineWithTransitions.push(item);
        if (index < routine.length - 1) {
            routineWithTransitions.push({
                kind: 'transition',
                name: 'Transition',
                description: `Get ready for ${routine[index + 1].name}`,
                time: TRANSITION_SECONDS,
            });
        }
    });

    return routineWithTransitions;
};
