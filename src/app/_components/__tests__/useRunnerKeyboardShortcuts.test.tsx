import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useRunnerKeyboardShortcuts } from '../useRunnerKeyboardShortcuts';

const HookHarness = ({
    enabled = true,
    onSpace,
    onEscape,
    onArrowRight,
}: {
    enabled?: boolean;
    onSpace?: () => void;
    onEscape?: () => void;
    onArrowRight?: () => void;
}) => {
    useRunnerKeyboardShortcuts({ enabled, onSpace, onEscape, onArrowRight });
    return null;
};

describe('useRunnerKeyboardShortcuts', () => {
    it('invokes callbacks for registered keys', () => {
        const onSpace = vi.fn();
        const onEscape = vi.fn();
        const onArrowRight = vi.fn();

        render(
            <HookHarness
                onSpace={onSpace}
                onEscape={onEscape}
                onArrowRight={onArrowRight}
            />
        );

        window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));

        expect(onSpace).toHaveBeenCalledTimes(1);
        expect(onEscape).toHaveBeenCalledTimes(1);
        expect(onArrowRight).toHaveBeenCalledTimes(1);
    });

    it('does nothing when disabled', () => {
        const onSpace = vi.fn();
        render(<HookHarness enabled={false} onSpace={onSpace} />);

        window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
        expect(onSpace).not.toHaveBeenCalled();
    });
});
