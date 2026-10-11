const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const file = path.join(__dirname, '../js/club.js');
const exists = fs.existsSync(file);
const C = exists ? require(file) : null;
const Study = require('../js/study.js');
test('club rules are implemented', () => assert.ok(exists, 'club rules are not implemented'));
const check = (name, fn) => test(name, { skip: !exists }, fn);
const modes = ['fill', 'tr', 'write', 'dict'];
const goal = (unit = 1, required = modes) => ({ unit, required });
const config = (goals = {}) => ({ since: '2026-10-12', policy: 'core', goals });
const event = (day, mode, unit = 1) => ({ id: day + mode + unit, day, kind: mode === 'write' ? 'writing' : 'unit', units: [unit], mode, answers: mode === 'write' ? 0 : 8, correct: 0 });
const full = (day, unit = 1) => modes.map((mode) => event(day, mode, unit));
const review = (day, week, units = [1]) => ({ id: day, day, kind: 'review', week, units, answers: 15, correct: 0 });

check('core and all plans include only available exercises', () => {
  assert.deepEqual(C.requiredModes(['mc', 'fill', 'tr', 'write', 'dict', 'speak'], 'core'), modes);
  assert.deepEqual(C.requiredModes(['mc', 'tr', 'lgap'], 'core'), ['mc', 'tr', 'lgap']);
  assert.deepEqual(C.requiredModes(['mc', 'fill', 'speak'], 'all'), ['mc', 'fill', 'speak']);
});
check('a weekday needs every required mode from the target unit, even at zero score', () => {
  const club = config({ '2026-10-12': goal() });
  const events = full('2026-10-12');
  assert.equal(C.dayStatus(events.slice(0, 3), '2026-10-12', club).done, false);
  assert.equal(C.dayStatus(events, '2026-10-12', club).done, true);
  const mixed = [...events.slice(0, 3), event('2026-10-12', 'dict', 2)];
  assert.equal(C.dayStatus(mixed, '2026-10-12', club).done, false);
});
check('old calendar marks survive and unclassified attempts do not fake new mode completion', () => {
  const old = { id: 'old', day: '2026-10-09', kind: 'unit', units: [1], answers: 8, correct: 0 };
  assert.equal(C.dayStatus([old], '2026-10-09', config()).done, true);
  assert.equal(C.dayStatus([{ ...old, day: '2026-10-12' }], '2026-10-12', config({ '2026-10-12': goal() })).done, false);
});
check('repeat modes and another unit cannot farm XP; incomplete goals earn no day bonus', () => {
  const club = config({ '2026-10-12': goal() });
  const rows = full('2026-10-12');
  const a = C.ledger(rows, club, '2026-10-12');
  assert.equal(a.xp, 60);
  assert.equal(C.ledger([...rows, ...full('2026-10-12', 2)], club, '2026-10-12').xp, 60);
  assert.equal(C.ledger(rows.slice(0, 3), club, '2026-10-12').xp, 30);
});
check('each weekend earns its own award and all seven days award one weekly seal', () => {
  const goals = {}, rows = [];
  ['2026-10-12', '2026-10-13', '2026-10-14', '2026-10-15', '2026-10-16'].forEach((day) => { goals[day] = goal(); rows.push(...full(day)); });
  rows.push(review('2026-10-17', '2026-10-12'));
  assert.equal(C.ledger(rows, config(goals), '2026-10-17').xp, 325);
  rows.push(review('2026-10-18', '2026-10-12'));
  const result = C.ledger(rows, config(goals), '2026-10-18');
  assert.equal(result.xp, 400);
  assert.equal(result.level, 3);
  assert.equal(result.remaining, 200);
  assert.deepEqual(result.weeks, ['2026-10-12']);
  assert.equal(C.ledger([...rows, review('2026-10-18', '2026-10-12')], config(goals), '2026-10-18').xp, 400);
});
check('today remains open without breaking yesterday’s streak; a missed weekday breaks it tomorrow', () => {
  const rows = [...full('2026-10-12'), ...full('2026-10-13')];
  const club = config({ '2026-10-12': goal(), '2026-10-13': goal() });
  assert.equal(C.ledger(rows, club, '2026-10-14').streak, 2);
  assert.equal(C.ledger(rows, club, '2026-10-15').streak, 0);
});
check('future events and pre-club activity earn no exercise XP', () => {
  assert.equal(C.ledger([...full('2026-10-09'), ...full('2026-10-13')], config(), '2026-10-12').xp, 0);
});
check('invalid new config is repaired without trusting imported goals', () => {
  assert.deepEqual(C.normalize(null, '2026-10-12'), config());
  const raw = { since: '2026-02-30', policy: 'random', goals: { '2026-10-12': { unit: 146, required: modes }, '2026-10-13': goal(2, ['fill', 'fill', 'unknown']) } };
  assert.deepEqual(C.normalize(raw, '2026-10-12'), config({ '2026-10-13': goal(2, ['fill']) }));
});
check('an exported journal retains modes, goals and earned rewards after reload', () => {
  const goals = {}, rows = [];
  ['2026-10-12', '2026-10-13', '2026-10-14', '2026-10-15', '2026-10-16'].forEach((day, i) => {
    goals[day] = goal(i + 1); rows.push(...full(day, i + 1));
  });
  rows.push(review('2026-10-17', '2026-10-12', [1, 2, 3, 4, 5]), review('2026-10-18', '2026-10-12', [1, 2, 3, 4, 5]));
  const exported = JSON.stringify({ 'egiu:club': JSON.stringify(config(goals)), 'egiu:activity': JSON.stringify(rows) });
  const imported = JSON.parse(exported);
  const loadedGoals = C.normalize(JSON.parse(imported['egiu:club']), '2026-10-18');
  const loadedRows = Study.normalize(JSON.parse(imported['egiu:activity']));
  const result = C.ledger(loadedRows, loadedGoals, '2026-10-18');
  assert.equal(result.xp, 400);
  assert.equal(result.streak, 7);
  assert.deepEqual(result.weeks, ['2026-10-12']);
});
