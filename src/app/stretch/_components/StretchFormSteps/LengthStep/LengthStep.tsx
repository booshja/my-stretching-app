'use client';

import {
    ROUTINE_STRINGS,
    type RoutineOption,
    STRETCH_TIMES,
    type StretchTime,
} from '../../../_utils';

interface LengthStepProps {
    handleStretchTimeChoice: (time: StretchTime) => void;
    routineChoice: RoutineOption;
}

export const LengthStep = ({
    handleStretchTimeChoice,
    routineChoice,
}: LengthStepProps) => {
    return (
        <div>
            <h2>How long would you like to hold each stretch?</h2>
            <h3>{ROUTINE_STRINGS[routineChoice]}</h3>
            <div>
                <button
                    type="button"
                    onClick={() =>
                        handleStretchTimeChoice(STRETCH_TIMES.ONE_MINUTE)
                    }
                >
                    1 minute
                </button>
                <button
                    type="button"
                    onClick={() =>
                        handleStretchTimeChoice(
                            STRETCH_TIMES.ONE_MINUTE_THIRTY_SECONDS
                        )
                    }
                >
                    1 minute 30 seconds
                </button>
            </div>
        </div>
    );
};
