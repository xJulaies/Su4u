# Su4u Product Specification

## Document status

This document defines the target product behavior for **Su4u Professional V1**. The current codebase is a partial implementation of this specification. A requirement is not implemented merely because it is documented here.

Implementation status labels:

- **Implemented:** the requirement is fully implemented and verified.
- **Partial:** part of the requirement exists, but the implementation is incomplete or not fully verified.
- **Planned:** the requirement belongs to Professional V1 but is not implemented yet.
- **Future:** the requirement is intentionally outside Professional V1.

Status may be changed to **Implemented** only after the relevant acceptance criteria and automated quality checks pass.

## Product vision

Su4u is a modern, accessible, and reliable Sudoku platform. It gives casual players a frictionless way to start playing while providing long-term value for committed players through difficulty progression, personal statistics, best times, daily puzzles, and synchronized progress.

The playable Sudoku experience is the core product. Educational pages about Sudoku rules and history remain useful supporting content but are not the primary product focus.

## Target audiences

- Casual players who want to start a Sudoku immediately.
- Registered players who want synchronized progress, statistics, and personal best times.
- Experienced players who expect challenging, logically valid puzzles and meaningful performance records.

## Product principles

- A visitor must be able to play before creating an account.
- Every published puzzle must be logically valid, uniquely solvable, and correctly rated.
- The game must be reliable, responsive, and usable with mouse, touch, and keyboard.
- Registration must provide clear value rather than block access to the core experience.
- Personal progress must not be lost because of navigation, connectivity, authentication, or backend failures.
- Normal play and assisted play must remain statistically comparable within their own modes.
- The product must not pressure users through streak loss, artificial hint scarcity, or forced registration.

## Professional V1 scope

Professional V1 includes:

- a reliable guest Sudoku experience;
- one active saved game;
- `Easy`, `Medium`, and `Hard` difficulties;
- normal mode and a separate limited hint mode;
- notes, immediate mistake feedback, highlighting, timer, pause, and restart behavior;
- local persistence for guests;
- optional accounts and cloud synchronization;
- personal statistics and best times;
- one shared Daily Sudoku per calendar date;
- a public Daily calendar with access to past Daily puzzles;
- an authenticated dashboard;
- English and German localization;
- responsive desktop, tablet, and mobile web support;
- light and dark themes;
- automated tests and production quality gates;
- graceful behavior during backend or network outages; and
- account and cloud-data deletion.

## Explicit V1 non-goals

Professional V1 does not include:

- advertising;
- premium subscriptions or other monetization;
- analytics or marketing automation;
- tracking cookies;
- public leaderboards;
- streaks;
- multiplayer;
- social features;
- achievements or complex reward systems;
- native Android or iOS applications;
- Progressive Web App installation;
- full offline application startup;
- a complete user-data export;
- dedicated, fully optimized screen-reader gameplay;
- `Very Hard` or `Extreme` playable difficulties; or
- speculative code for future marketing or monetization systems.

## Current implementation summary

| Product area | Status | Current state |
| --- | --- | --- |
| Public pages and routing | Partial | Home, rules, history, game, about, and imprint routes exist. Dedicated Daily, account settings, and not-found experiences are missing. |
| Core Sudoku generation | Partial | Unique-solution generation exists, but difficulty is based primarily on removed cells rather than a deterministic logical rating solver. |
| Core game input | Partial | Cell selection, number entry, notes, immediate errors, timer, and completion exist. Several specified behaviors remain missing or differ from the target model. |
| Highlighting | Partial | Selected-cell highlighting exists. Peer and matching-value highlighting are missing. |
| Hint mode | Planned | No mode selection or hint system exists. |
| Persistence and synchronization | Planned | Active games and statistics are not persisted. No backend exists. |
| Daily Sudoku | Planned | No Daily puzzle or calendar exists. |
| Authentication | Partial | Clerk sign-in, sign-up, signed-in UI, and a protected route exist. Account lifecycle and guest-data transfer are missing. |
| Dashboard | Planned | A protected placeholder exists without product functionality. |
| Statistics | Partial | The current game displays elapsed time only. Persistent aggregate statistics are missing. |
| Localization | Planned | UI content is currently hard-coded primarily in English. |
| Theme support | Partial | Light and dark themes exist, but system-first selection and account synchronization are incomplete. |
| Accessibility | Partial | Native controls and some dialog semantics exist. Complete keyboard gameplay, focus behavior, and product-level verification are missing. |
| Responsive web UI | Partial | Responsive styling exists but has not been verified against all V1 layout requirements. |
| Automated testing | Partial | Vitest unit and integration testing, V8 coverage thresholds, and Playwright browser testing are configured with an initial game-focused suite. Full product coverage remains ongoing. |
| Backend resilience | Planned | No backend or synchronization layer exists. |

