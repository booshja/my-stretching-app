import type { Stretch } from '@/types';

const BARE_MINIMUM_BASE = [
    {
        name: 'Hip Flexor Stretch - LEFT',
        description: 'Standing hip flexor stretch',
        image: '/images/hip-flexor.jpg',
    },
    {
        name: 'Hip Flexor Stretch - RIGHT',
        description: 'Standing hip flexor stretch',
        image: '/images/hip-flexor.jpg',
    },
    {
        name: 'Calf Stretch - LEFT',
        description: 'Standing calf stretch',
        image: '/images/standing-calf-stretch.webp',
    },
    {
        name: 'Calf Stretch - RIGHT',
        description: 'Standing calf stretch',
        image: '/images/standing-calf-stretch.webp',
    },
] as const;

export const BARE_MINIMUM: Stretch[] = BARE_MINIMUM_BASE.map((item) => ({
    ...item,
    kind: 'stretch',
}));
