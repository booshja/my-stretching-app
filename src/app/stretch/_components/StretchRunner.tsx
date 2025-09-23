'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRoutineList } from '@/utils/getRoutineList';
import { HOCKEY } from '@/utils/routines';
import type { DisplayItem, StretchLength } from '@/types';
import { Timer } from '@/components/Timer';
import { RoutineItem } from '@/components/RoutineItem';
import styles from '../Stretch.module.css';

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

    useEffect(() => {
        setCurrentIndex(0);
        setShowNext(false);
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
        currentItem && 'time' in currentItem ? currentItem.time : time;

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
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: showNext ? '1fr 1fr' : '1fr',
                    gap: '16px',
                    height: 'calc(100vh - 140px)',
                }}
            >
                <RoutineItem item={currentItem} />
                {showNext && <RoutineItem item={nextItem} next />}
            </div>
        </div>
    );
};
