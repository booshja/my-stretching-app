import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LandingPage from '../page';

describe('LandingPage', () => {
    it('renders main heading and route links', () => {
        render(<LandingPage />);

        expect(
            screen.getByRole('heading', { name: /welcome to my stretching app/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: /stretching/i })
        ).toHaveAttribute('href', '/stretch');
        expect(
            screen.getByRole('link', { name: /heat\/cold therapy/i })
        ).toHaveAttribute('href', '/heatcold');
        expect(
            screen.getByRole('link', { name: /pre-game warmup/i })
        ).toHaveAttribute('href', '/pregame');
    });
});
