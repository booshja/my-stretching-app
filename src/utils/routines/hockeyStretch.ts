import type { Stretch } from '@/types';

const HOCKEY_BASE = [
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
    {
        name: 'Hip Flexor Stretch - LEFT',
        description: 'Standing hip flexor stretch',
        image: '/images/hip-flexor.jpg',
    },
    {
        name: 'Hip Flexor Stretch - RIGHT',
        description: 'Standing hip flexor stretch',
        image: '/images/hip-flexor.jpg',
        pauseForNext: true,
    },
    {
        name: 'Quad Stretch - LEFT',
        description: 'Standing quad stretch',
        image: '/images/standing-quad-stretch.jpeg',
        pauseForNext: true,
    },
    {
        name: 'Quad Stretch - RIGHT',
        description: 'Standing quad stretch',
        image: '/images/standing-quad-stretch.jpeg',
        pauseForNext: true,
    },
    {
        name: 'Standing Groin Stretch - LEFT',
        description: 'Lateral lunge stretching the groin',
        image: '/images/standing-lateral-groin-stretch.png',
    },
    {
        name: 'Standing Groin Stretch - RIGHT',
        description: 'Lateral lunge stretching the groin',
        image: '/images/standing-lateral-groin-stretch.png',
    },
    {
        name: 'Hamstring Stretch',
        description: 'Straight down hamstring stretch',
        image: '/images/standing-hamstring-stretch.jpg',
        pauseForNext: true,
    },
    {
        name: 'Laying glutes stretch - LEFT',
        description:
            'Sitting on the floor with left leg crossed over right, pulling your knee across',
        image: '/images/laying-glute-stretch.jpg',
    },
    {
        name: 'Laying glutes stretch - RIGHT',
        description:
            'Sitting on the floor with right leg crossed over left, pulling your knee across',
        image: '/images/laying-glute-stretch.jpg',
        pauseForNext: true,
    },
    {
        name: 'Seated piriformus stretch - RIGHT',
        description: 'Sitting in a chair with right ankle on left knee',
        image: '/images/seated-piriformis-stretch.webp',
    },
    {
        name: 'Seated piriformus stretch - LEFT',
        description: 'Sitting in a chair with left ankle on right knee',
        image: '/images/seated-piriformis-stretch.webp',
        pauseForNext: true,
    },
    {
        name: 'Shoulder stretch - LEFT',
        description: 'Left arm across body',
        image: '/images/shoulder-stretch-across-body.jpeg',
    },
    {
        name: 'Shoulder stretch - RIGHT',
        description: 'Right arm across body',
        image: '/images/shoulder-stretch-across-body.jpeg',
        pauseForNext: true,
    },
    {
        name: 'Lats stretch',
        description:
            'Both hands in front of you on a counter, bending over until you can feel it in your "wings"',
        image: '/images/lat-stretch.jpg',
    },
] as const;

export const HOCKEY: Stretch[] = HOCKEY_BASE.map((item) => ({
    ...item,
    kind: 'stretch',
}));
