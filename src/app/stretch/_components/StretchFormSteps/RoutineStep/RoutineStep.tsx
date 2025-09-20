'use client';

import { ROUTINE_OPTIONS, type RoutineOption } from '../../_utils';

interface RoutineStepProps {
    handleRoutineChoice: (routine: RoutineOption) => void;
}

export const RoutineStep = ({ handleRoutineChoice }: RoutineStepProps) => {
    return (
        <div>
            <h2>Which routine would you like to do?</h2>
            <div>
                <button
                    type="button"
                    onClick={() => handleRoutineChoice(ROUTINE_OPTIONS.HOCKEY)}
                >
                    Hockey Pre-Game
                </button>
                <button
                    type="button"
                    onClick={() => handleRoutineChoice(ROUTINE_OPTIONS.DAILY)}
                >
                    Daily Stretch
                </button>
            </div>
        </div>
    );
};
