'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRoutineList } from '@/utils/getRoutineList';
import { HOCKEY_HEAT_COLD } from '@/utils/routines';
import type { DisplayItem } from '@/types';
import { Timer } from '@/components/Timer';
import { RoutineItem } from '@/components/RoutineItem';
import styles from '../HeatCold.module.css';
import { enableWakeLock, disableWakeLock } from '@/utils/wakeLock';

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
        return items;
    }, [rounds]);

    const routineWithTransitions = useMemo(
        () => getRoutineList(baseRoutine),
        [baseRoutine]
    );

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showNext, setShowNext] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    useEffect(() => {
        void enableWakeLock();
        setCurrentIndex(0);
        setShowNext(false);
        return () => {
            void disableWakeLock();
        };
    }, [rounds]);

    const handleLowTime = () => {
        if (currentIndex + 2 < routineWithTransitions.length) {
            setShowNext(true);
        }
    };

    const handleTimerComplete = () => {
        setShowNext(false);
        setCurrentIndex((prev) => {
            const next = prev + 1;
            if (next < routineWithTransitions.length) return next;
            router.push('/done?type=heatcold');
            return prev;
        });
    };

    const handleSkip = useCallback(() => {
        setShowNext(false);
        setCurrentIndex((prev) => {
            const next = prev + 1;
            if (next < routineWithTransitions.length) return next;
            router.push('/done?type=heatcold');
            return prev;
        });
    }, [router, routineWithTransitions.length]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
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
    }, [router, handleSkip]);

    const currentItem = routineWithTransitions[currentIndex] ?? null;
    const nextItem = routineWithTransitions[currentIndex + 2] ?? null;
    const currentInitialTime =
        currentItem && 'time' in currentItem ? currentItem.time : 0;

    if (!routineWithTransitions.length) {
        return <p>No heat/cold routine found.</p>;
    }

    return (
        <div className={styles.container}>
            <div className="u-top-actions">
                <button
                    className="u-action"
                    type="button"
                    onClick={() => setIsPaused((p) => !p)}
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
                onLowTime={handleLowTime}
                onTimerComplete={handleTimerComplete}
                isPaused={isPaused}
            />
            <RoutineItem item={currentItem} />
            {showNext && <RoutineItem item={nextItem} next />}
        </div>
    );
};
