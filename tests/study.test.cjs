const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const modulePath = path.join(__dirname, '../js/study.js');
const exists = fs.existsSync(modulePath);
const S = exists ? require(modulePath) : null;
test('study calendar is available without browser dependencies', () => assert.ok(exists, 'study calendar is not implemented'));
const check = (name, fn) => test(name, { skip: !exists }, fn);
const event = (id, day, kind, units, answers = 8, correct = 6, week = null) => ({ id, day, kind, units, answers, correct, week });

check('Sunday belongs to the preceding Monday and year boundaries stay in the same week', () => {
  assert.equal(S.weekStart('2026-10-11'), '2026-10-05');
  assert.equal(S.weekStart('2026-10-12'), '2026-10-12');
  assert.equal(S.weekStart('2027-01-01'), '2026-12-28');
  assert.deepEqual(S.weekDays('2026-10-11'), ['2026-10-05', '2026-10-06', '2026-10-07', '2026-10-08', '2026-10-09', '2026-10-10', '2026-10-11']);
});
check('calendar arithmetic crosses months and leap days without UTC drift', () => {
  assert.equal(S.shift('2028-02-28', 1), '2028-02-29');
  assert.equal(S.shift('2028-02-29', 1), '2028-03-01');
  assert.equal(S.shift('2026-03-08', 1), '2026-03-09');
  assert.equal(S.dateKey(new Date(2026, 9, 12, 0, 1)), '2026-10-12');
  assert.equal(S.dateKey(new Date(2026, 9, 11, 23, 59)), '2026-10-11');
});
check('weekly review uses only completed weekday unit approaches, deduplicated', () => {
  const events = [event('old', '2026-10-04', 'unit', [1]), event('a', '2026-10-05', 'unit', [2]), event('b', '2026-10-05', 'unit', [2]), event('c', '2026-10-09', 'writing', [3], 0, 0), event('mix', '2026-10-07', 'practice', [4]), event('sat', '2026-10-10', 'unit', [5]), event('next', '2026-10-12', 'unit', [6])];
  assert.deepEqual(S.weekUnits(events, '2026-10-11'), [2, 3]);
});
check('a completed zero-score unit fulfills a weekday, casual practice does not', () => {
  assert.equal(S.dayStatus([event('a', '2026-10-05', 'unit', [1], 8, 0)], '2026-10-05').done, true);
  const casual = S.dayStatus([event('b', '2026-10-05', 'practice', [1])], '2026-10-05');
  assert.equal(casual.done, false);
  assert.equal(casual.active, true);
});
check('weekend review must cover this week, each weekend day is independent', () => {
  const events = [event('a', '2026-10-05', 'unit', [1]), event('b', '2026-10-09', 'unit', [2]), event('sat', '2026-10-10', 'review', [1, 2], 15, 12, '2026-10-05')];
  assert.equal(S.dayStatus(events, '2026-10-10').done, true);
  assert.equal(S.dayStatus(events, '2026-10-11').done, false);
  events.push(event('sun', '2026-10-11', 'review', [1, 2], 15, 12, '2026-09-28'));
  assert.equal(S.dayStatus(events, '2026-10-11').done, false);
  events.push(event('partial', '2026-10-11', 'review', [1], 8, 8, '2026-10-05'));
  assert.equal(S.dayStatus(events, '2026-10-11').done, false);
});
check('statistics weight actual answers and exclude ungraded writing', () => {
  const events = [event('a', '2026-10-05', 'unit', [1], 8, 0), event('b', '2026-10-05', 'unit', [1], 2, 2), event('c', '2026-10-06', 'writing', [2], 0, 0), event('outside', '2026-10-12', 'unit', [3], 8, 8)];
  assert.deepEqual(S.summary(events, '2026-10-11'), { days: 2, sessions: 3, answers: 10, correct: 2, accuracy: 20, units: 2 });
  assert.equal(S.summary([], '2026-10-11').accuracy, null);
});
check('invalid imported history is discarded without inventing sessions', () => {
  assert.deepEqual(S.normalize(null), []);
  const good = event('good', '2026-10-05', 'unit', [1]);
  const input = [null, good, good, { ...good, id: 'bad-date', day: '2026-02-30' }, { ...good, id: 'bad-unit', units: [146] }, { ...good, id: 'bad-score', correct: 9 }, { ...good, id: 'bad-number', answers: NaN }];
  assert.deepEqual(S.normalize(input), [good]);
});
check('invalid timestamps cannot crash the visible calendar history', () => {
  const good = event('good', '2026-10-05', 'unit', [1]);
  assert.deepEqual(S.normalize([{ ...good, id: 'bad', ts: 1e20 }]), []);
});
check('review selection covers each unit even when the requested limit is small', () => {
  const a = { ref: { u: 1, k: 'gap', i: 0 } }, b = { ref: { u: 1, k: 'err', i: 0 } }, c = { ref: { u: 2, k: 'gap', i: 0 } };
  assert.deepEqual(S.reviewSelection([a, b, c], 1), [a, c]);
});
check('review selection excludes another mode of the same example and preserves distinct units', () => {
  const a = { t: 'mc', ref: { u: 1, k: 'gap', i: 0 } }, duplicate = { t: 'fill', ref: { u: 1, k: 'gap', i: 0 } }, b = { t: 'err', ref: { u: 2, k: 'err', i: 0 } };
  assert.deepEqual(S.reviewSelection([a, duplicate, b]), [a, b]);
});

