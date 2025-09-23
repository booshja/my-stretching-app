## My Stretching App

A simple web app for running stretching and heat/cold routines with a built‑in timer and audio cues. Choose a routine, pick your timing, and follow along.

### What’s inside

-   **Stretch routines**: Predefined lists (e.g., hockey, daily) with images and descriptions.
-   **Heat/Cold rounds**: Alternate timed rounds with clear prompts.
-   **Timer with audio**: Beeps as you approach 0, with a short transition between items.

### How it works

-   **Routes**
    -   `/stretch` — Pick a routine and a per‑stretch time. You can also start directly via URL, e.g. `/stretch?type=hockey&time=60`.
    -   `/heatcold` — Pick number of rounds or start via `/heatcold?rounds=4`.
-   **Flow**
    -   For stretches, a 5‑second transition is inserted between items so you can reposition.
    -   The timer beeps at low time and counts down with short beeps from 5→0.

### Tech

-   **Framework**: Next.js (App Router)
-   **UI**: React
-   **Language**: TypeScript
-   **Styling**: CSS Modules

### Notes

-   Audio is bundled at `public/audio/beep-07a.mp3`.
-   Images used for stretches live in `public/images/` and are referenced by path.
-   This app is for personal wellness routines. It is not medical advice.
