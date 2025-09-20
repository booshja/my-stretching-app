'use client';

import { useState, useEffect } from 'react';
import { playBeep } from '@/utils/playBeep';
import styles from './Timer.module.css';

interface TimerProps {
    initialTime: number; // in seconds
    onLowTime: () => void;
    onTimerComplete: () => void;
}

/** Based on the CountdownTimer from this Medium article:
 * https://medium.com/@primaramadhanip/building-a-countdown-timer-in-react-db93167157b7
 * */
export const Timer = ({
    initialTime,
    onLowTime,
    onTimerComplete,
}: TimerProps) => {
    const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            if (
                timeRemaining === 6 ||
                timeRemaining === 5 ||
                timeRemaining === 4 ||
                timeRemaining === 3 ||
                timeRemaining === 2 ||
                timeRemaining === 1 ||
                timeRemaining === 0
            ) {
                playBeep();
            }
            setTimeRemaining((prevTime) => {
                if (prevTime === 0) return 0;

                return prevTime - 1;
            });
            if (timeRemaining === 10) onLowTime();
            if (timeRemaining === 0) {
                clearInterval(timerInterval);
                onTimerComplete();
            }
        }, 1000);

        return function cleanup() {
            clearInterval(timerInterval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
