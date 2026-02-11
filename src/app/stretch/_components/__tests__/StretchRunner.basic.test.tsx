import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StretchRunner } from '../StretchRunner';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: pushMock }),
}));

describe('StretchRunner basic behavior', () => {
    beforeEach(() => {
        pushMock.mockReset();
    });

    it('shows empty-state for daily routine', () => {
        render(<StretchRunner type="daily" time={45} />);
        expect(screen.getByText(/no stretches found for this routine/i)).toBeInTheDocument();
    });

    it('supports escape shortcut during prestart', () => {
        render(<StretchRunner type="hockey" time={45} />);
        fireEvent.keyDown(window, { code: 'Escape' });
        expect(pushMock).toHaveBeenCalledWith('/');
    });
});
