'use client';

import { useState, type FormEvent } from 'react';
import styles from './RoutineChoiceForm.module.css';
import {
    type RoutineChoice,
    routineChoices,
    type TimeChoice,
    timeChoices,
} from '@/utils/constants';

interface RoutineChoiceFormProps {
    handleRoutineChoice: (routine: RoutineChoice, length: TimeChoice) => void;
}

export const RoutineChoiceForm = ({
    handleRoutineChoice,
}: RoutineChoiceFormProps) => {
    const [routine, setRoutine] = useState<RoutineChoice>(
        routineChoices.hockey
    );
    const [length, setLength] = useState<TimeChoice>(timeChoices.ninety);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleRoutineChoice(routine, length);
    };

    const handleRoutineChange = (e: FormEvent<HTMLInputElement>) => {
        setRoutine(e.currentTarget.value as RoutineChoice);
    };

    const handleLengthChange = (e: FormEvent<HTMLInputElement>) => {
        setLength(e.currentTarget.value as TimeChoice);
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <input
                        type="radio"
                        id={routineChoices.hockey}
                        name="routine"
                        value={routineChoices.hockey}
                        checked={routine === routineChoices.hockey}
                        onChange={handleRoutineChange}
                    />
                    <label htmlFor={routineChoices.hockey}>
                        Pre-Game Hockey Stretch
                    </label>
                    <input
                        type="radio"
                        id={routineChoices.nighttime}
                        name="routine"
                        value={routineChoices.nighttime}
                        checked={routine === routineChoices.nighttime}
                        onChange={handleRoutineChange}
                    />
                    <label htmlFor={routineChoices.nighttime}>
                        Nighttime Stretch
                    </label>
                    <input
                        type="radio"
                        id={routineChoices.hockeyHeatCold}
                        name="routine"
                        value={routineChoices.hockeyHeatCold}
                        checked={routine === routineChoices.hockeyHeatCold}
                        onChange={handleRoutineChange}
                    />
                    <label htmlFor={routineChoices.hockeyHeatCold}>
                        Hockey Heat/Cold Treatment Timer
                    </label>
                </fieldset>
                <fieldset>
                    <input
                        type="radio"
                        id={timeChoices.sixty}
                        name="length"
                        value={timeChoices.sixty}
                        checked={length === timeChoices.sixty}
                        onChange={handleLengthChange}
                    />
                    <label htmlFor={timeChoices.sixty}>60 seconds</label>
                    <input
                        type="radio"
                        id={timeChoices.ninety}
                        name="length"
                        value={timeChoices.ninety}
                        checked={length === timeChoices.ninety}
                        onChange={handleLengthChange}
                    />
                    <label htmlFor={timeChoices.ninety}>90 seconds</label>
                </fieldset>
                <button type="submit">Start</button>
            </form>
        </div>
    );
};
