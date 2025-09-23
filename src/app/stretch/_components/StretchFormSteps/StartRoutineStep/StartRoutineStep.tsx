'use client';

import Link from 'next/link';
import {
    ROUTINE_STRINGS,
    type RoutineOption,
    STRETCH_TIME_STRINGS,
    type StretchTime,
} from '../../../_utils';

interface StartRoutineStepProps {
    routineChoice: RoutineOption;
    stretchTime: StretchTime;
}

export const StartRoutineStep = ({
    routineChoice,
    stretchTime,
}: StartRoutineStepProps) => {
    return (
        <div className="u-center-text">
            <h2>{ROUTINE_STRINGS[routineChoice]}</h2>
            <h2>Holding for {STRETCH_TIME_STRINGS[stretchTime]} per stretch</h2>
            <div className="u-center-row">
                <Link
                    href={`/stretch?type=${routineChoice}&time=${stretchTime}`}
                    className="u-button u-mt-lg"
                >
                    Let&apos;s go!
                </Link>
            </div>
        </div>
    );
};
