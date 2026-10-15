/* English Grammar in Use — тренажёр */
(function () {
  'use strict';

  const D = window.EGIU;
  const Notes = window.EGIUNotes;
  const Exam = window.EGIUExam, Review = window.EGIUReview, Learning = window.EGIULearning, Disputes = window.EGIUDisputes, Corrections=window.EGIUCorrections;
  const app = document.getElementById('app');
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ESC[c]);
  const ICONS = {
    book: 'M4 3h16v18H4zM8 3v18M12 8h4M12 12h4',
    check: 'M5 12l4 4L19 6',
    mc: 'M4 4h16v16H4zM8 12l3 3 5-6',
    fill: 'M4 20l4-1L20 7l-3-3L5 16zM14 7l3 3',
    order: 'M4 6h10M4 12h16M4 18h12M17 3l3 3-3 3',
    err: 'M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM15 15l6 6M7 10h6',
    search: 'M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM15 15l6 6',
    tr: 'M4 7h15l-3-3M20 17H5l3 3M19 7l-3 3M5 17l3-3',
    write: 'M5 3h14v18H5zM9 8h6M9 12h6M9 16h4',
    lgap: 'M12 3c-4 0-7 3-7 7M12 7c-2 0-3 2-3 4M12 3c4 0 7 3 7 7 0 4-4 5-5 8-1 4-6 4-7 0',
    dict: 'M4 14v-3a8 8 0 0 1 16 0v3M4 12h3v7H4zM17 12h3v7h-3z',
    speak: 'M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0zM5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8',
    arrow: 'M4 12h16M15 7l5 5-5 5',
    chevron: 'M9 5l7 7-7 7',
    close: 'M6 6l12 12M6 18L18 6',
    play: 'M8 4l12 8-12 8z',
    volume: 'M4 9h4l5-5v16l-5-5H4zM17 8a7 7 0 0 1 0 8M20 5a11 11 0 0 1 0 14',
    slow: 'M5 14a7 7 0 0 1 14 0M5 14h14v5H5zM8 19v2M16 19v2M19 14h2',
    lock: 'M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5zM12 14v3',
    save: 'M4 3h14l3 3v15H4zM8 3v6h9V3M8 21v-8h9v8',
    upload: 'M12 16V3M7 8l5-5 5 5M4 15v6h16v-6',
    mix: 'M4 5h3c5 0 5 14 10 14h3M16 15l4 4-4 3M4 19h3c2 0 3-2 4-4M13 9c1-2 2-4 4-4h3M16 2l4 3-4 4',
  };
  const icon = (name) => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${ICONS[name] || ICONS.book}"/></svg>`;
  const plurals = new Intl.PluralRules('ru');
  const plural = (n, one, few, many) => ({ one, few, many })[plurals.select(n)] || many;
  $('.skip').onclick = (e) => { e.preventDefault(); app.focus(); };
  const shuffle = (a) => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // ---------- хранилище ----------
  const Store = {
    get(k, d) {
      try {
        const v = localStorage.getItem('egiu:' + k);
        return v == null ? d : JSON.parse(v);
      } catch (e) {
        return d;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem('egiu:' + k, JSON.stringify(v));
      } catch (e) { /* приватный режим — работаем без сохранения */ }
    },
  };

  const DEFAULTS = { accent: 'en-GB', voice: '', rate: 0.95, autoplay: true, mixCount: 15, theme: 'light' };
  const settings = Object.assign({}, DEFAULTS, Store.get('settings', {}));
  const saveSettings = () => Store.set('settings', settings);
  const themeMedia = matchMedia('(prefers-color-scheme: dark)');
  function applyTheme() {
    const dark = settings.theme === 'dark' || (settings.theme === 'system' && themeMedia.matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    $('meta[name="theme-color"]').content = dark ? '#18222c' : '#f4f0e6';
  }
  applyTheme();
  themeMedia.addEventListener('change', applyTheme);

  let exams = Exam.normalize(Store.get('exams', {}));
  const saveExams = () => Store.set('exams', exams);
  const progress = Store.get('progress', {});
  const getProg = (key, t) => (progress[key] && progress[key][t]) || null;
  function saveProg(key, t, pct) {
    const p = (progress[key] = progress[key] || {});
    const prev = p[t] || { best: 0 };
    p[t] = { best: Math.max(prev.best, pct), last: pct, ts: Date.now() };
    Store.set('progress', progress);
  }

  const storedBook = Store.get('book', {});
  const book = storedBook && typeof storedBook === 'object' && !Array.isArray(storedBook) ? storedBook : {};
  const Study = window.EGIUStudy;
  const activity = Study.normalize(Store.get('activity', []));
  const storedPlan = Store.get('dailyPlan', {});
  const dailyPlan = storedPlan && typeof storedPlan === 'object' && !Array.isArray(storedPlan) ? storedPlan : {};
  const todayKey = () => Study.dateKey(new Date());
  const Steps = window.EGIUSteps, Course = window.EGIUCourse;
  const bookReady = n => Course.bookReady(book,n);
  let steps = Steps.normalize(Store.get('steps', {}));
  const storedCourse = Store.get('course', null);
  let course = Course.normalize(storedCourse);
  if (!storedCourse) {
    course.since = todayKey() > course.since ? todayKey() : course.since;
    for (let n = 1; n < 36; n++) book[n] = true;
    Store.set('book', book);
    Store.set('last', 36);
    if (!Study.isWeekend(todayKey())) dailyPlan[todayKey()] = 36;
  }
  const saveCourse = () => Store.set('course', course);
  saveCourse();
  let learning = Learning.seedTopics(Learning.normalize(Store.get('learning', {}), todayKey()), course.closed, todayKey());
  const saveLearning = () => Store.set('learning', learning);
  saveLearning();
  const Club = window.EGIUClub;
  const club = Club.normalize(Store.get('club', null), todayKey());
  if (!storedCourse && todayKey() >= course.since && !Study.isWeekend(todayKey())) delete club.goals[todayKey()];
  const saveClub = () => Store.set('club', club);
  saveClub();
  const dayState = (day) => {
    const state = Club.dayStatus(activity, day, club, course);
    const goal = club.goals[day];
    if (day === todayKey() && goal && !Study.isWeekend(day)) state.completed = unitTypes(D.units[goal.unit]).filter((t) => modeStatus(D.units[goal.unit], t).complete);
    return state;
  };
  const clubLedger = () => Club.ledger(activity, club, todayKey(), course);
  function ensureGoal() {
    const day = todayKey();
    if (Study.isWeekend(day) || Weekly.status(weekly,day).blocked) return null;
    if (!club.goals[day]) {
      const u = plannedUnit(day);
      club.goals[day] = { unit: u.n, required: unitTypes(u) };
      saveClub();
    }
    if (day >= course.since && !course.closed[day]) { club.goals[day].required = unitTypes(D.units[club.goals[day].unit]); saveClub(); }
    return club.goals[day];
  }
  function closeGoal(unit) {
    if (!bookReady(unit) || Weekly.status(weekly,todayKey()).blocked) return;
    const goal = club.goals[todayKey()];
    if (!goal) return;
    course = Course.close(course, todayKey(), unit, Exam.canClose(exams, unit, unitCompletion(D.units[unit]).complete), goal.unit);
    saveCourse();
    learning = Learning.seedTopics(learning, course.closed, todayKey()); saveLearning();
  }
  function recordActivity(context, results = []) {
    if (context.unit) ensureGoal();
    const before = clubLedger(), wasDone = dayState(todayKey()).done;
    const beforeRank = Course.rank(course, todayKey()).current.en;
    const ts = Date.now();
    const units = [...new Set(results.map((r) => r.item.ref && r.item.ref.u).filter((n) => D.units[n]))];
    const id = ts + '-' + Math.random().toString(36).slice(2);
    activity.push({ id, ts, day: todayKey(), session: context.session || null,
      kind: context.kind || 'practice', units: context.unit ? [context.unit] : units,
      answers: context.stepped ? 0 : results.length, correct: context.stepped ? 0 : results.filter((r) => r.ok).length,
      week: context.week || null, title: context.title || '', mode: context.mode || null });
    Store.set('activity', activity);
    if (context.unit && (context.kind === 'claim' || (context.kind === 'exam' && context.passed === true))) closeGoal(context.unit);
    const after = clubLedger();
    const rank = Course.rank(course, todayKey());
    return { id, xp: after.xp - before.xp, closed: !wasDone && dayState(todayKey()).done, week: after.weeks.length > before.weeks.length, rank: rank.current.en !== beforeRank ? rank.current : null };
  }
  let mistakes = Review.normalize(Store.get('mistakes', []), todayKey());
  const repaired=Corrections.repairSpelling({exams,mistakes,activity,learning},todayKey());
  if(repaired.changes.length){exams=repaired.exams;mistakes=repaired.mistakes;learning=repaired.learning;activity.splice(0,activity.length,...repaired.activity);saveExams();saveLearning();Store.set('activity',activity);}
  Store.set('mistakes', mistakes);
  const Weekly=window.EGIUWeekly;
  let weekly=Weekly.seed(Weekly.normalize(Store.get('weekly',{}),todayKey()),mistakes,activity,exams,steps,todayKey());
  const saveWeekly=()=>Store.set('weekly',weekly);
  saveWeekly();
  const mkey = Review.key;
  const activeMistakes = () => mistakes.filter((r) => r.stage < 3);
  function trackMistake(item, result, event, day=todayKey()) {
    if (!item.ref) return;
    mistakes = Review.record(mistakes, item.ref, { ...result, mode: item.t }, day, event);
    Store.set('mistakes', mistakes);
    weekly=Weekly.capture(weekly,item.ref,{...result,mode:item.t},day,event);saveWeekly();
  }
  function undoMistake(item, event) {
    if (!item.ref) return;
    mistakes = Review.undo(mistakes, item.ref, event);
    Store.set('mistakes', mistakes);
    weekly=Weekly.cancel(weekly,item.ref,event);saveWeekly();
  }
  function reinforcement(item) {
    const r = item.ref && mistakes.find((r) => mkey(r) === mkey(item.ref));
    if (!r) return '';
    return `<p class="reinforcement">${r.stage === 3 ? 'Закреплено · три проверки с интервалами.' : `Закрепление ${r.stage} / 3 · следующее повторение ${dateLabel(r.due)}.`}${r.lastReviewDay !== todayKey() && r.due > todayKey() ? ' Ранняя практика не ускоряет интервал.' : ''}</p>`;
  }
  function attachAnswerDispute(container,item,user,onAccept){
    if(!container)return;
    try{const exercise=Disputes.exercise(item,D.units[item.ref&&item.ref.u]&&D.units[item.ref.u].tip);if(exercise)aiUI.attachDispute({container,exercise,text:user||'',onAccept});}catch(e){container.textContent=e.message;}
  }

  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => (t.hidden = true), 2600);
  }

  // ---------- сравнение ответов ----------
  const NUM = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
  const TENS = { 2: 'twenty', 3: 'thirty', 4: 'forty', 5: 'fifty', 6: 'sixty', 7: 'seventy', 8: 'eighty', 9: 'ninety' };
  function numWords(m) {
    const n = +m;
    if (n <= 20) return NUM[n];
    if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + NUM[n % 10] : '');
    return m;
  }

  function norm(s) {
    s = String(s).toLowerCase().replace(/[’‘`´]/g, "'").replace(/[“”"«»]/g, ' ');
    s = s
      .replace(/\bwon't\b/g, 'will not')
      .replace(/\bshan't\b/g, 'shall not')
      .replace(/\bcan't\b/g, 'can not')
      .replace(/\bcannot\b/g, 'can not')
      .replace(/n't\b/g, ' not')
      .replace(/'re\b/g, ' are')
      .replace(/'m\b/g, ' am')
      .replace(/'ve\b/g, ' have')
      .replace(/'ll\b/g, ' will');
    s = s.replace(/\d+/g, (m) => ' ' + numWords(m) + ' ');
    s = s.replace(/[.,!?;:()…—–[\]]/g, ' ').replace(/(^|\s)-+(?=\s|$)/g, ' ');
    return s.replace(/\s+/g, ' ').trim();
  }

  // 's может быть is/has, 'd — would/had: проверяем все прочтения
  function variants(s) {
    const out = new Set([s]);
    for (const a of [' is', ' has']) {
      out.add(s.replace(/'s\b/g, a));
      for (const b of [' would', ' had']) out.add(s.replace(/'s\b/g, a).replace(/'d\b/g, b));
    }
    for (const b of [' would', ' had']) out.add(s.replace(/'d\b/g, b));
    return out;
  }

  function same(user, answers) {
    const u = variants(norm(user));
    return answers.some((a) => {
      for (const v of variants(norm(a))) for(const supplied of u)if(Notes.spellingKey(supplied)===Notes.spellingKey(v))return true;
      return false;
    });
  }

  function wordDiff(expected, got) {
    const toks = expected.split(/\s+/).filter(Boolean)
      .map((raw) => ({ raw, parts: norm(raw).split(' ').filter(Boolean) }));
    const E = [];
    toks.forEach((t, ti) => t.parts.forEach((p) => E.push({ p, ti })));
    const G = norm(got).split(' ').filter(Boolean);
    const n = E.length, m = G.length;
    const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
    for (let i = n - 1; i >= 0; i--)
      for (let j = m - 1; j >= 0; j--)
        dp[i][j] = E[i].p === G[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    const hit = new Array(n).fill(false);
    let i = 0, j = 0;
    while (i < n && j < m) {
      if (E[i].p === G[j]) { hit[i] = true; i++; j++; }
      else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
      else j++;
    }
    const html = toks.map((t, ti) => {
      const ok = E.every((e, k) => e.ti !== ti || hit[k]);
      return `<span class="${ok ? 'w-ok' : 'w-miss'}">${esc(t.raw)}</span>`;
    }).join(' ');
    return { html, ratio: n ? dp[0][0] / Math.max(n, m) : 1 };
  }

  // ---------- разбор данных ----------
  const clean = (o) => (o === '-' || o === '—' ? '' : o);
  const showOpt = (o) => (o === '' ? '— (ничего)' : o);

  function join(b, x, a) {
    const s = (b + x + a).replace(/\s+/g, ' ').replace(/\s+([.,!?;:])/g, '$1').trim();
    return s.replace(/^([^A-Za-z]*)([a-z])/, (m, p, c) => p + c.toUpperCase());
  }

  function parseGap(str) {
    const m = str.match(/^(.*?)\[([^\]]+)\](?:\(([^)]*)\))?(.*)$/);
    if (!m) return null;
    const opts = m[2].split('|').map((o) => o.trim());
    const answers = opts[0].split('/').map((o) => clean(o.trim()));
    const wrong = opts.slice(1).map((o) => clean(o.split('/')[0].trim()));
    const g = { before: m[1], after: m[4], hint: m[3] || '', answers, correct: answers[0], wrong };
    g.full = join(g.before, g.correct, g.after);
    return g;
  }

  function hl(g) {
    const s = esc(join(g.before, '\u0001' + g.correct + '\u0002', g.after));
    return s.replace('\u0001\u0002', '<b class="hl">∅</b>').replace('\u0001', '<b class="hl">').replace('\u0002', '</b>');
  }

  function parsePair(s) {
    const [q, a] = s.split('=>');
    if (!a) return null;
    return { q: q.trim(), a: a.split('||').map((x) => x.trim()).filter(Boolean) };
  }

  function prep(u) {
    if (u._p) return u;
    u.gaps = (u.g || []).map(parseGap).filter(Boolean);
    u.errs = (u.e || []).map(parsePair).filter(Boolean);
    u.trs = (u.t || []).map(parsePair).filter(Boolean);
    u.orderIdx = u.gaps.map((g, i) => [g.full.split(' ').length, i]).filter(([n]) => n >= 3 && n <= 14).map((x) => x[1]);
    u._p = true;
    return u;
  }

  const TYPES = {
    mc: { name: 'Выбор ответа', icon: 'mc', group: 'g', kind: 'gap', desc: 'выбери правильную форму' },
    fill: { name: 'Впиши форму', icon: 'fill', group: 'g', kind: 'gap', desc: 'напиши слово в нужной форме' },
    order: { name: 'Порядок слов', icon: 'order', group: 'g', kind: 'order', desc: 'собери предложение' },
    err: { name: 'Найди ошибку', icon: 'err', group: 'g', kind: 'err', desc: 'исправь предложение' },
    tr: { name: 'Перефразируй', icon: 'tr', group: 'w', kind: 'tr', desc: 'напиши предложение по заданию' },
    write: { name: 'Свободное письмо', icon: 'write', group: 'w', kind: 'write', desc: 'короткий текст на тему юнита' },
    lgap: { name: 'Услышь и впиши', icon: 'lgap', group: 'l', kind: 'gap', desc: 'прослушай и заполни пропуск' },
    dict: { name: 'Диктант', icon: 'dict', group: 'l', kind: 'gap', desc: 'запиши предложение на слух' },
    speak: { name: 'Произнеси', icon: 'speak', group: 'p', kind: 'gap', desc: 'произнеси фразу и сравни слова' },
  };
  const GROUPS = { g: 'Грамматика', w: 'Письмо', l: 'Аудирование', p: 'Произношение' };

  function available(u, t) {
    prep(u);
    switch (TYPES[t].kind) {
      case 'gap': return u.gaps.length;
      case 'order': return u.orderIdx.length;
      case 'err': return u.errs.length;
      case 'tr': return u.trs.length;
      case 'write': return u.w ? 1 : 0;
    }
    return 0;
  }
  const unitTypes = (u) => Object.keys(TYPES).filter((t) => available(u, t));
  const stepKey = (item) => item.ref.k + ':' + item.ref.i;
  function modeStatus(u, t) {
    const keys = t === 'write' ? ['write:0'] : unitItems(u, t, false).map(stepKey);
    return Steps.status(steps[u.n + ':' + t], keys, !!getProg(u.n, t));
  }
  function unitCompletion(u) {
    const modes = unitTypes(u).map((t) => modeStatus(u, t));
    const done = modes.reduce((n, s) => n + s.done, 0), total = modes.reduce((n, s) => n + s.total, 0);
    return { done, total, pct: total ? Math.round(done / total * 100) : 0, complete: modes.length > 0 && modes.every((s) => s.complete) };
  }

  function makeItem(t, u, kind, i) {
    prep(u);
    const data = kind === 'gap' ? u.gaps[i] : kind === 'err' ? u.errs[i] : u.trs[i];
    const item = { t, data, ref: { u: u.n, k: kind, i } };
    if (kind === 'gap') item.data = { ...data, expectedAnswers: Notes.answers(item), grammarAnswers: Notes.answers({ ...item, t: 'fill' }) };
    if (kind === 'tr') item.data = { ...data, expectedAnswers: Notes.answers(item) };
    if (t === 'order') item.data.orderAnswers = Notes.orderAnswers(item);
    return item;
  }

  function unitItems(u, t, random = true) {
    prep(u);
    const k = TYPES[t].kind;
    const idx = k === 'gap' ? u.gaps.map((_, i) => i)
      : k === 'order' ? u.orderIdx
        : k === 'err' ? u.errs.map((_, i) => i)
          : u.trs.map((_, i) => i);
    return (random ? shuffle(idx) : idx).map((i) => makeItem(t, u, k === 'order' ? 'gap' : k, i));
  }

  // ---------- речь ----------
  const synth = window.speechSynthesis;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let voices = [];
  function loadVoices() {
    if (synth) voices = synth.getVoices().filter((v) => /^en/i.test(v.lang));
  }
  if (synth) {
    loadVoices();
    if (synth.addEventListener) synth.addEventListener('voiceschanged', loadVoices);
  }
  function pickVoice() {
    if (!voices.length) loadVoices();
    if (settings.voice) {
      const v = voices.find((x) => x.voiceURI === settings.voice);
      if (v) return v;
    }
    const acc = settings.accent.toLowerCase();
    const m = voices.filter((v) => v.lang.replace('_', '-').toLowerCase() === acc);
    const pool = m.length ? m : voices;
    return pool.find((v) => /natural|google|online/i.test(v.name)) || pool[0] || null;
  }
  function speak(text, rate) {
    if (!synth) { toast('Браузер не поддерживает озвучку'); return; }
    const u = new SpeechSynthesisUtterance(String(text).replace(/[—–]/g, ', '));
    const v = pickVoice();
    if (v) { u.voice = v; u.lang = v.lang; } else u.lang = settings.accent;
    u.rate = rate || settings.rate;
    const busy = synth.speaking || synth.pending;
    synth.cancel();
    if (busy) setTimeout(() => synth.speak(u), 60);
    else synth.speak(u);
  }
  const audioBtns = () => `<div class="audio"><button class="btn play" type="button">${icon('play')} Слушать</button>
    <button class="btn play" type="button" data-rate="0.6">${icon('slow')} Медленно</button></div>`;
  function wireAudio(area, text) {
    $$('.play', area).forEach((b) => (b.onclick = () => speak(text, +b.dataset.rate || undefined)));
  }

  let recog = null;
  function listen(onAlts, onState) {
    if (recog) { recog.abort(); recog = null; }
    const r = new SR();
    r.lang = settings.accent;
    r.interimResults = false;
    r.maxAlternatives = 5;
    r.onresult = (e) => onAlts(Array.from(e.results[0]).map((a) => a.transcript));
    r.onerror = (e) => {
      if (e.error === 'not-allowed') toast('Нет доступа к микрофону');
      else if (e.error === 'no-speech') toast('Ничего не услышал — попробуйте ещё раз');
      else if (e.error !== 'aborted') toast('Ошибка распознавания: ' + e.error);
    };
    r.onend = () => { recog = null; onState(false); };
    recog = r;
    onState(true);
    r.start();
  }

  // ---------- отрисовка заданий ----------
  const R = {
    mc(area, g, finish) {
      const opts = shuffle([g.correct, ...g.wrong]);
      area.innerHTML = `<div class="task">Выберите правильный вариант</div>
        <p class="sent" lang="en">${esc(g.before)}<span class="gap">&nbsp;</span>${esc(g.after)}</p>
        <div class="opts">${opts.map((o, i) => `<button class="opt" type="button"><kbd>${i + 1}</kbd>${esc(showOpt(o))}</button>`).join('')}</div>`;
      const btns = $$('.opt', area);
      const choose = (i) => {
        const valid = (o) => same(o, g.expectedAnswers || g.answers);
        const ok = valid(opts[i]);
        btns.forEach((b, k) => {
          b.disabled = true;
          if (!g.exam && valid(opts[k])) b.classList.add('right');
        });
        if (!g.exam && !ok) btns[i].classList.add('wrong');
        if (!g.exam) $('.gap', area).textContent = showOpt(g.correct);
        finish({ ok, correct: hl(g), say: g.full, user: opts[i] });
      };
      btns.forEach((b, i) => (b.onclick = () => choose(i)));
      return { keys: (n) => n <= opts.length && choose(n - 1) };
    },

    fill(area, g, finish, listenMode) {
      area.innerHTML = `<div class="task">${listenMode ? 'Прослушайте и впишите пропущенные слова' : 'Впишите правильную форму'}</div>
        ${listenMode ? audioBtns() : ''}
        <p class="sent" lang="en">${esc(g.before)}<input class="gapin" lang="en" aria-label="Пропущенные слова" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">${!listenMode && g.hint ? `<span class="hint">(${esc(g.hint)})</span>` : ''}${esc(g.after)}</p>
        ${listenMode || g.exam || g.review ? '' : '<button class="btn link small showopts" type="button">Показать варианты</button><div class="optlist"></div>'}`;
      const inp = $('.gapin', area);
      inp.style.width = Math.max(6, Math.max(...g.answers.map((a) => a.length)) + 3) + 'ch';
      if (listenMode) { wireAudio(area, g.full); speak(g.full); }
      const so = $('.showopts', area);
      if (so) so.onclick = () => {
        $('.optlist', area).innerHTML = shuffle([g.correct, ...g.wrong]).map((o) => `<span class="chip">${esc(showOpt(o))}</span>`).join('');
        so.remove();
      };
      return {
        check() {
          const v = inp.value;
          inp.disabled = true;
          const ok = same(v, g.expectedAnswers || g.answers);
          const note = listenMode && !ok && same(v, g.grammarAnswers || g.answers) ? 'форма возможна, но в записи звучит другой вариант' : null;
          finish({ ok, correct: hl(g), say: listenMode ? null : g.full, user: v, override: true, note });
        },
      };
    },

    lgap(area, g, finish) {
      return R.fill(area, g, finish, true);
    },

    dict(area, g, finish) {
      area.innerHTML = `<div class="task">Прослушайте и запишите предложение полностью</div>${audioBtns()}
        <textarea class="textin" lang="en" aria-label="Ответ на английском" rows="2" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="Пишите здесь…"></textarea>`;
      wireAudio(area, g.full);
      speak(g.full);
      const ta = $('textarea', area);
      return {
        check() {
          const v = ta.value;
          if (!v.trim()) { toast('Сначала напишите, что услышали'); return; }
          ta.disabled = true;
          if (same(v, [g.full])) return finish({ ok: true, correct: esc(g.full), user: v });
          const d = wordDiff(g.full, v);
          finish({ ok: false, score: d.ratio, correct: d.html, user: v, override: true, note: `совпало ${Math.round(d.ratio * 100)}% слов` });
        },
      };
    },

    order(area, g, finish) {
      const full = g.full;
      const end = /[.?!]$/.test(full) ? full.slice(-1) : '';
      const body = end ? full.slice(0, -1) : full;
      const toks = body.split(' ').map((t, i) => ({ t, i }));
      let bank = shuffle(toks);
      for (let k = 0; k < 5 && bank.map((x) => x.t).join(' ') === body; k++) bank = shuffle(toks);
      let ans = [];
      area.innerHTML = `<div class="task">Соберите предложение из слов</div>
        <div class="ans-line"></div><div class="bank"></div>
        <button class="btn link small reset" type="button">↺ Сбросить</button>`;
      const draw = () => {
        $('.ans-line', area).innerHTML = ans.map((x, k) => `<button class="tok in" type="button" data-k="${k}">${esc(x.t)}</button>`).join('') + (end ? `<span class="endp">${end}</span>` : '');
        $('.bank', area).innerHTML = bank.map((x, k) => `<button class="tok" type="button" data-k="${k}">${esc(x.t)}</button>`).join('');
        $$('.ans-line .tok', area).forEach((b) => (b.onclick = () => { bank.push(ans.splice(+b.dataset.k, 1)[0]); draw(); }));
        $$('.bank .tok', area).forEach((b) => (b.onclick = () => { ans.push(bank.splice(+b.dataset.k, 1)[0]); draw(); }));
      };
      $('.reset', area).onclick = () => { bank = bank.concat(ans); ans = []; draw(); };
      draw();
      return {
        check() {
          if (bank.length) { toast('Используйте все слова'); return; }
          const ok = same(ans.map((x) => x.t).join(' ') + end, g.orderAnswers || [full]);
          $$('.tok', area).forEach((b) => (b.disabled = true));
          finish({ ok, correct: esc(full), say: full, user: ans.map((x) => x.t).join(' ') + end });
        },
      };
    },

    err(area, e, finish) {
      area.innerHTML = `<div class="task">В предложении есть ошибка. Исправьте его.</div>
        <p class="sent wrongsent" lang="en">${esc(e.q)}</p>
        <textarea class="textin" lang="en" aria-label="Ответ на английском" rows="2" autocomplete="off" spellcheck="false"></textarea>`;
      const ta = $('textarea', area);
      ta.value = e.q;
      return {
        check() {
          const v = ta.value;
          ta.disabled = true;
          finish({ ok: same(v, e.a), correct: e.a.map(esc).join('<br><small>или:</small> '), say: e.a[0], user: v, override: true });
        },
      };
    },

    tr(area, t, finish) {
      area.innerHTML = `<div class="task">Напишите предложение по заданию</div>
        <p class="sent" lang="en">${esc(t.q)}</p>
        <textarea class="textin" lang="en" aria-label="Ответ на английском" rows="2" autocomplete="off" spellcheck="false" placeholder="Ваш вариант…"></textarea>`;
      const ta = $('textarea', area);
      return {
        check() {
          const v = ta.value;
          if (!v.trim()) { toast('Напишите ответ'); return; }
          ta.disabled = true;
          finish({ ok: same(v, t.expectedAnswers || t.a), correct: t.a.map(esc).join('<br><small>или:</small> '), say: t.a[0], user: v, override: true });
        },
      };
    },

    speak(area, d, finish) {
      const text = d.full;
      let best = 0;
      area.innerHTML = `<div class="task">Прослушайте и произнесите вслух</div>
        <p class="sent big" lang="en">${esc(text)}</p>
        <div class="audio">
          <button class="btn play" type="button">${icon('play')} Слушать</button>
          <button class="btn play" type="button" data-rate="0.6">${icon('slow')} Медленно</button>
          ${SR ? `<button class="btn mic" type="button">${icon('speak')} Говорить</button>` : `<button class="btn rec" type="button">${icon('speak')} Записать себя</button>`}
        </div>
        <div class="srres"></div>`;
      wireAudio(area, text);
      const res = $('.srres', area);
      if (SR) {
        const mic = $('.mic', area);
        mic.onclick = () => {
          if (recog) { recog.stop(); return; }
          if (synth) synth.cancel();
          listen((alts) => {
            let top = null;
            for (const a of alts) {
              const d2 = same(a, [text]) ? { ratio: 1, html: `<span class="w-ok">${esc(text)}</span>` } : wordDiff(text, a);
              if (!top || d2.ratio > top.d.ratio) top = { a, d: d2 };
            }
            best = Math.max(best, top.d.ratio);
            const pct = Math.round(top.d.ratio * 100);
            res.innerHTML = `<div class="said">Распознано: «${esc(top.a)}»</div>
              <div class="diff">${top.d.html}</div>
              <div class="meter"><i style="width:${pct}%"></i></div>
              <div class="pct">${pct}% ${pct >= 90 ? '— слова совпали' : pct >= 70 ? '— большая часть слов совпала' : '— попробуйте ещё раз (красные слова)'}</div>`;
          }, (on) => {
            mic.classList.toggle('on', on);
            mic.innerHTML = on ? `${icon('close')} Слушаю…` : `${icon('speak')} Говорить`;
          });
        };
        return { check: () => finish({ ok: best >= 0.8, score: best, note: `лучший результат: ${Math.round(best * 100)}%`, say: null }), label: 'Готово' };
      }
      // нет распознавания речи: записываем себя и сравниваем на слух
      res.innerHTML = '<p class="muted small">Браузер не умеет распознавать речь (лучше всего работает Chrome). Запишите себя, сравните с образцом и оцените сами.</p><div class="recout"></div><div class="selfrate"><button class="btn good" type="button">Похоже</button><button class="btn bad" type="button">Нужно ещё</button></div>';
      wireRecorder($('.rec', area), $('.recout', area));
      $('.selfrate .good', area).onclick = () => finish({ ok: true });
      $('.selfrate .bad', area).onclick = () => finish({ ok: false, say: null });
      return {};
    },

    snd(area, d, finish) {
      area.innerHTML = `<div class="task">${esc(d.task)}</div>
        <p class="sent big" lang="en">${esc(d.word)} <button class="btn small play" type="button" aria-label="Послушать слово">${icon('volume')}</button></p>
        <div class="opts row">${d.cats.map((c, i) => `<button class="opt" type="button"><kbd>${i + 1}</kbd>${esc(c[1])}</button>`).join('')}</div>`;
      wireAudio(area, d.word);
      speak(d.word);
      const btns = $$('.opt', area);
      const choose = (i) => {
        const ok = d.cats[i][0] === d.cat;
        btns.forEach((b, k) => { b.disabled = true; if (d.cats[k][0] === d.cat) b.classList.add('right'); });
        if (!ok) btns[i].classList.add('wrong');
        const label = d.cats.find((c) => c[0] === d.cat)[1];
        finish({ ok, correct: `${esc(d.word)} → <b class="hl">${esc(label)}</b>`, say: d.word });
      };
      btns.forEach((b, i) => (b.onclick = () => choose(i)));
      return { keys: (n) => n <= d.cats.length && choose(n - 1) };
    },

    pair(area, d, finish) {
      const spoken = Math.random() < 0.5 ? d.a : d.b;
      const opts = shuffle([d.a, d.b]);
      area.innerHTML = `<div class="task">Что прозвучало?</div>${audioBtns()}
        <div class="opts">${opts.map((o, i) => `<button class="opt" type="button"><kbd>${i + 1}</kbd>${esc(o)}</button>`).join('')}</div>`;
      wireAudio(area, spoken);
      speak(spoken);
      const btns = $$('.opt', area);
      const choose = (i) => {
        const ok = opts[i] === spoken;
        btns.forEach((b, k) => { b.disabled = true; if (opts[k] === spoken) b.classList.add('right'); });
        if (!ok) btns[i].classList.add('wrong');
        finish({ ok, correct: esc(spoken), say: spoken });
      };
      btns.forEach((b, i) => (b.onclick = () => choose(i)));
      return { keys: (n) => n <= 2 && choose(n - 1) };
    },
  };

  const recorderCleanups=[];
  function releaseRecorders(){recorderCleanups.splice(0).forEach(fn=>fn());}
  window.addEventListener('beforeunload',releaseRecorders);
  function wireRecorder(btn, out) {
    if (!btn) return;
    if (!navigator.mediaDevices || !window.MediaRecorder) { btn.disabled = true; btn.textContent = 'Запись недоступна'; return; }
    const controller=window.EGIURecorder.create({
      getStream:()=>navigator.mediaDevices.getUserMedia({audio:true}),Recorder:window.MediaRecorder,
      makeBlob:(chunks,mime)=>new Blob(chunks,{type:mime}),makeURL:blob=>URL.createObjectURL(blob),revokeURL:url=>URL.revokeObjectURL(url),
      onState:state=>{btn.disabled=state==='pending';btn.textContent=state==='recording'?'Стоп':state==='pending'?'Подключаем микрофон…':'Записать себя';btn.classList.toggle('on',state==='recording');},
      onRecord:({url,mime})=>{out.innerHTML=`<audio controls src="${url}"></audio><a class="small" href="${url}" download="my-english-answer.${mime.includes('mp4')?'m4a':'webm'}">Скачать запись</a>`;},
      onError:()=>toast('Микрофон недоступен. Можно проговорить ответ без записи и вписать текст.'),
    });
    btn.onclick=controller.toggle;recorderCleanups.push(controller.dispose);
  }

  // ---------- сессия упражнений ----------
  let keyHandler = null;
  document.addEventListener('keydown', (e) => keyHandler && keyHandler(e));

  function session({ title, back, items, onDone, context = {} }) {
    if(!requireBook(items.map(it=>it.ref&&it.ref.u),back,()=>session({title,back,items,onDone,context})))return;
    if(context.kind==='unit'&&!Weekly.canStart(weekly,course,todayKey(),context.unit))return weeklyUI.blockedPage();
    let pos = 0, ctl = {}, answered = false, ended = false, reward = null;
    const tracked = context.kind === 'unit' && context.unit && context.mode;
    const learningDraft = context.learningSession && learning.sessions[context.learningSession];
    const sessionId = learningDraft ? learningDraft.id : Date.now() + '-' + Math.random().toString(36).slice(2);
    const allItems = items, entryId = context.unit + ':' + context.mode;
    const saved = learningDraft || (tracked ? steps[entryId] : null);
    const savedKey = it => learningDraft ? Learning.key(it.ref) : stepKey(it);
    const alreadyComplete = tracked && modeStatus(D.units[context.unit], context.mode).complete;
    const baseline = (tracked || learningDraft) && !alreadyComplete ? allItems.filter((it) => saved && saved.answers[savedKey(it)]).map((it) => ({
      ...saved.answers[savedKey(it)], item: it, correct: it.ref.k === 'gap' ? hl(it.data) : esc(it.data.a[0]),
    })) : [];
    if (baseline.length) items = allItems.filter((it) => !saved.answers[savedKey(it)]);
    const res = [], total = allItems.length;
    const results = () => baseline.concat(res.filter(Boolean));
    const accuracy = () => Math.round(results().reduce((sum, r) => sum + r.score, 0) / results().length * 100);
    app.innerHTML = `<div class="session">
      <div class="sess-top">
        <button class="btn ghost quit" type="button" aria-label="Вернуться к выбору упражнений" title="Выйти">${icon('close')}</button>
        <div class="bar" role="progressbar" aria-label="Выполнение занятия" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${baseline.length}"><i></i></div><span class="count" aria-live="polite"></span>
      </div>
      <h1 class="sess-title">${esc(title)}</h1>
      ${learningDraft?'<p class="session-note">Ответы и порядок сохраняются. Новые и знакомые примеры могут чередоваться; ранняя практика не двигает расписание.</p>':''}
      ${tracked ? `<p class="session-note">${alreadyComplete ? 'Повторение выполненного режима.' : baseline.length ? 'Продолжаем с оставшихся заданий.' : 'Каждый ответ сохраняется сразу. Можно продолжить позже.'}</p>` : ''}
      <div class="card ex"><div class="area"></div><div class="fb" role="status" aria-live="polite" aria-atomic="true"></div>
        <div class="actions"><button class="btn primary main" type="button"></button></div>
      </div></div>`;
    const area = $('.area'), fb = $('.fb'), btn = $('.main'), bar = $('.bar i'), count = $('.count');
    $('.quit').onclick = () => go(back);
    function drawProgress() {
      const done = baseline.length + res.filter(Boolean).length;
      count.textContent = `${done} / ${total} · ${Math.round(done / total * 100)}%`;
      bar.style.width = done / total * 100 + '%';
      $('.sess-top .bar').setAttribute('aria-valuenow', done);
    }
    function persistAnswer(r,recordMissingActivity=true) {
      if (learningDraft) {
        learning=Learning.answerSession(learning,context.learningSession,Learning.key(r.item.ref),r);
        if(r.ok)learning=Learning.acceptSessionAnswer(learning,context.learningSession,Learning.key(r.item.ref));
        saveLearning();return;
      }
      if (!tracked) return;
      if(context.mode==='mc'){learning=Learning.recordRecognition(learning,context.unit,[{key:Learning.key(r.item.ref),ok:r.ok}]);saveLearning();}
      let row = activity.find((e) => e.id === r.eventId);
      // Legacy answers predate the event link: correct their saved grade without inventing another attempt.
      if(!row&&!recordMissingActivity){steps[entryId]=Steps.record(steps[entryId],stepKey(r.item),r,r.ts);Store.set('steps',steps);return;}
      if (!row) {
        r.eventId = Date.now() + '-' + Math.random().toString(36).slice(2);
        row = { id: r.eventId, session: sessionId, ts: Date.now(), day: todayKey(), kind: 'step', units: [context.unit], mode: context.mode, title, answers: 1, correct: 0 };
        activity.push(row);
      }
      row.correct = r.ok ? 1 : 0;
      steps[entryId] = Steps.record(steps[entryId], stepKey(r.item), r, Date.now());
      Store.set('steps', steps);
      Store.set('activity', activity);
    }
    function acceptResult(r){
      if(r.ok)return false;
      r.ok=true;r.score=1;undoMistake(r.item,r.reviewEvent);persistAnswer(r,!baseline.includes(r));
      if(reward&&onDone)onDone(accuracy(),results());
      if(reward&&!tracked){const row=activity.find(e=>e.session===sessionId);if(row){row.correct=results().filter(r=>r.ok).length;Store.set('activity',activity);}}
      updateNav();return true;
    }
    function commitCompleted() {
      if (reward) return;
      if(learningDraft){
        reward=activity.some(e=>e.session===sessionId)?{xp:0}:recordActivity({...context,session:sessionId,title},results());
        if(onDone)onDone(accuracy(),results());
      }else{
        if(onDone)onDone(accuracy(),results());
        reward=recordActivity({ ...context, session: sessionId, stepped: !!tracked, title }, tracked ? [] : res);
      }
    }
    function show() {
      answered = false;
      fb.className = 'fb'; fb.innerHTML = '';
      drawProgress(); area.innerHTML = '';
      ctl = R[items[pos].t](area, items[pos].data, finish) || {};
      if(items[pos].ref && items[pos].ref.b && ['mc','fill','order','err'].includes(items[pos].t))area.insertAdjacentHTML('afterbegin',`<p class="muted small">Сохрани смысл и заданные слова: ${esc(items[pos].data.meaning)}</p>`);
      btn.style.display = ctl.check ? '' : 'none';
      btn.textContent = ctl.label || 'Проверить';
      btn.onclick = () => ctl.check && ctl.check();
      const inp = $('input,textarea', area);
      if (inp && !matchMedia('(pointer: coarse)').matches) inp.focus();
    }
    function finish(r) {
      if (answered) return;
      answered = true;
      const it = items[pos];
      if (r.score == null) r.score = r.ok ? 1 : 0;
      r.item = it; res[pos] = r;
      r.reviewEvent = sessionId + ':' + pos;
      trackMistake(it, r, r.reviewEvent);
      persistAnswer(r); drawProgress();
      if (tracked && res.filter(Boolean).length === items.length) commitCompleted();
      const draw = () => {
        fb.className = 'fb ' + (r.ok ? 'good' : 'bad');
        fb.innerHTML = `<div class="verdict">${icon(r.ok ? 'check' : 'close')}${r.ok ? 'Верно' : 'Нужно поправить'}${r.note ? ` <small>(${esc(r.note)})</small>` : ''}</div>
          ${r.correct ? `<div class="answer">${r.ok ? '' : '<span class="lbl">Правильно:</span> '}${r.correct}</div>` : ''}
          <div class="fb-actions">
            ${r.say ? `<button class="btn small say" type="button">${icon('volume')} Послушать</button>` : ''}
            ${!r.ok && r.override ? '<button class="btn small link ovr" type="button">Мой ответ тоже верный</button>' : ''}
          </div>${Notes.render(answerNote(it, r))}${reinforcement(it)}${!r.ok?'<div class="answer-dispute"></div>':''}`;
        const s = $('.say', fb); if (s) s.onclick = () => speak(r.say);
        const o = $('.ovr', fb);
        if (o) o.onclick = () => {
          acceptResult(r);draw();
        };
        if(!r.ok)attachAnswerDispute($('.answer-dispute',fb),it,r.user,()=>{if(!acceptResult(r))return false;draw();toast('Ответ зачтён. Ложная ошибка отменена.');});
      };
      draw();
      if (r.say && settings.autoplay) speak(r.say);
      btn.style.display = ''; btn.textContent = pos + 1 < items.length ? 'Далее →' : 'Результат'; btn.onclick = next; btn.focus(); updateNav();
    }
    function next() { pos++; if (pos < items.length) show(); else end(); }
    function end() {
      if (ended) return;
      ended = true; keyHandler = null; drawProgress(); commitCompleted();
      drawSummary();
    }
    function drawSummary(){
      const pct = accuracy(), wrong = results().filter((r) => !r.ok);
      const msg = pct >= 90 ? 'Хороший результат. Можно перейти к следующему упражнению.' : pct >= 70 ? 'Хороший результат. Осталось разобрать ошибки.' : pct >= 50 ? 'Есть над чем поработать. Повтори сложные задания.' : 'Вернись к правилу в книге и попробуй ещё раз.';
      $('.ex').innerHTML = `<div class="summary">
        <div class="bigpct">${pct}%</div><p>${msg}</p>
        ${rewardPanel(reward)}
        ${learningDraft?'<p><a href="#/retention">Посмотреть следующие даты повторения →</a></p>':''}
        ${context.kind==='review'?`<div class="week-context-next"><h3>Закрепи собственной речью</h3><p>После смешанной проверки выбери тему недели: прослушай контекст и расскажи свою ситуацию. В воскресенье начни с этого блока.</p>${[...new Set(results().map(r=>r.item.ref.u))].map(n=>`<a class="btn small" href="#/u/${n}/context">Unit ${n} · своя речь</a>`).join('')}</div>`:''}
        ${wrong.length ? `<h3>Ошибки (${wrong.length})</h3><ul class="wronglist">${wrong.map((r) => `<li>${r.correct || esc(r.item.data.full || '')}${r.user ? `<div class="muted small">ваш ответ: ${esc(r.user)}</div>` : ''}<div class="answer-dispute"></div></li>`).join('')}</ul>` : ''}
        <div class="actions">
          ${wrong.length ? '<button class="btn primary again-wrong" type="button">Повторить ошибки</button>' : ''}
          <button class="btn again" type="button">Ещё раз</button><button class="btn ghost back" type="button">Назад</button>
        </div></div>`;
      const aw = $('.again-wrong');
      $$('.wronglist .answer-dispute').forEach((el,i)=>attachAnswerDispute(el,wrong[i].item,wrong[i].user,()=>{if(!acceptResult(wrong[i]))return false;drawSummary();toast('Ответ зачтён. Результат обновлён.');}));
      if (aw) aw.onclick = () => session({ title: title + ' · ошибки', back, items: shuffle(wrong.map((r) => r.item)), onDone: null });
      $('.again').onclick = () => learningDraft ? go('#/retention') : session({ title, back, items: shuffle(allItems), onDone, context });
      $('.back').onclick = () => go(back);
    }
    keyHandler = (e) => {
      const tag = e.target.tagName;
      if (e.key === 'Enter' && !e.shiftKey) {
        if (tag === 'BUTTON' || tag === 'A') return;
        if (btn.style.display !== 'none') { e.preventDefault(); btn.click(); }
      } else if (!answered && ctl.keys && /^[1-9]$/.test(e.key) && tag !== 'INPUT' && tag !== 'TEXTAREA') ctl.keys(+e.key);
    };
    if(items.length)show();else end();
  }

  // ---------- страницы ----------
  function go(hash) {
    if (location.hash === hash) route();
    else location.hash = hash;
  }

  const bar = (pct) => `<div class="pbar"><i style="width:${pct}%"></i></div>`;

  // ---------- недельный план ----------
  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const dateLabel = (key, options = { day: 'numeric', month: 'long' }) => Study.date(key).toLocaleDateString('ru-RU', options);
  function weekLabel(key) {
    const days = Study.weekDays(key);
    return `${dateLabel(days[0], { day: 'numeric', month: 'short' })} — ${dateLabel(days[6], { day: 'numeric', month: 'short', year: 'numeric' })}`;
  }
  function weekGrid(key, selected) {
    const today = todayKey();
    return `<div class="week-grid" aria-label="План недели">${Study.weekDays(key).map((day, i) => {
      const state = dayState(day);
      const past = day < today;
      const label = state.done ? 'Выполнено' : state.active ? 'Была практика' : past ? 'Без занятия' : 'По плану';
      const className = state.done ? 'is-done' : state.active ? 'is-active' : past ? 'is-missed' : '';
      return `<a class="week-day ${className}${day === today ? ' is-today' : ''}${day === selected ? ' is-selected' : ''}" href="#/calendar/${day}" aria-label="${esc(dateLabel(day, { weekday: 'long', day: 'numeric', month: 'long' }))}. ${i < 5 ? 'Один юнит' : 'Повторение недели'}. ${label}"${day === today ? ' aria-current="date"' : ''}>
        <span class="day-name">${dayNames[i]}</span><b>${Study.date(day).getDate()}</b><span class="day-task">${i < 5 ? 'Юнит' : 'Повтор'}</span>
        <span class="day-mark" aria-hidden="true">${state.done ? icon('check') : state.active ? '·' : '—'}</span></a>`;
    }).join('')}</div>`;
  }
  function plannedUnit(day) {
    if (club.goals[day]) return D.units[club.goals[day].unit];
    const assigned = D.units[dailyPlan[day]];
    if (assigned) return assigned;
    if (day >= course.since) return D.units[Course.next(course, day) || 145];
    const done = activity.find((e) => e.day === day && ['unit', 'writing'].includes(e.kind));
    if (done) return D.units[done.units[0]];
    const learned = new Set(activity.filter((e) => ['unit', 'writing'].includes(e.kind)).flatMap((e) => e.units));
    const inBook = D.list.find((u) => bookReady(u.n) && !learned.has(u.n));
    if (inBook) return inBook;
    const latest = activity.slice().reverse().find((e) => ['unit', 'writing'].includes(e.kind));
    return latest ? D.units[latest.units[0] + 1] || D.units[145] : D.units[Store.get('last', 1)] || D.list[0];
  }
  function clubBoard() {
    const ledger = clubLedger(), rank = Course.rank(course, todayKey());
    return `<section class="club-board" aria-label="Ранг, закрытые юниты и серия дней">
      <div class="club-identity"><span class="club-monogram" aria-hidden="true">G<span>U</span></span><div><span class="club-kicker" lang="en">The Study Club</span><b lang="en">${rank.current.en}</b><span class="rank-caption">${rank.current.ru} · ${ledger.xp} XP</span><a class="rank-link" href="#/ranks">Лестница рангов →</a></div></div>
      <div class="club-experience"><div><b>${rank.done} / 145 юнитов закрыто</b><span>${rank.next ? `До ${rank.next.en} — ${rank.remaining} ${plural(rank.remaining, 'юнит', 'юнита', 'юнитов')}` : 'Весь курс пройден'}</span></div><div class="club-meter" role="progressbar" aria-label="Закрытые юниты курса" aria-valuemin="0" aria-valuemax="145" aria-valuenow="${rank.done}"><i style="width:${rank.done / 145 * 100}%"></i></div></div>
      <div class="club-streak"><b>${ledger.streak}</b><span>${plural(ledger.streak, 'закрытый день', 'закрытых дня', 'закрытых дней')} подряд</span></div>
    </section>`;
  }
  function clubAwards() {
    const ledger = clubLedger();
    const awards = [{ id: 'first', en: 'First day', title: 'Первый закрытый день', hint: 'Заверши упражнения и сдай экзамен.' },
      { id: 'weekend', en: 'Weekend', title: 'Оба повторения', hint: 'Повтори материал в субботу и воскресенье одной недели.' },
      { id: 'week', en: 'Full week', title: 'Полная неделя', hint: 'Закрой пять будней и оба повторения.' }];
    return `<section class="club-awards" aria-label="Печати дневника"><span class="eyebrow">Печати дневника</span><div class="award-list">${awards.map((award) => `<div class="award ${ledger.awards[award.id] ? 'is-earned' : ''}" title="${esc(award.hint)}"><span class="award-seal" aria-hidden="true"><small lang="en">Study Club</small>${icon(ledger.awards[award.id] ? 'check' : 'book')}<em lang="en">${award.en}</em></span><b>${award.title}</b><span>${ledger.awards[award.id] ? 'Получено' : award.hint}</span></div>`).join('')}</div>
      <p>${ledger.weeks.length ? `${ledger.weeks.length} ${plural(ledger.weeks.length, 'недельная печать', 'недельные печати', 'недельных печатей')} в коллекции.` : 'Каждая полностью закрытая неделя добавляет новую печать.'}</p></section>`;
  }
  function goalList(goal, state) {
    return `<ol class="goal-list" aria-label="Занятия на сегодня"><li><a class="goal-book ${bookReady(goal.unit)?'is-complete':''}" href="#/u/${goal.unit}"><span class="goal-check" aria-hidden="true">${icon(bookReady(goal.unit)?'check':'book')}</span><span>Сначала — книга</span><small>${bookReady(goal.unit)?'пройдено':'отметить'}</small></a></li>${goal.required.map((t) => {
      const s = modeStatus(D.units[goal.unit], t);
      return `<li><a class="${s.complete ? 'is-complete' : ''}" href="#/u/${goal.unit}/${t}"><span class="goal-check" aria-hidden="true">${s.complete ? icon('check') : ''}</span><span>${TYPES[t].name}</span><small>${s.complete ? 'готово' : s.done ? s.pct + '%' : s.done + '/' + s.total}</small></a></li>`;
    }).join('')}<li><a class="${Exam.status(exams, goal.unit).passed ? 'is-complete' : ''}" href="#/u/${goal.unit}/exam"><span class="goal-check" aria-hidden="true">${Exam.status(exams, goal.unit).passed ? icon('check') : ''}</span><span>Итоговый экзамен</span><small>${Exam.status(exams, goal.unit).passed ? 'сдан' : unitCompletion(D.units[goal.unit]).complete ? 'открыт' : 'после упражнений'}</small></a></li></ol>`;
  }
  function rewardPanel(reward) {
    const day = todayKey(), state = dayState(day), goal = club.goals[day];
    const celebrated=reward.closed?dayCelebration():'';
    if(celebrated)return celebrated;
    const next = goal && !Study.isWeekend(day) ? goal.required.find((t) => !state.completed.includes(t)) : null;
    const nextExam = goal && !next && !Study.isWeekend(day) && !state.done && !Exam.status(exams, goal.unit).passed;
    return `<div class="reward-panel${reward.closed ? ' just-closed' : ''}" role="status">
      ${reward.closed ? `<span class="day-stamp" lang="en">Day<br>complete</span>` : icon('check')}
      <div><b>${reward.week ? 'Полная неделя — печать твоя!' : reward.closed ? Study.isWeekend(day) ? 'Повторение закрыто. Хорошая работа.' : `Юнит ${course.closed[day] || (goal && goal.unit)} закрыт. Хорошая работа.` : 'Подход сохранён.'}</b>
        <p>${reward.xp ? `+${reward.xp} XP · ` : ''}${next ? `${state.completed.filter((t) => goal.required.includes(t)).length} из ${goal.required.length} занятий. Следующее — «${TYPES[next].name}».` : 'Результат записан в дневник.'}</p>
        ${reward.rank ? `<p class="rank-promoted">Новый ранг: <b lang="en">${reward.rank.en}</b> · ${reward.rank.ru}</p>` : ''}
        ${next ? `<a class="btn small primary" href="#/u/${goal.unit}/${next}">Следующее занятие ${icon('arrow')}</a>` : nextExam ? `<a class="btn small primary" href="#/u/${goal.unit}/exam">Перейти к экзамену ${icon('arrow')}</a>` : '<a href="#/calendar">Посмотреть неделю →</a>'}</div></div>`;
  }
  function dayCompletion(){
    const day=todayKey(),revision=Weekly.status(weekly,day);
    const pending=revision.debts.reduce((n,w)=>n+w.pending,0)+(Study.isWeekend(day)?revision.current.pending:0);
    return Club.completion(activity,club,course,day,pending);
  }
  function dayCelebration(link=true) {
    const completed=dayCompletion();
    if(!completed)return '';
    const day=completed.day,u=D.units[completed.unit],rank=Course.rank(course,day).current;
    const checks=completed.weekend?['Повторение завершено']:u?[unitCompletion(u).complete?'Все упражнения выполнены':'Юнит закрыт',Exam.status(exams,u.n).passed?'Экзамен сдан':null].filter(Boolean):[];
    return `<section class="day-celebration" role="status" aria-label="Сегодняшний день полностью закрыт">
      <div class="completion-seal" aria-hidden="true"><span lang="en">The Study Club</span>${icon('check')}<b lang="en">Day<br>complete</b><small>${dateLabel(day,{day:'numeric',month:'short'})}</small></div>
      <div class="completion-message"><span class="eyebrow">${dateLabel(day,{weekday:'long',day:'numeric',month:'long'})} · день закрыт</span><h2>Сегодня всё<br><em>выполнено.</em></h2><p>${u?`Unit ${u.n} · <span lang="en">${esc(u.title)}</span>`:'Повторение недели завершено.'}<br>Хорошая работа. Можно закрыть тетрадь и отдохнуть.</p><ul class="completion-checks">${checks.map(label=>`<li>${icon('check')}${label}</li>`).join('')}</ul></div>
      <div class="completion-rewards"><div><b>+${completed.xp}<small> XP</small></b><span>заработано за сегодня</span></div><div><b>${completed.streak}<small> ${plural(completed.streak,'день','дня','дней')}</small></b><span>в серии занятий</span></div><p lang="en">${esc(rank.en)} <span>· ${rank.ru}</span></p>${completed.weekSeal?'<p class="completion-week-seal">Получена печать полной недели</p>':''}${link?'<a class="btn small" href="#/calendar">Открыть дневник →</a>':''}</div>
    </section>`;
  }
  function todayPlan() {
    const day = todayKey();
    if(!Study.isWeekend(day)&&Weekly.status(weekly,day).blocked)return `<div class="today-plan">${weeklyUI.banner()}<a class="btn ghost small" href="#/">Повторить закрытый юнит</a></div>`;
    const goal = ensureGoal();
    const state = dayState(day);
    const weekend = Study.isWeekend(day);
    const u = plannedUnit(day);
    const allComplete = goal && unitCompletion(u).complete;
    const exam = Exam.status(exams, u.n);
    const canClaim = allComplete && exam.passed && !state.done && !Course.closedUnits(course, day).has(u.n) && day >= course.since;
    const next = goal && goal.required.find((t) => !modeStatus(u, t).complete);
    if (Course.rank(course, day).done === 145) return `<div class="today-plan"><span class="eyebrow" lang="en">The Study Club / King</span><h3>Курс закрыт</h3><p>Все 145 юнитов пройдены. Возвращайся к темам, которые хочется закрепить.</p><a class="btn" href="#/">Выбрать тему ${icon('arrow')}</a></div>`;
    return `<div class="today-plan">
      <span class="eyebrow">${dateLabel(day, { weekday: 'long', day: 'numeric', month: 'long' })}</span>
      <h3>${weekend ? 'Повторить неделю' : 'Юнит на сегодня'}</h3>
      ${state.done ? `<p class="plan-complete">${icon('check')}${dayCompletion()?'Сегодня всё выполнено':'Повторение пройдено · осталось закрепить ошибки'}</p>` : ''}
      ${weekend ? `<p>${state.units.length ? `Вспомни ${state.units.length} ${plural(state.units.length, 'юнит', 'юнита', 'юнитов')}, которые закреплял в будни. В наборе будет задание из каждого.` : 'На этой неделе пока нет записанных юнитов. Проверяй ответы в будни — здесь появится набор для повторения.'}</p>
        ${state.units.length && !state.done ? '<p class="plan-help">+25 XP за полное повторение сегодня.</p>' : ''}
        ${Weekly.weekStatus(weekly,Study.weekStart(day)).pending ? `<a class="btn primary" href="#/weekly/${Study.weekStart(day)}">Сначала ошибки недели ${icon('arrow')}</a>` : state.units.length ? `<a class="btn primary" href="#/review/${day}">${state.done ? 'Повторить ещё раз' : 'Начать повторение'} ${icon('arrow')}</a>` : '<a class="btn" href="#/">Выбрать юнит</a>'}`
        : `<label class="plan-label" for="today-unit">Один юнит после книги</label><select id="today-unit"${state.done ? ' disabled' : ''}>${D.list.map((item) => `<option value="${item.n}"${item.n === u.n ? ' selected' : ''}${Course.closedUnits(course, day).has(item.n) && item.n !== u.n ? ' disabled' : ''}>${String(item.n).padStart(2, '0')} · ${esc(item.title)}</option>`).join('')}</select>
        <div class="goal-heading"><b>${state.completed.filter((t) => goal.required.includes(t)).length} / ${goal.required.length} упражнений</b><span>+20 XP за день</span></div>
        ${goalList(goal, state)}
        <p class="plan-help">Все упражнения → экзамен от 80% → закрытый день. Один юнит в будний день.</p>
        ${!bookReady(u.n) ? `<a class="btn primary" href="#/u/${u.n}">Сначала — отметить книгу ${icon('book')}</a>` : allComplete && !exam.passed && !state.done ? `<a class="btn primary" href="#/u/${u.n}/exam">${exam.draft ? 'Продолжить экзамен' : 'Сдать экзамен'} ${icon('arrow')}</a>` : canClaim ? '<button class="btn primary claim-unit" type="button">Закрыть юнит сегодня</button>' : `<a class="btn primary today-start" href="#/u/${u.n}${next && !state.done ? '/' + next : ''}">${state.done ? 'Продолжить практику' : next ? 'Следующее занятие' : 'Открыть юнит'} ${icon('arrow')}</a>`}`}
    </div>`+(state.done?afterDayPlan(day):'');
  }
  function afterDayPlan(day){
    const plan=Course.planAfter(course,day),topics=Learning.dueTopics(learning,day),errors=Review.due(mistakes,day);
    if(!plan)return '';
    const u=plan.kind==='unit'?plannedUnit(plan.day):null,closedUnit=course.closed[day];
    return `<section class="card after-day-plan" aria-label="После закрытого дня"><span class="eyebrow">Следующая страница</span><h3>Завтра · ${dateLabel(plan.day,{weekday:'long',day:'numeric',month:'long'})}</h3><p>${u?`Unit ${u.n} · <span lang="en">${esc(u.title)}</span>`:plan.kind==='review'?'Повторение юнитов этой недели. Новую тему закрывать не нужно.':'Все юниты закрыты. Можно возвращаться к темам и собственной речи.'}</p><div class="actions"><a class="btn small" href="#/calendar/${plan.day}">Посмотреть план</a>${closedUnit?`<a class="btn small" href="#/u/${closedUnit}/context">Unit ${closedUnit} · применить в своей речи</a>`:''}</div>${topics.length||errors.length?`<div class="after-day-review"><p>Можно закрепить сегодня — без нового юнита:</p><div class="actions">${topics.length?`<a class="btn small" href="#/retention">Темы на повторение · ${topics.length}</a>`:''}${errors.length?`<a class="btn small" href="#/mistakes">Ошибки на сегодня · ${errors.length}</a>`:''}</div></div>`:'<p class="muted small">Обязательных повторений на сегодня нет.</p>'}</section>`;
  }
  function wireTodayPlan() {
    const select = $('#today-unit');
    if (!select) return;
    select.onchange = () => {
      dailyPlan[todayKey()] = +select.value;
      Store.set('dailyPlan', dailyPlan);
      club.goals[todayKey()] = { unit: +select.value, required: unitTypes(D.units[select.value]) };
      saveClub(); route();
    };
  }
  function calendarPage(day) {
    ensureGoal();
    const week = Study.weekStart(day), today = todayKey();
    const stats = Study.summary(activity, day);
    const rows = Study.approaches(activity, day);
    const state = dayState(day);
    const units = Study.weekUnits(activity, day);
    app.innerHTML = `<div class="calendar-page">
      <span class="eyebrow">Личный ритм / 5 + 2</span><h1>Календарь занятий</h1>
      <p class="page-intro">Пн–пт — один юнит после книги. Сб и вс — повторение пройденного за неделю.</p>
      ${dayCelebration(false)}
      ${weeklyUI.banner()}
      ${clubBoard()}
      <div class="calendar-layout">
        <section class="calendar-main" aria-labelledby="week-title">
          <div class="week-heading"><h2 id="week-title">${weekLabel(day)}</h2><div class="week-controls">
            <a class="btn ghost" href="#/calendar/${Study.shift(day, -7)}" aria-label="Предыдущая неделя">←</a>
            <a class="btn ghost small" href="#/calendar/${today}">Сегодня</a>
            <a class="btn ghost" href="#/calendar/${Study.shift(day, 7)}" aria-label="Следующая неделя">→</a></div></div>
          ${weekGrid(day, day)}
          <p class="calendar-legend"><span>${icon('check')} план выполнен</span><span><b>·</b> была практика</span><span>— без записи</span></p>
          <div class="week-stats" aria-label="Статистика за выбранную неделю">
            <div><b>${stats.days}<small>/ 7</small></b><span>${plural(stats.days, 'активный день', 'активных дня', 'активных дней')}</span></div>
            <div><b>${stats.sessions}</b><span>${plural(stats.sessions, 'подход', 'подхода', 'подходов')}</span></div>
            <div><b>${stats.answers}</b><span>${plural(stats.answers, 'задание', 'задания', 'заданий')}</span></div>
            <div><b>${stats.accuracy == null ? '—' : stats.accuracy + '%'}</b><span>верных ответов</span></div>
          </div>
          <p class="stats-note">${stats.answers ? `${stats.correct} из ${stats.answers} ${plural(stats.answers, 'ответа', 'ответов', 'ответов')} полностью верны. ` : ''}Письмо учитывается как подход, без оценки правильности.</p>
          <section class="day-history" aria-labelledby="day-title"><div class="history-heading"><h2 id="day-title">${dateLabel(day, { weekday: 'long', day: 'numeric', month: 'long' })}</h2>${state.done ? '<span class="status-done">План выполнен</span>' : ''}</div>
            ${rows.length ? `<ol class="activity-list">${rows.map((e) => `<li><div><b>${esc(e.title || (e.kind === 'writing' ? 'Свободное письмо' : 'Практика'))}</b><span>${e.kind === 'writing' ? 'Сохранён текст · без оценки' : e.kind === 'claim' ? 'Все упражнения выполнены ранее' : `${e.partial ? 'Часть занятия · ' : ''}${e.answers} ${plural(e.answers, 'задание', 'задания', 'заданий')} · ${e.correct} верно`}</span></div>${Number.isFinite(e.ts) ? `<time datetime="${new Date(e.ts).toISOString()}">${new Date(e.ts).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</time>` : ''}</li>`).join('')}</ol>`
              : `<p class="history-empty">${day > today ? 'Занятие впереди. Первый ответ появится здесь.' : 'В этот день пока нет записанных занятий.'}</p>`}
          </section>
          <p class="history-note">История накапливается с этого обновления. Старые лучшие результаты сохранены в юнитах. Даты — по времени устройства.</p>
        </section>
        <aside class="calendar-aside" aria-label="Занятие и повторение">${todayPlan()}
          ${clubAwards()}
          <div class="week-topics"><span class="eyebrow">Для повторения · ${weekLabel(week)}</span><h3>Юниты этой недели</h3>
            ${units.length ? `<div class="review-units">${units.map((n) => `<a href="#/u/${n}"><small>${String(n).padStart(2, '0')}</small><span lang="en">${esc(D.units[n].title)}</span></a>`).join('')}</div><a class="btn" href="#/review/${week}">Повторить эти юниты ${icon('arrow')}</a>` : '<p>Здесь появятся юниты, по которым проверен хотя бы один ответ в будни.</p>'}
          </div>
        </aside>
      </div></div>`;
    app.insertAdjacentHTML('beforeend',learnUI.deskCard());
    const weekUnits=Study.weekUnits(activity,day);if(Study.isWeekend(day)&&weekUnits.length)app.insertAdjacentHTML('beforeend',`<section class="card weekend-context"><h2>Воскресенье · своя речь</h2><p>Возьми одну тему недели, прослушай реплики и перескажи ситуацию своими словами.</p>${weekUnits.map(n=>`<a class="btn small" href="#/u/${n}/context">Unit ${n} →</a>`).join('')}</section>`);
    wireTodayPlan();
  }
  function reviewPage(day) {
    const week = Study.weekStart(day), units = Study.weekUnits(activity, day);
    if(Weekly.weekStatus(weekly,week).pending){weeklyUI.page(week);return;}
    if (!units.length) {
      app.innerHTML = `<div class="page-narrow"><span class="eyebrow">Повторение / ${weekLabel(day)}</span><h1>Пока нечего повторять</h1><p class="page-intro">На этой неделе нет записанных подходов к юнитам в будни. Проверь хотя бы один ответ после книги — его тема войдёт в недельное повторение.</p><a class="btn primary" href="#/">Выбрать юнит ${icon('arrow')}</a><a class="btn ghost" href="#/calendar/${day}">К календарю</a></div>`;
      return;
    }
    // One form of each example; every studied unit is covered before filling the set.
    const pool = shuffle(units.flatMap((n) => {
      const u = D.units[n];
      return ['mc', 'fill', 'err', 'tr'].flatMap((t) => available(u, t) ? unitItems(u, t) : []);
    }));
    const priority = Review.due(mistakes, todayKey()).filter((r) => units.includes(r.u)).map(reviewItem).filter(Boolean);
    const items = Study.reviewSelection(priority.concat(pool));
    session({ title: `Повторение недели · ${weekLabel(day)}`, back: '#/calendar/' + day,
      items: shuffle(items), context: { kind: 'review', week } });
  }

  function bookCheckpoint(u) {
    const ready=bookReady(u.n);
    return `<section class="book-checkpoint${ready?' is-ready':''}" aria-label="Первый шаг: книга">
      <span class="book-emblem" aria-hidden="true">${icon(ready?'check':'book')}</span>
      <div class="book-copy"><span class="eyebrow">01 / Сначала книга</span><h2>${ready?'Книга пройдена. Можно практиковаться.':`Сначала пройди Unit ${u.n} в книге`}</h2><p id="book-status">${ready?'Отметка сохранена. Упражнения, экзамен и практика в контексте открыты.':'Прочитай правило и выполни задания у Мёрфи. Затем подтверди этот шаг — откроется практика.'}</p></div>
      <label class="book-confirm"><input type="checkbox" aria-label="Unit ${u.n} пройден в книге" aria-describedby="book-status"${ready?' checked':''}><span class="book-confirm-face"><span class="book-confirm-icon" aria-hidden="true">${icon(ready?'check':'book')}</span><span><b>${ready?'Пройдено в книге':'Книга пройдена — открыть практику'}</b><small>${ready?'Нажми, чтобы снять отметку':'Подтвердить первый шаг'}</small></span></span></label>
    </section>`;
  }
  function wireBookCheckpoint(u,onChange=()=>{route();const input=$('.book-confirm input');if(input)input.focus();}) {
    const input=$('.book-confirm input');if(!input)return;
    input.onchange=()=>{if(input.checked)book[u.n]=true;else delete book[u.n];Store.set('book',book);onChange();};
  }
  function requireBook(units,back='#/',resume=()=>go(back)) {
    const missing=[...new Set(units.filter(n=>D.units[n]&&!bookReady(n)))];
    if(!missing.length)return true;
    const first=D.units[missing[0]];
    keyHandler=null;
    app.innerHTML=`<div class="book-gate"><span class="eyebrow">Подготовка к практике</span><h1>Сначала отметь книгу</h1><p class="page-intro">Для этого занятия нужно подтвердить пройденные в книге юниты. Сохранённые ответы и результаты останутся на месте.</p>${bookCheckpoint(first)}${missing.length>1?`<p class="muted">Ещё ждут подтверждения: ${missing.slice(1).map(n=>`<a href="#/u/${n}">Unit ${n}</a>`).join(', ')}.</p>`:''}<a class="btn ghost" href="${esc(back)}">Вернуться без начала занятия</a></div>`;
    wireBookCheckpoint(first,()=>{if(requireBook(units,back,resume))resume();});
    return false;
  }
  function unitRow(u) {
    const state=unitCompletion(u),closed=Course.closedUnits(course,todayKey()).has(u.n),ready=bookReady(u.n);
    const status=closed?'Юнит закрыт':!ready?'Сначала книга':state.complete?(Exam.status(exams,u.n).passed?'Готов к зачёту':'Нужен экзамен'):state.done?'В процессе':'К практике';
    return `<a class="urow${closed?' is-closed':state.done?' is-started':''}" href="#/u/${u.n}">
      <span class="unum">${String(u.n).padStart(2,'0')}</span><span class="urow-copy"><span class="utitle" lang="en">${esc(u.title)}</span><span class="urow-detail">${closed?'Зачтён в курсе':state.done?`${state.done} / ${state.total} заданий выполнено`:ready?'Книга пройдена · упражнения открыты':'Практика откроется после книги'}</span></span>
      <span class="unit-state${closed?' is-closed':''}">${icon(closed?'check':ready?'book':'lock')}<span>${status}${!closed&&state.done?` · ${state.pct}%`:''}</span></span>${!closed&&state.done?bar(state.pct):''}</a>`;
  }

  function home() {
    ensureGoal();
    const last = D.units[Store.get('last', 0)];
    const current = last || D.list[0];
    const started = D.list.filter((u) => unitCompletion(u).done > 0).length;
    const inBook = D.list.filter((u) => bookReady(u.n)).length;
    let filter = Store.get('homeFilter', 'all') === 'book' ? 'book' : 'all';
    app.innerHTML = `
      <section class="hero" aria-labelledby="home-title">
        <div><span class="eyebrow">English Grammar in Use / личная практика</span>
          <h1 id="home-title">После книги —<br><em>практика.</em></h1>
          <p>Пройди юнит у Мёрфи, затем закрепи его здесь.<br>Выбери упражнение и возвращайся к сложным местам.</p></div>
        <div class="stats" aria-label="Твой прогресс">
          <div><b>${inBook}<span class="sr-only"> из ${D.list.length}</span></b><span>пройдено в книге</span></div>
          <div><b>${started}</b><span>${plural(started, 'юнит', 'юнита', 'юнитов')} в практике</span></div>
          <div><b>${activeMistakes().length}</b><span>${plural(activeMistakes().length, 'ошибка', 'ошибки', 'ошибок')} на повтор</span></div>
        </div>
      </section>
      ${dayCelebration()}
      ${clubBoard()}
      <section class="home-week" aria-label="Текущая неделя"><div class="week-heading"><h2>На этой неделе <span>${weekLabel(todayKey())}</span></h2><a href="#/calendar">Календарь ${icon('arrow')}</a></div>${weekGrid(todayKey())}</section>
      ${weeklyUI.banner()}
      <div class="study-layout">
        <section class="study-library" aria-labelledby="library-title">
          <div class="library-head"><h2 id="library-title">Оглавление</h2>
            <div class="filters" role="group" aria-label="Показать юниты">
              <button class="filter" type="button" data-filter="all">Все ${D.list.length}</button>
              <button class="filter" type="button" data-filter="book">Пройдено в книге · ${inBook}</button>
            </div>
          </div>
          <label class="search-label" for="unit-search">Найти юнит или тему</label>
          <div class="search-wrap">${icon('search')}<input id="unit-search" class="search" type="search" placeholder="Например, 12 или present perfect" autocomplete="off"></div>
          <p class="results-note" role="status" aria-live="polite"></p>
          <div class="sections"></div>
        </section>
        <aside class="study-aside" aria-label="Текущее занятие">
          ${todayPlan()}
          ${last ? `<a class="aside-link" href="#/u/${current.n}">${icon('book')}<span>Вернуться к Unit ${current.n}</span>${icon('arrow')}</a>` : ''}
          <p class="aside-note">Отмечай пройденные юниты на их страницах — так их будет проще повторять в миксе.</p>
          <a class="aside-link" href="#/mix">${icon('mix')}<span>Повторить пройденное</span>${icon('arrow')}</a>
          <a class="aside-link" href="#/mistakes">${icon('tr')}<span>Разобрать ошибки</span><small>${activeMistakes().length}</small></a>
        </aside>
      </div>`;
    const box = $('.sections'), search = $('.search'), note = $('.results-note');
    function drawSections() {
      const q = search.value.trim().toLowerCase();
      $$('.filter').forEach((b) => {
        const active = b.dataset.filter === filter;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      const matches = (u) => (!q || String(u.n) === q || u.title.toLowerCase().includes(q) || u.section.en.toLowerCase().includes(q) || u.section.ru.toLowerCase().includes(q)) && (filter !== 'book' || bookReady(u.n));
      const hits = D.list.filter(matches);
      note.textContent = q ? `Найдено юнитов: ${hits.length}` : filter === 'book' ? `Пройдено в книге: ${hits.length} из ${D.list.length}` : `${D.sections.length} разделов · ${D.list.length} юнитов`;
      if (!hits.length) {
        box.innerHTML = `<div class="empty"><h3>${q ? 'Ничего не найдено' : 'Пока нет отметок'}</h3><p>${q ? 'Попробуй номер юнита, английское название или другую тему.' : 'Открой пройденный юнит и поставь отметку «Пройдено в книге». Он появится здесь.'}</p></div>`;
        return;
      }
      if (q) { box.innerHTML = `<div class="ulist search-results">${hits.map(unitRow).join('')}</div>`; return; }
      box.innerHTML = D.sections.map((section, i) => {
        const units = section.units.filter(matches);
        if (!units.length) return '';
        const open = filter === 'book' || (last ? last.section === section : i === 0);
        const completion = Course.sectionProgress(course, todayKey(), section.units.map(u => u.n));
        return `<details class="sec${completion.done?' has-progress':''}${!completion.remaining?' is-complete':''}" style="--section-progress:${completion.pct}"${open ? ' open' : ''}>
          <summary><span class="sec-index">${String(i + 1).padStart(2, '0')}</span><span class="sec-t"><span lang="en">${esc(section.en)}</span><small>${esc(section.ru)} <span class="sec-range">· юниты ${String(section.units[0].n).padStart(2, '0')}–${String(section.units[section.units.length - 1].n).padStart(2, '0')}</span></small></span>
            <span class="sec-progress" aria-label="Закрыто ${completion.done} из ${completion.total} юнитов. Осталось ${completion.remaining}."><span class="sec-count"><b>${completion.done}</b><span>из ${completion.total}<small>юнитов закрыто</small></span></span><span class="sec-slots" aria-hidden="true">${section.units.map(item=>`<i class="${Course.closedUnits(course,todayKey()).has(item.n)?'is-filled':''}" title="Unit ${item.n}${Course.closedUnits(course,todayKey()).has(item.n)?' · закрыт':' · ещё не закрыт'}"></i>`).join('')}</span><small>${completion.remaining?`Осталось ${completion.remaining}`:'Раздел полностью закрыт ✓'}</small></span>${icon('chevron')}</summary>
          <div class="ulist">${units.map(unitRow).join('')}</div></details>`;
      }).join('');
    }
    search.oninput = drawSections;
    $$('.filter').forEach((b) => { b.onclick = () => { filter = b.dataset.filter; Store.set('homeFilter', filter); drawSections(); }; });
    drawSections();
    wireTodayPlan();
  }

  function unitPage(u) {
    prep(u);
    const goal = ensureGoal(), state = dayState(todayKey());
    Store.set('last', u.n);
    const prev = D.units[u.n - 1], next = D.units[u.n + 1];
    const groups = {};
    unitTypes(u).forEach((t) => (groups[TYPES[t].group] = groups[TYPES[t].group] || []).push(t));
    const completion = unitCompletion(u), claimed = Course.closedUnits(course, todayKey()).has(u.n), ready=bookReady(u.n);
    const closedDay=Object.entries(course.closed).find(([day,n])=>n===u.n&&day<=todayKey())?.[0];
    app.innerHTML = `
      <div class="crumbs"><a href="#/">Оглавление</a> / <span lang="en">${esc(u.section.en)}</span></div>
      ${course.closed[todayKey()]===u.n?dayCelebration():''}
      <div class="unit-heading"><span class="unit-number"><small>UNIT</small>${String(u.n).padStart(2, '0')}</span><h1 lang="en">${esc(u.title)}</h1></div>
      ${claimed?`<section class="unit-closed-banner" aria-label="Юнит закрыт"><span class="unit-closed-seal" aria-hidden="true">${icon('check')}</span><div><span class="eyebrow">The Study Club / Completed</span><h2>Unit ${u.n} закрыт</h2><p>Зачтён ${dateLabel(closedDay,{day:'numeric',month:'long'})}. Можно возвращаться к упражнениям для повторения.</p></div></section>`:''}
      ${bookCheckpoint(u)}
      <div class="unit-layout">
        <aside class="unit-annotation" aria-label="Правило и отметка книги">
          ${u.tip ? `<div class="tip"><span class="eyebrow">Коротко о правиле</span>${esc(u.tip)}</div>` : ''}
        </aside>
        <section class="unit-practice${ready?'':' is-locked'}" aria-labelledby="practice-title">
          <div class="practice-head"><h2 id="practice-title">Закрепить тему</h2><span class="unit-completion">${completion.pct}% выполнено <small>${completion.done} / ${completion.total} заданий</small></span></div>
          <p class="completion-help">Выполнение сохраняется после каждого ответа. Правильность показывается отдельно.</p>
          ${!ready?`<div class="practice-lock-note">${icon('lock')}<div><b>Практика пока закрыта</b><p>Подтверди первый шаг в карточке книги выше. После этого можно начинать с любого упражнения.</p></div></div>`:goal && goal.unit === u.n ? `<section class="unit-goal" aria-label="Дневной набор"><div class="goal-heading"><b>${state.done ? 'День закрыт' : `Упражнения · ${state.completed.length} / ${goal.required.length}`}</b><a href="#/calendar">Дневник →</a></div>${goalList(goal, state)}${completion.complete && Exam.status(exams, u.n).passed && !state.done && !claimed ? '<button class="btn primary small claim-unit" type="button">Закрыть юнит сегодня</button>' : ''}</section>` : `<div class="unit-goal-note"><span>${claimed ? 'Юнит уже закрыт. Можно повторять.' : course.closed[todayKey()] ? `Сегодня закрыт Unit ${course.closed[todayKey()]}. Здесь — свободная практика.` : goal ? `Свободная практика. Цель на сегодня — Unit ${goal.unit}.` : 'Свободная практика выходного. Все ответы сохраняются.'}</span>${goal && !state.done && !claimed ? '<button class="btn small make-today-unit" type="button">Выбрать на сегодня</button>' : ''}</div>`}
          ${Object.keys(GROUPS).filter((g) => groups[g]).map((g) => `
            <h3 class="grp">${GROUPS[g]}</h3>
            <div class="grid">${groups[g].map((t) => {
              const p = getProg(u.n, t), n = available(u, t), s = modeStatus(u, t);
              return `<${ready?'a':'article'} class="excard${ready?'':' is-locked'}"${ready?` href="#/u/${u.n}/${t}"`:''}>
                <span class="ico">${icon(TYPES[t].icon)}</span><span class="nm">${TYPES[t].name}</span>
                <span class="ds">${TYPES[t].desc}${t === 'write' ? '' : ` · ${n} ${plural(n, 'задание', 'задания', 'заданий')}`}</span>
                <span class="sc ${s.complete ? 'hi' : ''}" title="Процент выполнения">${s.complete ? '✓ ' : ''}${s.pct}%</span>
                <span class="exercise-progress"><b>${s.done} / ${s.total} выполнено</b><span>${!ready?'После книги':s.complete ? 'Повторить' : s.done ? 'Продолжить' : 'Начать'}</span></span>
                <span class="exercise-meter" aria-hidden="true"><i style="width:${s.pct}%"></i></span>
                ${p && t !== 'write' ? `<span class="exercise-accuracy">Лучший результат: ${p.best}%</span>` : ''}
                ${icon(ready?'arrow':'lock').replace('class="icon"', 'class="icon ex-arrow"')}
              </${ready?'a':'article'}>`;
            }).join('')}</div>`).join('')}
          ${examCard(u)}
          ${ready?learnUI.unitCard(u.n):'<section class="card context-unit-card is-locked"><span class="eyebrow">Своя речь</span><h3>Применить тему в контексте</h3><p>Чтение, аудирование и письмо откроются после отметки книги.</p></section>'}
        </section>
      </div>
      <div class="unav">
        ${prev ? `<a class="btn ghost" href="#/u/${prev.n}">← Unit ${prev.n}</a>` : '<span></span>'}
        ${next ? `<a class="btn ghost" href="#/u/${next.n}">Unit ${next.n} →</a>` : ''}
      </div>`;
    wireBookCheckpoint(u);
    const makeToday = $('.make-today-unit');
    if (makeToday) makeToday.onclick = () => {
      club.goals[todayKey()] = { unit: u.n, required: unitTypes(u) };
      dailyPlan[todayKey()] = u.n;
      Store.set('dailyPlan', dailyPlan); saveClub(); route();
    };
  }

  // ---------- итоговая проверка ----------
  function usedForms(n) {
    const row=exams.units[n]||{history:[]},log=learning.forms[n]||[];
    const used=log.map(r=>r.v).concat(row.history.concat(row.draft?[row.draft]:[]).filter(a=>!log.some(r=>r.event===a.id)).map(a=>a.items[0].ref.v).filter(Boolean));
    if(!used.length)return [...new Set(learning.seen.filter(k=>k.startsWith(n+':transfer:')).map(k=>k.split(':')[2]))];
    return used;
  }
  function nextBank(n) { return Learning.nextForm(usedForms(n)); }
  function transferItem(it) { const q=Learning.question(it.ref);return q?{t:it.t,ref:{...it.ref},data:{...q.data,meaning:q.note.translation}}:null; }
  function transferPool(n,v) {
    const pool=[];
    for(let i=0;i<8;i++)for(const t of ['mc','fill','order','lgap','dict']){
      const item=transferItem({t,ref:{u:n,b:'transfer',v,k:'gap',i}});
      if(t!=='order'||item.data.full.split(' ').length<=14)pool.push(item);
    }
    for(const [k,count] of [['err',3],['tr',2]])for(let i=0;i<count;i++)pool.push(transferItem({t:k,ref:{u:n,b:'transfer',v,k,i}}));
    return pool;
  }
  function examItems(u) { return shuffle(Exam.select(transferPool(u.n,nextBank(u.n).form))); }
  function restoreExamItem(it) { return it.ref.b?transferItem(it):makeItem(it.t, D.units[it.ref.u], it.ref.k, it.ref.i); }
  function runTopics() {
    let draft=learning.sessions.topics;
    if(draft&&draft.items.some(it=>!Weekly.canStart(weekly,course,todayKey(),it.ref.u)))return weeklyUI.blockedPage();
    if(draft&&!requireBook(draft.items.map(it=>it.ref.u),'#/retention',runTopics))return;
    if(!draft){
      const due=Learning.dueTopics(learning,todayKey()).filter(r=>Weekly.canStart(weekly,course,todayKey(),r.unit)).slice(0,3);if(!due.length)return Weekly.status(weekly,todayKey()).blocked?weeklyUI.blockedPage():go('#/retention');
      if(!requireBook(due.map(r=>r.unit),'#/retention',runTopics))return;
      const items=shuffle(due.flatMap(r=>shuffle(Exam.select(transferPool(r.unit,nextBank(r.unit).form))).slice(0,6)));
      learning=Learning.startSession(learning,'topics',items,Date.now()+'-topics',todayKey());saveLearning();draft=learning.sessions.topics;
      due.forEach(r=>{const it=draft.items.find(it=>it.ref.u===r.unit);learning=Learning.useForm(learning,r.unit,it.ref.v,draft.id);});saveLearning();
    }
    const sessionId=draft.id;
    session({title:'Повторение тем · без подсказок',back:'#/retention',items:draft.items.map(restoreExamItem),context:{kind:'practice',learningSession:'topics'},onDone:(pct,results)=>{
      for(const n of [...new Set(results.map(r=>r.item.ref.u))]){
        const rows=results.filter(r=>r.item.ref.u===n);learning=Learning.reviewTopic(learning,n,rows.filter(r=>r.ok).length>=5,todayKey(),sessionId);
        learning=Learning.recordApplication(learning,n,rows.map(r=>({key:Learning.key(r.item.ref),ok:r.ok})));
      }
      learning=Learning.finishSession(learning,'topics');saveLearning();
    }});
  }
  function answerNote(it,r) {
    if(!r)return null;
    if(it.ref && it.ref.b) { const q=Learning.question(it.ref);return q?{translation:q.note.translation,explanation:q.note.why}:null; }
    return Notes.forResult(it,r);
  }
  function correctText(it) { return it.ref.k === 'gap' ? it.data.full : it.data.a[0]; }
  function examCard(u) {
    const ready = bookReady(u.n)&&unitCompletion(u).complete, status = Exam.status(exams,u.n);
    return `<section class="exam-card ${ready ? 'is-ready' : ''}" aria-label="Итоговый экзамен">
      <div class="exam-seal" aria-hidden="true" lang="en">Study<br>Club<span>${status.passed ? '✓' : 'E'}</span></div>
      <div><span class="eyebrow" lang="en">Unit ${u.n} / Final examination</span><h3>${status.passed ? 'Экзамен сдан' : 'Итоговый экзамен'}</h3>
        <p>${ready ? '13 разных примеров · смешанные форматы · от 80% для сдачи. Разбор после последнего ответа.' : bookReady(u.n)?'Откроется после всех упражнений юнита. Сдача экзамена закрывает выбранный юнит и будний день.':'Сначала подтверди книгу, затем выполни упражнения. После этого откроется итоговая проверка.'}</p>
        ${status.best !== null ? `<p class="exam-best">Лучший результат: ${status.best}% · попыток ${status.attempts}</p>` : ''}
        ${ready ? `<a class="btn primary small" href="#/u/${u.n}/exam">${status.draft ? `Продолжить · ${status.answered}/13` : status.last ? 'Результат и пересдача' : 'Открыть экзамен'} ${icon('arrow')}</a>` : `<span class="muted small">Упражнения: ${unitCompletion(u).done} / ${unitCompletion(u).total}</span>`}
      </div></section>`;
  }
  function finalizeExam(u) {
    const draft = Exam.status(exams,u.n).draft;
    if (draft && Object.keys(draft.answers).length === 13) {
      exams = Exam.finish(exams,u.n,todayKey()); saveExams();
    }
    const attempt = Exam.status(exams,u.n).last;
    if (!attempt || attempt.day !== todayKey()) return;
    learning=Learning.recordApplication(learning,u.n,attempt.items.filter(it=>it.ref.b).map(it=>({key:Learning.key(it.ref),ok:attempt.answers[Exam.key(it)].ok}))); saveLearning();
    if (activity.some(e => e.session === attempt.id && e.kind === 'exam')) {
      if (Object.values(attempt.answers).filter(r => r.ok).length / 13 >= 0.8) closeGoal(u.n);
      return;
    }
    const results = attempt.items.map(d => ({...attempt.answers[Exam.key(d)],item:restoreExamItem(d)}));
    // Recover an interrupted final save, using stable IDs for the attempt and errors.
    results.forEach(r => trackMistake(r.item,r,attempt.id + ':' + Exam.key(r.item),attempt.day));
    recordActivity({kind:'exam',unit:u.n,passed:results.filter(r=>r.ok).length/13>=0.8,session:attempt.id,title:`Unit ${u.n} · Экзамен`},results);
    updateNav();
  }
  function examPage(u) {
    prep(u);
    if (!unitCompletion(u).complete) {
      app.innerHTML = `<div class="page-narrow"><div class="crumbs"><a href="#/u/${u.n}">Unit ${u.n}</a> / Экзамен</div><h1>Сначала — упражнения</h1>${examCard(u)}<a class="btn" href="#/u/${u.n}">Продолжить юнит →</a></div>`;
      return;
    }
    finalizeExam(u);
    const status = Exam.status(exams,u.n);
    app.innerHTML = `<div class="page-narrow exam-page"><div class="crumbs"><a href="#/u/${u.n}">Unit ${u.n}</a> / Экзамен</div>
      <span class="eyebrow" lang="en">The Study Club / Examination room</span><h1>Экзамен по Unit ${u.n}</h1><p class="page-intro" lang="en">${esc(u.title)}</p>
      ${!status.draft?`<p class="exam-bank-note">Следующая попытка: вариант ${nextBank(u.n).form} · ${nextBank(u.n).fresh?'отдельные примеры, которые здесь ещё не проверялись':'повторение знакомого набора; оба варианта уже использовались'}.</p>`:''}
      ${status.draft ? `<div class="card exam-intro"><h2>Продолжим с оставшегося</h2><p>Сохранено ${status.answered} из 13 ответов. Порядок и ответы этой попытки сохранятся.</p><button class="btn primary start-exam" type="button">Продолжить экзамен</button></div>` : status.last ? examResult(u,status.last) : `<div class="card exam-intro"><h2>Проверить себя без подсказок</h2><p>13 разных примеров: выбор, форма, порядок слов, исправление, перефразирование и аудирование. Для сдачи нужно не меньше 11 верных ответов.</p><p>Ответы сохраняются по одному. Полный разбор и оценка появятся в конце; исправить ответ в этой попытке нельзя. В аудировании можно слушать повторно.</p><button class="btn primary start-exam" type="button">Начать экзамен</button></div>`}
    </div>`;
    if(status.last&&!status.draft)$$('[data-exam-appeal]').forEach(el=>{
      const descriptor=status.last.items[+el.dataset.examAppeal],item=restoreExamItem(descriptor),answer=status.last.answers[Exam.key(descriptor)];
      attachAnswerDispute(el,item,answer.user,()=>{
        const next=Exam.accept(exams,u.n,status.last.id,Exam.key(descriptor),answer.user);if(next===exams)return false;
        exams=next;saveExams();undoMistake(item,status.last.id+':'+Exam.key(descriptor));
        const attempt=exams.units[u.n].history.find(a=>a.id===status.last.id),count=Object.values(attempt.answers).filter(a=>a.ok).length;
        activity.forEach(e=>{if(e.kind==='exam'&&e.session===attempt.id)e.correct=count;});Store.set('activity',activity);
        examPage(u);wireClaim();updateNav();toast('Ответ зачтён. Результат этой попытки пересчитан.');
      });
    });
    const start = $('.start-exam');
    if(start)start.onclick=()=>{if(!Weekly.canStart(weekly,course,todayKey(),u.n))return weeklyUI.blockedPage();if(!Exam.status(exams,u.n).draft){exams=Exam.start(exams,u.n,examItems(u),'exam-'+Date.now()+'-'+Math.random().toString(36).slice(2),todayKey());saveExams();const a=Exam.status(exams,u.n).draft;if(a&&a.items[0].ref.b){learning=Learning.useForm(learning,u.n,a.items[0].ref.v,a.id);saveLearning();}}examRun(u);};
  }
  function examResult(u,attempt) {
    const results=attempt.items.map(d=>({...attempt.answers[Exam.key(d)],item:restoreExamItem(d)}));
    const correct=results.filter(r=>r.ok).length, passed=correct/13>=0.8;
    const breakdown={};results.forEach(r=>{const b=breakdown[r.item.t]||(breakdown[r.item.t]={correct:0,total:0});b.total++;if(r.ok)b.correct++;});
    const goal=ensureGoal(), claimed=Course.closedUnits(course,todayKey()).has(u.n);
    const claimable=goal&&goal.unit===u.n&&!dayState(todayKey()).done&&!claimed&&Exam.canClose(exams,u.n,true);
    return `${course.closed[todayKey()]===u.n?dayCelebration():''}<section class="card exam-result"><span class="eyebrow" lang="en">${passed?'Pass':'Try again'}</span><div class="exam-score"><b>${Math.round(correct/13*100)}%</b><span>${correct} / 13 верно</span></div>
      <h2>${passed?'Экзамен сдан':'Пока не сдан'}</h2><p>${passed ? claimed ? 'Юнит закрыт. Можно продолжать закрепление и возвращаться к сложным местам.' : 'Проверка пройдена. Закрыть этот юнит можно, выбрав его целью свободного буднего дня.' : 'Нужно минимум 11 верных ответов. Разбери сложные места, потренируйся и попробуй ещё раз.'}</p>
      <div class="exam-breakdown">${Object.entries(breakdown).map(([t,b])=>`<div><span>${TYPES[t].name}</span><b>${b.correct}/${b.total}</b></div>`).join('')}</div>
      <div class="actions">${claimable?'<button class="btn primary claim-unit" type="button">Закрыть юнит сегодня</button>':''}<button class="btn ${passed?'':'primary'} start-exam" type="button">${passed?'Пересдать для себя':'Новая попытка'}</button><a class="btn ghost" href="#/mistakes">Закрепить ошибки</a></div>
      ${course.closed[todayKey()]===u.n?`<p class="exam-day-complete">${icon('check')} День закрыт · ранг <span lang="en">${Course.rank(course,todayKey()).current.en}</span><a href="#/calendar">Дневник →</a></p>`:''}
    </section><h2>Разбор всех ответов</h2><p class="muted small">Ошибки сохранены в журнале. Первое повторение — через день, затем через 3 и 7 дней.</p>
      <div class="exam-analysis">${results.map((r,i)=>`<details class="exam-answer ${r.ok?'is-correct':'is-wrong'}"${!r.ok?' open':''}><summary><span>${i+1}. ${TYPES[r.item.t].name}</span><b>${r.correction==='spelling'?'Вариант написания принят':r.accepted?'Зачтено после разбора':r.ok?'Верно':'Разобрать'}</b></summary><p class="exam-user">Твой ответ: <span lang="en">${esc(r.user || '∅')}</span></p><p class="answer" lang="en">${esc(correctText(r.item))}</p>${Notes.render(answerNote(r.item,r))}${!r.ok?`<div data-exam-appeal="${i}"></div>`:''}</details>`).join('')}</div>`;
  }
  function examRun(u) {
    const draft=Exam.status(exams,u.n).draft;
    if(!draft)return examPage(u);
    const pending=draft.items.filter(it=>!draft.answers[Exam.key(it)]);
    let pos=0,answered=false,ctl={};
    app.innerHTML=`<div class="session exam-session"><div class="sess-top"><button class="btn ghost quit" aria-label="Выйти из экзамена" type="button">${icon('close')}</button><div class="bar" role="progressbar" aria-label="Выполнение экзамена" aria-valuemin="0" aria-valuemax="13"><i></i></div><span class="count" aria-live="polite"></span></div>
      <h1 class="sess-title">Unit ${u.n} · Экзамен</h1><p class="session-note">${draft.items[0].ref.b?'Вариант '+draft.items[0].ref.v+' · отдельный банк примеров.':'Сохранённая попытка из прежнего банка.'} Ответы сохраняются. Оценка и разбор — в конце.</p><div class="card ex"><div class="area"></div><div class="fb" role="status" aria-live="polite"></div><div class="actions"><button class="btn primary main" type="button"></button></div></div></div>`;
    const area=$('.area'),fb=$('.fb'),btn=$('.main');
    $('.quit').onclick=()=>go('#/u/'+u.n+'/exam');
    const initial=Object.keys(draft.answers).length;
    function draw(done){$('.count').textContent=`${done} / 13 · ${Math.round(done/13*100)}%` ;$('.bar i').style.width=done/13*100+'%';$('.bar').setAttribute('aria-valuenow',done);}
    function show(){
      if(!pending[pos])return examPage(u);
      answered=false;fb.innerHTML='';fb.className='fb';draw(initial+pos);
      const item=restoreExamItem(pending[pos]);ctl=R[item.t](area,{...item.data,exam:true},finish)||{};
      if(item.ref.b&&['mc','fill','order','err'].includes(item.t))area.insertAdjacentHTML('afterbegin',`<p class="muted small">Сохрани смысл и заданные слова: ${esc(item.data.meaning)}</p>`);
      btn.style.display=ctl.check?'':'none';btn.textContent='Сохранить ответ';btn.onclick=()=>ctl.check&&ctl.check();
      const input=$('input,textarea',area);if(input&&!matchMedia('(pointer: coarse)').matches)input.focus();
    }
    function finish(result){
      if(answered)return;answered=true;
      exams=Exam.answer(exams,u.n,Exam.key(pending[pos]),result);saveExams();draw(initial+pos+1);
      if(pos+1===pending.length)finalizeExam(u);
      fb.className='fb exam-saved';fb.innerHTML='<p>Ответ сохранён. Проверим в конце экзамена.</p>';
      btn.style.display='';btn.textContent=pos+1<pending.length?'Далее →':'Результат экзамена';btn.onclick=()=>{pos++;if(pos<pending.length)show();else{keyHandler=null;examPage(u);wireClaim();}};btn.focus();
    }
    keyHandler=e=>{const tag=e.target.tagName;if(e.key==='Enter'&&!e.shiftKey&&tag!=='BUTTON'&&tag!=='A'&&btn.style.display!=='none'){e.preventDefault();btn.click();}else if(!answered&&ctl.keys&&/^[1-9]$/.test(e.key)&&tag!=='INPUT'&&tag!=='TEXTAREA')ctl.keys(+e.key);};
    show();
  }
  function wireClaim() {
    const claim=$('.claim-unit');
    if(claim)claim.onclick=()=>{const goal=ensureGoal();if(!goal || !Exam.canClose(exams,goal.unit,unitCompletion(D.units[goal.unit]).complete))return;
      if(!requireBook([goal.unit],location.hash,()=>{route();}))return;
      const reward=recordActivity({kind:'claim',unit:goal.unit,title:`Unit ${goal.unit} · Закрытие юнита`});
      toast(reward.rank?`Юнит закрыт · новый ранг ${reward.rank.en}`:`Юнит закрыт · +${reward.xp} XP`);route();};
  }

  function startUnit(u, t) {
    if(!bookReady(u.n))return unitPage(u);
    if(!Weekly.canStart(weekly,course,todayKey(),u.n))return weeklyUI.blockedPage();
    if (!TYPES[t] || !available(u, t)) return go('#/u/' + u.n);
    ensureGoal();
    Store.set('last', u.n);
    if (t === 'write') return writePage(u);
    session({
      title: `Unit ${u.n} · ${TYPES[t].name}`,
      back: '#/u/' + u.n,
      items: unitItems(u, t),
      onDone: (pct) => saveProg(u.n, t, pct),
      context: { kind: 'unit', unit: u.n, mode: t },
    });
  }

  function writePage(u) {
    const [task, model] = u.w;
    const key = 'write:' + u.n;
    app.innerHTML = `<div class="page-narrow">
      <div class="crumbs"><a href="#/">Темы</a> › <a href="#/u/${u.n}">Unit ${u.n}</a></div>
      <span class="eyebrow">Unit ${u.n} / письмо</span><h1>Свободное письмо</h1>
      <div class="card">
        <p class="task">${esc(task)}</p>
        ${u.tip ? `<p class="muted small">Правило: ${esc(u.tip)}</p>` : ''}
        <textarea class="essay" aria-label="Текст на английском" rows="9" spellcheck="true" lang="en" placeholder="Write here…"></textarea>
        <div class="wbar"><span class="wc"></span>
          <button class="btn small listen-me" type="button">${icon('volume')} Прочитать мой текст</button>
          <button class="btn small show-model" type="button">Показать пример</button>
        </div>
        <div class="model" hidden><b>Пример:</b> <span lang="en">${esc(model || '')}</span>
          ${Notes.render(Notes.forResult({ref:{u:u.n,k:'write',i:0},data:{full:model}}, {ok:true}))}
          <div><button class="btn small say-model" type="button">${icon('volume')} Послушать пример</button></div></div>
        <details class="check"><summary>Проверь себя</summary><ul>
          <li>В каждом предложении есть подлежащее и сказуемое?</li>
          <li>Ты использовал(а) грамматику этого юнита хотя бы 3–4 раза?</li>
          <li>Формы глаголов согласованы со временем (вчера → past, сейчас → present…)?</li>
          <li>Прослушай свой текст — где звучит странно, там часто ошибка.</li>
        </ul></details>
        <div class="actions"><button class="btn primary done" type="button">Готово</button>
          <a class="btn ghost" href="#/u/${u.n}">Назад</a></div>
      </div></div>`;
    const ta = $('.essay');
    ta.value = Store.get(key, '');
    learnUI.writingTools(u.n,$('.card'),ta);
    const wc = () => ($('.wc').textContent = `слов: ${(ta.value.match(/[A-Za-z']+/g) || []).length}`);
    wc();
    ta.oninput = () => { Store.set(key, ta.value); wc(); };
    $('.listen-me').onclick = () => ta.value.trim() ? speak(ta.value) : toast('Сначала напишите текст');
    $('.show-model').onclick = () => { $('.model').hidden = false; };
    $('.say-model').onclick = () => speak(model);
    $('.done').onclick = () => {
      if ((ta.value.match(/[A-Za-z']+/g) || []).length < 15) { toast('Напишите хотя бы 15 слов'); return; }
      saveProg(u.n, 'write', 100);
      const reward = recordActivity({ kind: 'writing', unit: u.n, mode: 'write', title: `Unit ${u.n} · Свободное письмо` });
      toast(reward.rank ? `Юнит ${u.n} закрыт · ${reward.rank.en} · +${reward.xp} XP` : reward.closed ? `День закрыт · +${reward.xp} XP` : reward.xp ? `Текст сохранён · +${reward.xp} XP` : 'Текст сохранён');
      go('#/u/' + u.n);
    };
  }

  function mixPage() {
    const bookUnits = D.list.filter((u) => bookReady(u.n));
    const mixTypes = ['mc', 'fill', 'order', 'err', 'tr', 'lgap', 'dict', 'speak'];
    const sel = Store.get('mixTypes', ['mc', 'fill']);
    app.innerHTML = `<div class="page-narrow">
      <span class="eyebrow">Повторение / практика</span><h1>Смешанная практика</h1>
      <p class="page-intro">Случайные задания из выбранных тем — хороший способ повторения.</p>
      ${weeklyUI.banner()}
      ${Weekly.status(weekly,todayKey()).blocked?'<p class="muted small">В миксе доступны только закрытые юниты, пока не завершена работа над ошибками.</p>':''}
      <div class="card form">
        <p class="mix-book-note">${icon('book')} Доступно после книги: <b>${bookUnits.length} ${plural(bookUnits.length,'юнит','юнита','юнитов')}</b>. <a href="#/">Отметить пройденные →</a></p>
        <h2>Разделы <button class="btn link small all" type="button">все</button> <button class="btn link small none" type="button">ни одного</button></h2>
        <div class="checks secs">${D.sections.map((s, i) => `<label><input type="checkbox" value="${i}" checked> ${esc(s.en)}</label>`).join('')}</div>
        <h2>Типы заданий</h2>
        <div class="checks types">${mixTypes.map((t) => `<label><input type="checkbox" value="${t}"${sel.includes(t) ? ' checked' : ''}> ${icon(TYPES[t].icon)} ${TYPES[t].name}</label>`).join('')}</div>
        <label class="row">Количество заданий: <input type="number" class="cnt" min="5" max="60" value="${settings.mixCount}"></label>
        <div class="actions"><button class="btn primary start" type="button">Начать</button></div>
      </div></div>`;
    $('.all').onclick = () => $$('.secs input').forEach((c) => (c.checked = true));
    $('.none').onclick = () => $$('.secs input').forEach((c) => (c.checked = false));
    $('.start').onclick = () => {
      const secs = $$('.secs input:checked').map((c) => D.sections[+c.value]);
      const types = $$('.types input:checked').map((c) => c.value);
      const cnt = Math.min(60, Math.max(5, +$('.cnt').value || 15));
      settings.mixCount = cnt;
      saveSettings();
      Store.set('mixTypes', types);
      let units = [].concat(...secs.map((s) => s.units));
      units = units.filter((u) => bookReady(u.n));
      units=units.filter(u=>Weekly.canStart(weekly,course,todayKey(),u.n));
      if(!units.length&&secs.length&&Weekly.status(weekly,todayKey()).blocked){toast('В выбранных темах нет закрытых юнитов. Сначала заверши ошибки недели.');return;}
      if(!secs.length||!types.length){toast('Выбери хотя бы один раздел и тип задания.');return;}
      if(!units.length){toast('В выбранных разделах нет отметок книги. Сначала подтверди пройденные юниты.');return;}
      const pool = [];
      units.forEach((u) => types.forEach((t) => { if (available(u, t)) pool.push([u, t]); }));
      if (!pool.length) { toast('Нет подходящих заданий'); return; }
      const items = [];
      for (let k = 0; k < cnt; k++) {
        const [u, t] = pool[Math.floor(Math.random() * pool.length)];
        const list = unitItems(u, t);
        if (list.length) items.push(list[0]);
      }
      session({ title: 'Смешанная практика', back: '#/mix', items });
    };
  }

  function reviewItem(r) {
    const u = D.units[r.u];
    if (!u) return null;
    if(r.b){let t=r.k==='gap'?['fill','order','dict'][r.stage%3]:r.k;let it=transferItem({t,ref:r});if(t==='order'&&it.data.full.split(' ').length>14)it.t='fill';it.data.review=true;return it;}
    prep(u);
    const modes = ['fill', 'order', 'dict'];
    let t = r.k === 'gap' ? modes[r.stage % modes.length] : r.k;
    if (t === 'order' && !u.orderIdx.includes(r.i)) t = 'fill';
    const it = makeItem(t, u, r.k, r.i);
    if (it.data) it.data = { ...it.data, review: true };
    return it.data ? it : null;
  }
  const errorCategories={review:'Нужен разбор',grammar:'Грамматическая форма',meaning:'Смысл и выбор конструкции',spelling:'Написание',order:'Порядок слов',listening:'Понимание на слух'};
  function mistakesPage() {
    const stats = Review.summary(mistakes, todayKey());
    const due = Review.due(mistakes, todayKey());
    const active = activeMistakes().sort((a,b) => a.due.localeCompare(b.due) || b.lapses - a.lapses);
    const rows = (list) => list.map((r) => {
      const item = reviewItem(r), note = item && answerNote(item, { ok: false });
      const full = item && (item.data.full || item.data.q);
      return `<article class="error-entry"><div class="error-entry-top"><a href="#/u/${r.u}">Unit ${r.u} · ${esc(D.units[r.u].title)}</a><span>${r.stage === 3 ? 'Закреплено' : r.due <= todayKey() ? 'Пора повторить' : dateLabel(r.due)}</span></div>
        <p lang="en">${esc(full || '')}</p>${r.lastAnswer||TYPES[r.lastMode] ? `<p class="muted small">Последняя ошибка: <span lang="en">${esc(r.lastAnswer||'∅')}</span> · ${esc(TYPES[r.lastMode] ? TYPES[r.lastMode].name : 'практика')}</p>` : ''}
        <div class="error-entry-bottom"><span>Закрепление ${r.stage} / 3</span><span>Ошибок: ${r.lapses}</span></div><label class="error-category">Причина (твоя оценка) <select data-error-key="${esc(mkey(r))}" aria-label="Причина ошибки в Unit ${r.u}">${Object.entries(errorCategories).map(([k,label])=>`<option value="${k}"${r.category===k?' selected':''}>${esc(label)}</option>`).join('')}</select></label>
        ${note ? `<details class="error-rule"><summary>Вспомнить перевод и правило</summary>${Notes.render(note)}</details>` : ''}${r.stage<3&&TYPES[r.lastMode]?`<div data-journal-appeal="${esc(mkey(r))}"></div>`:''}</article>`;
    }).join('');
    app.innerHTML = `<div class="page-narrow review-page">
      <span class="eyebrow" lang="en">The Study Club / Revision desk</span><h1>Работа над ошибками</h1>
      <p class="page-intro">Вернуться к правилу, вспомнить без подсказки, проверить через время.</p>
      ${weeklyUI.banner()}
      <a class="btn small" href="#/weekly">Недельная работа над ошибками →</a>
      ${learnUI.deskCard()}
      <div class="review-stats"><div><b>${stats.due}</b><span>на сегодня</span></div><div><b>${stats.active}</b><span>закрепляем</span></div><div><b>${stats.mastered}</b><span>закреплено</span></div></div>
      <div class="card review-plan"><h2>${stats.due ? 'Пора вспомнить' : stats.active ? 'Повторения запланированы' : stats.mastered ? 'Сложные места закреплены' : 'Пока без ошибок'}</h2>
        <p>После ошибки — проверка через день, затем через 3 и 7 дней. Три верных ответа с интервалами закрепляют пример. Новая ошибка возвращает его в начало.</p>
        ${due.length ? `<button class="btn primary start-due" type="button">Повторить на сегодня · ${Math.min(20,due.length)}</button>` : active.length ? `<p class="muted">Ближайшее повторение — ${dateLabel(active[0].due)}. Можно потренироваться раньше; интервал сохранится.</p>` : '<a class="btn" href="#/">Выбрать юнит →</a>'}
        ${active.length ? '<button class="btn ghost start-early" type="button">Свободная практика ошибок</button>' : ''}
      </div>
      ${active.length ? `<h2>В работе · ${active.length}</h2><div class="error-list">${rows(active)}</div>` : ''}
      ${stats.mastered ? `<details class="mastered-errors"><summary>Закреплённые примеры · ${stats.mastered}</summary>${rows(mistakes.filter(r=>r.stage===3))}</details>` : ''}
    </div>`;
    $$('[data-error-key]').forEach(el=>el.onchange=()=>{mistakes=mistakes.map(r=>mkey(r)===el.dataset.errorKey?{...r,category:el.value}:r);Store.set('mistakes',mistakes);});
    $$('[data-journal-appeal]').forEach(el=>{
      const row=mistakes.find(r=>mkey(r)===el.dataset.journalAppeal);let item=null;
      if(row&&TYPES[row.lastMode]){const u=D.units[row.u];prep(u);item=row.b?transferItem({t:row.lastMode,ref:row}):makeItem(row.lastMode,u,row.k,row.i);}
      if(!item)return;
      attachAnswerDispute(el,item,row.lastAnswer,()=>{
        const state={mistakes,steps,exams,activity},next=Disputes.resolve(state,row);if(next===state)return false;
        mistakes=next.mistakes;steps=next.steps;exams=next.exams;activity.splice(0,activity.length,...next.activity);
        weekly=Weekly.cancel(weekly,row,row.lapses===1&&row.createdEvent?row.createdEvent:row.lastEvent);saveWeekly();
        Store.set('mistakes',mistakes);Store.set('steps',steps);saveExams();Store.set('activity',activity);
        if(!row.b&&getProg(row.u,row.lastMode)&&modeStatus(D.units[row.u],row.lastMode).complete){const answers=Object.values(steps[row.u+':'+row.lastMode]?.answers||{});if(answers.length)saveProg(row.u,row.lastMode,Math.round(answers.reduce((s,a)=>s+a.score,0)/answers.length*100));}
        mistakesPage();updateNav();toast('Ложная ошибка отменена. Предыдущие повторения сохранены.');
      });
    });
    function run(list) { session({title:'Закрепление ошибок',back:'#/mistakes',items:list.slice(0,20).map(reviewItem).filter(Boolean)}); }
    const start = $('.start-due'); if(start)start.onclick = () => run(due);
    const early = $('.start-early'); if(early)early.onclick = () => run(active);
  }

  function labPage() {
    const L = D.lab;
    app.innerHTML = `
      <span class="eyebrow">Аудирование / произношение</span><h1>Звуки и произношение</h1>
      <p class="page-intro">Темы произношения, которые чаще всего связаны с грамматикой: окончания, сокращения, слабые формы.</p>
      <div class="grid">${Object.keys(L).map((k) => {
        const p = getProg('lab', k);
        return `<a class="excard" href="#/pron/${k}"><span class="ico">${icon(k === 'grammar' ? 'speak' : 'dict')}</span><span class="nm">${esc(L[k].title)}</span><span class="ds">${esc(L[k].short)}</span>${p ? `<span class="sc ${p.best >= 80 ? 'hi' : ''}">${p.best}%</span>` : ''}</a>`;
      }).join('')}</div>
      ${Object.keys(L).map((k) => `<div class="tip card"><b>${esc(L[k].title)}.</b> ${esc(L[k].tip)}</div>`).join('')}
      ${SR ? '' : '<p class="card muted">Ваш браузер не поддерживает распознавание речи — в заданиях «Произнеси» будет запись голоса для самопроверки. Для автоматической проверки откройте сайт в Chrome.</p>'}`;
  }

  function labRun(k) {
    const L = D.lab[k];
    if (!L) return go('#/pron');
    let items;
    if (L.kind === 'snd') items = shuffle(L.items).slice(0, 15).map(([word, cat]) => ({ t: 'snd', data: { word, cat, cats: L.cats, task: L.task }, noteRef:{lab:k} }));
    else if (L.kind === 'pair') items = shuffle(L.items).slice(0, 12).map(([a, b]) => ({ t: 'pair', data: { a, b }, noteRef:{lab:k} }));
    else items = shuffle(L.items).slice(0, 10).map((w) => ({ t: 'speak', data: { full: w }, noteRef:{lab:k} }));
    session({ title: L.title, back: '#/pron', items, onDone: (pct) => saveProg('lab', k, pct) });
  }

  function ranksPage() {
    const rank = Course.rank(course, todayKey());
    app.innerHTML = `<div class="page-narrow ranks-page"><span class="eyebrow" lang="en">The Study Club</span><h1>Лестница рангов</h1>
      <p class="page-intro">${rank.done} из 145 юнитов закрыто. ${rank.next ? `Следующий ранг — ${rank.next.en}, осталось ${rank.remaining} ${plural(rank.remaining, 'юнит', 'юнита', 'юнитов')}.` : 'Ты прошёл весь курс.'}</p>
      <p class="rank-rules">Все упражнения юнита, по частям. Один выбранный юнит в будний день. Пройденное в книге и XP учитываются отдельно.</p>
      <ol class="rank-ladder">${Course.RANKS.map((r, i) => `<li class="${r.en === rank.current.en ? 'is-current' : r.at <= rank.done ? 'is-earned' : ''}"><span class="rank-index">${String(i + 1).padStart(2, '0')}</span><div><b lang="en">${r.en}</b><span>${r.ru}</span></div><span class="rank-threshold">${r.at} ${plural(r.at, 'юнит', 'юнита', 'юнитов')}<small>${r.en === rank.current.en ? 'Твой ранг' : r.at <= rank.done ? 'Открыт' : 'Впереди'}</small></span></li>`).join('')}</ol>
      <p class="muted small">Игровая лестница по мотивам английских сословий и титулов.</p><a class="btn ghost" href="#/calendar">Вернуться в дневник →</a></div>`;
  }

  function settingsPage() {
    loadVoices();
    app.innerHTML = `<div class="page-narrow">
      <span class="eyebrow">Твоё рабочее место</span><h1>Настройки</h1>
      <div class="card form"><h2>Оформление</h2>
        <label class="row">Тема:
          <select class="theme"><option value="light">Светлая бумага</option><option value="dark">Тёмная</option><option value="system">Как в системе</option></select></label>
      </div>
      <div class="card form"><h2>Ежедневный план</h2>
        <p>Все упражнения выбранного юнита → экзамен от 80% → закрытый день. Не более одного юнита в будний день; в выходные — повторение недели.</p>
        <p class="muted small">Следующий юнит курса: ${Course.next(course, todayKey()) || 'все пройдены'}. Предыдущие темы доступны для свободной практики. Ранг растёт за разные закрытые юниты.</p>
        <p class="muted small">10 XP за новый завершённый режим дня · 20 XP за закрытый будний юнит · 25 XP за повторение выходного · 50 XP за полную неделю.</p>
        <a href="#/ranks">Лестница рангов →</a>
      </div>
      <div class="card form"><h2>Озвучка</h2>
        <label class="row">Акцент:
          <select class="accent"><option value="en-GB">британский (как в книге)</option><option value="en-US">американский</option></select></label>
        <label class="row">Голос:
          <select class="voice"><option value="">автоматически</option>${voices.map((v) => `<option value="${esc(v.voiceURI)}">${esc(v.name)} (${esc(v.lang)})</option>`).join('')}</select></label>
        <label class="row">Скорость речи: <input type="range" class="rate" min="0.5" max="1.3" step="0.05"> <span class="ratev"></span></label>
        <div><button class="btn small test" type="button">${icon('volume')} Проверить голос</button></div>
        <label class="row"><input type="checkbox" class="autoplay"> Озвучивать правильный ответ после проверки</label>
        <p class="muted small">Озвучка: ${synth ? 'доступна' : 'недоступна'} · Распознавание речи: ${SR ? 'доступно' : 'недоступно (используйте Chrome)'}</p>
      </div>
      <div class="card form">
        <h2>Прогресс</h2>
        <p class="muted small">Прогресс хранится только в этом браузере. Чтобы перенести его на другое устройство, сохраните файл и загрузите его там.</p>
        <div class="actions">
          <button class="btn export" type="button">${icon('save')} Сохранить в файл</button>
          <button class="btn import-trigger" type="button">${icon('upload')} Загрузить из файла</button>
          <input type="file" class="import" accept=".json,application/json" aria-label="Файл прогресса" hidden>
          <button class="btn ghost danger reset" type="button">Сбросить всё</button>
        </div>
      </div></div>`;
    $('.theme').value = ['light', 'dark', 'system'].includes(settings.theme) ? settings.theme : 'light';
    $('.theme').onchange = (e) => { settings.theme = e.target.value; saveSettings(); applyTheme(); };
    aiUI.settings($('.page-narrow'));
    $('.import-trigger').onclick = () => $('.import').click();
    $('.accent').value = settings.accent;
    $('.voice').value = settings.voice;
    $('.rate').value = settings.rate;
    $('.ratev').textContent = settings.rate;
    $('.autoplay').checked = settings.autoplay;
    $('.accent').onchange = (e) => { settings.accent = e.target.value; settings.voice = ''; saveSettings(); settingsPage(); };
    $('.voice').onchange = (e) => { settings.voice = e.target.value; saveSettings(); };
    $('.rate').oninput = (e) => { settings.rate = +e.target.value; $('.ratev').textContent = settings.rate; saveSettings(); };
    $('.autoplay').onchange = (e) => { settings.autoplay = e.target.checked; saveSettings(); };
    $('.test').onclick = () => speak('I have been learning English for two years, and I am getting better every day.');
    $('.export').onclick = () => {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.startsWith('egiu:')) data[k] = localStorage.getItem(k);
      }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: 'application/json' }));
      a.download = 'grammar-in-use-progress.json';
      a.click();
    };
    $('.import').onchange = (e) => {
      const f = e.target.files[0];
      if (!f) return;
      f.text().then((txt) => {
        const data = JSON.parse(txt);
        Object.keys(data).forEach((k) => k.startsWith('egiu:') && localStorage.setItem(k, data[k]));
        location.reload();
      }).catch(() => toast('Не удалось прочитать файл'));
    };
    $('.reset').onclick = () => {
      if (!confirm('Удалить весь прогресс, ошибки и тексты?')) return;
      aiUI.forget();
      Object.keys(localStorage).filter((k) => k.startsWith('egiu:')).forEach((k) => localStorage.removeItem(k));
      location.reload();
    };
  }

  // ---------- маршрутизация ----------
  function updateNav() {
    const c = $('#mcount');
    c.textContent = activeMistakes().length || '';
    c.hidden = !activeMistakes().length;
  }

  function route() {
    keyHandler = null;
    releaseRecorders();
    if (synth) synth.cancel();
    if (recog) { recog.abort(); recog = null; }
    const p = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    const nav = { u: 'home', calendar: 'calendar', review: 'calendar', weekly:'mistakes', mix: 'mix', retention:'retention', phrases:'phrases', mistakes: 'mistakes', pron: 'pron', settings: 'settings' }[p[0]] || 'home';
    $$('[data-nav]').forEach((a) => {
      const active = a.dataset.nav === nav;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    if (p[0] === 'u' && D.units[p[1]]) {
      const u = D.units[p[1]];
      if(!Weekly.canStart(weekly,course,todayKey(),u.n))weeklyUI.blockedPage();
      else if(p[2]&&!bookReady(u.n))unitPage(u);
      else if (p[2] === 'exam') examPage(u);
      else if (p[2] === 'context') learnUI.contextPage(u.n);
      else if (p[2]) startUnit(u, p[2]);
      else unitPage(u);
    } else if (p[0] === 'calendar') calendarPage(Study.date(p[1]) ? p[1] : todayKey());
    else if (p[0] === 'review') reviewPage(Study.date(p[1]) ? p[1] : todayKey());
    else if(p[0]==='weekly'){
      const week=Study.date(p[1])?Study.weekStart(p[1]):null;
      let source=null;try{source=p[2]?decodeURIComponent(p[2]):null;}catch(e){}
      if(week&&source)weeklyUI.run(week,source);else weeklyUI.page(week);
    }
    else if (p[0] === 'retention') learnUI.retentionPage();
    else if (p[0] === 'phrases') learnUI.phrasesPage();
    else if (p[0] === 'mix') mixPage();
    else if (p[0] === 'mistakes') mistakesPage();
    else if (p[0] === 'pron') (p[1] ? labRun(p[1]) : labPage());
    else if (p[0] === 'ranks') ranksPage();
    else if (p[0] === 'settings') settingsPage();
    else home();
    wireClaim();
    updateNav();
    window.scrollTo(0, 0);
  }

  const Tutor=window.EGIUAITutor;
  const apiOptions=()=>{const o=Store.get('apiSettings',{});return {model:Tutor.models[o.model]?o.model:Tutor.DEFAULT_MODEL,limit:Number.isFinite(o.limit)&&o.limit>=.1&&o.limit<=50?o.limit:5};};
  const aiUI=window.EGIUAITutorUI({A:Tutor,Disputes,esc,$,getOptions:apiOptions,setOptions:o=>Store.set('apiSettings',o),getRows:()=>Tutor.normalizeUsage(Store.get('aiUsage',[])),setRows:r=>Store.set('aiUsage',r),today:todayKey,getDisputes:()=>Disputes.normalize(Store.get('aiDisputes',[])),setDisputes:r=>Store.set('aiDisputes',r),getReview:(n,k)=>learning.reviews[n]&&learning.reviews[n][k],saveReview:(n,k,r)=>{learning=Learning.saveReview(learning,n,k,r,todayKey());saveLearning();}});
  const learnUI = window.EGIULearningUI({app,$,$$,esc,L:Learning,getState:()=>learning,setState:s=>{learning=s;saveLearning();},today:todayKey,dateLabel,units:D.units,speak,toast,go,runTopics,wireRecorder,aiUI});
  const weeklyUI=window.EGIUWeeklyUI({W:Weekly,P:window.EGIUWeeklyPractice,app,$,esc,getState:()=>weekly,setState:s=>{weekly=s;saveWeekly();},today:todayKey,dateLabel,weekLabel,shift:Study.shift,units:D.units,R,Notes,go,speak,answerNote,
    sourceItem:row=>{const ref=row.ref,u=D.units[ref.u],mode=TYPES[row.mode]?row.mode:ref.k==='gap'?'fill':ref.k;return ref.b?transferItem({t:mode,ref}):makeItem(mode,u,ref.k,ref.i);},
    record:(row,it,r,event)=>recordActivity({kind:'practice',session:'weekly:'+Study.weekStart(row.day)+':'+Weekly.key(row.ref),title:`Unit ${row.ref.u} · Ошибки недели`},[{...r,item:{ref:row.ref}}]).id,
    correctActivity:id=>{const e=activity.find(e=>e.id===id);if(e){e.correct=1;Store.set('activity',activity);}},
    originalAnswer:(item,r,event)=>{mistakes=Review.record(mistakes,item.ref,{...r,mode:item.t},todayKey(),event);Store.set('mistakes',mistakes);updateNav();},
    undoOriginal:(item,event)=>{mistakes=Review.undo(mistakes,item.ref,event);Store.set('mistakes',mistakes);updateNav();},appeal:attachAnswerDispute,setKeys:fn=>{keyHandler=fn;},dayCelebration,beforePractice:n=>requireBook([n],location.hash,()=>route())});
  window.addEventListener('hashchange', route);
  route();
})();
