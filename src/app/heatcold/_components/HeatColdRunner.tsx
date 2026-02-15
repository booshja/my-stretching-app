'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { getRoutineList } from '@/utils/getRoutineList';
import {
    HOCKEY_HEAT_COLD,
    HOCKEY_HEAT_COLD_FINAL_HEAT_SECONDS,
} from '@/utils/routines/hockeyHeatCold';
import type { DisplayItem } from '@/types';
import { Timer } from '@/components/Timer/Timer';
import { RoutineItem } from '@/components/RoutineItem/RoutineItem';
import { enableWakeLock, disableWakeLock } from '@/utils/wakeLock';
import { useRunnerKeyboardShortcuts } from '@/app/_components/useRunnerKeyboardShortcuts';
import { useRoutineProgression } from '@/app/_components/useRoutineProgression';

interface HeatColdRunnerProps {
    rounds: number;
}

export const HeatColdRunner = ({ rounds }: HeatColdRunnerProps) => {
    const router = useRouter();

    const baseRoutine: DisplayItem[] = useMemo(() => {
        const items: DisplayItem[] = [];
        for (let i = 0; i < rounds; i += 1) {
            items.push(...HOCKEY_HEAT_COLD);
        }
        items.push({
            kind: 'heatcold',
            name: 'Heat',
            time: HOCKEY_HEAT_COLD_FINAL_HEAT_SECONDS,
        });
        return items;
    }, [rounds]);

    const routineWithTransitions = useMemo(
        () => getRoutineList(baseRoutine),
        [baseRoutine]
    );

    const {
        currentIndex,
        showNext,
        isPaused,
        reset,
        togglePause,
        handleLowTime,
        advance,
    } = useRoutineProgression({
        totalItems: routineWithTransitions.length,
        onComplete: () => router.push('/done?type=heatcold'),
    });

    useEffect(() => {
        void enableWakeLock();
        reset();
        return () => {
            void disableWakeLock();
        };
    }, [rounds, reset]);

    const handleTimerComplete = () => {
        advance();
    };

    const handleSkip = useCallback(() => {
        advance();
    }, [advance]);

    const goHome = useCallback(() => {
        router.push('/');
    }, [router]);

    useRunnerKeyboardShortcuts({
        onSpace: togglePause,
        onEscape: goHome,
        onArrowRight: handleSkip,
    });

    const currentItem = routineWithTransitions[currentIndex] ?? null;
    const nextItem = routineWithTransitions[currentIndex + 2] ?? null;
    const currentInitialTime =
        currentItem && currentItem.kind !== 'stretch' ? currentItem.time : 0;

    if (!routineWithTransitions.length) {
        return <p>No heat/cold routine found.</p>;
    }

    return (
        <div className="u-runner-container">
            <div className="u-top-actions">
                <button
                    className="u-action"
                    type="button"
                    onClick={togglePause}
                >
                    {isPaused ? 'Resume' : 'Pause'}
                </button>
                <button className="u-action" type="button" onClick={handleSkip}>
                    Skip
                </button>
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
                onLowTime={() => handleLowTime(2)}
                onTimerComplete={handleTimerComplete}
                isPaused={isPaused}
            />
            <RoutineItem item={currentItem} />
            {showNext && <RoutineItem item={nextItem} next />}
        </div>
    );
};
