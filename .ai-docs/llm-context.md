## LLM Development Context for "My Stretching"

This document captures project structure, data models, conventions, and gotchas to help an LLM (or any contributor) make safe, high-quality edits.

### Tech stack

-   **Framework**: Next.js 15 (App Router)
-   **UI**: React 19
-   **Language**: TypeScript (strict mode)
-   **Styling**: CSS Modules + global reset in `src/app/globals.css`
-   **Package manager**: Yarn

### Run scripts

-   **Dev**: `yarn dev`
-   **Build**: `yarn build`
-   **Start**: `yarn start`
-   **Lint**: `yarn lint`

### Path aliases (tsconfig.json)

-   `@/*` → `src/*`
-   `@/components/*` → `src/components/*`
-   `@/utils/*` → `src/utils/*`
-   `@/assets/*` → `public/*`

### Project layout (key areas)

-   `src/app` (Next.js App Router)
    -   `page.tsx`: Landing page with links to feature routes
    -   `stretch/`: Stretching feature route
        -   `_components/StretchForm`: multi-step chooser (routine → length → start)
        -   `_utils.ts`: enums and types for stretch flow
    -   `heatcold/`: Heat/Cold feature route
        -   `_components/HeatColdForm`: multi-step chooser (rounds → start)
        -   `_utils.ts`: enums and types for heat/cold flow
-   `src/components` (legacy/standalone UI building blocks)
    -   `Routine/`, `RoutineItem/`, `RoutineChoiceForm/`, `Timer/`
-   `src/utils`
    -   `routines/`: Data lists for routines
    -   `getRoutineList.ts`: Injects "Transition" items between routine items
    -   `checkUrlParams.ts`: URL param validation utility
    -   `playBeep.ts`: Audio helper using `public/audio/beep-07a.mp3`
-   `src/types.ts`: Shared domain types

### Routing and flows

-   `src/app/page.tsx` links to `/stretch` and `/heatcold`.
-   `src/app/stretch/page.tsx`
    -   Reads `type` and `time` from URL. If either missing, shows `<StretchForm />`.
    -   Routine execution UI is not yet wired here; Start screen builds a link with query params.
-   `src/app/heatcold/page.tsx`
    -   Reads `rounds` from URL. If missing, shows `<HeatColdForm />`.
    -   Routine execution UI is not yet wired here; Start screen builds a link with `rounds`.

### Data models (src/types.ts)

-   `Stretch`: `{ name: string; description: string; image: StaticImageData }`
-   `HeatCold`: `{ name: string; time: number }`
-   `DisplayItem = HeatCold | Stretch`
-   `StretchLength = 60 | 90`

### Routine data (src/utils/routines)

-   `hockeyStretch.ts` exports `HOCKEY: Stretch[]` with public string image paths (e.g., `/images/foo.webp`).
-   `hockeyHeatCold.ts` exports `HOCKEY_HEAT_COLD: HeatCold[]` with `time` values.
-   `nighttimeStretch.ts` exports `NIGHTTIME: Stretch[] = []` (placeholder).

### Generating a playable sequence

-   `getRoutineList(routine: DisplayItem[])` returns a new list with a 5-second Transition inserted between each item:
    -   Transition item: `{ name: 'Transition', description: 'Get ready for ...', time: 5 }`.
    -   Note: `Transition` is a first-class type now; UI must guard for items without `image`.

### UI components of interest

-   `Timer` (`src/components/Timer/Timer.tsx`)
    -   Props: `initialTime` (seconds), `onLowTime`, `onTimerComplete`.
    -   Beeps at 6→0 seconds via `playBeep()`.
    -   Important: The current implementation uses a stale `timeRemaining` inside `setInterval` (effect has empty deps), which can prevent `onLowTime` and `onTimerComplete` from firing correctly. See Known issues for a fix pattern.
-   `RoutineItem` expects a `DisplayItem` and uses `next/image` with string `src`.
    -   Guards for missing `image` (Heat/Cold or Transition) and only renders an image for stretch items.
-   `Routine` (legacy, not wired into current routes) combines `RoutineChoiceForm`, `Timer`, and `RoutineItem` to step through a computed list.

### Stretch form flow (src/app/stretch/\_components/StretchForm)

1. `RoutineStep` → pick routine (`ROUTINE_OPTIONS.HOCKEY` or `DAILY`).
2. `LengthStep` → pick time per stretch (`STRETCH_TIMES`).
3. `StartRoutineStep` → shows summary and a link to `/stretch?type=...&time=...`.

### Heat/Cold form flow (src/app/heatcold/\_components/HeatColdForm)

1. `RoundsStep` → pick number of rounds.
2. `StartRoutineStep` → shows summary and a link to `/heatcold?rounds=...`.

### URL params

-   Prefer validating via `checkUrlParams({ params, allowedParams })` (currently not used in pages but available).
-   Example `allowedParams` for `/stretch`: `{ type: ['hockey','daily'], time: ['60','90'] }`.

### Assets

-   Audio: `public/audio/beep-07a.mp3` used by `playBeep()`.
-   Images: placed under `public/images/` and imported as `StaticImageData` via the `@/assets` alias (e.g., `import Img from '@/assets/images/foo.webp'`). This enables Next/Image optimizations without specifying width/height manually.

### How to add a new stretch routine

1. Add image(s) to `public/images/`.
2. Create or update a file under `src/utils/routines/` exporting a `Stretch[]`.
3. Export it from `src/utils/routines/index.ts`.
4. If used in UI, map your choice to the new data in the appropriate form/flow.
5. If you display transitions, ensure your UI handles Transition items that lack an `image`.

### Conventions

-   Client components are explicitly marked with `'use client'`.
-   CSS Modules per component/feature directory for local styles.
-   Keep types in `src/types.ts` and constants/enums near their feature (`_utils.ts` in feature folders, `src/utils/constants.ts` for shared legacy code).

### Known issues and suggested fixes

-   Stretch Start link missing separator

    -   File: `src/app/stretch/_components/StretchFormSteps/StartRoutineStep/StartRoutineStep.tsx`
    -   Current: `/stretch?type=${routineChoice}time=${stretchTime}`
    -   Should be: `/stretch?type=${routineChoice}&time=${stretchTime}`

-   Timer stale state in interval: fixed by switching to a `setTimeout` loop keyed off `timeRemaining` with low-time and completion callbacks.

-   Transition items vs UI requirements

    -   `getRoutineList` inserts Transition items that do not have `image`.
    -   `RoutineItem` assumes `item.image` exists. Either add a guard or render a different component for Transition/HeatCold items.

-   Unused or inconsistent constants
    -   `TRANSITION.time` is defined as `0` in `src/utils/constants.ts` but not used; `getRoutineList` hardcodes `5` seconds. Consider centralizing.
    -   `NIGHTTIME` routine is empty; either implement or hide choice.

### Tips for LLM edits

-   When editing code, respect file-local conventions and CSS Module boundaries.
-   Prefer adding types to new props/params and using existing union types.
-   Use path aliases; do not use long relative paths.
-   For Next/Image, prefer importing static assets to get `StaticImageData` types.
-   For URL flows, update both the start-step Link and the destination page parser/validator.

### Quick reference

-   Feature start points:
    -   Stretching: `src/app/stretch/_components/StretchForm/`
    -   Heat/Cold: `src/app/heatcold/_components/HeatColdForm/`
-   Shared routines: `src/utils/routines/`
-   Timer + audio: `src/components/Timer/` and `src/utils/playBeep.ts`
