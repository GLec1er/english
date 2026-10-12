/* Local calendar and completed practice history. Also testable with Node.js. */
(function (root) {
  'use strict';
  const dateKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  function date(key) {
    if (typeof key !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(key)) return null;
    const [year, month, day] = key.split('-').map(Number);
    const value = new Date(year, month - 1, day, 12);
    return dateKey(value) === key ? value : null;
  }
  function shift(key, days) {
    const value = date(key);
    if (!value) return null;
    value.setDate(value.getDate() + days);
    return dateKey(value);
  }
  function weekStart(key) {
    const value = date(key);
    return value ? shift(key, -(value.getDay() + 6) % 7) : null;
  }
  const weekDays = (key) => Array.from({ length: 7 }, (_, i) => shift(weekStart(key), i));
  const isWeekend = (key) => { const value = date(key); return value && [0, 6].includes(value.getDay()); };
  function normalize(events) {
    if (!Array.isArray(events)) return [];
    const seen = new Set();
    return events.filter((e) => {
      if (!e || typeof e.id !== 'string' || !e.id || seen.has(e.id) || !date(e.day)) return false;
      if (e.ts != null && (!Number.isFinite(e.ts) || !Number.isFinite(new Date(e.ts).getTime()))) return false;
      if (!['unit', 'writing', 'practice', 'review', 'step', 'claim', 'exam'].includes(e.kind)) return false;
      if (e.session != null && (typeof e.session !== 'string' || !e.session || e.session.length > 100)) return false;
      if (!Array.isArray(e.units) || e.units.some((n) => !Number.isInteger(n) || n < 1 || n > 145)) return false;
      if (!Number.isInteger(e.answers) || !Number.isInteger(e.correct) || e.answers < 0 || e.correct < 0 || e.correct > e.answers) return false;
      if (['unit', 'writing', 'step', 'claim', 'exam'].includes(e.kind) && e.units.length !== 1) return false;
      if (e.kind === 'step' && !['mc','fill','order','err','tr','lgap','dict','speak'].includes(e.mode)) return false;
      if (e.kind === 'review' && (!date(e.week) || weekStart(e.week) !== e.week)) return false;
      seen.add(e.id);
      return true;
    });
  }
  function weekUnits(events, key) {
    const start = weekStart(key), friday = shift(start, 4);
    return [...new Set(events.filter((e) => e.day >= start && e.day <= friday && ['unit', 'writing', 'step', 'claim', 'exam'].includes(e.kind)).flatMap((e) => e.units))].sort((a, b) => a - b);
  }
  function summary(events, key) {
    const start = weekStart(key), end = shift(start, 6);
    const rows = events.filter((e) => e.day >= start && e.day <= end);
    const answers = rows.reduce((n, e) => n + e.answers, 0);
    const correct = rows.reduce((n, e) => n + e.correct, 0);
    return { days: new Set(rows.map((e) => e.day)).size, sessions: new Set(rows.filter((e) => e.kind !== 'claim').map((e) => e.day + ':' + (e.session || e.id))).size, answers, correct,
      accuracy: answers ? Math.round(correct / answers * 100) : null,
      units: new Set(rows.flatMap((e) => e.units)).size };
  }
  function approaches(events, key) {
    const groups = new Map();
    events.filter((e) => e.day === key).forEach((e) => {
      const id = e.session || e.id;
      if (!groups.has(id)) groups.set(id, { ...e, answers: 0, correct: 0, partial: true });
      const row = groups.get(id);
      row.answers += e.answers; row.correct += e.correct;
      if (Number.isFinite(e.ts) && (!Number.isFinite(row.ts) || e.ts > row.ts)) row.ts = e.ts;
      if (e.kind !== 'step') { row.partial = false; row.kind = e.kind; }
    });
    return [...groups.values()];
  }
  function dayStatus(events, key) {
    const rows = events.filter((e) => e.day === key);
    const units = weekUnits(events, key);
    const weekend = isWeekend(key);
    const done = weekend
      ? units.length > 0 && rows.some((e) => e.kind === 'review' && e.week === weekStart(key) && units.every((n) => e.units.includes(n)))
      : rows.some((e) => ['unit', 'writing'].includes(e.kind));
    return { done, active: rows.length > 0, kind: weekend ? 'review' : 'unit', units };
  }
  function reviewSelection(items, limit = 15) {
    const examples = new Set(), units = new Set(), first = [], rest = [];
    items.forEach((item) => {
      const r = item.ref, key = `${r.u}:${r.k}:${r.i}`;
      if (examples.has(key)) return;
      examples.add(key);
      if (units.has(r.u)) rest.push(item);
      else { units.add(r.u); first.push(item); }
    });
    return first.concat(rest.slice(0, Math.max(limit, first.length) - first.length));
  }
  const api = { dateKey, date, shift, weekStart, weekDays, isWeekend, normalize, weekUnits, summary, approaches, dayStatus, reviewSelection };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.EGIUStudy = api;
})(typeof window === 'undefined' ? globalThis : window);
