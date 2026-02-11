export const ROUTINE_OPTIONS = {
    HOCKEY: 'hockey',
    NECK: 'neck',
    BARE_MINIMUM: 'bareminimum',
    PREGAME: 'pregame',
    NIGHTTIME: 'nighttime',
} as const;

export type RoutineOption =
    (typeof ROUTINE_OPTIONS)[keyof typeof ROUTINE_OPTIONS];

export const ROUTINE_STRINGS = {
    hockey: 'Hockey Pre-Game',
    neck: 'Neck Stretches',
    bareminimum: 'Bare Minimum',
    pregame: 'Pre-Game Warmup',
    nighttime: 'Nighttime Stretch',
} as const;

export const STRETCH_TIMES = {
    TWENTY_SECONDS: 20,
    FORTY_FIVE_SECONDS: 45,
    ONE_MINUTE: 60,
} as const;

export type StretchTime = (typeof STRETCH_TIMES)[keyof typeof STRETCH_TIMES];

export const STRETCH_TIME_STRINGS = {
    20: '20 seconds',
    45: '45 seconds',
    60: '1 minute',
} as const;

export const STRETCH_FORM_STEPS = {
    ROUTINE: 'routine',
    LENGTH: 'length',
    START: 'start',
} as const;

export type StretchFormStep =
    (typeof STRETCH_FORM_STEPS)[keyof typeof STRETCH_FORM_STEPS];
