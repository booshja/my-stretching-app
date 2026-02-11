## My Stretching App

A personal routine app for guided stretching, pre-game warmup, and heat/cold sessions with countdown timers, transitions, and audio cues.

## Features

- Stretch routines with images and descriptions (`hockey`, `nighttime`, `bareminimum`, `neck`)
- Heat/cold rounds with alternating intervals
- Pre-game warmup flow
- Timer beeps during final countdown and low-time warnings
- Keyboard controls while running routines (`Space`, `ArrowRight`, `Escape`)
- Wake Lock support to keep the screen active during sessions (when supported by browser)

## App Routes

- `/` - Landing page
- `/stretch` - Stretch setup and runner (`/stretch?type=<routine>&time=<seconds>`)
- `/heatcold` - Heat/cold setup and runner (`/heatcold?rounds=<1-4>`)
- `/pregame` - Pre-game warmup flow
- `/done` - Completion page (`/done?type=stretch|heatcold|pregame`)

URL params are validated and typed; invalid params fall back to safe UI paths.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Vitest + Testing Library
- CSS Modules + shared global utility classes

## Local Development

### Install

```bash
yarn install
```

### Run dev server

```bash
yarn dev
```

### Build and run production

```bash
yarn build
yarn start
```

## Quality Checks

### Scripts

- `yarn lint` - Next.js ESLint checks
- `yarn typecheck` - TypeScript checks
- `yarn test` - Run tests
- `yarn test:coverage` - Run tests with coverage
- `yarn verify` - Lint + typecheck + coverage (main quality gate)

### Coverage policy

Coverage is enforced in `vitest.config.ts` with global thresholds:

- statements >= 80%
- branches >= 80%
- functions >= 80%
- lines >= 80%

## Automation

- CI: `.github/workflows/ci.yml` runs `yarn verify` on pushes and pull requests
- Pre-commit: Husky + lint-staged (`.husky/pre-commit`) runs:
  - `yarn lint-staged`
  - `yarn typecheck`

## Project Structure (high level)

- `src/app` - App routes and route-level components
- `src/components` - Shared UI components (e.g., `Timer`, `RoutineItem`)
- `src/utils` - Shared utilities, data shaping, routine definitions
- `public/audio` - Sound assets
- `public/images` - Routine images

## Notes

- Audio file: `public/audio/beep-07a.mp3`
- This app is for personal wellness routines and is not medical advice.
