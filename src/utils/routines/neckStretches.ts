import type { Stretch } from '@/types';

const NECK_STRETCHES_BASE = [
    {
        name: 'Horizontally to the left - LEFT',
        description: 'Neck stretch to the left',
        image: '/images/horizontal-neck-stretch.png',
    },
    {
        name: 'Horizontally to the right - RIGHT',
        description: 'Neck stretch to the right',
        image: '/images/horizontal-neck-stretch.png',
    },
    {
        name: 'Down toward the left armpit - LEFT',
        description: 'Neck stretch to the left',
        image: '/images/downward-neck-stretch.png',
    },
    {
        name: 'Down toward the right armpit - RIGHT',
        description: 'Neck stretch to the right',
        image: '/images/downward-neck-stretch.png',
    },
    {
        name: 'Up and over to the left ceiling - LEFT',
        description: 'Neck stretch to the left',
        image: '/images/upward-neck-stretch.png',
    },
    {
        name: 'Up and over to the right ceiling - RIGHT',
        description: 'Neck stretch to the right',
        image: '/images/upward-neck-stretch.png',
    },
] as const;

export const NECK_STRETCHES: Stretch[] = NECK_STRETCHES_BASE.map((item) => ({
    ...item,
    kind: 'stretch',
}));
