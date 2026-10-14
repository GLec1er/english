# AI answer disputes implementation plan

> Execute inline with superpowers:executing-plans. No delegated agents requested.

**Goal:** Let the learner request an independent, paid AI adjudication of a rejected exercise answer and explicitly accept a valid alternative.

**Architecture:** Reuse the existing ProxyAPI client, credential vault and budget. Add a bounded adjudication schema and pure exercise/cache helpers; wire immediate feedback, the error journal and completed exam analysis. Manual acceptance updates the existing answer/error event without creating another attempt.

**Tech stack:** Existing vanilla JavaScript, Node test runner, static GitHub Pages.

**Scope:** User request in this chat: a button on an error to resolve a disagreement with the trainer. Routine choices: explain the verdict and translation in Russian, require a click to accept, and permit adjudication only after an exam is submitted.

## Constraints

- Send only the exercise, learner answer, expected answers and unit rule.
- Keep existing model, budget, timeout and no automatic retry.
- Cache by complete exercise context, answer and model; preserve cache in progress export without credentials.
- Listening requires the words actually played; word order requires the supplied words. Grammatical alternatives alone do not satisfy those tasks.
- Uncertain/incorrect/malformed responses cannot expose AI acceptance.
- Do not erase a newer error, duplicate answer counts/XP, or expose hints during an active exam.

## Tasks

- [x] Write failing tests for bounded request/schema/cache identity, exercise constraints and event-specific acceptance.
- [x] Implement core helpers and explicit completed-exam acceptance; pass targeted tests.
- [x] Add the labelled paid UI and wire feedback, journal and submitted exam analysis. Preserve existing manual overrides.
- [x] Refresh changed asset hashes; run the full suite and syntax checks. Verify UI on isolated local data, cache/acceptance/reload and responsive layout. Review the diff before preparing the draft PR.

## Review focus

- Same answer in another mode or changed exercise must not reuse an unrelated verdict.
- A grammar-valid listening alternative must be assessed against the recording.
- A late API result after navigation must not accept an answer automatically.
- Journal acceptance must preserve earlier reinforcement and ignore a superseding error event.
- An exam appeal must update the same submitted attempt and its scored activity rather than add a new attempt or second course day.

## Execution notes

- Clean baseline: 105 tests passed. Core red/green: nine missing-behavior failures, then 34 tests passed; blank answer and cache cases also observed failing before correction. Current full suite: 116 tests.
- Browser QA uses synthetic progress and simulated API responses on a separate localhost origin; no real credential was copied or used. Verified immediate feedback, summary acceptance, journal/reload/cache, incorrect/uncertain verdicts and submitted exam correction from 10/13 to 11/13.
- Ruling: legacy saved answers lack an activity event link. Their saved grade may be corrected, but unlinked historical activity is preserved rather than guessed or duplicated. Browser reproduction changed two answers into three before the fix; after the fix the count remains two.
- Final review is performed inline because the user's working preferences reserve delegation for explicit requests.
