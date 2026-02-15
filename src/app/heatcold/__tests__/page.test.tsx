import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const formMock = vi.fn(() => <div>HeatColdFormMock</div>);
const runnerMock = vi.fn(({ rounds }: { rounds: number }) => (
    <div>HeatColdRunnerMock:{rounds}</div>
));
const useSearchParamsMock = vi.fn();

vi.mock('next/navigation', () => ({
    useSearchParams: () => useSearchParamsMock(),
}));

vi.mock('../_components/HeatColdForm', () => ({
    HeatColdForm: () => formMock(),
}));

vi.mock('../_components/HeatColdRunner', () => ({
    HeatColdRunner: (props: { rounds: number }) => runnerMock(props),
}));

import HeatColdPage from '../page';

describe('HeatColdPage', () => {
    it('renders runner when valid rounds are present', () => {
        useSearchParamsMock.mockReturnValue(new URLSearchParams('rounds=2'));
        render(<HeatColdPage />);
        expect(screen.getByText('HeatColdRunnerMock:2')).toBeInTheDocument();
    });

    it('renders form on removed round option', () => {
        useSearchParamsMock.mockReturnValue(new URLSearchParams('rounds=4'));
        render(<HeatColdPage />);
        expect(screen.getByText('HeatColdFormMock')).toBeInTheDocument();
    });
});
