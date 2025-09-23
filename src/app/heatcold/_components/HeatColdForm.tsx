'use client';

import { useState } from 'react';
import { StartRoutineStep } from './HeatColdFormSteps/StartRoutineStep/StartRoutineStep';
import {
    HEAT_COLD_FORM_STEPS,
    HEAT_COLD_ROUNDS,
    type HeatColdFormStep,
    type HeatColdRounds,
} from '../_utils';
import { RoundsStep } from './HeatColdFormSteps/RoundsStep/RoundsStep';
import styles from './HeatColdForm.module.css';

export const HeatColdForm = () => {
    const [rounds, setRounds] = useState<HeatColdRounds>(HEAT_COLD_ROUNDS.ONE);
    const [formStep, setFormStep] = useState<HeatColdFormStep>(
        HEAT_COLD_FORM_STEPS.ROUNDS
    );

    const handleRoundsChoice = (rounds: HeatColdRounds) => {
        setRounds(rounds);
        setFormStep(HEAT_COLD_FORM_STEPS.START);
    };

    return (
        <>
            <h1 className={styles.title}>Heat/Cold Therapy</h1>
            <p>Heat for 1 minute followed by cold for 2 minutes</p>
            {formStep === HEAT_COLD_FORM_STEPS.ROUNDS && (
                <RoundsStep handleRoundsChoice={handleRoundsChoice} />
            )}
            {formStep === HEAT_COLD_FORM_STEPS.START && (
                <StartRoutineStep rounds={rounds} />
            )}
        </>
    );
};
