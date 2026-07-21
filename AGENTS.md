# Su4u Agent Instructions

## Purpose

This file defines the mandatory working, architecture, and quality rules for agents contributing to Su4u.

Treat Su4u as a professionally developed product. Prefer robust, maintainable, and appropriately scalable solutions. Do not treat implementation work as a tutorial. Provide detailed learning explanations only when the user explicitly asks for them.

## Communication and autonomy

- Communicate with the user in German.
- Write code, identifiers, comments, commit messages, and technical documentation in English.
- Language-dependent user interface content follows the product language defined in `SPEC.md`.
- Handle clear, small, well-scoped tasks autonomously, including analysis, implementation, testing, and verification.
- Before making architecture decisions, adding dependencies, or carrying out larger changes, explain the viable options and their consequences and wait for the user's decision.
- Every new feature requires an implementation plan and explicit user approval before implementation begins, regardless of its apparent size. Feature planning may include read-only project analysis, but no production code may be changed before the plan is approved.
- Modify only the agreed task scope.
- When discovering defects, technical debt, or improvement opportunities outside the task scope, report them and wait for approval before changing them.
- Do not include unrelated cleanup or small incidental improvements without prior approval.

### Small tasks

A task may be handled autonomously when it:

- is an unambiguous change within an established pattern;
- requires no new dependency or infrastructure;
- contains no unresolved architecture, data model, or product decision;
- does not break public interfaces or existing user behavior; and
- is limited to a small number of closely related concerns.

A new feature is never considered a small autonomous task, even when its implementation appears technically simple.

The number of changed files alone does not determine task size. A well-defined mechanical change may affect many files, while a one-line change may have architecture-wide consequences.

### Changes requiring prior approval

Obtain approval before working on:

- new features whose user behavior is not yet specified;
- changes spanning multiple features or system boundaries;
- authentication, authorization, or sensitive user data;
- new dependencies, external services, or infrastructure;
- data models, persistence, or migrations;
- routing, deployment, build, or shared project configuration;
- large refactors, directory restructuring, or architecture changes;
- breaking changes; or
- decisions with multiple reasonable solutions and materially different consequences.

## Engineering principles

Apply these principles pragmatically and in this order: requirements and correctness first, then clarity and maintainability.

- **KISS:** Choose the simplest solution that completely and robustly satisfies the requirements.
- **YAGNI:** Do not build speculative features, abstractions, or extension points.
- **DRY with judgment:** Abstract stable, meaningful duplication. Do not abstract code merely because it looks similar.
- **Separation of concerns:** Keep UI, domain logic, data access, and external services separate.
- **Pragmatic SOLID:** Prefer clear responsibilities and replaceable dependencies without creating unnecessary class or abstraction hierarchies.
- **Composition over inheritance:** Build behavior from focused components and functions.
- **Explicit over clever:** Prefer obvious, readable code over compact or ingenious code.
- **Scoped Boy Scout Rule:** Leave touched code clean, but do not perform unrelated refactors without approval.

Do not apply a principle dogmatically when doing so would make the implementation more complex or less understandable.

## Project architecture

Su4u uses a feature-based architecture combined with Atomic Design. This architecture is mandatory and must remain in place as the project grows.

- Place feature-specific UI, state, and logic in the responsible feature.
- Place code in `shared` only when it is genuinely reused across features.
- Classify UI components by responsibility as atoms, molecules, organisms, or templates.
- Preserve the existing Atomic Design file suffixes:
  - `.atm.tsx` for atoms;
  - `.mol.tsx` for molecules;
  - `.org.tsx` for organisms; and
  - `.tpl.tsx` for templates.
- Do not create meaningless wrappers or layers merely to populate every Atomic Design category.
- Do not restructure, rename, replace, or weaken this architecture without prior approval.

## React and state management

- Use functional React components and hooks.
- Keep components declarative and focused on rendering or UI coordination.
- Implement Sudoku rules and other domain behavior as pure, framework-independent TypeScript wherever possible.
- Keep state as local as practical and lift it only when it is genuinely shared.
- Do not store derived values as separate state without a concrete reason.
- Use effects only to synchronize with external systems.
- Do not hide business logic inside JSX or large event handlers.
- Never mutate React state directly.
- Do not use Context as a default substitute for deliberate state management.
- Model complex state transitions with testable reducers or domain functions.
- Keep component props focused and explicit.

