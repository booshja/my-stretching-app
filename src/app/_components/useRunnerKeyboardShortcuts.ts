import { useEffect } from 'react';

interface UseRunnerKeyboardShortcutsProps {
    onSpace?: () => void;
    onEscape?: () => void;
    onArrowRight?: () => void;
    enabled?: boolean;
}

export const useRunnerKeyboardShortcuts = ({
    onSpace,
    onEscape,
    onArrowRight,
    enabled = true,
}: UseRunnerKeyboardShortcutsProps) => {
    useEffect(() => {
        if (!enabled) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space' && onSpace) {
                event.preventDefault();
                onSpace();
                return;
            }

            if (event.code === 'Escape' && onEscape) {
                event.preventDefault();
                onEscape();
                return;
            }

            if (event.code === 'ArrowRight' && onArrowRight) {
                event.preventDefault();
                onArrowRight();
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [enabled, onArrowRight, onEscape, onSpace]);
};
