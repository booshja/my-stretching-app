import { render, screen } from '@testing-library/react';
import { StartRoutineStep } from '../StartRoutineStep';
import { describe, expect, it } from 'vitest';

describe('StartRoutineStep', () => {
    it('builds a link with both type and time params separated by &', () => {
        render(<StartRoutineStep routineChoice="hockey" stretchTime={60} />);

        const link = screen.getByRole('link', { name: /let's go!/i });
        expect(link).toHaveAttribute('href', '/stretch?type=hockey&time=60');
    });

    it.each([
        { seconds: 45, label: '45 seconds' },
        { seconds: 60, label: '1 minute' },
    ])('renders the correct label for $seconds seconds', ({ seconds, label }) => {
        render(
            <StartRoutineStep
                routineChoice="hockey"
                stretchTime={seconds as 45 | 60}
            />
        );

        expect(
            screen.getByRole('heading', {
                name: new RegExp(`Holding for ${label} per stretch`, 'i'),
            })
        ).toBeInTheDocument();
    });
});
