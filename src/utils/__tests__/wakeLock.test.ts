import { beforeEach, describe, expect, it, vi } from 'vitest';

type FakeSentinel = EventTarget & {
    released: boolean;
    release: () => Promise<void>;
};

describe('wakeLock utils', () => {
    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
    });

    it('does nothing when Wake Lock API is unavailable', async () => {
        Object.defineProperty(navigator, 'wakeLock', {
            value: undefined,
            configurable: true,
        });

        const { enableWakeLock, disableWakeLock } = await import('../wakeLock');
        await expect(enableWakeLock()).resolves.toBeUndefined();
        await expect(disableWakeLock()).resolves.toBeUndefined();
    });

    it('requests and releases a wake lock when API is available', async () => {
        const sentinel: FakeSentinel = Object.assign(new EventTarget(), {
            released: false,
            release: vi.fn(async () => {
                sentinel.released = true;
            }),
        });

        const request = vi.fn(async () => sentinel);

        Object.defineProperty(navigator, 'wakeLock', {
            value: { request },
            configurable: true,
        });

        const { enableWakeLock, disableWakeLock } = await import('../wakeLock');
        await enableWakeLock();
        expect(request).toHaveBeenCalledWith('screen');

        await disableWakeLock();
        expect(sentinel.release).toHaveBeenCalled();
    });

    it('reacquires lock after release when visibility changes to visible', async () => {
        const firstSentinel: FakeSentinel = Object.assign(new EventTarget(), {
            released: false,
            release: vi.fn(async () => {
                firstSentinel.released = true;
            }),
        });
        const secondSentinel: FakeSentinel = Object.assign(new EventTarget(), {
            released: false,
            release: vi.fn(async () => {
                secondSentinel.released = true;
            }),
        });

        const request = vi
            .fn()
            .mockResolvedValueOnce(firstSentinel)
            .mockResolvedValueOnce(secondSentinel);

        Object.defineProperty(navigator, 'wakeLock', {
            value: { request },
            configurable: true,
        });
        Object.defineProperty(document, 'visibilityState', {
            value: 'visible',
            configurable: true,
        });

        const { enableWakeLock, disableWakeLock } = await import('../wakeLock');
        await enableWakeLock();
        firstSentinel.dispatchEvent(new Event('release'));
        document.dispatchEvent(new Event('visibilitychange'));
        await Promise.resolve();

        expect(request).toHaveBeenCalledTimes(2);
        await disableWakeLock();
    });

    it('swallows wake lock request failures', async () => {
        const request = vi.fn(async () => {
            throw new Error('denied');
        });
        Object.defineProperty(navigator, 'wakeLock', {
            value: { request },
            configurable: true,
        });

        const { enableWakeLock } = await import('../wakeLock');
        await expect(enableWakeLock()).resolves.toBeUndefined();
        expect(request).toHaveBeenCalledWith('screen');
    });
});
