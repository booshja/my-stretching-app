import CalfStretch from '@/assets/images/standing-calf-stretch.webp';
import CrossedLegHamstringStretch from '@/assets/images/standing-leg-crossed-hamstrings-stretch.jpeg';
import FrontDeltStretch from '@/assets/images/front-delt-stretch.jpg';
import LateralGroinStretch from '@/assets/images/standing-lateral-groin-stretch.png';
import LatsStretch from '@/assets/images/lat-stretch.jpg';
import LayingGluteStretch from '@/assets/images/laying-glute-stretch.jpg';
import PeroneusStretch from '@/assets/images/peroneus-stretch.jpg';
import SeatedButterflyStretch from '@/assets/images/seated-butterfly-stretch.jpeg';
import SeatedLowerBackStretch from '@/assets/images/seated-lower-back-stretch.jpeg';
import SeatedPiriformusStretch from '@/assets/images/seated-piriformis-stretch.webp';
import ShoulderStretch from '@/assets/images/shoulder-stretch-across-body.jpeg';
import StandingHamstringStretch from '@/assets/images/standing-hamstring-stretch.jpg';
import StandingQuadStretch from '@/assets/images/standing-quad-stretch.jpeg';
import type { Stretch } from '@/types';

export const HOCKEY: Stretch[] = [
    {
        name: 'Calf Stretch - LEFT',
        description: 'Standing calf stretch',
        image: CalfStretch,
    },
    {
        name: 'Calf Stretch - RIGHT',
        description: 'Standing calf stretch',
        image: CalfStretch,
    },
    {
        name: 'Lateral Adductor Stretch - LEFT',
        description: 'Lateral lunge stretching the groin',
        image: LateralGroinStretch,
    },
    {
        name: 'Lateral Adductor Stretch - RIGHT',
        description: 'Lateral lunge stretching the groin',
        image: LateralGroinStretch,
    },
    {
        name: 'Peroneus Stretch - LEFT',
        description:
            'Standing leaning back to stretch outside of leg from knee to ankle',
        image: PeroneusStretch,
    },
    {
        name: 'Peroneus Stretch - RIGHT',
        description:
            'Standing leaning back to stretch outside of leg from knee to ankle',
        image: PeroneusStretch,
    },
    {
        name: 'Hamstring Stretch',
        description: 'Straight down hamstring stretch',
        image: StandingHamstringStretch,
    },
    {
        name: 'Legs crossed hamstring stretch - LEFT OVER',
        description:
            'Straight down hamstring stretch with left leg crossed over top',
        image: CrossedLegHamstringStretch,
    },
    {
        name: 'Legs crossed hamstring stretch - RIGHT OVER',
        description:
            'Straight down hamstring stretch with right leg crossed over top',
        image: CrossedLegHamstringStretch,
    },
    {
        name: 'Quad Stretch - LEFT',
        description: 'Standing quad stretch',
        image: StandingQuadStretch,
    },
    {
        name: 'Quad Stretch - RIGHT',
        description: 'Standing quad stretch',
        image: StandingQuadStretch,
    },
    {
        name: 'Seated piriformus stretch - RIGHT',
        description: 'Sitting in a chair with right ankle on left knee',
        image: SeatedPiriformusStretch,
    },
    {
        name: 'Seated piriformus stretch - LEFT',
        description: 'Sitting in a chair with left ankle on right knee',
        image: SeatedPiriformusStretch,
    },
    {
        name: 'Seated lower back stretch - RIGHT',
        description:
            'Sitting in a chair, leaning over to the left, with your hands toward your left ankle',
        image: SeatedLowerBackStretch,
    },
    {
        name: 'Seated lower back stretch - LEFT',
        description:
            'Sitting in a chair, leaning over to the right, with your hands toward your right ankle',
        image: SeatedLowerBackStretch,
    },
    {
        name: 'Laying glutes stretch - LEFT',
        description:
            'Sitting on the floor with left leg crossed over right, pulling your knee across',
        image: LayingGluteStretch,
    },
    {
        name: 'Laying glutes stretch - RIGHT',
        description:
            'Sitting on the floor with right leg crossed over left, pulling your knee across',
        image: LayingGluteStretch,
    },
    {
        name: 'Seated butterfly stretch',
        description: 'Sitting on the floor, feet together, knees out',
        image: SeatedButterflyStretch,
    },
    {
        name: 'Shoulder stretch - LEFT',
        description: 'Left arm across body',
        image: ShoulderStretch,
    },
    {
        name: 'Shoulder stretch - RIGHT',
        description: 'Right arm across body',
        image: ShoulderStretch,
    },
    {
        name: 'Anterior deltoid stretch - LEFT',
        description: 'Hand on the wall behind you, turning away',
        image: FrontDeltStretch,
    },
    {
        name: 'Anterior deltoid stretch - RIGHT',
        description: 'Hand on the wall behind you, turning away',
        image: FrontDeltStretch,
    },
    {
        name: 'Lats stretch',
        description:
            'Both hands in front of you on a counter, bending over until you can feel it in your "wings"',
        image: LatsStretch,
    },
];