## Access model

### Guest access

The complete core Sudoku experience is available without an account.

Guests may:

- start and complete free games;
- play today's and past Daily Sudokus;
- use normal mode or hint mode;
- save one active game locally;
- keep local game statistics and Daily calendar progress; and
- change language and theme preferences locally.

### Account value

Registration is optional and is requested only when the user wants persistent, synchronized, or personalized functionality.

An account provides:

- cloud synchronization of the active game;
- cross-device statistics and best times;
- a synchronized Daily calendar;
- persistent language and theme preferences;
- access to the personal dashboard; and
- account settings and account deletion.

The product may suggest registration after a meaningful value moment, such as completing a first Sudoku, but must not interrupt or block guest play.

## Game lifecycle

Only one game may be active at a time for both guests and registered users. The active game may be either a freely selected puzzle or a Daily puzzle.

Game lifecycle actions:

- **Continue:** restore the saved state of the same puzzle.
- **Restart:** reset the same puzzle to its original state.
- **New game:** start a different puzzle with the selected difficulty and mode.
- **Give up:** intentionally end the active puzzle without completing it.

Rules:

- Restarting resets user entries, notes, mistakes, elapsed time, pause state, and the hint allowance while preserving the same puzzle, difficulty, and mode.
- Starting a new game resets all per-game state and loads a different puzzle.
- Restart, new game, mode changes, and give-up actions require confirmation when meaningful progress exists.
- A page change, tab close, browser close, or connectivity loss is not a give-up action.
- A given-up game is recorded separately and is not treated as a loss.
- A completed game cannot be continued as an active game.
- Completed Daily puzzles may be replayed as new games.

## Puzzle model and quality

Each puzzle has:

- a stable puzzle ID;
- a puzzle version;
- a difficulty;
- an immutable original grid;
- an immutable solution;
- a game mode selected for the current play session; and
- optional Daily date metadata.

Every published puzzle must:

- have exactly one solution;
- be solvable through deterministic logical techniques;
- never require player guessing, trial and error, or speculative backtracking;
- pass a logical difficulty-rating solver;
- be reproducibly verifiable in automated tests; and
- remain immutable after publication.

Generation may use backtracking internally to create and validate puzzles. The player's required solution path, however, must be logical and appropriate for the assigned difficulty.

Free games use a random validated puzzle. Recently played puzzle IDs should not be offered again where history is available. Guests keep recent history locally; accounts keep it in synchronized storage. Explicitly replaying a completed Daily puzzle is allowed.

Failure to load or generate a new puzzle must not destroy the current active game. The user receives a retry option while the existing state remains intact.

## Difficulty model

### Professional V1

- **Easy:** solvable with fundamental single techniques.
- **Medium:** requires candidate logic, locked candidates, and simple pair interactions.
- **Hard:** requires multiple advanced logical techniques and longer deductions.

### Future

- **Very Hard:** complex combinations and long logical dependencies.
- **Extreme:** expert-level techniques and especially long logical solution paths.

`Very Hard` and `Extreme` remain logically solvable without guessing. They are future product requirements and must not appear as incomplete V1 options.

Difficulty is determined by the required logical techniques and solution path, not by clue count alone. Statistics and best times are separated by difficulty.

