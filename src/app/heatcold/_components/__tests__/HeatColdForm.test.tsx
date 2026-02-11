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
});
