import type { StaticImageData } from 'next/image';

export interface Stretch {
    name: string;
    description: string;
    image: StaticImageData;
}

export type Transition = Stretch;

export type StretchLength = 60 | 90;

export interface HeatCold {
    name: string;
    time: number;
}

export type DisplayItem = HeatCold | Stretch;
