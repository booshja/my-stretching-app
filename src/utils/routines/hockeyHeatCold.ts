import type { HeatCold } from '@/types';

const HEAT_COLD_TIMES = {
    HEAT: 70,
    COLD: 130,
} as const;

export const HOCKEY_HEAT_COLD: HeatCold[] = [
    {
        name: 'Heat',
        time: HEAT_COLD_TIMES.HEAT,
    },
    {
        name: 'Cold',
        time: HEAT_COLD_TIMES.COLD,
    },
];
