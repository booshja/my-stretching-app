'use client';

import { ROUTINE_OPTIONS, type RoutineOption } from '../../../_utils';

interface RoutineStepProps {
    handleRoutineChoice: (routine: RoutineOption) => void;
}

export const RoutineStep = ({ handleRoutineChoice }: RoutineStepProps) => {
    return (
        <div>
            <h2 className="text-center">Which routine would you like to do?</h2>
            <div className="text-center">
                <button
                    className="u-button"
                    type="button"
                    onClick={() => handleRoutineChoice(ROUTINE_OPTIONS.HOCKEY)}
                >
                    Hockey Pre-Game
                </button>

                <button
                    className="u-button"
                    type="button"
                    onClick={() =>
                        handleRoutineChoice(ROUTINE_OPTIONS.NIGHTTIME)
                    }
                >
                    Nighttime Stretch
                </button>

                <button
                    className="u-button"
                    type="button"
                    onClick={() =>
                        handleRoutineChoice(ROUTINE_OPTIONS.BARE_MINIMUM)
                    }
                >
                    Bare Minimum (Nightly)
                </button>

                <button
                    className="u-button"
                    type="button"
                    onClick={() => handleRoutineChoice(ROUTINE_OPTIONS.NECK)}
                >
                    Neck Stretches
                </button>
            </div>
        </div>
    );
};