Use Redux Toolkit when complex client state must be shared across distant parts of the application, state transitions need centralized traceability, or local React state is demonstrably insufficient.

- Do not introduce Redux Toolkit speculatively.
- Obtain approval before its initial installation and setup.
- Organize slices by feature or domain.
- Keep reducers deterministic and testable.
- Encapsulate store access with selectors.
- Do not store derived data redundantly.
- Validate external data before placing it in the store.
- Distinguish server state from global client UI state deliberately.
- Do not use Redux for arbitrary local component or form state.
- Do not hide normal Redux Toolkit usage behind unnecessary wrappers.

## TypeScript

- Type aliases must start with `T`.
- Interfaces must start with `I`.
- Apply these prefixes consistently to props, API contracts, domain types, and shared types.
- Use interfaces when their extensibility or structural declaration behavior is useful.
- Prefer type aliases for unions, mappings, function signatures, and composed types.
- Do not define an interface and a type alias for the same concept.
- Give generic type parameters descriptive names except in simple, well-established cases.

The `any` type is prohibited. It may be used only after prior approval and with a concrete technical justification. Never use `any` to bypass incomplete typing, a misunderstood data shape, or a TypeScript error.

- Use `unknown` for untrusted or unknown data and narrow it safely.
- Type public boundaries, props, state, and external data explicitly.
- Use type assertions only when the runtime assumption can be justified.
- Avoid non-null assertions.
- Do not add `@ts-ignore` or `@ts-nocheck` to manually maintained files without prior approval.
- Generated files are exempt from rules that are controlled by their generator.
- Validate external data at runtime at system boundaries; a TypeScript type alone does not make runtime data trustworthy.

## Naming and file organization

- Use `PascalCase` for React components.
- Use `camelCase` for functions and variables.
- Use `UPPER_SNAKE_CASE` for constants.
- Use the required `T` and `I` prefixes for types and interfaces.
- Name code after its responsibility and domain meaning, not its implementation mechanism.
- Follow the existing Atomic Design file naming and suffix conventions.
- Name tests consistently with `.test.ts` or `.test.tsx` and associate them clearly with the behavior under test.

## Testing and quality gates

Tests are a central product requirement. Every functional change must include appropriate automated test coverage. A task is not complete until new or updated tests and all existing quality gates pass.

- Write unit tests for domain logic, Sudoku rules, reducers, utilities, and isolated behavior.
- Write integration tests for meaningful collaboration between components or systems.
- Write end-to-end tests for critical user journeys such as starting a game, entering values, completing a game, and authentication flows.
- Add a regression test for every bug fix that reproduces the original defect.
- Test observable behavior instead of implementation details.
- Make nondeterministic logic, including Sudoku generation, controllable and reproducible in tests.
- Test error paths as well as successful paths.
- Do not delete, skip, weaken, or rewrite tests merely to make a change pass.
- Documentation-only or purely visual changes require new automated tests only when they affect functional behavior.
- If a meaningful test is technically impossible, explain why and obtain agreement before considering the task complete.

Before reporting a technical task as complete, run all relevant checks:

- automated tests;
- TypeScript validation;
- ESLint;
- the production build; and
- any additional checks relevant to the changed area.

Do not weaken TypeScript, ESLint, test, or build configuration to suppress a failure. Exceptions such as disabled lint rules, ignored TypeScript errors, or skipped tests require prior approval and a concrete technical justification.

Never claim that a check was run when it was not. If a check cannot be run, state the exact reason and do not silently describe the task as fully verified.

## Accessibility

New and changed user interfaces must target WCAG 2.2 Level AA.

- Use semantic HTML first and ARIA only where native semantics are insufficient.
- Make interactive elements reachable and operable without a mouse.
- Provide visible focus states.
- Implement correct focus management for dialogs and similar overlays.
- Do not communicate information through color alone.
- Maintain sufficient contrast in light and dark themes.
- Give meaningful images appropriate alternative text and mark decorative images accordingly.
- Support responsive layouts and touch interaction.
- Respect `prefers-reduced-motion` where animation is used.
- Add automated accessibility coverage where meaningful.
- Do not disable accessibility checks to hide defects.

