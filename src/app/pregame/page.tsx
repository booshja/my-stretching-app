'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Timer } from '@/components/Timer/Timer';
import { PreGameRunner } from './_components/PreGameRunner';
import { initBeep } from '@/utils/playBeep';
import styles from '../LandingPage.module.css';

function PreGameContent() {
    const params = useSearchParams();
    const [started, setStarted] = useState<boolean>(false);
    const [countdownDone, setCountdownDone] = useState<boolean>(false);

    const preStartSeconds = useMemo(() => {
        const timeParam = params.get('time');
        if (!timeParam) return 10;
        const parsed = parseInt(timeParam, 10);
        return Number.isFinite(parsed) && parsed >= 0 ? parsed : 10;
    }, [params]);

    if (!started) {
        return (
            <div className={styles.landingPage}>
                <h1 className={`${styles.title} text-center`}>
                    Pre-Game Warmup
                </h1>
                <p className={styles.description}>
                    Get ready to start your warmup routine.
                </p>
                <button
                    className={styles.link}
                    type="button"
                    onClick={() => {
                        initBeep();
                        setStarted(true);
                    }}
                >
                    Start
                </button>
            </div>
        );
    }

    if (!countdownDone) {
        return (
            <div className={styles.landingPage}>
                <h2 className={`${styles.title} text-center`}>
                    Starting in...
                </h2>
                <Timer
                    key="pregame-prestart"
                    initialTime={preStartSeconds}
                    onLowTime={() => {}}
                    onTimerComplete={() => setCountdownDone(true)}
                />
            </div>
        );
    }

    return (
        <div className={styles.landingPage}>
            <PreGameRunner />
        </div>
    );
}

export default function PreGamePage() {
    return (
        <Suspense
            fallback={<div className={styles.landingPage}>Loading...</div>}
        >
            <PreGameContent />
        </Suspense>
    );
}
