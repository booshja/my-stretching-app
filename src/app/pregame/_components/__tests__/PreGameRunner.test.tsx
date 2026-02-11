import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PreGameRunner } from '../PreGameRunner';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: pushMock }),
}));

vi.mock('@/utils/routines/preGameWarmup', () => ({
    PRE_GAME_WARMUP: [
        {
            kind: 'stretch',
            name: 'Timed item',
            description: 'timed desc',
            image: '/images/a.jpg',
            link: null,
            time: 5,
        },
        {
            kind: 'stretch',
            name: 'Timed item 2',
            description: 'timed desc 2',
            image: '/images/b.jpg',
            link: null,
            time: 5,
        },
        {
            kind: 'stretch',
            name: 'Activity item',
            description: 'activity desc',
            image: '/images/c.jpg',
            link: null,
            activity: true,
        },
    ],
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

describe('PreGameRunner', () => {
    beforeEach(() => {
        pushMock.mockReset();
    });

    it('shows next preview and navigates when routine completes', () => {
        render(<PreGameRunner />);

        expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: /low time/i }));
        expect(screen.getByText(/next:/i)).toBeInTheDocument();

        // Complete timed item; enters transition mode.
        fireEvent.click(screen.getByRole('button', { name: /complete/i }));
        expect(screen.getByText(/get ready for timed item 2/i)).toBeInTheDocument();

        // Complete transition timer; now on second timed item.
        fireEvent.click(screen.getByRole('button', { name: /complete/i }));
        expect(screen.getByText('Timed item 2')).toBeInTheDocument();

        // Complete second timed item, then arrive at activity item.
        fireEvent.click(screen.getByRole('button', { name: /complete/i }));
        expect(screen.getByText('Activity item')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /^next$/i }));
        expect(pushMock).toHaveBeenCalledWith('/done?type=pregame');
    });
});
