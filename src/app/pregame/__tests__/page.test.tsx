import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const runnerMock = vi.fn(() => <div>Runner mounted</div>);
const initBeepMock = vi.fn();

vi.mock('../_components/PreGameRunner', () => ({
    PreGameRunner: () => runnerMock(),
}));

vi.mock('@/utils/playBeep', () => ({
    initBeep: () => initBeepMock(),
}));

import PreGamePage from '../page';

describe('PreGamePage', () => {
    it('shows intro first and starts runner after click', () => {
        render(<PreGamePage />);

        expect(
            screen.getByRole('heading', { name: /pre-game warmup/i })
        ).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: /start/i }));

        expect(initBeepMock).toHaveBeenCalled();
        expect(screen.getByText('Runner mounted')).toBeInTheDocument();
    });
});
