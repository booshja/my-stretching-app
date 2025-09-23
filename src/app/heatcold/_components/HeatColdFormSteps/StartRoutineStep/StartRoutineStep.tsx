'use client';

import Link from 'next/link';
import type { HeatColdRounds } from '../../../_utils';

interface StartRoutineStepProps {
    rounds: HeatColdRounds;
}

export const StartRoutineStep = ({ rounds }: StartRoutineStepProps) => {
    return (
        <div>
            <p className="text-center">Repeating for {rounds} rounds</p>
            <Link
                href={`/heatcold?rounds=${rounds}`}
                className="u-button u-mt-lg"
            >
                Let&apos;s go!
            </Link>
        </div>
    );
};
