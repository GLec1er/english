# Unit exam and spaced error review Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline. User preference: no delegation without explicit request.

**Goal:** Unit exams close course days; errors get durable spaced reinforcement.
**Architecture:** Pure UMD exam.js and review.js own selection/state; existing renderers, notes, course and calendar integrate them.
**Tech Stack:** Vanilla JavaScript, localStorage, node:test.
**Spec:** docs/superpowers/specs/2026-10-12-exam-review-design.md

## Global Constraints
- Preserve original exercises, closed course days and personal progress.
- One selected unit per weekday, never extra rank/XP from retakes.
- Exam pass: at least 80% whole correct answers from the complete unique bank.
- Review stages: correct due checks spaced 1, 3 and 7 days; early practice cannot advance.
- No dependencies or automatic merge/deployment; prepare draft PR.

## Review Focus
- Refresh between final answer and result must not lose/count attempt twice.
- A second unit passed today cannot earn another closure.
- Automatic wrong then manual confirmation must not retain a false error.
- Old imported errors and invalid question refs cannot crash review.
- Listening assessment must check spoken words, not grammatical alternatives.

### Task 1: Assessment and reinforcement state
Files: js/exam.js, js/review.js, tests/exam.test.cjs, tests/review.test.cjs.
Interfaces: Exam.select(pool), normalize(raw), start(state,unit,items,id,day), answer(state,unit,key,result), finish(state,unit), status(state,unit), canClose(state,unit,exercisesComplete). Review.normalize(raw,day), record(rows,ref,result,day,event), undo(rows,ref,event), due(rows,day), summary(rows,day).
- [x] Write real fixtures for unique mixed selection, exact threshold (10/13 fail; 11/13 pass), draft JSON round trip, finish idempotence and closure gating; watch RED.
- [x] Implement exam state and run tests GREEN.
- [x] Write review fixtures for legacy migration, three due successes, early repeats, relapse, event undo and malformed imports; watch RED.
- [x] Implement review state and run full suite GREEN.

### Task 2: Workbook integration
Files: js/app.js, js/study.js, index.html, css/style.css; tests/study.test.cjs plus integration tests as needed.
- [x] Add exam journal kind normalization and verify RED→GREEN.
- [x] Integrate deferred exam feedback, resumable draft, saved result analysis, explicit claim, calendar CTA and closure gate.
- [x] Replace immediate error deletion with review journal and due queue; prioritize weekly relevant errors while preserving coverage.
- [x] Verify source syntax, all unit banks, tests and UI flows in isolated browser origin.

### Task 3: Review and delivery
- [x] Read final diff as separate author review; fix material defects with reproducing tests.
- [x] Verify desktop/mobile and dark mode; save screenshots, report, patch and refreshed source archive in outputs.
- [x] Commit verified change; push and create/attach draft PR. No merge or site publish.

## Execution record

- Baseline: 50 passing tests, previous notes PR #6 merged, clean checkout at origin/main 8c0f90f. Reused task repository on feat/unit-exams-review; preserved original exercise files.
- Task 1: RED 14 missing API tests → GREEN 14; extended completion-date and import-undo regressions RED→GREEN.
- Task 2: exam journal regression RED (event discarded) → GREEN; mixed assessment and due review connected. Browser: saved 1/13 → reload/resume; 12/13 passes and closes day; retake 0/13 preserves pass/rank, stays at 20 XP; early practice retains 0/3 and due date; unfinished Unit 38 remains locked. Export contains two attempts, one closed day and persistent errors.
- Task 3: author review of full diff and pure state modules; fixed foreign-question imported undo with reproducing RED→GREEN test. No delegated or independent reviewer (user requires explicit authorization for delegation).
- Final verification: 70 tests in Moscow and New York; 22 syntax checks, all 145 mixed banks unique and complete, resources exist, original exercises unchanged, diff check clean. Desktop 1280px and mobile 390px/dark inspected, no horizontal overflow.
- Delivery: outputs report, screenshots, patch and refreshed source archive; draft PR, no merge/deployment.
