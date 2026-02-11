export interface Stretch {
    kind: 'stretch';
    name: string;
    description: string;
    image: string;
    // When true, the following Transition should wait for user input before starting
    pauseForNext?: boolean;
}

export interface Transition {
    kind: 'transition';
    name: string;
    description: string;
    time: number;
}

export type StretchLength = 45 | 60;

export interface HeatCold {
    kind: 'heatcold';
    name: string;
    time: number;
}

export type DisplayItem = HeatCold | Stretch | Transition;
