interface Warmup {
    name: string;
    description: string;
    image: string;
    link: string | null;
}

export interface WarmupStretch extends Warmup {
    time: number;
}

export interface WarmupActivity extends Warmup {
    activity: boolean;
}

export type WarmupItem = WarmupStretch | WarmupActivity;

export const PRE_GAME_WARMUP: Array<WarmupStretch | WarmupActivity> = [
    {
        name: 'Hip Flexor Stretch',
        description: 'Hip flexor stretch - First side',
        image: '/images/hip-flexor.jpg',
        link: null,
        time: 30,
    },
    {
        name: 'Hip Flexor Stretch',
        description: 'Hip flexor stretch - Second side',
        image: '/images/hip-flexor.jpg',
        link: null,
        time: 30,
    },
    {
        name: '90/90 Hip Rotations - 8 each side',
        description: '90/90 hip rotations - 8 each side',
        image: '/images/90-90-stretch.png',
        link: 'https://youtu.be/f_7qIPxw6nE?si=MuJ21QN485QaRFFB&t=17',
        activity: true,
    },
    {
        name: 'Glute Bridges - 2 x 12 with hold',
        description: '2 x 12 with hold (1s ⬆️/2s ✋/2s ⬇️)',
        image: '/images/glute-bridge.jpg',
        link: 'https://youtu.be/Q_Bpj91Yiis?si=6k3cO3bdmOeDrWBT&t=62',
        activity: true,
    },
    {
        name: 'Cat-cow - 5 reps',
        description: 'Cat-cow - 5 reps (3s ⬆️ / 1s ✋ / 3s ⬇️)',
        image: '/images/cat-cow.avif',
        link: 'https://youtu.be/_70mEnB_bX0?si=n9wkdwc6nJpC68MB',
        activity: true,
    },
    {
        name: 'Bodyweight squats - 10 reps',
        description: 'Bodyweight squats - 10 reps',
        image: 'images/bodywweight-squat.webp',
        link: 'https://youtu.be/8uoaYwS6iFM?si=sdEzeTGGAJFe-Pqk&t=42',
        activity: true,
    },
    {
        name: 'Skating stance holds - 15s x 2-3',
        description: 'Skating stance holds - 15s x 2-3',
        image: 'images/skating-stance.jpg',
        link: 'https://youtu.be/VT5OZe07N9U?si=yC76s0b4twWZAx-C&t=249',
        activity: true,
    },
    {
        name: 'Walking lunges - 6-8 steps ea way',
        description: 'Walking lunges - 6-8 steps ea way',
        image: '/images/walking-lunge.webp',
        link: null,
        activity: true,
    },
];
