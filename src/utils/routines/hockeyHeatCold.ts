import type { HeatCold } from '@/types';

const HEAT_COLD_TIMES = {
    HEAT: 130,
    COLD: 70,
} as const;

export const HOCKEY_HEAT_COLD_FINAL_HEAT_SECONDS = 190;

const HOCKEY_HEAT_COLD_BASE = [
    {
        name: 'Heat',
        time: HEAT_COLD_TIMES.HEAT,
    },
    {
        name: 'Cold',
        time: HEAT_COLD_TIMES.COLD,
    },
] as const;

export const HOCKEY_HEAT_COLD: HeatCold[] = HOCKEY_HEAT_COLD_BASE.map(
    (item) => ({
        ...item,
        kind: 'heatcold',
    }),
);
