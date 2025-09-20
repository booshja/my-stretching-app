'use client';

import { useEffect, useState } from 'react';
import { getRoutineList } from '@/utils/getRoutineList';
import {
    routineChoices,
    timeChoices,
    type RoutineChoice,
    type TimeChoice,
} from '@/utils/constants';
import { HOCKEY, HOCKEY_HEAT_COLD, NIGHTTIME } from '@/utils/routines';
import { RoutineChoiceForm } from '../RoutineChoiceForm';
import { RoutineItem } from '../RoutineItem';
import { Timer } from '../Timer';
import type { DisplayItem } from '@/types';
import styles from './Routine.module.css';

export const Routine = () => {
    const [routine, setRoutine] = useState<RoutineChoice>(
        routineChoices.hockey
    );
    const [length, setLength] = useState<TimeChoice>(timeChoices.ninety);
    const [currentRoutine, setCurrentRoutine] = useState<DisplayItem[]>(() =>
        getRoutineList(HOCKEY)
    );
    const [showRoutineForm, setShowRoutineForm] = useState<boolean>(true);
    const [routineFinished, setRoutineFinished] = useState<boolean>(false);
    const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);
    const [showNext, setShowNext] = useState<boolean>(false);

    useEffect(() => {
        switch (routine) {
            case routineChoices.hockeyHeatCold:
                setCurrentRoutine(() => getRoutineList(HOCKEY_HEAT_COLD));
                break;
            case routineChoices.nighttime:
                setCurrentRoutine(() => getRoutineList(NIGHTTIME));
                break;
            default:
                setCurrentRoutine(() => getRoutineList(HOCKEY));
        }
    }, [routine]);

    const handleRoutineChoice = (
        routine: RoutineChoice,
        length: TimeChoice
    ) => {
        setRoutine(routine);
        setLength(length);
        setShowRoutineForm(false);
    };

    const handleLowTime = () => {
        if (currentItemIndex + 2 <= currentRoutine.length) {
            setShowNext(true);
        }
    };

    const handleTimerFinish = () => {
        setShowNext(false);
        setCurrentItemIndex((prevIndex) => {
            if (!currentRoutine) return 0;

            if (prevIndex + 1 < currentRoutine.length) {
                return prevIndex + 1;
            } else {
                return 0;
            }
        });
    };

    const handleResetRoutine = () => {
        setRoutine(routineChoices.hockey);
        setLength(timeChoices.ninety);
        setCurrentRoutine(() => getRoutineList(HOCKEY));
        setShowRoutineForm(true);
        setRoutineFinished(false);
        setCurrentItemIndex(0);
        setShowNext(false);
    };

    return (
        <div className={styles.container}>
            {showRoutineForm ? (
                <RoutineChoiceForm handleRoutineChoice={handleRoutineChoice} />
            ) : routineFinished ? (
                <div>
                    <h2>That&apos;s it! Great job!</h2>
                    <button onClick={handleResetRoutine}>
                        Select another routine
                    </button>
                </div>
            ) : (
                currentRoutine && (
                    <>
                        <Timer
                            initialTime={+length}
                            onLowTime={handleLowTime}
                            onTimerComplete={handleTimerFinish}
                        />
                        <RoutineItem item={currentRoutine[currentItemIndex]} />
                        {showNext && (
                            <RoutineItem
                                item={currentRoutine[currentItemIndex + 2]}
                                next
                            />
                        )}
                    </>
                )
            )}
        </div>
    );
};
