import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeatColdForm } from '../HeatColdForm';

describe('HeatColdForm', () => {
    it('advances to start step after selecting rounds', () => {
        render(<HeatColdForm />);

        fireEvent.click(screen.getByRole('button', { name: /2 rounds/i }));
        expect(screen.getByRole('link', { name: /let's go!/i })).toHaveAttribute(
            'href',
            '/heatcold?rounds=2'
        );
    });

    it('shows only 1-3 rounds and explains final heat', () => {
        render(<HeatColdForm />);

        expect(screen.queryByRole('button', { name: /4 rounds/i })).toBeNull();
        expect(
            screen.getByText(/finished with 190 seconds of heat/i)
        ).toBeInTheDocument();
    });
});
