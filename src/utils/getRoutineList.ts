import type { DisplayItem } from '@/types';

export const getRoutineList = (routine: DisplayItem[]) => {
    const routineWithTransitions: DisplayItem[] = [];

    routine.forEach((item, index) => {
        routineWithTransitions.push(item);
        if (index < routine.length - 1) {
            routineWithTransitions.push({
                name: 'Transition',
                description: `Get ready for ${routine[index + 1].name}`,
                time: 5,
            });
        }
    });

    return routineWithTransitions;
};
