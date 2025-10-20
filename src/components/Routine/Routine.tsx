'use client';

import { useEffect, useState } from 'react';
import { getRoutineList } from '@/utils/getRoutineList';
import {
    routineChoices,
    timeChoices,
    type RoutineChoice,
    type TimeChoice,
} from '@/utils/constants';
import { HOCKEY_HEAT_COLD } from '@/utils/routines/hockeyHeatCold';
import { HOCKEY } from '@/utils/routines/hockeyStretch';
import { NIGHTTIME } from '@/utils/routines/nighttimeStretch';
import { RoutineChoiceForm } from '../RoutineChoiceForm/RoutineChoiceForm';
import { RoutineItem } from '../RoutineItem/RoutineItem';
import { Timer } from '../Timer/Timer';
import type { DisplayItem, Transition } from '@/types';
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
                        {(() => {
                            const currentItem =
                                currentRoutine[currentItemIndex] ?? null;
                            const isTransitionItem = (
                                item: DisplayItem | null
                            ): item is Transition => {
                                return (
                                    item !== null &&
                                    'time' in item &&
                                    'description' in item &&
                                    item.name === 'Transition'
                                );
                            };
                            const isTransitionStep =
                                isTransitionItem(currentItem);
                            const nextAfterCurrent =
                                currentRoutine[currentItemIndex + 1] ?? null;
                            const displayedCurrentItem =
                                isTransitionStep &&
                                nextAfterCurrent &&
                                'image' in nextAfterCurrent
                                    ? {
                                          name: currentItem.name,
                                          description: currentItem.description,
                                          image: nextAfterCurrent.image,
                                      }
                                    : currentItem;

                            const computePreviewItem = () => {
                                if (!showNext) return null;
                                let previewIndex = currentItemIndex + 1;
                                const candidate =
                                    currentRoutine[previewIndex] ?? null;
                                const candidateIsTransition =
                                    candidate !== null &&
                                    'time' in candidate &&
                                    candidate.name === 'Transition';
                                if (candidateIsTransition) {
                                    previewIndex += 1;
                                }
                                return currentRoutine[previewIndex] ?? null;
                            };
                            const nextItem = computePreviewItem();

                            return (
                                <>
                                    <RoutineItem item={displayedCurrentItem} />
                                    {showNext && (
                                        <RoutineItem item={nextItem} next />
                                    )}
                                </>
                            );
                        })()}
                    </>
                )
            )}
        </div>
    );
};
