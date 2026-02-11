import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
    usePathname: () => '/stretch',
}));

import { Nav } from '../Nav';

describe('Nav', () => {
    it('renders all navigation links', () => {
        render(<Nav />);

        expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
            'href',
            '/'
        );
        expect(screen.getByRole('link', { name: 'Stretch' })).toHaveAttribute(
            'href',
            '/stretch'
        );
        expect(
            screen.getByRole('link', { name: 'Pre-Game Warmup' })
        ).toHaveAttribute('href', '/pregame');
        expect(screen.getByRole('link', { name: 'Heat/Cold' })).toHaveAttribute(
            'href',
            '/heatcold'
        );
    });
});
