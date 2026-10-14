/* Study goals and rewards derived from saved history, never incremented on reload. */
(function (root) {
  'use strict';
  const Study = typeof module !== 'undefined' && module.exports ? require('./study.js') : root.EGIUStudy;
  const MODES = ['mc', 'fill', 'order', 'err', 'tr', 'write', 'lgap', 'dict', 'speak'];
  function requiredModes(available, policy) {
    if (policy === 'all') return available.filter((t) => MODES.includes(t));
    const grammar = ['fill', 'mc', 'err', 'order'].find((t) => available.includes(t));
    const listening = ['dict', 'lgap'].find((t) => available.includes(t));
    return [grammar, 'tr', 'write', listening].filter((t) => available.includes(t));
  }
  function normalize(raw, today) {
    raw = raw && typeof raw === 'object' ? raw : {};
    const result = { since: Study.date(raw.since) ? raw.since : today, policy: raw.policy === 'all' ? 'all' : 'core', goals: {} };
    if (raw.goals && typeof raw.goals === 'object') Object.entries(raw.goals).forEach(([day, goal]) => {
      if (!Study.date(day) || !goal || !Number.isInteger(goal.unit) || goal.unit < 1 || goal.unit > 145 || !Array.isArray(goal.required)) return;
      const required = [...new Set(goal.required.filter((t) => MODES.includes(t)))];
      if (required.length) result.goals[day] = { unit: goal.unit, required };
    });
    return result;
  }
  function dayStatus(events, day, club, course) {
    const base = Study.dayStatus(events, day), goal = club.goals[day];
    if (Study.isWeekend(day) || day < club.since) return { ...base, required: [], completed: [], unit: null };
    const completed = [...new Set(events.filter((e) => e.day === day && ['unit', 'writing'].includes(e.kind) && goal && e.units.includes(goal.unit)).map((e) => e.mode).filter((t) => MODES.includes(t)))];
    const required = goal ? goal.required : [];
    if (course && day >= course.since) return { ...base, done: !!course.closed[day], required, completed, unit: course.closed[day] || (goal ? goal.unit : null) };
    return { ...base, done: required.length > 0 && required.every((t) => completed.includes(t)), required, completed, unit: goal ? goal.unit : null };
  }
  function ledger(events, club, today, course) {
    const past = events.filter((e) => e.day <= today);
    const rows = past.filter((e) => e.day >= club.since);
    const modes = new Set();
    rows.forEach((e) => {
      if (['unit', 'writing'].includes(e.kind) && MODES.includes(e.mode)) modes.add(e.day + ':' + e.mode);
    });
    let xp = modes.size * 10;
    const days = [...new Set([...rows.map((e) => e.day), ...Object.keys(course ? course.closed : {}).filter((day) => day >= club.since && day <= today)])].sort();
    const closed = days.filter((day) => dayStatus(past, day, club, course).done);
    closed.forEach((day) => { xp += Study.isWeekend(day) ? 25 : 20; });
    const weeks = [], visited = new Set();
    let weekendPair = false;
    days.forEach((day) => {
      const week = Study.weekStart(day);
      if (visited.has(week)) return;
      visited.add(week);
      const dates = Study.weekDays(week);
      if (dates[6] > today) return;
      if (dates.slice(5).every((d) => dayStatus(past, d, club, course).done)) weekendPair = true;
      if (dates.every((d) => dayStatus(past, d, club, course).done)) { weeks.push(week); xp += 50; }
    });
    let streak = 0, cursor = dayStatus(past, today, club, course).done ? today : Study.shift(today, -1);
    while (cursor >= club.since) {
      if (Study.isWeekend(cursor) && !Study.weekUnits(past, cursor).length) { cursor = Study.shift(cursor, -1); continue; }
      if (!dayStatus(past, cursor, club, course).done) break;
      streak++;
      cursor = Study.shift(cursor, -1);
    }
    return { xp, level: Math.floor(xp / 200) + 1, progress: xp % 200, remaining: 200 - xp % 200, streak, closed, weeks,
      awards: { first: closed.length > 0, weekend: weekendPair, week: weeks.length > 0 } };
  }
  function completion(events,club,course,day,pendingRequired=0) {
    const state=dayStatus(events,day,club,course);
    if(!state.done||pendingRequired>0)return null;
    const current=ledger(events,club,day,course),before=ledger(events,club,Study.shift(day,-1),course);
    return {day,unit:state.unit,weekend:Study.isWeekend(day),xp:Math.max(0,current.xp-before.xp),streak:current.streak,weekSeal:current.weeks.includes(Study.weekStart(day))};
  }
  const api = { requiredModes, normalize, dayStatus, ledger, completion };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.EGIUClub = api;
})(typeof window === 'undefined' ? globalThis : window);
