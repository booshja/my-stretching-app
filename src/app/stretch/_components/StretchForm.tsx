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
            <h1>Stretching</h1>
            {formStep === STRETCH_FORM_STEPS.ROUTINE && (
                <RoutineStep handleRoutineChoice={handleRoutineChoice} />
            )}
            {formStep === STRETCH_FORM_STEPS.LENGTH && (
                <LengthStep
                    handleStretchTimeChoice={handleStretchTimeChoice}
                    routineChoice={routineChoice}
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
