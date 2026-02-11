import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RoutineStep } from '../RoutineStep';

describe('RoutineStep', () => {
    it('calls handler with the selected routines', () => {
        const handleRoutineChoice = vi.fn();
        render(<RoutineStep handleRoutineChoice={handleRoutineChoice} />);

        fireEvent.click(screen.getByRole('button', { name: /hockey pre-game/i }));
        fireEvent.click(screen.getByRole('button', { name: /nighttime stretch/i }));
        fireEvent.click(
            screen.getByRole('button', { name: /bare minimum \(nightly\)/i })
        );
        fireEvent.click(screen.getByRole('button', { name: /neck stretches/i }));

        expect(handleRoutineChoice).toHaveBeenCalledWith('hockey');
        expect(handleRoutineChoice).toHaveBeenCalledWith('nighttime');
        expect(handleRoutineChoice).toHaveBeenCalledWith('bareminimum');
        expect(handleRoutineChoice).toHaveBeenCalledWith('neck');
    });
});