## Board and selection behavior

- Every cell may be selected by mouse, touch, or keyboard, including given and solved cells.
- Only an unsolved editable cell accepts final values or notes.
- Selecting the already selected cell again clears the selection.
- The selected cell receives the strongest selection treatment.
- Its full row, column, and 3x3 box receive a subtle peer highlight.
- If the selected cell contains a value, all occurrences of the same value are highlighted.
- Selected, peer, matching-value, error, given, and solved states must remain distinguishable.
- Highlights must work in both themes and must not communicate essential meaning through color alone.
- Clearing selection removes selection-related highlights.

The precise colors and font weights are design decisions for implementation. Original given values and player-solved values must remain visually distinguishable, with given values expected to use a subtly stronger text weight or equivalent treatment.

## Cell state and number entry

Original given cells and player-solved cells are separate domain states.

- Given cells are immutable.
- A correct final entry becomes a solved, immutable player cell.
- A correctly solved cell remains selected after entry so its peers and matching values stay visible.
- A correct player entry must not be converted into an original given cell.
- A solved player cell cannot be deleted, changed, or undone.
- An incorrect final entry remains editable and visibly marked as an error.
- Entering a different number replaces an existing incorrect entry.
- Entering the same already visible incorrect value again does not create another mistake.
- Deleting an incorrect value does not create another mistake.
- The puzzle is completed only when every cell contains its correct value.

### Immediate validation

Every final number entry is checked immediately against the puzzle solution.

- Each newly entered incorrect value increments the mistake count.
- Repeating the unchanged visible incorrect value does not increment the count again.
- Mistakes do not end the game.
- There is no three-mistake game-over rule.
- Notes are never validated as final answers and never count as mistakes.

## Notes

- Notes may be edited only in empty, unsolved cells.
- Notes are displayed as an ordered 3x3 candidate grid.
- Entering an absent note adds it.
- Entering the same note again removes it.
- Entering a final value clears every note in the selected cell.
- Entering a correct final value removes that number from notes in every peer cell in the same row, column, and 3x3 box.
- A peer that belongs to more than one affected group is processed only once.
- Other note values remain unchanged.
- Incorrect final entries do not modify notes in other cells.

## Number controls

- The visible number pad contains values `1` through `9`.
- Number controls perform final entry or note toggling depending on the current mode.
- When a number is correctly present nine times through givens and solved cells, its number control is marked complete and disabled.
- A visible delete control removes an incorrect entry or all notes from the selected editable cell.
- There is no undo or redo feature.

## Keyboard controls

All gameplay functionality must be available through the keyboard.

- Arrow keys move selection by one cell.
- Selection stops at the board edge and does not wrap.
- Number keys `1` through `9` match the visible number controls.
- `N` toggles notes mode.
- `Backspace` and `Delete` remove an incorrect entry or all notes from the selected editable cell.
- `Escape` clears cell selection.
- Keyboard shortcuts must have visible mouse and touch equivalents.
- Keyboard shortcuts must be discoverable in the interface or help content.

## Hint mode

Every game is created in one of two modes:

- **Normal mode:** no hints are available.
- **Hint mode:** a maximum of three hints is available for the game.

Normal mode is the default for new users. The last selected mode is stored for later games.

Mode rules:

- The mode remains fixed for the life of a game.
- Changing the mode starts a new puzzle of the same difficulty.
- Changing the mode requires confirmation when meaningful progress exists.
- The previous active game is recorded as given up after confirmed replacement.
- Normal and hint mode have separate statistics and best times.

Hint behavior:

- A hint requires a selected unsolved cell.
- It fills the selected cell with the correct value.
- The resulting solved cell is immutable.
- It performs the same peer-note cleanup as a correct manual entry.
- It does not count as a mistake.
- Remaining hints are displayed.
- After the third hint, hint controls are disabled for the rest of that game.
- Hints are unavailable while paused or after completion.

## Timer and pause

