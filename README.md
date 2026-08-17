# codex-review-sandbox

Fixture repository for exercising the on-demand Codex review action before it lands in
`aragon-ai/frontend`. The code here is a stripped-down mirror of that codebase's
conventions — path aliases, `design-system/icons`, co-located Apollo `queries.ts`,
`react-i18next` — so the review rules in [AGENTS.md](./AGENTS.md) apply unchanged.

Nothing is installed or built. The workflow reviews the diff statically.

## Setup

1. **Settings → Secrets and variables → Actions** → add `OPENAI_API_KEY`.
2. Create a label named `codex-review`.

## Running a review

Open a pull request, then trigger it one of four ways:

- comment `/codex-review` on the pull request (optionally `/codex-review focus on X`)
- submit a review whose body starts with `/codex-review`
- add the `codex-review` label
- **Actions → Codex Review → Run workflow**, passing the pull request number

Nothing runs automatically. The workflow posts one advisory comment on the pull request,
and mirrors it into the workflow run summary.

Findings are numbered and grouped under `P0`, `P1`, and `P2` headings, each with a
`file:line` link and a paste-ready sentence. Anything below the bar is listed under
`Suppressed` with the reason, and a clean diff produces no comment at all.
