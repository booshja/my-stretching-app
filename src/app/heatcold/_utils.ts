export const HEAT_COLD_ROUNDS = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
} as const;

export type HeatColdRounds =
    (typeof HEAT_COLD_ROUNDS)[keyof typeof HEAT_COLD_ROUNDS];

export const HEAT_COLD_FORM_STEPS = {
    ROUNDS: 'rounds',
    START: 'start',
} as const;

export type HeatColdFormStep =
    (typeof HEAT_COLD_FORM_STEPS)[keyof typeof HEAT_COLD_FORM_STEPS];
