export const TRANSITION_SECONDS = 5;

export function formatDurationPhrase(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
        return `${hours} hr ${minutes} min ${seconds} sec`;
    }
    if (minutes > 0) {
        return `${minutes} min ${seconds} sec`;
    }
    return `${seconds} sec`;
}

export function totalStretchSeconds(
    numItems: number,
    secondsPerStretch: number,
    transitionSeconds: number = TRANSITION_SECONDS
): number {
    const transitions = Math.max(0, numItems - 1);
    return numItems * secondsPerStretch + transitions * transitionSeconds;
}

export function totalRoundsSeconds(
    rounds: number,
    perItemTimes: number[],
    transitionSeconds: number = TRANSITION_SECONDS
): number {
    const itemsPerRound = perItemTimes.length;
    const perRoundSeconds = perItemTimes.reduce((sum, t) => sum + t, 0);
    const items = itemsPerRound * rounds;
    const transitions = Math.max(0, items - 1); // no transition after final item
    return perRoundSeconds * rounds + transitions * transitionSeconds;
}
