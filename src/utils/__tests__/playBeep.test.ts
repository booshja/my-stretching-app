import { beforeEach, describe, expect, it, vi } from 'vitest';

class MockAudio {
    static instances: MockAudio[] = [];
    public currentTime = 0;
    public muted = false;
    play = vi.fn(() => Promise.resolve());
    pause = vi.fn();

    constructor() {
        MockAudio.instances.push(this);
    }
}

describe('playBeep utils', () => {
    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        vi.unmock('@/utils/playBeep');
        MockAudio.instances = [];
        vi.stubGlobal('Audio', MockAudio as unknown as typeof Audio);
    });

    it('playBeep creates audio and attempts playback', async () => {
        const { playBeep } = await import('@/utils/playBeep');
        playBeep();

        const audioInstance = MockAudio.instances[0];
        expect(audioInstance).toBeDefined();
        expect(audioInstance?.play).toHaveBeenCalled();
    });

    it('initBeep unlocks audio on user click', async () => {
        const { initBeep } = await import('@/utils/playBeep');
        initBeep();

        window.dispatchEvent(new Event('click'));
        await Promise.resolve();

        const audioInstance = MockAudio.instances[0];
        expect(audioInstance?.play).toHaveBeenCalled();
        expect(audioInstance?.pause).toHaveBeenCalled();
    });

    it('swallows sync playback errors in playBeep', async () => {
        class ThrowingAudio extends MockAudio {
            play = vi.fn(() => {
                throw new Error('blocked');
            });
        }

        vi.stubGlobal('Audio', ThrowingAudio as unknown as typeof Audio);
        const { playBeep } = await import('@/utils/playBeep');

        expect(() => playBeep()).not.toThrow();
    });
});