- The timer begins when a fully loaded puzzle becomes visible.
- Puzzle generation and loading time do not count.
- The timer runs only while the game is active, visible, and not completed.
- Manual pause stops the timer and fully obscures the puzzle board.
- Controls are disabled while paused.
- Moving the browser tab to the background or minimizing the browser automatically pauses the game.
- Leaving the game page saves and pauses the game.
- Returning to a saved game requires an explicit continue action before the timer resumes.
- Filling the final correct cell stops the timer immediately.
- Paused time is excluded from all recorded game times.

## Game completion

When the final correct cell is solved:

- the timer stops immediately;
- the completed board remains available for inspection;
- the result is saved locally and synchronized in the background for accounts;
- an accessible completion dialog opens; and
- a new personal best is highlighted when applicable.

The completion dialog displays:

- difficulty;
- mode;
- active completion time;
- mistake count; and
- hints used when playing in hint mode.

Available actions:

- start a new puzzle with the same difficulty;
- select another difficulty;
- return to the Daily calendar when the completed puzzle was opened there;
- open the dashboard when signed in; and
- close the dialog to inspect the completed board.

The completion result must remain reopenable after the dialog is closed. Dialog focus behavior must meet the accessibility requirements.

## Active-game persistence

### Local persistence

Every relevant game action is saved locally immediately. Closing or refreshing the browser must not lose the latest locally committed state.

The saved active game includes at least:

- puzzle identity and version;
- original grid and required validation metadata;
- difficulty and mode;
- values, notes, and cell states;
- selected cell where appropriate;
- mistakes;
- used hints;
- active elapsed time;
- pause state; and
- lifecycle timestamps.

### Account synchronization

Account data synchronizes silently in the background. There is no routine `saving` or `saved` indicator.

- Temporary connectivity problems do not interrupt gameplay or produce noisy notifications.
- Unsynchronized data remains local and is retried later.
- A visible message appears only when synchronization fails persistently or user action is required.
- Conflicting device states must never be silently overwritten.
- When a conflict cannot be resolved safely, the user chooses which active state to keep.
- A completed state must not be replaced by an older active state.
- Statistical events use stable identifiers so retries do not create duplicates.

## Guest-to-account transfer

After sign-up or sign-in, eligible local guest progress may be transferred to the account.

- Transfer is optional and clearly explained.
- If no cloud active game exists, the local active game may be adopted.
- If local and cloud active games both exist, the user explicitly chooses which one remains active.
- No active game is overwritten silently.
- Mergeable statistics are deduplicated by stable game or event identifiers.
- Authentication errors must not destroy local guest progress.

## Daily Sudoku

There is exactly one shared Daily Sudoku for each calendar date.

- Every player receives the same puzzle for a given date.
- The date is assigned by a trusted server-side rule so device clocks and time zones cannot select different puzzles.
- Difficulty follows a defined rotation across `Easy`, `Medium`, and `Hard`.
- Today and all past Daily Sudokus are playable.
- Future dates are visible but locked.
- A Daily Sudoku uses the same game rules, modes, statistics, and best-time handling as any free Sudoku.
- A user may play it in normal mode or hint mode.
- Completed Daily Sudokus may be replayed and each replay is treated as another normal game.
- There is no leaderboard, streak, special Daily scoring system, or separate Daily performance category.

### Daily calendar

The Daily calendar is available publicly and is also embedded in the authenticated dashboard using the same underlying component and data.

Each calendar date displays:

- puzzle difficulty;
- locked future state where applicable; and
- one of `not started`, `in progress`, or `completed` for the current user or guest.

The calendar does not mark missed days negatively.

`Total dailies solved` counts distinct Daily dates completed at least once. Replaying the same date does not increase this value. Daily completions otherwise contribute to the normal aggregate game statistics.

## Statistics

### Aggregate statistics

Track:

- games started;
- games completed;
- games given up;
- completion rate;
- total active play time;
- average completion time;
- average mistake count; and
- total distinct Daily Sudokus solved.

### Difficulty and mode statistics

For each available difficulty, keep normal mode and hint mode separate.

Track:

