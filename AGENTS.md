# AGENTS.md

Conventions mirror the aragon-ai/frontend codebase: path aliases, design-system
primitives, co-located Apollo queries, and react-i18next. See [README.md](./README.md).

## Code Review Rules

Flag these when a pull request introduces them. Each rule pairs what to flag with
the accepted alternative.

Review the diff, not the repository: ignore anything that was already broken. Cite
every finding as `path:line`, keep it to two sentences, and drop findings you are
not confident about — a wrong one costs more than a missed one.

### Logic and correctness

- Changed condition or branch that stops covering a case it used to handle — empty
  list, zero, first render, unauthenticated user, cancelled request.
- New async work with no failure path: unawaited promise, missing `catch`, or an
  error the user never sees.
- State set from a stale value instead of the updater form, or derived state that
  can drift out of sync with what it derives from.
- Off-by-one or inclusive/exclusive mistakes in slicing, index math, and
  pagination cursors.
- A guard or early return added above code that still assumes it ran.
- Nullable value used without a guard where its type says it can be absent.
- Work that now runs on every render or every loop pass instead of once.

### Consistency with surrounding code

- A second way to do something the touched module already does: a new helper
  duplicating an existing util, a hand-rolled fetch beside Apollo hooks, local
  state beside an existing Jotai atom.
- The same logic pasted into more than one file instead of a shared helper.
- Prop, handler, or variable naming that departs from the convention already used
  in that file.
- A rename or signature change applied to some call sites but not all.
- A raw string, colour, or spacing value where the file already uses a token or
  constant.

### Internationalization

- User-facing string not passed through `react-i18next` → move it to a translation
  key and read it with `useTranslation`. Exempt: admin, support, terms, privacy,
  API docs, and blog pages.

### Design system

- Inline `<svg>` or a new SVG component inside a feature file → add the icon to
  `design-system/icons/index.tsx` and import it from `@/design-system/icons`.
- Hand-rolled button, modal, input, tooltip, or toast → use the existing
  `design-system/` primitive.
- Tall content inside a `size="auto"` modal with no scroll container of its own →
  wrap it in a `max-h-[Nvh] overflow-y-auto` box. `h-full` and a panel-level
  `max-h` do not clamp it.
- `className` passed to a component that is not on the `aragon/no-classname-props`
  allowlist → style through the component's own props or variants.

### Next.js and rendering

- `Date`, `Math.random`, `window`, `localStorage`, or `navigator` read during the
  initial render → move it into an effect, so server and client markup match.
- `useSearchParams` used without a Suspense boundary → wrap the consumer, or the
  whole page silently drops to client-side rendering.
- Server-only value exposed through a `NEXT_PUBLIC_` variable → read it server-side.

### Data fetching

- `data` consumed without handling `loading` and `error` → handle both states.
- GraphQL document declared outside the feature's co-located `queries.ts`.
- `useEffect` with missing or over-broad dependencies, causing refetch loops or
  stale reads.

### Imports and types

- Relative parent import (`../`) → use the `@/…` path alias.
- `enum` → use a map or object literal.
- Function taking several positional arguments → take one destructured object.

### Duplicated surfaces

- A change to one of the three image-overlay control files (download, favorite,
  like, enlarge) without the matching change in the other two.

## Out of scope

Do not report:

- Formatting, or anything Prettier rewrites.
- Anything ESLint or `tsc` already catches — both run in CI and on pre-commit.
- Import ordering.
- Issues that already existed before the pull request.
- Style preference, naming taste, or alternative-approach suggestions that do not
  change behavior.
