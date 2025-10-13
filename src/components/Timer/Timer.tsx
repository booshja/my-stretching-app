'use client';

import { useState, useEffect } from 'react';
import { playBeep } from '@/utils/playBeep';
import styles from './Timer.module.css';

interface TimerProps {
    initialTime: number; // in seconds
    onLowTime: () => void;
    onTimerComplete: () => void;
    isPaused?: boolean;
}

/** Based on the CountdownTimer from this Medium article:
 * https://medium.com/@primaramadhanip/building-a-countdown-timer-in-react-db93167157b7
 * */
export const Timer = ({
    initialTime,
    onLowTime,
    onTimerComplete,
    isPaused = false,
}: TimerProps) => {
    const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);

    // Keep timeRemaining in sync if initialTime changes
    useEffect(() => {
        setTimeRemaining(initialTime);
    }, [initialTime]);

    useEffect(() => {
        if (isPaused) {
            return;
        }
        if (timeRemaining === 0) {
            onTimerComplete();
            return;
        }

        const id = setTimeout(() => {
            const next = timeRemaining - 1;
            if ([10, 5, 2, 1, 0].includes(next)) {
                playBeep();
            }
            if (next === 10) {
                onLowTime();
            }
            setTimeRemaining(next >= 0 ? next : 0);
        }, 1000);

        return () => clearTimeout(id);
    }, [timeRemaining, isPaused, onLowTime, onTimerComplete]);

    const minutes = Math.floor((timeRemaining % 3600) / 60);
    let seconds: number | string = timeRemaining % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return (
        <div className={styles.timer}>
            <p className={styles.time}>{`${minutes}:${seconds}`}</p>
        </div>
    );
};
