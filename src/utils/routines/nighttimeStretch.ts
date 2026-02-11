import type { Stretch } from '@/types';

const NIGHTTIME_BASE = [
    // hip flexors
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
    // calves
    {
        name: 'Calf Stretch - LEFT',
        description: 'Standing calf stretch',
        image: '/images/standing-calf-stretch.webp',
    },
    {
        name: 'Calf Stretch - RIGHT',
        description: 'Standing calf stretch',
        image: '/images/standing-calf-stretch.webp',
        pauseForNext: true,
    },
    // glutes
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
    // groin
    {
        name: 'Standing Groin Stretch - LEFT',
        description: 'Lateral lunge stretching the groin',
        image: '/images/standing-lateral-groin-stretch.png',
    },
    {
        name: 'Standing Groin Stretch - RIGHT',
        description: 'Lateral lunge stretching the groin',
        image: '/images/standing-lateral-groin-stretch.png',
        pauseForNext: true,
    },
    // lower back
    {
        name: 'Seated lower back stretch - RIGHT',
        description:
            'Sitting in a chair, leaning over to the left, with your hands toward your left ankle',
        image: '/images/seated-lower-back-stretch.jpeg',
    },
    {
        name: 'Seated lower back stretch - LEFT',
        description:
            'Sitting in a chair, leaning over to the right, with your hands toward your right ankle',
        image: '/images/seated-lower-back-stretch.jpeg',
    },
] as const;

export const NIGHTTIME: Stretch[] = NIGHTTIME_BASE.map((item) => ({
    ...item,
    kind: 'stretch',
}));
