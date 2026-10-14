# Weekly Error Revision Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. The user has requested implementation in this chat; no subagents.

**Goal:** Explain and reinforce each week's mistakes, then require their completion before new lessons in later weeks.

**Architecture:** A pure weekly state module captures source rejections and separately saved revision steps. A dedicated revision UI consumes existing exercise renderers and new recipe contexts. A shared admission predicate guards every new-unit entry and claim.

**Tech Stack:** Vanilla JavaScript, localStorage, Node tests, static GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-14-weekly-errors-design.md`

## Global Constraints

- Local device week boundaries; Monday through Sunday.
- Original answer + two additional examples, after explanation; save each step.
- Preserve existing spaced intervals, grades, course claims and XP.
- No automatic paid requests; no private learner data in GitHub.
- No new dependencies or storage outside the existing `egiu:` export.

## Review Focus

- Debt survives a skipped Monday, month/year rollover and reload.
- Direct links and mixes cannot bypass admission.
- Imported malformed state cannot invent completed steps or mix source references.
- False-error cancellation preserves earlier genuine rejection work.
- No-error weeks and undated legacy errors do not trap the learner.

## Task 1: Weekly state and admission

**Files:** `js/weekly.js`, `tests/weekly.test.cjs`.
**Interfaces:** `normalize(raw,day)`, `capture(state,ref,result,day,event)`, `read(state,week,key)`, `answer(state,week,key,phase,result,event)`, `cancel(state,ref,event)`, `status(state,day)`, `canStart(state,course,day,unit)`, `seed(state,mistakes,activity,exams,steps,day)`.

- [x] Add failing tests for dates, capture/reset, persisted partial progress, exact false-error cancellation, import validation, bootstrap and admission.
- [x] Implement and run the focused tests, then the suite.
- [x] Commit state and tests.

## Task 2: Related content and revision flow

**Files:** generator, `js/weekly-data.js`, `js/weekly.js`, `js/weekly-ui.js`, `js/app.js`, content tests.
**Interfaces:** `drills(sourceItem)` returns two exercise items with local notes; UI uses `R`, `answerNote`, state setters and explicit AI appeal attachment.

- [x] Add failing content tests covering all 145 units and separation from existing sources.
- [x] Generate two new recipe contexts without changing existing A/B data.
- [x] Build saved explanation → original → additional-task flow, retries and completion.
- [x] Check original wrong answers, interrupted flows and listening errors.

## Task 3: Calendar, enforcement and verification

**Files:** app routes/session entry/claims, stylesheet, index asset URLs, README.

- [x] Show the warning and linked remaining assignment in contents/calendar/mistakes.
- [x] Guard unit routes, mixes, topic sessions and course closure; allow revision and closed units.
- [x] Refresh asset hashes and run all tests, syntax checks and generator check.
- [x] Browser QA with synthetic weekend/Monday/debt/no-debt fixtures, direct links, reload, completion and mobile widths.
- [ ] Review the final diff, save screenshots and create a draft PR.
