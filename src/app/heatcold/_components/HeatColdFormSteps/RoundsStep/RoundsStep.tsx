'use client';

import { HEAT_COLD_ROUNDS, type HeatColdRounds } from '../../../_utils';

interface RoundsStepProps {
    handleRoundsChoice: (rounds: HeatColdRounds) => void;
}

export const RoundsStep = ({ handleRoundsChoice }: RoundsStepProps) => {
    return (
        <div>
            <h2>How many rounds would you like to do?</h2>
            <div>
                <button
                    type="button"
                    onClick={() => handleRoundsChoice(HEAT_COLD_ROUNDS.ONE)}
                >
                    1
                </button>
                <button
                    type="button"
                    onClick={() => handleRoundsChoice(HEAT_COLD_ROUNDS.TWO)}
                >
                    2
                </button>
                <button
                    type="button"
                    onClick={() => handleRoundsChoice(HEAT_COLD_ROUNDS.THREE)}
                >
                    3
                </button>
                <button
                    type="button"
                    onClick={() => handleRoundsChoice(HEAT_COLD_ROUNDS.FOUR)}
                >
                    4
                </button>
            </div>
        </div>
    );
};
