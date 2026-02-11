import { render } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { Timer } from '../Timer';

describe('Timer', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('calls onTimerComplete when initialTime is 0', async () => {
        const onLowTime = vi.fn();
        const onComplete = vi.fn();
        render(
            <Timer
                initialTime={0}
                onLowTime={onLowTime}
                onTimerComplete={onComplete}
            />
        );
        await act(async () => {
            // allow effect to run
        });
        expect(onLowTime).not.toHaveBeenCalled();
        expect(onComplete).toHaveBeenCalledTimes(1);
    });

    it('calls onLowTime when countdown reaches 10', async () => {
        const onLowTime = vi.fn();
        const onComplete = vi.fn();
        render(
            <Timer
                initialTime={11}
                onLowTime={onLowTime}
                onTimerComplete={onComplete}
            />
        );

        await act(async () => {
            vi.advanceTimersByTime(1000);
        });

        expect(onLowTime).toHaveBeenCalledTimes(1);
        expect(onComplete).not.toHaveBeenCalled();
    });

    it('does not tick while paused', async () => {
        const onLowTime = vi.fn();
        const onComplete = vi.fn();
        render(
            <Timer
                initialTime={1}
                onLowTime={onLowTime}
                onTimerComplete={onComplete}
                isPaused
            />
        );

        await act(async () => {
            vi.advanceTimersByTime(1500);
        });

        expect(onLowTime).not.toHaveBeenCalled();
        expect(onComplete).not.toHaveBeenCalled();
    });
});
