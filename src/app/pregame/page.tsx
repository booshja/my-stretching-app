'use client';

import { Suspense, useState } from 'react';
import { PreGameRunner } from './_components/PreGameRunner';
import { initBeep } from '@/utils/playBeep';
import styles from '../LandingPage.module.css';

function PreGameContent() {
    const [started, setStarted] = useState<boolean>(false);

    if (!started) {
        return (
            <div className={styles.landingPage}>
                <h1 className={`${styles.title} text-center`}>
                    Pre-Game Warmup
                </h1>
                <p className={styles.description}>Let&apos;s get warmed up!</p>
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
