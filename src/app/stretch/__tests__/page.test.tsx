import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const formMock = vi.fn(() => <div>StretchFormMock</div>);
const runnerMock = vi.fn(
    ({ type, time }: { type: string; time: number }) => (
        <div>
            StretchRunnerMock:{type}:{time}
        </div>
    )
);
const useSearchParamsMock = vi.fn();

vi.mock('next/navigation', () => ({
    useSearchParams: () => useSearchParamsMock(),
}));

vi.mock('../_components/StretchForm', () => ({
    StretchForm: () => formMock(),
}));

vi.mock('../_components/StretchRunner', () => ({
    StretchRunner: (props: { type: string; time: number }) => runnerMock(props),
}));

import StretchPage from '../page';

describe('StretchPage', () => {
    beforeEach(() => {
        useSearchParamsMock.mockReset();
    });

    it('renders form when params are missing', () => {
        useSearchParamsMock.mockReturnValue(new URLSearchParams(''));
        render(<StretchPage />);
        expect(screen.getByText('StretchFormMock')).toBeInTheDocument();
    });

    it('renders runner when params are valid', () => {
        useSearchParamsMock.mockReturnValue(
            new URLSearchParams('type=hockey&time=45')
        );
        render(<StretchPage />);
        expect(screen.getByText('StretchRunnerMock:hockey:45')).toBeInTheDocument();
    });

    it('renders form when params are invalid', () => {
        useSearchParamsMock.mockReturnValue(
            new URLSearchParams('type=unknown&time=45')
        );
        render(<StretchPage />);
        expect(screen.getByText('StretchFormMock')).toBeInTheDocument();
    });
});
