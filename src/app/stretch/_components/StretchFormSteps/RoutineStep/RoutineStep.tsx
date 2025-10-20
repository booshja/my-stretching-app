'use client';

import { ROUTINE_OPTIONS, type RoutineOption } from '../../../_utils';
import { HOCKEY } from '@/utils/routines/hockeyStretch';

interface RoutineStepProps {
    handleRoutineChoice: (routine: RoutineOption) => void;
}

export const RoutineStep = ({ handleRoutineChoice }: RoutineStepProps) => {
    const counts: Record<RoutineOption, number> = {
        [ROUTINE_OPTIONS.HOCKEY]: HOCKEY.length,
        [ROUTINE_OPTIONS.DAILY]: 0,
    };
    return (
        <div>
            <h2 className="text-center">Which routine would you like to do?</h2>
            <div>
                <button
                    className="u-button"
                    type="button"
                    onClick={() => handleRoutineChoice(ROUTINE_OPTIONS.HOCKEY)}
                >
                    Hockey Pre-Game
                </button>
                {counts[ROUTINE_OPTIONS.DAILY] > 0 && (
                    <button
                        className="u-button"
                        type="button"
                        onClick={() =>
                            handleRoutineChoice(ROUTINE_OPTIONS.DAILY)
                        }
                    >
                        Daily Stretch
                    </button>
                )}
            </div>
        </div>
    );
};
