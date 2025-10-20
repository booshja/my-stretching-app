import { describe, expect, it } from 'vitest';
import { getRoutineList } from '../getRoutineList';
import { TRANSITION_SECONDS } from '../time';
import type { DisplayItem } from '@/types';

describe('getRoutineList', () => {
    it('inserts transition items between each routine item', () => {
        const routine: DisplayItem[] = [
            { name: 'Heat', time: 60 },
            { name: 'Cold', time: 120 },
        ];
        const result = getRoutineList(routine);
        expect(result).toHaveLength(3);
        expect(result[1]).toMatchObject({
            name: 'Transition',
            time: TRANSITION_SECONDS,
        });
    });
});
