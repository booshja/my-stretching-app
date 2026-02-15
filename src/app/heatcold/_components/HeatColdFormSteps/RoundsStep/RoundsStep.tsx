'use client';

import { HEAT_COLD_ROUNDS, type HeatColdRounds } from '../../../_utils';
import {
    HOCKEY_HEAT_COLD,
    HOCKEY_HEAT_COLD_FINAL_HEAT_SECONDS,
} from '@/utils/routines/hockeyHeatCold';
import { formatDurationPhrase, totalRoundsSeconds } from '@/utils/time';

interface RoundsStepProps {
    handleRoundsChoice: (rounds: HeatColdRounds) => void;
}

export const RoundsStep = ({ handleRoundsChoice }: RoundsStepProps) => {
    const perItemTimes = HOCKEY_HEAT_COLD.map((i) => i.time);
    const label = (rounds: number) =>
        formatDurationPhrase(
            totalRoundsSeconds(rounds, perItemTimes) +
                HOCKEY_HEAT_COLD_FINAL_HEAT_SECONDS
        );
    return (
        <div className="u-center-text">
            <h2>How many rounds would you like to do?</h2>
            <div className="u-center-row">
                <button
                    className="u-button"
                    type="button"
                    onClick={() => handleRoundsChoice(HEAT_COLD_ROUNDS.ONE)}
                    aria-label={`1 round, about ${label(1)} total`}
                >
                    1 round ({label(1)} total)
                </button>
                <button
                    className="u-button"
                    type="button"
                    onClick={() => handleRoundsChoice(HEAT_COLD_ROUNDS.TWO)}
                    aria-label={`2 rounds, about ${label(2)} total`}
                >
                    2 rounds ({label(2)} total)
                </button>
                <button
                    className="u-button"
                    type="button"
                    onClick={() => handleRoundsChoice(HEAT_COLD_ROUNDS.THREE)}
                    aria-label={`3 rounds, about ${label(3)} total`}
                >
                    3 rounds ({label(3)} total)
                </button>
            </div>
        </div>
    );
};