- completed games;
- personal best time;
- average completion time;
- average mistakes; and
- for hint mode, total and average hints used.

Only completed games contribute to personal best and average completion time. Paused time is excluded. Free and Daily games share the same records and have no visual performance-statistics separation.

Guests store compact statistics locally and see them on the game experience. Registered users store synchronized statistics and access the full dashboard. Guest-to-account transfer must not double-count results.

## Authentication and account lifecycle

- Registration and sign-in are optional.
- After authentication, the user returns to the prior relevant destination or active-game flow.
- Protected data must be authorized at a trusted system boundary, not merely hidden in the UI.
- Signing out removes account data from the active client session without deleting cloud data.
- A signed-out guest must not see previously synchronized private account data.
- Authentication failures show understandable messages and retain local progress.

### Account deletion

Registered users can initiate permanent account deletion from account settings.

- The action requires explicit confirmation.
- The interface clearly states that deletion cannot be undone.
- Successful deletion removes the account and its associated cloud game, statistics, settings, and Daily calendar data.
- A failed request must never be displayed as successful.
- Successful deletion ends the authenticated session and establishes a clean guest state.
- Previously synchronized private account data must not remain exposed in guest storage.
- Success and failure paths require automated tests.

A user-data export is a future feature and not part of Professional V1.

## Dashboard

The dashboard is available only to authenticated users and contains:

- continue active game;
- personal best times by difficulty and mode;
- games started, completed, and given up;
- completion rate;
- average completion time and mistakes;
- hint-mode usage statistics;
- total distinct Daily Sudokus solved;
- the shared Daily calendar;
- language and theme preferences;
- account settings;
- sign-out; and
- account deletion.

Guests see only compact local statistics in the game experience and may be shown a non-blocking explanation of account benefits.

## Routes and information architecture

### Public routes

- **Home:** product positioning and immediate entry into play.
- **Play:** free Sudoku, the active game, and compact guest statistics.
- **Daily:** the public Daily calendar and Daily game entry.
- **Rules:** Sudoku rules and Su4u controls.
- **History:** the history of Sudoku.
- **About:** product information.
- **Imprint/Legal:** required legal and contact information.
- **Sign in / Sign up:** optional account access.

### Protected routes

- **Dashboard:** synchronized progress and full statistics.
- **Account settings:** preferences, sign-out, and account deletion.

### Navigation behavior

- Play and Daily remain accessible without authentication.
- Continuing an active game requires minimal navigation.
- Dashboard links appear only for authenticated users.
- Authentication redirects preserve the intended destination.
- Mobile navigation remains fully accessible.
- Unknown paths show a dedicated not-found experience with a clear recovery path.
- Authentication and loading failures have dedicated understandable states.

## Localization

Professional V1 supports:

- English as the default and fallback language; and
- German as a fully supported language.

Rules:

- Initial language follows the browser preference when supported.
- A user may change language at any time.
- An explicit choice overrides browser preference and is persisted.
- Guest preference is local; account preference synchronizes across devices.
- UI text must not be hard-coded inside feature components.
- Translation keys are centralized and type-safe where practical.
- Dates, numbers, and time labels use locale-aware formatting.
- Puzzle identity and Daily date assignment remain language-independent.
- Missing translations fall back to English in a controlled manner.
- A feature is not complete until its English and German content is provided.

## Theme

- Light and dark themes are fully supported.
- Initial theme follows the operating-system preference.
- A user can override the theme manually.
- Manual selection is persisted and overrides later system changes until reset.
- Guest preference is stored locally; account preference synchronizes across devices.
- Theme changes do not affect game state.
- Both themes meet the same contrast, state-visibility, and accessibility requirements.

## Responsive web platform

Professional V1 is a responsive web application.

- Support current major versions of Chrome, Edge, Firefox, and Safari.
- Support mouse, touch, and keyboard input concurrently.
- Support smartphones and tablets in portrait and landscape orientation.
- Support laptop and desktop layouts across practical window sizes.
- Keep the full 9x9 board usable without clipped cells.
- Avoid unintended horizontal page scrolling.
- Portrait layouts may place controls below the board.
- Landscape layouts may place controls beside the board.
- Orientation changes preserve game state, selection, notes, timer, and other relevant state.

