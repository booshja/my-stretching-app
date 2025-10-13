// Minimal local typings (do not augment global DOM types to avoid conflicts)
type LocalWakeLock = {
    request: (type: 'screen') => Promise<LocalWakeLockSentinel>;
};

type LocalWakeLockSentinel = EventTarget & {
    released: boolean;
    release: () => Promise<void>;
};

let wakeLockSentinel: LocalWakeLockSentinel | null = null;
let listenersAttached = false;

const onVisibilityChange = async () => {
    if (document.visibilityState === 'visible') {
        // Re-acquire on visibility gain
        try {
            const wl = (navigator as unknown as { wakeLock?: LocalWakeLock })
                .wakeLock;
            if (wl && !wakeLockSentinel) {
                wakeLockSentinel = await wl.request('screen');
                wakeLockSentinel.addEventListener('release', () => {
                    wakeLockSentinel = null;
                });
            }
        } catch {
            // Ignore errors (e.g., user agent denies)
        }
    }
};

export const enableWakeLock = async () => {
    const wl = (navigator as unknown as { wakeLock?: LocalWakeLock }).wakeLock;
    if (!wl) return;
    try {
        if (!wakeLockSentinel) {
            wakeLockSentinel = await wl.request('screen');
            wakeLockSentinel.addEventListener('release', () => {
                wakeLockSentinel = null;
            });
        }
        if (!listenersAttached) {
            document.addEventListener('visibilitychange', onVisibilityChange);
            listenersAttached = true;
        }
    } catch {
        // Ignore; often thrown if not initiated via user gesture
    }
};

export const disableWakeLock = async () => {
    try {
        if (wakeLockSentinel) {
            await wakeLockSentinel.release();
            wakeLockSentinel = null;
        }
    } catch {
        // noop
    } finally {
        if (listenersAttached) {
            document.removeEventListener(
                'visibilitychange',
                onVisibilityChange
            );
            listenersAttached = false;
        }
    }
};
