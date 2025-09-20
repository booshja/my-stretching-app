'use client';

import Link from 'next/link';
import type { HeatColdRounds } from '../../_utils';

interface StartRoutineStepProps {
    rounds: HeatColdRounds;
}

export const StartRoutineStep = ({ rounds }: StartRoutineStepProps) => {
    return (
        <div>
            <p>Repeating for {rounds} rounds</p>
            <Link href={`/heatcold?rounds=${rounds}`}>Let&apos;s go!</Link>
        </div>
    );
};
