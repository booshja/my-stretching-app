## Issue Audit and Prioritization

This document catalogs identifiable issues/bugs in the codebase with suggested priority and fixes.

Legend: Critical > High > Medium > Low

### Critical

-   Incorrect static image imports from `public/`
    -   Files: `src/utils/routines/hockeyStretch.ts`
    -   Problem: Images are imported via `@/assets/images/...` where the alias maps to `public/*`. Next.js does not support importing from `public/` as modules for `StaticImageData`. This will likely fail build/runtime.
    -   Fix (Option A): Move images to `src/assets/images/` (inside the bundle) and update imports/path alias.
    -   Fix (Option B): Use string `src` (e.g., `"/images/file.jpg"`) and update types/UI to handle string URLs instead of `StaticImageData`.

### High

-   Timer stale interval closure

    -   File: `src/components/Timer/Timer.tsx`
    -   Problem: `useEffect` has empty deps while reading `timeRemaining` inside `setInterval`, causing stale reads. `onLowTime`/`onTimerComplete` may never fire or fire inconsistently.
    -   Fix: Replace `setInterval` with a `setTimeout` tick driven by `timeRemaining` state, or include `timeRemaining` in deps and manage interval lifecycle carefully (recommended: `setTimeout` pattern). See `.ai-docs/llm-context.md` for code sketch.

-   Transition type mismatch in `getRoutineList`

    -   File: `src/utils/getRoutineList.ts`; Types in `src/types.ts`
    -   Problem: Transition object `{ name, description, time }` does not conform to `DisplayItem = HeatCold | Stretch`. It has extra `description` for `HeatCold` and is missing `image` for `Stretch`. With `strict: true`, this should be a type error.
    -   Fix: Introduce a proper `Transition` type (e.g., `{ name: string; description: string; time: number; kind: 'transition' }`) and change `DisplayItem = Stretch | HeatCold | Transition`. Update consumers to handle `Transition`.
    -   Note: `types.ts` currently has `export type Transition = Stretch;` which is incorrect.

-   `RoutineItem` assumes `image`

    -   File: `src/components/RoutineItem/RoutineItem.tsx`
    -   Problem: Renders `<Image src={item.image} .../>` unconditionally. Will crash for Heat/Cold or Transition items (no `image`).
    -   Fix: Narrow by kind or check `'image' in item` before rendering the image; render an alternate layout for non-image items.

-   Bad Stretch Start link query string

    -   File: `src/app/stretch/_components/StretchFormSteps/StartRoutineStep/StartRoutineStep.tsx`
    -   Problem: Missing `&` between params: `/stretch?type=${routineChoice}time=${stretchTime}`.
    -   Fix: `/stretch?type=${routineChoice}&time=${stretchTime}`.

-   ESLint TypeScript parser/plugin missing

    -   Files/Config: `eslint.config.mjs`, `package.json`
    -   Problem: Config extends `next/typescript` via flat compat but devDeps do not include `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin`. Lint may fail to run TS rules or error on startup.
    -   Impact: Linting may be broken or less effective, reducing code quality signal and CI usefulness.
    -   Fix: `npm i -D @typescript-eslint/parser@^8 @typescript-eslint/eslint-plugin@^8` (compatible with ESLint 9). No config change needed beyond ensuring these are resolvable.

### Medium

-   Legacy `Routine` flow breaks on transitions and next preview indexing

    -   File: `src/components/Routine/Routine.tsx`
    -   Problems:
        -   After advancing, `currentItemIndex` can land on Transition (no `image`), which will break `RoutineItem` (see above).
        -   Next preview uses `currentItemIndex + 2` and condition `<= currentRoutine.length`, which can index out of bounds.
    -   Fixes:
        -   Skip rendering `RoutineItem` for Transition or render a dedicated Transition UI.
        -   Change condition to `< currentRoutine.length` when using `+ 2`.

-   Feature pages don’t validate URL params
    -   Files: `src/app/stretch/page.tsx`, `src/app/heatcold/page.tsx`
    -   Problem: Pages read search params but do not validate values. Utility `checkUrlParams` exists but is unused.
    -   Fix: Use `checkUrlParams` with explicit `allowedParams` to guard invalid values and handle errors/user feedback.

### Low

-   CSS root selector typo

    -   File: `src/app/globals.css`
    -   Problem: Uses `::root` instead of `:root`. Custom properties under this block are not applied.
    -   Fix: Change to `:root`.

-   Incomplete/placeholder routine

    -   File: `src/utils/routines/nighttimeStretch.ts`
    -   Problem: `NIGHTTIME` is an empty list; exposed via UI in some places.
    -   Fix: Implement routine or hide option until ready.

-   Unused/inconsistent constant
    -   File: `src/utils/constants.ts`
    -   Problem: `TRANSITION.time = 0` is defined but not used; `getRoutineList` hardcodes `5` seconds.
    -   Fix: Centralize transition duration in one source of truth.

### Opportunity / Nice-to-have

-   Finalize routine execution UIs on feature pages

    -   Files: `src/app/stretch/page.tsx`, `src/app/heatcold/page.tsx`
    -   Observation: The actual routine components are commented out/not implemented on these routes. After param selection, pages don’t run a routine.

-   Audio playback UX
    -   File: `src/utils/playBeep.ts`
    -   Observation: Creates a new `Audio` instance for each beep; for frequent beeps you may want a preloaded instance or Web Audio API for tighter timing.

---

If helpful, I can open a PR that implements the quick fixes (Stretch link `&`, `:root`, guard `RoutineItem`) and a follow-up PR for the type-safe `Transition` model and Timer refactor.
