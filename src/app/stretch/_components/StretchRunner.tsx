'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRoutineList } from '@/utils/getRoutineList';
import { HOCKEY } from '@/utils/routines/hockeyStretch';
import type { DisplayItem, StretchLength, Transition } from '@/types';
import { shouldPauseTransition } from './shouldPauseTransition';
import { Timer } from '@/components/Timer/Timer';
import { RoutineItem } from '@/components/RoutineItem/RoutineItem';
import styles from '../Stretch.module.css';
import { enableWakeLock, disableWakeLock } from '@/utils/wakeLock';

interface StretchRunnerProps {
    type: 'hockey' | 'daily';
    time: StretchLength; // seconds
}

export const StretchRunner = ({ type, time }: StretchRunnerProps) => {
    const router = useRouter();
    const baseRoutine: DisplayItem[] = useMemo(() => {
        switch (type) {
            case 'hockey':
                return HOCKEY;
            case 'daily':
            default:
                return [];
        }
    }, [type]);

    const routineWithTransitions = useMemo(
        () => getRoutineList(baseRoutine),
        [baseRoutine]
    );

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showNext, setShowNext] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    // Tracks whether the user has started the countdown for a manual transition
    const [manualTransitionStarted, setManualTransitionStarted] =
        useState<boolean>(false);

    useEffect(() => {
        void enableWakeLock();
        setCurrentIndex(0);
        setShowNext(false);
        return () => {
            void disableWakeLock();
        };
    }, [type]);

    const handleLowTime = () => {
        // Show next stretch (skip transition which is index + 1)
        if (currentIndex + 2 < routineWithTransitions.length) {
            setShowNext(true);
        }
    };

    const handleTimerComplete = () => {
        setShowNext(false);
        setCurrentIndex((prev) => {
            const next = prev + 1;
            if (next < routineWithTransitions.length) return next;
            // Finished the routine
            router.push('/done?type=stretch');
            return prev;
        });
    };

    const handleSkip = useCallback(() => {
        setShowNext(false);
        setCurrentIndex((prev) => {
            const nextIsTransition =
                prev + 1 < routineWithTransitions.length &&
                (routineWithTransitions[prev + 1] as { name: string }).name ===
                    'Transition';
            const increment = nextIsTransition ? 2 : 1;
            const next = prev + increment;
            if (next < routineWithTransitions.length) return next;
            router.push('/done?type=stretch');
            return prev;
        });
    }, [router, routineWithTransitions]);

    // Kick off manual transition (start the 5s countdown)
    const startManualTransition = useCallback(() => {
        setManualTransitionStarted(true);
        setIsPaused(false);
    }, []);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const prev = routineWithTransitions[currentIndex - 1] ?? null;
            const prevHadPause = !!(
                prev &&
                'image' in prev &&
                (prev as unknown as { pauseForNext?: boolean }).pauseForNext
            );
            const isManualTransitionKeyHandler =
                isTransitionItem(
                    routineWithTransitions[currentIndex] ?? null
                ) &&
                prevHadPause &&
                !manualTransitionStarted;
            if (
                isManualTransitionKeyHandler &&
                (e.code === 'ArrowRight' || e.code === 'Space')
            ) {
                e.preventDefault();
                startManualTransition();
                return;
            }
            if (e.code === 'Space') {
                e.preventDefault();
                setIsPaused((p) => !p);
            } else if (e.code === 'Escape') {
                e.preventDefault();
                router.push('/');
            } else if (e.code === 'ArrowRight') {
                e.preventDefault();
                handleSkip();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [
        router,
        handleSkip,
        currentIndex,
        routineWithTransitions,
        manualTransitionStarted,
        startManualTransition,
    ]);

    const currentItem = routineWithTransitions[currentIndex] ?? null;
    // Type guard to identify Transition items
    const isTransitionItem = (item: DisplayItem | null): item is Transition => {
        return (
            item !== null &&
            'time' in item &&
            'description' in item &&
            item.name === 'Transition'
        );
    };
    // During a Transition step (no image), show the upcoming stretch's image
    const isTransitionStep = isTransitionItem(currentItem);
    const nextAfterCurrent = routineWithTransitions[currentIndex + 1] ?? null;
    const displayedCurrentItem =
        isTransitionStep && nextAfterCurrent && 'image' in nextAfterCurrent
            ? {
                  name: currentItem.name,
                  description: currentItem.description,
                  image: nextAfterCurrent.image,
              }
            : currentItem;

    // For the preview, skip over any Transition items to always show a stretch
    const computePreviewItem = () => {
        if (!showNext) return null;
        let previewIndex = currentIndex + 1;
        const candidate = routineWithTransitions[previewIndex] ?? null;
        const candidateIsTransition =
            candidate !== null &&
            'time' in candidate &&
            candidate.name === 'Transition';
        if (candidateIsTransition) {
            previewIndex += 1;
        }
        return routineWithTransitions[previewIndex] ?? null;
    };
    const nextItem = computePreviewItem();
    const currentInitialTime =
        currentItem && 'time' in currentItem ? currentItem.time : time;

    // Determine whether this is a manual transition step (Transition preceded by a pauseForNext stretch)
    const prevItem = routineWithTransitions[currentIndex - 1] ?? null;
    const isManualTransitionStep = shouldPauseTransition(prevItem, currentItem);

    // Reset manual transition started flag when the current index changes
    useEffect(() => {
        setManualTransitionStarted(false);
    }, [currentIndex]);

    if (!routineWithTransitions.length) {
        return <p>No stretches found for this routine.</p>;
    }

    // If current item is a Transition or HeatCold (no image), still render name/desc
    return (
        <div className={styles.container}>
            <div className="u-top-actions">
                <button
                    className="u-action"
                    type="button"
                    onClick={() =>
                        isManualTransitionStep && !manualTransitionStarted
                            ? startManualTransition()
                            : setIsPaused((p) => !p)
                    }
                >
                    {isPaused ? 'Resume' : 'Pause'}
                </button>
                {isManualTransitionStep && !manualTransitionStarted ? (
                    <button
                        className="u-action"
                        type="button"
                        onClick={startManualTransition}
                    >
                        Next
                    </button>
                ) : (
                    <button
                        className="u-action"
                        type="button"
                        onClick={handleSkip}
                    >
                        Skip
                    </button>
                )}
                <button
                    className="u-action"
                    type="button"
                    onClick={() => router.push('/')}
                >
                    Cancel
                </button>
            </div>
            <Timer
                key={currentIndex}
                initialTime={currentInitialTime}
                onLowTime={handleLowTime}
                onTimerComplete={handleTimerComplete}
                isPaused={
                    isPaused ||
                    (isManualTransitionStep && !manualTransitionStarted)
                }
            />
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: showNext ? '1fr 1fr' : '1fr',
                    gap: '16px',
                    height: 'calc(100vh - 140px)',
                }}
            >
                <RoutineItem item={displayedCurrentItem} />
                {showNext && <RoutineItem item={nextItem} next />}
            </div>
        </div>
    );
};
