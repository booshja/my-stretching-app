'use client';

import { useState } from 'react';
import {
    ROUTINE_OPTIONS,
    type RoutineOption,
    STRETCH_FORM_STEPS,
    STRETCH_TIMES,
    type StretchFormStep,
    type StretchTime,
} from '../_utils';
import { RoutineStep } from './StretchFormSteps/RoutineStep/RoutineStep';
import { LengthStep } from './StretchFormSteps/LengthStep/LengthStep';
import { StartRoutineStep } from './StretchFormSteps/StartRoutineStep/StartRoutineStep';
import styles from './StretchForm.module.css';

export const StretchForm = () => {
    const [routineChoice, setRoutineChoice] = useState<RoutineOption>(
        ROUTINE_OPTIONS.HOCKEY
    );
    const [stretchTime, setStretchTime] = useState<StretchTime>(
        STRETCH_TIMES.ONE_MINUTE
    );
    const [formStep, setFormStep] = useState<StretchFormStep>(
        STRETCH_FORM_STEPS.ROUTINE
    );

    const handleRoutineChoice = (routine: RoutineOption) => {
        setRoutineChoice(routine);
        setFormStep(STRETCH_FORM_STEPS.LENGTH);
    };

    const handleStretchTimeChoice = (time: StretchTime) => {
        setStretchTime(time);
        setFormStep(STRETCH_FORM_STEPS.START);
    };

    return (
        <>
            <h1 className={styles.title}>Stretching</h1>
            {formStep === STRETCH_FORM_STEPS.ROUTINE && (
                <RoutineStep handleRoutineChoice={handleRoutineChoice} />
            )}
            {formStep === STRETCH_FORM_STEPS.LENGTH && (
                <LengthStep
                    handleStretchTimeChoice={handleStretchTimeChoice}
                    routineChoice={routineChoice}
                    onBack={() => setFormStep(STRETCH_FORM_STEPS.ROUTINE)}
                />
            )}
            {formStep === STRETCH_FORM_STEPS.START && (
                <StartRoutineStep
                    routineChoice={routineChoice}
                    stretchTime={stretchTime}
                />
            )}
        </>
    );
};
