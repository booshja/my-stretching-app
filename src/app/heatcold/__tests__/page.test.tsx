import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const formMock = vi.fn(() => <div>HeatColdFormMock</div>);
const runnerMock = vi.fn(({ rounds }: { rounds: number }) => (
    <div>HeatColdRunnerMock:{rounds}</div>
));
vi.mock('../_components/HeatColdForm', () => ({
    HeatColdForm: () => formMock(),
}));

vi.mock('../_components/HeatColdRunner', () => ({
    HeatColdRunner: (props: { rounds: number }) => runnerMock(props),
}));

import HeatColdPage from '../page';

describe('HeatColdPage', () => {
    it('renders runner when valid rounds are present', async () => {
        render(
            await HeatColdPage({
                searchParams: Promise.resolve({ rounds: '2' }),
            })
        );
        expect(screen.getByText('HeatColdRunnerMock:2')).toBeInTheDocument();
    });

    it('renders form on removed round option', async () => {
        render(
            await HeatColdPage({
                searchParams: Promise.resolve({ rounds: '4' }),
            })
        );
        expect(screen.getByText('HeatColdFormMock')).toBeInTheDocument();
    });

    it('renders form on duplicate rounds params', async () => {
        render(
            await HeatColdPage({
                searchParams: Promise.resolve({ rounds: ['2', '3'] }),
            })
        );
        expect(screen.getByText('HeatColdFormMock')).toBeInTheDocument();
    });

    it('renders form when rounds param is empty', async () => {
        render(
            await HeatColdPage({
                searchParams: Promise.resolve({ rounds: '' }),
            })
        );
        expect(screen.getByText('HeatColdFormMock')).toBeInTheDocument();
    });
});
