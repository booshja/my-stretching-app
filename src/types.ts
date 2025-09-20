export interface Stretch {
    name: string;
    description: string;
    image: string;
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
