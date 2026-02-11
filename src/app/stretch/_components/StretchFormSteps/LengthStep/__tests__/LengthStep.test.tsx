import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LengthStep } from '../LengthStep';

describe('LengthStep', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('shows fallback and back button when routine has no items', () => {
        const onBack = vi.fn();
        render(
            <LengthStep
                handleStretchTimeChoice={vi.fn()}
                routineChoice={'daily' as never}
                onBack={onBack}
            />
        );

        expect(screen.getByText(/no stretches found/i)).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: /back/i }));
        expect(onBack).toHaveBeenCalled();
    });

    it('shows dev test duration option in development', () => {
        vi.stubEnv('NODE_ENV', 'development');

        const handleChoice = vi.fn();
        render(
            <LengthStep
                handleStretchTimeChoice={handleChoice}
                routineChoice="hockey"
            />
        );
        fireEvent.click(screen.getByRole('button', { name: /20 seconds/i }));
        expect(handleChoice).toHaveBeenCalledWith(20);

    });
});
