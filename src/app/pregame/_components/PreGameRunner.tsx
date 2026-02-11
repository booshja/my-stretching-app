'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Timer } from '@/components/Timer/Timer';
import {
    PRE_GAME_WARMUP,
    type WarmupStretch,
    type WarmupItem,
} from '@/utils/routines/preGameWarmup';
import styles from '../PreGame.module.css';
import { enableWakeLock, disableWakeLock } from '@/utils/wakeLock';
import { useRunnerKeyboardShortcuts } from '@/app/_components/useRunnerKeyboardShortcuts';
import { getYouTubeEmbedUrl } from '@/utils/getYouTubeEmbedUrl';
import { useRoutineProgression } from '@/app/_components/useRoutineProgression';

export const PreGameRunner = () => {
    const router = useRouter();
    const routine = useMemo(() => PRE_GAME_WARMUP, []);

    const {
        currentIndex,
        setCurrentIndex,
        isPaused,
        setIsPaused,
        showNext,
        setShowNext,
        reset,
    } = useRoutineProgression({
        totalItems: routine.length,
        onComplete: () => router.push('/done?type=pregame'),
    });
    const [isTransition, setIsTransition] = useState<boolean>(false);
    const [transitionTargetIndex, setTransitionTargetIndex] = useState<
        number | null
    >(null);

    const currentItem = routine[currentIndex] ?? null;
    const isWarmupStretch = (item: WarmupItem | null): item is WarmupStretch =>
        !!item && 'time' in item;
    const isTimed = isWarmupStretch(currentItem);
    const currentInitialTime = isTimed ? currentItem.time : 0;

    const nextItem = routine[currentIndex + 1] ?? null;

    const goHome = useCallback(() => {
        router.push('/');
    }, [router]);

    const startTransitionTo = useCallback((targetIndex: number) => {
        setIsPaused(false);
        setShowNext(false);
        setIsTransition(true);
        setTransitionTargetIndex(targetIndex);
    }, [setIsPaused, setShowNext]);

    const completeTransition = useCallback(() => {
        setIsTransition(false);
        setShowNext(false);
        if (transitionTargetIndex !== null) {
            setCurrentIndex(transitionTargetIndex);
            setTransitionTargetIndex(null);
        }
    }, [setCurrentIndex, setShowNext, transitionTargetIndex]);

    const goNext = useCallback(() => {
        setIsPaused(false);
        setShowNext(false);
        const nextIndex = currentIndex + 1;
        if (nextIndex >= routine.length) {
            router.push('/done?type=pregame');
            return;
        }
        const nextIt = routine[nextIndex];
        if ('time' in nextIt) {
            // Next is a timed stretch → show transition first
            startTransitionTo(nextIndex);
            return;
        }
        // Next is an activity → no transition
        setCurrentIndex(nextIndex);
    }, [
        currentIndex,
        routine,
        router,
        setCurrentIndex,
        setIsPaused,
        setShowNext,
        startTransitionTo,
    ]);

    useEffect(() => {
        void enableWakeLock();
        reset();
        return () => {
            void disableWakeLock();
        };
    }, [reset]);

    const handleSpace = useCallback(() => {
        if (!isTimed) return;
        setIsPaused((p) => !p);
    }, [isTimed, setIsPaused]);

    useRunnerKeyboardShortcuts({
        onSpace: handleSpace,
        onEscape: goHome,
        onArrowRight: goNext,
    });

    if (!routine.length) {
        return <p>No warmup items found.</p>;
    }

    const currentVideoUrl = getYouTubeEmbedUrl(
        currentItem && 'link' in currentItem ? currentItem.link : null
    );

    return (
        <div className={styles.container}>
            <div className="u-top-actions">
                {isTimed && (
                    <button
                        className="u-action"
                        type="button"
                        onClick={() => setIsPaused((p) => !p)}
                    >
                        {isPaused ? 'Resume' : 'Pause'}
                    </button>
                )}
                <button className="u-action" type="button" onClick={goNext}>
                    {isTimed ? 'Skip' : 'Next'}
                </button>
                <button className="u-action" type="button" onClick={goHome}>
                    Cancel
                </button>
            </div>
            {isTransition ? (
                <>
                    <Timer
                        key={`transition-${transitionTargetIndex ?? 'end'}`}
                        initialTime={5}
                        onLowTime={() => {}}
                        onTimerComplete={completeTransition}
                    />
                    {transitionTargetIndex !== null && (
                        (() => {
                            const transitionItem =
                                routine[transitionTargetIndex] ?? null;
                            if (!transitionItem) return null;

                            return (
                                <div className="u-runner-grid u-runner-grid-one">
                                    <div>
                                        <h2 className={styles.title}>
                                            Get ready for {transitionItem.name}
                                        </h2>
                                        {transitionItem.image ? (
                                            <Image
                                                src={transitionItem.image}
                                                alt={transitionItem.name}
                                                className={styles.image}
                                                width={800}
                                                height={600}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            );
                        })()
                    )}
                </>
            ) : (
                <>
                    {isTimed ? (
                        <Timer
                            key={currentIndex}
                            initialTime={currentInitialTime}
                            onLowTime={() => setShowNext(true)}
                            onTimerComplete={goNext}
                            isPaused={isPaused}
                        />
                    ) : null}
                    {currentItem && (
                        <div
                            className={`u-runner-grid ${
                                showNext ? 'u-runner-grid-two' : 'u-runner-grid-one'
                            }`}
                        >
                            <div>
                                <h2 className={styles.title}>
                                    {currentItem.name}
                                </h2>
                                {'description' in currentItem &&
                                    currentItem.description && (
                                        <p className={styles.description}>
                                            {currentItem.description}
                                        </p>
                                    )}
                                {currentVideoUrl ? (
                                    <div className="u-video-container">
                                        <iframe
                                            src={currentVideoUrl}
                                            width="100%"
                                            height="100%"
                                            style={{
                                                border: 0,
                                                borderRadius: 8,
                                            }}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            title={currentItem.name}
                                        />
                                    </div>
                                ) : (
                                    'image' in currentItem &&
                                    currentItem.image && (
                                        <Image
                                            src={currentItem.image}
                                            alt={currentItem.name}
                                            className={styles.image}
                                            width={800}
                                            height={600}
                                        />
                                    )
                                )}
                            </div>
                            {showNext && nextItem ? (
                                <div>
                                    <h2 className={styles.title}>
                                        <span className={styles.nextSpan}>
                                            Next:
                                        </span>
                                        {nextItem.name}
                                    </h2>
                                    {'description' in nextItem &&
                                        nextItem.description && (
                                            <p className={styles.description}>
                                                {nextItem.description}
                                            </p>
                                        )}
                                    {'image' in nextItem && nextItem.image && (
                                        <Image
                                            src={nextItem.image}
                                            alt={nextItem.name}
                                            className={styles.image}
                                            width={800}
                                            height={600}
                                        />
                                    )}
                                </div>
                            ) : null}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
