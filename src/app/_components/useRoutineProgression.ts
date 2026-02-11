import { useCallback, useState } from 'react';

interface UseRoutineProgressionProps {
    totalItems: number;
    onComplete: () => void;
}

export const useRoutineProgression = ({
    totalItems,
    onComplete,
}: UseRoutineProgressionProps) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showNext, setShowNext] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    const reset = useCallback(() => {
        setCurrentIndex(0);
        setShowNext(false);
        setIsPaused(false);
    }, []);

    const togglePause = useCallback(() => {
        setIsPaused((prev) => !prev);
    }, []);

    const handleLowTime = useCallback(
        (lookAhead: number = 2) => {
            if (currentIndex + lookAhead < totalItems) {
                setShowNext(true);
            }
        },
        [currentIndex, totalItems]
    );

    const advance = useCallback(
        (computeNext?: (current: number) => number) => {
            setShowNext(false);
            setCurrentIndex((current) => {
                const next = computeNext ? computeNext(current) : current + 1;
                if (next < totalItems) return next;
                onComplete();
                return current;
            });
        },
        [onComplete, totalItems]
    );

    return {
        currentIndex,
        setCurrentIndex,
        showNext,
        setShowNext,
        isPaused,
        setIsPaused,
        reset,
        togglePause,
        handleLowTime,
        advance,
    };
};