## Styling and visual consistency

- Extend the existing design system instead of creating isolated visual conventions.
- Use existing theme variables and shared design tokens for colors, spacing, and states.
- Build UI mobile-first and verify responsive behavior.
- Support both light and dark themes.
- Avoid hard-coded colors when a semantic theme token exists.
- Reuse an existing component only when its responsibility genuinely matches.
- Use CSS Modules for complex feature-specific styling.
- Use Tailwind CSS for layout and broadly reusable utilities.
- Do not mix styling approaches without a clear reason.
- Keep animation purposeful and restrained.

For visible UI changes, inspect the application in a browser in the relevant viewport sizes and in both themes. Test changed interactions with a keyboard and, where relevant, in a mobile layout. Browser inspection supplements automated tests and never replaces them.

Investigate relevant browser console errors and failed network requests. Do not claim visual verification unless the application was actually inspected. If browser verification is blocked by the environment or missing credentials, report that explicitly.

## API and backend boundaries

React components must not make direct network requests. Communicate with a backend through a centralized, typed API layer that owns endpoints, request construction, response handling, validation, and integration with the project's central error handling.

- Define explicit request and response types.
- Treat external responses as `unknown` at runtime and validate them at the boundary.
- Keep HTTP details out of UI components where practical.
- Process authentication tokens only through the designated authentication mechanism.
- Account for loading, error, empty, and success states.
- Handle stale requests and race conditions where relevant.
- Do not create duplicate API clients or competing error formats.
- Obtain approval before changing shared API contracts.
- Test the API layer and critical integration paths.
- Do not allow mock data to enter production paths unnoticed.

## Error handling

Handle errors explicitly at the appropriate system boundary. Expected failures should leave the application usable where possible and display understandable fallback states.

- Reuse existing central error handlers and error classes.
- Do not create parallel or local error-handling systems when an established handler exists.
- When a backend exists, validate input and centrally capture, classify, and safely process errors there.
- Do not expose internal error details, stack traces, or sensitive data to the client.
- Let the client consume standardized error responses and show user-friendly messages.
- Use React Error Boundaries at suitable boundaries for unexpected rendering failures.
- Never swallow errors with empty catch blocks.
- Do not treat `console.log` as error handling.
- Obtain approval before changing a central error format or shared error handler.
- Test failure paths.

No central backend error handler currently exists in the repository. Do not invent a project standard without discussing it with the user. When the user's handlers are added, use and document their concrete paths and conventions here.

## Security and privacy

Treat authentication, authorization, and user data as security-sensitive.

- Never print, document, commit, or expose secrets or the contents of environment files.
- Only intentionally public values may be exposed to browser code through `VITE_*` variables.
- Do not rely on hidden UI elements as authorization; enforce access at the appropriate trusted boundary.
- Validate external input and persisted data at system boundaries.
- Collect and retain personal data only when required by a defined feature.
- Do not place sensitive data in logs, error messages, analytics, or test fixtures.
- Add suitable tests for authentication and authorization changes.
- Do not ignore dependency security warnings or apply unreviewed upgrades as a shortcut.
- Obtain approval before adding tracking, cookies, external services, or new data storage.
- Never use real credentials or production data in tests.

## Dependencies and external services

Do not add a runtime dependency, development dependency, or external service without prior approval. First determine whether the task can be solved appropriately with the existing stack.

When proposing a dependency, explain:

- the concrete purpose it serves;
- why existing tools are insufficient;
- which alternatives were considered;
- the effects on bundle size, maintenance, security, and licensing; and
- whether it is actively maintained and compatible with the current stack.

Keep the package manifest and lockfile consistent. Never edit the lockfile manually. Do not add a large library for a small utility. Treat major upgrades as separately approved work. Do not remove or replace dependencies without approval. Do not execute unknown package installation scripts uncritically.

## Performance

Optimize only in response to an observed or measured problem. Avoid premature optimization, speculative memoization, and added complexity without demonstrated value.

