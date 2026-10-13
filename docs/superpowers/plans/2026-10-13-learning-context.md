# Learning in context Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline. No delegation without explicit user authorization.

**Goal:** Implement all five approved learning improvements for every unit and verify persistence/compatibility.
**Architecture:** Authored content in learning-data.js, pure learning.js for retention/phrases/local feedback, injected learning-ui.js for practice and journal screens. Existing app owns global history and daily closure.
**Tech Stack:** Vanilla JS, localStorage, browser speech APIs, node:test. Local first; optional ProxyAPI tutor authorized in a later user message.
**Spec:** docs/superpowers/specs/2026-10-13-learning-context-design.md

## Global Constraints
- Preserve existing data, closed days, 9 original modes and one selected weekday unit closure.
- Local feedback by default; optional API feedback is advisory; uncertain free responses are suggestions rather than definitive errors.
- Fresh references include bank/form identity; legacy exam drafts keep their source.
- 145 complete context packs, two 13-question authored assessment forms per unit.
- Retention +1/+7/+30 days with no early/same-day advancement; failures due tomorrow.
- Browser QA uses a separate origin; no personal training data in Git/PR descriptions.

## Review Focus
- Old partial/completed exams and old error refs remain loadable after bank changes.
- A new question cannot collide with the same legacy index or the other assessment form.
- Saving a draft/reloading cannot lose local text or duplicate journal/rewards.
- Microphone unavailable/denied never blocks context practice.
- Content banks are distinct from practice examples, prompts are unambiguous and all 145 packs complete.

### Task 1: Pure state and contracts
Files: js/learning.js, tests/learning.test.cjs, js/exam.js, js/review.js; existing tests.
- [x] Write failing tests for local feedback, draft persistence, category/ref identity, topic spacing, phrase validation, mastery evidence.
- [x] Implement minimal pure contracts; confirm RED→GREEN and whole suite.
- [x] Extend exam/reference compatibility with regression tests for original/transfer A/B and paused legacy attempts.

### Task 2: Content
Files: js/learning-data.js; tests/learning-content.test.cjs.
- [x] Author all 145 packs and two assessment forms, translations, explanations and phrases.
- [x] Check bank lengths, source disjointness, refs, grammar keys, comprehension answers, no missing/duplicate units.

### Task 3: Workbook integration
Files: js/learning-ui.js, js/app.js, index.html, css/style.css, README.md.
- [x] Add context practice, local text/voice review, phrase notebook, topic queue and mastery views.
- [x] Wire new exam banks/errors, category changes, saved partial review and truthful skill signals.
- [x] Connect unit/calendar/home and both weekend workflows without changing legacy claims.
- [x] Run full tests, syntax/source integrity and browser persistence/assessment/category/phrase flows.

### Task 4: Delivery
- [x] Separate author review, repair material defects with RED→GREEN regressions.
- [x] Inspect desktop/mobile/dark, no-microphone fallback, export/import and old progress.
- [x] Save screenshots, report, patch, archive; commit, push and attach draft PR.

## Ledger
- Base e0ca192, clean task checkout; baseline 72 tests pass.
- Ruling: use deterministic local checks and learner self-review for open responses; no claim of comprehensive AI grading — user explicitly chose local operation.

- Final: 105 automated tests pass; 28 JS files pass syntax checks; generated content is reproducible, original banks unchanged.
- Author review and browser QA repaired prefilled editing instructions, leaked functional-word hints, premature answer reveal, mobile overflow and stale assets. No independent reviewer was used.
- Browser: context drafts/self-review, phrase recall/addition, old progress import, old passed exam, new bank/resume, partial topic resume, category persistence, actual progress export. Mobile width 390: document width 390.
- Optional API amendment: explicit paid button; GPT-5.6 Luna default; separate credential vault; 5 RUB/day conservative local cap. Anonymous CORS preflight passed. Paid quality/real microphone capture not tested; no user key or microphone permission was used.