PWA installation, native applications, and guaranteed full offline startup are outside V1.

## Accessibility

Professional V1 targets WCAG 2.2 Level AA for the implemented product scope. Formal conformance must not be claimed without appropriate verification.

- All gameplay and navigation functionality is operable by keyboard.
- Use semantic HTML and native controls where possible.
- Provide visible focus states and predictable focus movement.
- Do not communicate essential information through color alone.
- Maintain sufficient contrast in both themes.
- Keep the interface usable with browser zoom and enlarged text.
- Manage focus correctly in pause, confirmation, completion, authentication, and account-deletion dialogs.
- Do not announce timer updates every second to assistive technology.
- Respect reduced-motion preferences.

Screen-reader support in V1 is limited to semantic structure and understandable navigation. Dedicated screen-reader gameplay controls, comprehensive live announcements for every game action, and a fully optimized screen-reader play experience are future work. This limitation must remain documented and must not be misrepresented as completed functionality.

## Backend independence and failure behavior

The free Sudoku core remains usable when authentication or backend services are temporarily unavailable.

- Active and already loaded games remain playable.
- Local persistence remains functional.
- Account synchronization retries later without blocking play.
- Already loaded Daily puzzles remain available.
- Daily puzzles not yet available locally show an understandable retry state when offline.
- Cached dashboard information may be shown when appropriate and identified as potentially outdated only when relevant.
- Backend failure must never delete local progress.
- Sign-in, sign-up, account deletion, and uncached cloud data require connectivity.
- Tracking or synchronization failures must never prevent number entry or game completion.

## Privacy and product data

- Collect only data required for defined V1 functionality.
- Do not store Sudoku notes or interactions in analytics; V1 has no analytics integration.
- Keep authentication data separate from game-domain data where appropriate.
- Do not expose account data after sign-out.
- Do not use real production data in automated tests.
- Future analytics, advertising, or monetization requires a separate product and privacy decision.

## Acceptance criteria for Professional V1

Professional V1 is complete only when:

1. A guest can start, play, pause, resume, complete, restart, replace, and give up a Sudoku without creating an account.
2. Immediate validation, mistakes, notes, automatic peer-note cleanup, selection highlighting, matching-value highlighting, delete behavior, and locked solved cells match this specification.
3. Every published V1 puzzle has one solution, is logically solvable without guessing, and passes deterministic difficulty validation.
4. Normal and hint modes behave independently and retain separate statistics and best times.
5. Hint mode provides no more than three hints per game.
6. One active game survives refresh, navigation, browser restart, temporary offline state, and recoverable backend failure.
7. Guest progress can be transferred without silently overwriting a cloud game or duplicating statistics.
8. A user can register, sign in, sign out, access protected data, and permanently delete the account and cloud data.
9. The public Daily calendar provides today and all past Daily puzzles, locks future dates, and tracks completion status without streaks or rankings.
10. Dashboard statistics match stable, deduplicated game results.
11. English and German are complete and switchable.
12. Light and dark themes work across supported responsive layouts.
13. The game is fully operable with mouse, touch, and keyboard.
14. Required dialogs and navigation meet the documented accessibility behavior.
15. Backend outages do not destroy or block locally playable games.
16. Automated unit, integration, end-to-end, and regression tests cover the relevant behavior.
17. TypeScript validation, ESLint, the complete automated test suite, and the production build pass.
18. Visible UI behavior is verified in relevant desktop, tablet, and mobile layouts and in both themes.

## Future product direction

Potential future phases may include:

- `Very Hard` and `Extreme` logically rated difficulties;
- fully optimized screen-reader gameplay;
- user-data export;
- PWA installation and extended offline support;
- carefully evaluated analytics;
- monetization or premium functionality;
- achievements;
- social features; and
- native applications.

Future items are not authorized implementation work until they are separately specified and approved.
