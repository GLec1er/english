# Grouped error revision implementation plan

> Implement inline in this session, following the user's existing preference for no delegation. Apply test-driven development and verification before completion.

**Goal:** Replace repeated per-sentence homework with one shared revision per unit topic and a separate listening group, in both weekly work and spaced review.

**Architecture:** Preserve source error records and individual answers. Derive groups by unit and listening/grammar channel. Weekly group completion stores shared evidence separately from individual answers; spaced group checks store a separately attributed schedule, never invented individual responses. New failures reopen the relevant source; legacy progress remains valid.

**Stack:** Existing dependency-free JavaScript and Node test runner.

**Scope:** The current user request in this chat; keep all source examples and explanations accessible, one original correction plus two extra examples per weekly group. No paid requests, no real learner writes, no course completion changes.

## Review focus

- Existing partially completed rows: resume the most advanced unfinished source; don't discard progress.
- Different units and listening versus grammar: never merge them.
- Repeated or wrong answers and early practice: cannot advance a group twice per day or erase an unfinished group.
- New failures, cancellation and import: preserve original events and reopen only affected work.
- Weekly closure and spaced queue: one completed group must schedule its due members, avoiding another set of identical work today.

## Tasks

- [x] Add failing tests in `tests/review.test.cjs` and `tests/weekly.test.cjs` for grouping, preservation, shared closure, attributed spaced schedules, reopening and normalization.
- [x] Implement `Review.topic(ref, mode)`, `Review.groups(rows)`, `Review.state(row)`, and `Review.recordGroup(rows, refs, result, day, event, source)` in `js/review.js`. Effective state reads an attributed group check; original answers and stages remain untouched for other examples. Update ordinary recording/normalization/due/summary to honor it.
- [x] Implement `Weekly.groups(s, week)`, `Weekly.readGroup`, `Weekly.answerGroup`; adapt `done`, `weekStatus`, and attention counts. Validate shared evidence at normalization; keep old read/answer APIs compatible.
- [x] Update `js/weekly-ui.js` to render groups, all original examples in disclosures, four shared steps, carried-over progress and explicit group completion. Select extra practice from other pending examples when possible.
- [x] Update `js/app.js` spaced review list and sessions to offer one representative per due group, persist shared scheduling on correct/accepted answers immediately, and wire weekly shared closure to the same scheduler. Use effective review state at all consumers.
- [x] Update text, CSS, README and resource hashes. Run full tests and JS syntax checks.
- [x] Test in isolated browser fixtures: multiple sources in a group, listening separation, partial resume, last answer -> group closes -> no same-day duplicated interval work -> reload -> future review, fresh failure and old debt. Inspect light/dark and mobile. Real learner data stays read-only.
- [x] Review diff, commit, publish a separate draft PR and attach it. User merges.

## Verification record

- Initial RED: 7 new group contract tests failed because the grouped APIs were absent; 23 existing review/weekly tests passed.
- Group contracts now cover shared scheduling, original-answer preservation, listening separation, same-day/early checks, partial resume, reopening/cancellation, import validation and transfer identities.
- Isolated browser QA: 29 synthetic source records produce 4 topic cards; partial 2/4 resumes after reload and through legacy source links. A full shared weekly set closes three sources, clears today's badge and moves due members to October 20. A spaced topic check reduces the interval queue from 4 to 3 immediately and survives reload. Listening retains dictation plus a listening gap. No console errors in these flows. Mobile 390 px has no horizontal overflow; light and dark themes inspected.
- Final review performed inline by the author, respecting the user's no-delegation preference. Review found excess metadata in a transfer source attribution; a new regression test failed, then passed after storing only its reference. No unresolved defects remain. Grouping is deliberately by unit topic and channel; no claim of automatic subrule diagnosis.
- Synthetic screenshots and QA fixtures are outside the repository; actual learner answers, API credentials and paid services were not used.

Final verification: 164/164 Node tests passed; syntax checks on all four changed JavaScript files and `git diff --check` passed.
