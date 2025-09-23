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
            <h2 className="text-center">
                How long would you like to hold each stretch?
            </h2>
            <h3 className="text-center">{ROUTINE_STRINGS[routineChoice]}</h3>
            <div>
                {process.env.NODE_ENV === 'development' && (
                    <button
                        className="u-button"
                        type="button"
                        onClick={() =>
                            handleStretchTimeChoice(
                                STRETCH_TIMES.TWENTY_SECONDS
                            )
                        }
                    >
                        20 seconds (test)
                    </button>
                )}
                <button
                    className="u-button"
                    type="button"
                    onClick={() =>
                        handleStretchTimeChoice(STRETCH_TIMES.ONE_MINUTE)
                    }
                >
                    1 minute
                </button>
                <button
                    className="u-button"
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
