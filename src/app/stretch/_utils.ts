export const ROUTINE_OPTIONS = {
    HOCKEY: 'hockey',
    DAILY: 'daily',
    NECK: 'neck',
} as const;

export type RoutineOption =
    (typeof ROUTINE_OPTIONS)[keyof typeof ROUTINE_OPTIONS];

export const ROUTINE_STRINGS = {
    hockey: 'Hockey Pre-Game',
    daily: 'Daily Stretch',
    neck: 'Neck Stretches',
} as const;

export const STRETCH_TIMES = {
    TWENTY_SECONDS: 20,
    ONE_MINUTE: 60,
    ONE_MINUTE_THIRTY_SECONDS: 90,
} as const;

export type StretchTime = (typeof STRETCH_TIMES)[keyof typeof STRETCH_TIMES];

export const STRETCH_TIME_STRINGS = {
    20: '20 seconds',
    60: '1 minute',
    90: '1 minute 30 seconds',
} as const;

export const STRETCH_FORM_STEPS = {
    ROUTINE: 'routine',
    LENGTH: 'length',
    START: 'start',
} as const;

export type StretchFormStep =
    (typeof STRETCH_FORM_STEPS)[keyof typeof STRETCH_FORM_STEPS];
