interface Warmup {
    kind: 'stretch';
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
type WarmupItemBase = Omit<WarmupStretch, 'kind'> | Omit<WarmupActivity, 'kind'>;

const PRE_GAME_WARMUP_BASE: WarmupItemBase[] = [
    // Before getting dressed
    // total time: 5-8 minutes

    // calf raises - 2 x 10
    //    (slow, controlled. focus on smooth motion, not burn)
    {
        name: 'Calf Raises (Slow, Controlled, Smooth)',
        description: 'Calf raises - 2 x 10',
        image: '/images/calf-raises.webp',
        link: null,
        activity: true,
    },
    // glutes - standing hip extensions - 2 x 10
    {
        name: 'Standing Hip Extensions',
        description: 'Standing hip extensions - 2 x 10',
        image: '/images/standing-hip-extension.webp',
        link: null,
        activity: true,
    },
    // standing hip abductions - 2 x 10
    {
        name: 'Standing Hip Abductions',
        description: 'Standing hip abductions - 2 x 10',
        image: '/images/standing-hip-abduction.png',
        link: null,
        activity: true,
    },
    // gentle side lunges (shallow) - 1 x 8 per side
    {
        name: 'Side Lunges (Shallow)',
        description: 'Gentle side lunges - 1 x 8 per side',
        image: '/images/side-lunge.jpg',
        link: null,
        activity: true,
    },
];

export const PRE_GAME_WARMUP: WarmupItem[] = PRE_GAME_WARMUP_BASE.map((item) => ({
    ...item,
    kind: 'stretch',
}));
