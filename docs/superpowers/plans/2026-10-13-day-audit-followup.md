# Day audit follow-up

**Scope:** Fix confirmed answer-handling defects and improve the next step after an already completed day. Continue the existing draft branch rather than create overlapping PRs.

- [x] Verify current deployment and preserve a local export; keep learner data and screenshots outside the repository.
- [x] Reproduce spelling-only false rejections and verify the standard spelling pair against Cambridge Dictionary.
- [x] Red/green tests for spelling comparison, idempotent repair, event guards, bounded evidence reconstruction and weekday/weekend planning.
- [x] Correct historical bank answers only when the spelling is the sole difference. Preserve course claims, answer counts and unrelated or newer errors.
- [x] Fix explicit dismissal of a sole false error when subsequent correct practice updated the journal event. Keep superseding-event protection.
- [x] Hide stale writing feedback on empty input while retaining its saved data.
- [x] Add tomorrow's plan and existing context/review links after day completion.
- [x] Finish full-suite, syntax, content, desktop/mobile/reload checks and inline source review.
- [ ] Commit and update the existing draft PR.

**Decision:** Repair evidence only if saved counts, source references and first form-use events can all be reconciled with the same exams. Preserve evidence when the source cannot be established.

**Validation:** Synthetic regression fixtures exercise acceptance without a new attempt, preservation of unrelated word-order differences, protection of a later error, and repeated execution. Browser QA also loads a private local copy of the actual export; its contents and metrics are excluded from this document and the PR.

Final checks: 121 tests passed, all 30 JavaScript files passed syntax checks, generated content remained reproducible, asset hashes and diff checks passed. Desktop/reload checks and a 390 px viewport passed; the local document width remained 390 px. Empty writing input no longer displays stale feedback. No paid requests or live progress imports were performed.
