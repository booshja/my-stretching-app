'use client';

import {
    ROUTINE_STRINGS,
    type RoutineOption,
    STRETCH_TIMES,
    type StretchTime,
} from '../../../_utils';
import { HOCKEY } from '@/utils/routines/hockeyStretch';
import { NECK_STRETCHES } from '@/utils/routines/neckStretches';
import { BARE_MINIMUM } from '@/utils/routines/bareMinimum';
import { PRE_GAME_WARMUP } from '@/utils/routines/preGameWarmup';
import { NIGHTTIME } from '@/utils/routines/nighttimeStretch';
import {
    TRANSITION_SECONDS,
    formatDurationPhrase,
    totalStretchSeconds,
} from '@/utils/time';

interface LengthStepProps {
    handleStretchTimeChoice: (time: StretchTime) => void;
    routineChoice: RoutineOption;
    onBack?: () => void;
}

export const LengthStep = ({
    handleStretchTimeChoice,
    routineChoice,
    onBack,
}: LengthStepProps) => {
    const base = (() => {
        switch (routineChoice) {
            case 'hockey':
                return HOCKEY;
            case 'neck':
                return NECK_STRETCHES;
            case 'bareminimum':
                return BARE_MINIMUM;
            case 'pregame':
                return PRE_GAME_WARMUP;
            case 'nighttime':
                return NIGHTTIME;
            default:
                return [];
        }
    })();
    const numItems = base.length;

    if (numItems === 0) {
        return (
            <div className="u-center-text">
                <p>No stretches found.</p>
                {onBack && (
                    <button className="u-button" type="button" onClick={onBack}>
                        Back
                    </button>
                )}
            </div>
        );
    }

    const totalLabel = (secondsPerStretch: number) =>
        formatDurationPhrase(
            totalStretchSeconds(numItems, secondsPerStretch, TRANSITION_SECONDS)
        );

    return (
        <div>
            <h2 className="text-center">
                How long would you like to hold each stretch?
            </h2>
            <h3 className="text-center">{ROUTINE_STRINGS[routineChoice]}</h3>
            <div className="text-center">
                {process.env.NODE_ENV === 'development' && (
                    <button
                        className="u-button"
                        type="button"
                        onClick={() =>
                            handleStretchTimeChoice(
                                STRETCH_TIMES.TWENTY_SECONDS
                            )
                        }
                        aria-label={`20 seconds, about ${totalLabel(20)} total`}
                    >
                        20 seconds (test) ({totalLabel(20)} total)
                    </button>
                )}
                <button
                    className="u-button"
                    type="button"
                    onClick={() =>
                        handleStretchTimeChoice(
                            STRETCH_TIMES.FORTY_FIVE_SECONDS
                        )
                    }
                    aria-label={`45 seconds, about ${totalLabel(45)} total`}
                >
                    45 seconds ({totalLabel(45)} total)
                </button>
                <button
                    className="u-button"
                    type="button"
                    onClick={() =>
                        handleStretchTimeChoice(STRETCH_TIMES.ONE_MINUTE)
                    }
                    aria-label={`1 minute, about ${totalLabel(60)} total`}
                >
                    1 minute ({totalLabel(60)} total)
                </button>
            </div>
        </div>
    );
};
