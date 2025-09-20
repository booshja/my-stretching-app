export const TRANSITION = {
    time: 0,
};

export const routineChoices = {
    hockey: 'hockey',
    nighttime: 'nighttime',
    hockeyHeatCold: 'hockeyHeatCold',
} as const;

export const timeChoices = {
    sixty: '60',
    ninety: '90',
} as const;

export type RoutineChoice =
    (typeof routineChoices)[keyof typeof routineChoices];
export type TimeChoice = (typeof timeChoices)[keyof typeof timeChoices];
