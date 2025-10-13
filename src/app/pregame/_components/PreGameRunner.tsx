'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Timer } from '@/components/Timer';
import { PRE_GAME_WARMUP, type WarmupItem } from '@/utils/routines';
import styles from '../PreGame.module.css';

export const PreGameRunner = () => {
    const router = useRouter();
    const routine: WarmupItem[] = useMemo(
        () => PRE_GAME_WARMUP as unknown as WarmupItem[],
        []
    );

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [showNext, setShowNext] = useState<boolean>(false);
    const [isTransition, setIsTransition] = useState<boolean>(false);
    const [transitionTargetIndex, setTransitionTargetIndex] = useState<
        number | null
    >(null);

    const currentItem = routine[currentIndex] ?? null;
    const isTimed = !!currentItem && 'time' in currentItem;
    const currentInitialTime =
        isTimed && currentItem ? (currentItem as { time: number }).time : 0;

    const nextItem = routine[currentIndex + 1] ?? null;

    const getYouTubeEmbedUrl = (link: string | null): string | null => {
        if (!link) return null;
        try {
            const u = new URL(link);
            const host = u.hostname;
            // extract start seconds if present
            const t = u.searchParams.get('t');
            const startParam = t ? `?start=${parseInt(t, 10) || 0}` : '';

            if (host.includes('youtu.be')) {
                const id = u.pathname.replace('/', '');
                if (!id) return null;
                return `https://www.youtube.com/embed/${id}${startParam}`;
            }
            if (host.includes('youtube.com')) {
                const id = u.searchParams.get('v');
                if (!id) return null;
                return `https://www.youtube.com/embed/${id}${startParam}`;
            }
            return null;
        } catch {
            return null;
        }
    };

    const goHome = useCallback(() => {
        router.push('/');
    }, [router]);

    const startTransitionTo = useCallback((targetIndex: number) => {
        setIsPaused(false);
        setShowNext(false);
        setIsTransition(true);
        setTransitionTargetIndex(targetIndex);
    }, []);

    const completeTransition = useCallback(() => {
        setIsTransition(false);
        setShowNext(false);
        if (transitionTargetIndex !== null) {
            setCurrentIndex(transitionTargetIndex);
            setTransitionTargetIndex(null);
        }
    }, [transitionTargetIndex]);

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
    }, [currentIndex, routine, router, startTransitionTo]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                if (isTimed) {
                    e.preventDefault();
                    setIsPaused((p) => !p);
                }
            } else if (e.code === 'Escape') {
                e.preventDefault();
                goHome();
            } else if (e.code === 'ArrowRight') {
                e.preventDefault();
                goNext();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [goHome, goNext, isTimed]);

    if (!routine.length) {
        return <p>No warmup items found.</p>;
    }

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
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr',
                                gap: '16px',
                                height: 'calc(100vh - 140px)',
                            }}
                        >
                            <div>
                                <h2 className={styles.title}>
                                    Get ready for{' '}
                                    {routine[transitionTargetIndex].name}
                                </h2>
                                {'image' in routine[transitionTargetIndex] &&
                                (
                                    routine[transitionTargetIndex] as {
                                        image: string | null;
                                    }
                                ).image ? (
                                    <Image
                                        src={
                                            (
                                                routine[
                                                    transitionTargetIndex
                                                ] as {
                                                    image: string;
                                                }
                                            ).image
                                        }
                                        alt={
                                            routine[transitionTargetIndex].name
                                        }
                                        className={styles.image}
                                        width={800}
                                        height={600}
                                    />
                                ) : null}
                            </div>
                        </div>
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
                            style={{
                                display: 'grid',
                                gridTemplateColumns: showNext
                                    ? '1fr 1fr'
                                    : '1fr',
                                gap: '16px',
                                height: 'calc(100vh - 140px)',
                            }}
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
                                {getYouTubeEmbedUrl(
                                    'link' in currentItem
                                        ? currentItem.link
                                        : null
                                ) ? (
                                    <div
                                        style={{
                                            width: '100%',
                                            aspectRatio: '16 / 9',
                                        }}
                                    >
                                        <iframe
                                            src={
                                                getYouTubeEmbedUrl(
                                                    'link' in currentItem
                                                        ? currentItem.link
                                                        : null
                                                )!
                                            }
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
