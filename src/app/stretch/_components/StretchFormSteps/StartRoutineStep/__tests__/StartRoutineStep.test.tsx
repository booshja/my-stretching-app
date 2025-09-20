import { render, screen } from '@testing-library/react';
import { StartRoutineStep } from '../StartRoutineStep';

describe('StartRoutineStep', () => {
    it('builds a link with both type and time params separated by &', () => {
        render(<StartRoutineStep routineChoice="hockey" stretchTime={60} />);

        const link = screen.getByRole('link', { name: /let's go!/i });
        expect(link).toHaveAttribute('href', '/stretch?type=hockey&time=60');
    });
});
