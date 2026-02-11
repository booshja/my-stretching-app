'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRoutineList } from '@/utils/getRoutineList';
import { HOCKEY } from '@/utils/routines/hockeyStretch';
import { NECK_STRETCHES } from '@/utils/routines/neckStretches';
import { BARE_MINIMUM } from '@/utils/routines/bareMinimum';
import { PRE_GAME_WARMUP } from '@/utils/routines/preGameWarmup';
import { NIGHTTIME } from '@/utils/routines/nighttimeStretch';
import type { DisplayItem, StretchLength, Transition } from '@/types';
import { shouldPauseTransition } from './shouldPauseTransition';
import { Timer } from '@/components/Timer/Timer';
import { RoutineItem } from '@/components/RoutineItem/RoutineItem';
import { enableWakeLock, disableWakeLock } from '@/utils/wakeLock';
import { useRunnerKeyboardShortcuts } from '@/app/_components/useRunnerKeyboardShortcuts';

interface StretchRunnerProps {
    type: 'hockey' | 'daily' | 'neck' | 'bareminimum' | 'pregame' | 'nighttime';
    time: StretchLength; // seconds
}

const isTransitionItem = (item: DisplayItem | null): item is Transition => {
    return item !== null && item.kind === 'transition';
};

export const StretchRunner = ({ type, time }: StretchRunnerProps) => {
    const router = useRouter();
    const PRESTART_SECONDS = 10;
    const baseRoutine: DisplayItem[] = useMemo(() => {
        switch (type) {
            case 'hockey':
                return HOCKEY;
            case 'neck':
                return NECK_STRETCHES;
            case 'bareminimum':
                return BARE_MINIMUM;
            case 'pregame':
                return PRE_GAME_WARMUP;
            case 'nighttime':
                return NIGHTTIME;
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
    const [phase, setPhase] = useState<'prestart' | 'running'>('prestart');
    // Tracks whether the user has started the countdown for a manual transition
    const [manualTransitionStarted, setManualTransitionStarted] =
        useState<boolean>(false);

    useEffect(() => {
        void enableWakeLock();
        setCurrentIndex(0);
        setShowNext(false);
        setIsPaused(false);
        setPhase('prestart');
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
                isTransitionItem(routineWithTransitions[prev + 1] ?? null);
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

    const startNow = useCallback(() => {
        setIsPaused(false);
        setShowNext(false);
        setPhase('running');
    }, []);

    const goHome = useCallback(() => {
        router.push('/');
    }, [router]);

    const isManualTransitionKeyStep = useMemo(() => {
        if (phase === 'prestart') return false;

        const prev = routineWithTransitions[currentIndex - 1] ?? null;
        const prevHadPause = !!(prev && prev.kind === 'stretch' && prev.pauseForNext);

        return (
            isTransitionItem(routineWithTransitions[currentIndex] ?? null) &&
            prevHadPause &&
            !manualTransitionStarted
        );
    }, [currentIndex, manualTransitionStarted, phase, routineWithTransitions]);

    const handleSpace = useCallback(() => {
        if (phase === 'prestart') {
            startNow();
            return;
        }

        if (isManualTransitionKeyStep) {
            startManualTransition();
            return;
        }

        setIsPaused((p) => !p);
    }, [isManualTransitionKeyStep, phase, startManualTransition, startNow]);

    const handleArrowRight = useCallback(() => {
        if (phase === 'prestart') {
            startNow();
            return;
        }

        if (isManualTransitionKeyStep) {
            startManualTransition();
            return;
        }

        handleSkip();
    }, [
        handleSkip,
        isManualTransitionKeyStep,
        phase,
        startManualTransition,
        startNow,
    ]);

    useRunnerKeyboardShortcuts({
        onSpace: handleSpace,
        onEscape: goHome,
        onArrowRight: handleArrowRight,
    });

    const currentItem = routineWithTransitions[currentIndex] ?? null;
    // During a Transition step (no image), show the upcoming stretch's image
    const isTransitionStep = isTransitionItem(currentItem);
    const nextAfterCurrent = routineWithTransitions[currentIndex + 1] ?? null;
    const displayedCurrentItem =
        isTransitionStep && nextAfterCurrent && nextAfterCurrent.kind === 'stretch'
            ? {
                  kind: 'stretch' as const,
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
            candidate !== null && candidate.kind === 'transition';
        if (candidateIsTransition) {
            previewIndex += 1;
        }
        return routineWithTransitions[previewIndex] ?? null;
    };
    const nextItem = computePreviewItem();
    const currentInitialTime =
        currentItem && currentItem.kind !== 'stretch' ? currentItem.time : time;

    // Determine whether this is a manual transition step (Transition preceded by a pauseForNext stretch)
    const prevItem = routineWithTransitions[currentIndex - 1] ?? null;
    const isManualTransitionStep = shouldPauseTransition(prevItem, currentItem);
    const isManualTransitionWaiting =
        isManualTransitionStep && !manualTransitionStarted;

    // Reset manual transition started flag when the current index changes
    useEffect(() => {
        setManualTransitionStarted(false);
    }, [currentIndex]);

    if (!routineWithTransitions.length) {
        return <p>No stretches found for this routine.</p>;
    }

    // If current item is a Transition or HeatCold (no image), still render name/desc
    return (
        <div className="u-runner-container">
            <div className="u-top-actions">
                {phase === 'prestart' ? (
                    <button
                        className="u-action"
                        type="button"
                        onClick={startNow}
                    >
                        Start now
                    </button>
                ) : (
                    <button
                        className="u-action"
                        type="button"
                        onClick={() =>
                            isManualTransitionStep && !manualTransitionStarted
                                ? startManualTransition()
                                : setIsPaused((p) => !p)
                        }
                    >
                        {isManualTransitionWaiting
                            ? 'Continue'
                            : isPaused
                            ? 'Resume'
                            : 'Pause'}
                    </button>
                )}
                {phase === 'running' &&
                    (isManualTransitionStep && !manualTransitionStarted ? (
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
                    ))}
                <button
                    className="u-action"
                    type="button"
                    onClick={() => router.push('/')}
                >
                    Cancel
                </button>
            </div>
            {phase === 'prestart' ? (
                <Timer
                    key={`${phase}-${type}`}
                    initialTime={PRESTART_SECONDS}
                    onLowTime={() => {}}
                    onTimerComplete={startNow}
                    isPaused={false}
                />
            ) : (
                <Timer
                    key={`${phase}-${currentIndex}`}
                    initialTime={currentInitialTime}
                    onLowTime={handleLowTime}
                    onTimerComplete={handleTimerComplete}
                    isPaused={
                        isPaused ||
                        (isManualTransitionStep && !manualTransitionStarted)
                    }
                />
            )}
            <div
                className={`u-runner-grid ${
                    showNext ? 'u-runner-grid-two' : 'u-runner-grid-one'
                }`}
            >
                <div>
                    {phase === 'prestart' && (
                        <p className="text-center u-first-up">
                            First up…
                        </p>
                    )}
                    <RoutineItem
                        item={
                            phase === 'prestart'
                                ? routineWithTransitions[0]
                                : displayedCurrentItem
                        }
                    />
                </div>
                {showNext && <RoutineItem item={nextItem} next />}
            </div>
        </div>
    );
};
