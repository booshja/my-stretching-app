import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const useSearchParamsMock = vi.fn();

vi.mock('next/navigation', () => ({
    useSearchParams: () => useSearchParamsMock(),
}));

import DonePage from '../page';

describe('DonePage', () => {
    beforeEach(() => {
        useSearchParamsMock.mockReset();
    });

    it('renders stretch follow-up actions', () => {
        useSearchParamsMock.mockReturnValue(new URLSearchParams('type=stretch'));
        render(<DonePage />);
        expect(
            screen.getByText(/would you like to do a heat\/cold therapy session now/i)
        ).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Yes' })).toHaveAttribute(
            'href',
            '/heatcold'
        );
    });

    it('renders fallback content when param is invalid', () => {
        useSearchParamsMock.mockReturnValue(new URLSearchParams('type=invalid'));
        render(<DonePage />);
        expect(screen.getByRole('link', { name: /go home/i })).toHaveAttribute(
            'href',
            '/'
        );
    });

    it('renders simple completion for heatcold and pregame', () => {
        useSearchParamsMock.mockReturnValue(new URLSearchParams('type=heatcold'));
        render(<DonePage />);
        expect(
            screen.getByRole('link', { name: /do another routine/i })
        ).toHaveAttribute('href', '/');

        useSearchParamsMock.mockReturnValue(new URLSearchParams('type=pregame'));
        render(<DonePage />);
        expect(
            screen.getAllByRole('link', { name: /do another routine/i })[0]
        ).toHaveAttribute('href', '/');
    });
});
