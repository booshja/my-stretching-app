import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StretchForm } from '../StretchForm';

describe('StretchForm', () => {
    it('flows from routine selection to start step', () => {
        render(<StretchForm />);

        fireEvent.click(screen.getByRole('button', { name: /hockey pre-game/i }));
        fireEvent.click(screen.getByRole('button', { name: /45 seconds/i }));

        expect(screen.getByRole('link', { name: /let's go!/i })).toHaveAttribute(
            'href',
            '/stretch?type=hockey&time=45'
        );
    });
});
