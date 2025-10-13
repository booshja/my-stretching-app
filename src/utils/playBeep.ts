let sharedAudio: HTMLAudioElement | null = null;
let audioUnlocked = false;

export const initBeep = () => {
    if (audioUnlocked) return;
    if (typeof window === 'undefined') return;
    if (!sharedAudio) {
        sharedAudio = new Audio('/audio/beep-07a.mp3');
    }

    const tryUnlock = () => {
        if (!sharedAudio) return;
        // Attempt a muted play to satisfy iOS autoplay policy
        sharedAudio.muted = true;
        const p = sharedAudio.play();
        if (p && typeof p.then === 'function') {
            p.then(() => {
                sharedAudio?.pause();
                if (sharedAudio) {
                    sharedAudio.currentTime = 0;
                    sharedAudio.muted = false;
                }
                audioUnlocked = true;
            }).catch(() => {
                // Ignore; will try again on next user interaction
            });
        }
        window.removeEventListener('touchstart', tryUnlock);
        window.removeEventListener('click', tryUnlock);
    };

    // Register one-time listeners to unlock on first user gesture
    window.addEventListener('touchstart', tryUnlock, { once: true });
    window.addEventListener('click', tryUnlock, { once: true });
};

export const playBeep = () => {
    if (typeof window === 'undefined') return;
    if (!sharedAudio) {
        sharedAudio = new Audio('/audio/beep-07a.mp3');
    }
    try {
        sharedAudio.currentTime = 0;
        // Fire-and-forget; catch to avoid unhandled promise rejections
        void sharedAudio.play().catch(() => {});
    } catch {
        // no-op
    }
};