Consider bundle size, image size, unnecessary rendering, network behavior, caching, data volume, and computationally expensive Sudoku generation where relevant. Establish a meaningful baseline and measure the result of substantial performance work. Do not sacrifice correctness, readability, maintainability, or accessibility for negligible theoretical gains.

## Documentation and sources of truth

- `SPEC.md` is the source of truth for product behavior, requirements, and acceptance criteria.
- `AGENTS.md` is the source of truth for agent workflow, architecture, and quality rules.
- `README.md` provides the human-facing project overview, setup, scripts, and usage guidance.
- Source code implements the specification but does not replace a missing product decision.

If a task, `SPEC.md`, `AGENTS.md`, and the implementation conflict, do not silently choose an interpretation. Explain the conflict and obtain direction from the user.

- Update the relevant specification with approved behavior changes.
- Update the README when setup, scripts, or usage change.
- Keep documentation touched by the task accurate.
- Document approved decisions that have lasting architecture consequences.

### Comments

Write self-explanatory code and use comments rarely. Clear names, small focused functions, and an understandable structure are preferred over comments.

Comments are acceptable only when they communicate information that cannot reasonably be expressed by the code itself, such as:

- an unusual domain rule;
- a mandatory limitation of an external system;
- a security-sensitive rationale;
- a temporary workaround with clear context; or
- a directive required by a generator or tool.

Do not add comments that merely narrate the code, commented-out old code, unnecessary JSDoc, or comments that compensate for poor naming or excessive complexity. Do not add TODO comments without clear context and an agreed follow-up.

## Generated files, configuration, and environment files

- Never manually edit generated files such as `src/routeTree.gen.ts`.
- Make generated changes through source files or generator configuration.
- Change TypeScript, ESLint, Vite, routing, authentication, build, or workflow configuration only when it is part of the agreed task.
- Obtain approval for configuration changes with project-wide effects.
- Do not create or edit any environment file without prior approval, including `.env`, `.env.local`, environment-specific variants, and example environment files.
- Do not add missing environment values autonomously.
- Treat environment variable renames as potentially breaking changes requiring approval.

## Deployment and portability

The current application is configured for GitHub Pages under the `/Su4u` base path. Treat this as current infrastructure, not as a permanent product constraint.

- Preserve the current deployment until a migration is approved.
- Account for the current base path when changing routes, authentication URLs, or asset paths.
- Keep deployment-specific configuration separate from domain logic.
- Prefer centralized, configurable paths over unnecessary host-specific hard-coding.
- Do not make architecture choices that unnecessarily hinder a future backend or hosting migration.
- Plan backend introduction and hosting migration with the user before implementation.
- Do not introduce a hosting provider, cloud resource, or deployment platform without explicit approval.

## Backward compatibility and migrations

Do not unintentionally break existing user behavior, stored data, or public interfaces. Explain intentional breaking changes in advance, obtain approval, and provide a migration strategy. This applies especially to future saved games, statistics, API contracts, authentication data, and backend persistence.

## Git workflow

- Create or switch branches, commit, push, or open pull requests only when explicitly requested.
- On request, the agent may create commits.
- Before committing, inspect the current Git status and include only task-related files.
- Never discard, overwrite, stage, or commit unrelated user changes.
- Write commit messages in English.
- Permission to create a commit never implies permission to push it.
- Never push or perform another external Git action without explicit instruction.

## Required workflow

For each implementation task:

1. Understand the request and relevant product requirements.
2. Inspect the affected implementation, architecture, and tests.
3. Ask for direction when requirements are ambiguous or the decision is far-reaching.
4. For every new feature, present a concise implementation plan covering scope, affected architecture, expected files, testing strategy, risks, and relevant alternatives. Wait for explicit user approval before implementation. Present a short implementation plan for other larger tasks.
5. Change only the agreed scope.
6. Add or update tests alongside the implementation.
7. Run formatting where configured, automated tests, TypeScript validation, ESLint, and the production build.
8. Review the result against the task and `SPEC.md`.
9. Summarize the outcome and the checks actually performed.
10. Report unresolved risks, limitations, or checks that could not be performed.

Do not report completion while known requirements remain unfinished. Do not provide unsolicited tutorial-style explanations, unrelated changes, commits, or pushes.
