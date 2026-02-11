import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HeatColdRunner } from '../HeatColdRunner';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: pushMock }),
}));

vi.mock('@/components/Timer/Timer', () => ({
    Timer: ({
        onLowTime,
        onTimerComplete,
        isPaused,
    }: {
        onLowTime: () => void;
        onTimerComplete: () => void;
        isPaused?: boolean;
    }) => (
        <div>
            <div>Paused:{String(isPaused)}</div>
            <button onClick={onLowTime} type="button">
                low time
            </button>
            <button onClick={onTimerComplete} type="button">
                complete
            </button>
        </div>
    ),
}));

vi.mock('@/components/RoutineItem/RoutineItem', () => ({
    RoutineItem: ({
        item,
        next,
    }: {
        item: { name?: string } | null;
        next?: boolean;
    }) => <div>{next ? `Next:${item?.name ?? ''}` : `Current:${item?.name ?? ''}`}</div>,
}));

describe('HeatColdRunner', () => {
    beforeEach(() => {
        pushMock.mockReset();
    });

    it('shows next item and completes to done route', () => {
        render(<HeatColdRunner rounds={1} />);

        fireEvent.click(screen.getByRole('button', { name: /low time/i }));
        expect(screen.getByText(/next:/i)).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /complete/i }));
        fireEvent.click(screen.getByRole('button', { name: /complete/i }));
        fireEvent.click(screen.getByRole('button', { name: /complete/i }));

        expect(pushMock).toHaveBeenCalledWith('/done?type=heatcold');
    });

    it('handles keyboard shortcuts', () => {
        render(<HeatColdRunner rounds={1} />);

        fireEvent.keyDown(window, { code: 'Space' });
        expect(screen.getByText('Paused:true')).toBeInTheDocument();

        fireEvent.keyDown(window, { code: 'Escape' });
        expect(pushMock).toHaveBeenCalledWith('/');
    });
});
