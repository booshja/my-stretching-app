export interface Stretch {
    name: string;
    description: string;
    image: string;
    // When true, the following Transition should wait for user input before starting
    pauseForNext?: boolean;
}

export interface Transition {
    name: string;
    description: string;
    time: number;
}

export type StretchLength = 60 | 90;

export interface HeatCold {
    name: string;
    time: number;
}

export type DisplayItem = HeatCold | Stretch | Transition;