test('partial unit answers are normalized and included in weekly repetition', () => {
  const rows=[{id:'step-1',session:'s1',day:'2026-10-12',kind:'step',units:[36],mode:'fill',answers:1,correct:0}];
  const loaded=S.normalize(rows);
  assert.equal(loaded.length,1);
  assert.deepEqual(S.weekUnits(loaded,'2026-10-17'),[36]);
});
test('step answers and the completion marker form one approach without double counting', () => {
  const rows=[{id:'s1a',session:'s1',day:'2026-10-12',kind:'step',units:[36],mode:'fill',answers:1,correct:0,title:'Unit 36 · Впиши форму'},
    {id:'s1b',session:'s1',day:'2026-10-12',kind:'step',units:[36],mode:'fill',answers:1,correct:1,title:'Unit 36 · Впиши форму'},
    {id:'done',session:'s1',day:'2026-10-12',kind:'unit',units:[36],mode:'fill',answers:0,correct:0,title:'Unit 36 · Впиши форму'}];
  const stats=S.summary(rows,'2026-10-12');
  assert.equal(stats.sessions,1);assert.equal(stats.answers,2);assert.equal(stats.correct,1);
  assert.equal(S.approaches(rows,'2026-10-12').length,1);
  assert.equal(S.approaches(rows,'2026-10-12')[0].partial,false);
  assert.equal(S.approaches(rows.slice(0,2),'2026-10-12')[0].partial,true);
});

test('claiming a previously completed unit is an active day without an extra scored approach',()=>{
  const rows=[{id:'claim',day:'2026-10-13',kind:'claim',units:[36],answers:0,correct:0}];
  const loaded=S.normalize(rows);assert.equal(loaded.length,1);
  const stats=S.summary(loaded,'2026-10-13');assert.equal(stats.days,1);assert.equal(stats.sessions,0);assert.equal(stats.answers,0);
  assert.deepEqual(S.weekUnits(loaded,'2026-10-17'),[36]);
});

test('completed exams survive reload and contribute scored statistics without claiming a course day',()=>{
 const rows=S.normalize([{id:'exam-36',day:'2026-10-12',kind:'exam',units:[36],answers:13,correct:11,title:'Unit 36 exam'}]);
 assert.equal(rows.length,1);assert.equal(S.summary(rows,'2026-10-12').answers,13);assert.equal(S.dayStatus(rows,'2026-10-12').done,false);assert.deepEqual(S.weekUnits(rows,'2026-10-17'),[36]);
});
