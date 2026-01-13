import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import React, { useLayoutEffect } from 'react';

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: vi.fn() }),
}));

// Mock hockey routine module before importing the component under test
vi.mock('@/utils/routines/hockeyStretch', () => ({
    HOCKEY: [
        {
            name: 'Item A',
            description: 'A',
            image: '/a.jpg',
            pauseForNext: true,
        },
        { name: 'Item B', description: 'B', image: '/b.jpg' },
    ],
}));

// Mock Timer with a test-controlled trigger to complete ONLY the first stretch.
vi.mock('@/components/Timer/Timer', () => {
    let setTrigger: null | (() => void) = null;
    return {
        Timer: ({
            onTimerComplete,
            isPaused,
        }: {
            onTimerComplete: () => void;
            isPaused?: boolean;
        }) => {
            useLayoutEffect(() => {
                // When an active timer mounts (isPaused=false), expose/update a trigger
                if (!isPaused) {
                    setTrigger = onTimerComplete;
                }
            }, [isPaused, onTimerComplete]);
            return null;
        },
        __getTrigger: () => setTrigger,
    };
});

import { StretchRunner } from '../../StretchRunner';

describe('StretchRunner manual transition behavior', () => {
    it('shows Next during manual transition and starts countdown on Space/ArrowRight', async () => {
        render(<StretchRunner type="hockey" time={60} />);

        // Exit the 10s pre-start phase
        fireEvent.click(
            await screen.findByRole('button', { name: /start now/i })
        );
        await act(async () => {});

        // Programmatically complete the first stretch; then flush effects
        await act(async () => {
            const mod = (await vi.importMock('@/components/Timer/Timer')) as {
                __getTrigger: () => (() => void) | null;
            };
            const trigger = mod.__getTrigger?.();
            if (trigger) trigger();
        });
        // Allow React to process the state update
        await act(async () => {});

        // Expect a Next button to appear during manual transition (instead of Skip)
        expect(
            await screen.findByRole('button', { name: /next/i })
        ).toBeInTheDocument();

        // Primary button should reflect that we're paused waiting for user input
        expect(
            screen.getByRole('button', { name: /continue/i })
        ).toBeInTheDocument();

        // Space should start the 5s countdown (remove Next and resume timer)
        fireEvent.keyDown(window, { code: 'Space' });

        // After starting, Next button should be gone
        expect(screen.queryByRole('button', { name: /next/i })).toBeNull();
    });
});
