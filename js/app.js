/* English Grammar in Use — тренажёр */
(function () {
  'use strict';

  const D = window.EGIU;
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

  const progress = Store.get('progress', {});
  const getProg = (key, t) => (progress[key] && progress[key][t]) || null;
  function saveProg(key, t, pct) {
    const p = (progress[key] = progress[key] || {});
    const prev = p[t] || { best: 0 };
    p[t] = { best: Math.max(prev.best, pct), last: pct, ts: Date.now() };
    Store.set('progress', progress);
  }

  const book = Store.get('book', {});
  const Study = window.EGIUStudy;
  const activity = Study.normalize(Store.get('activity', []));
  const storedPlan = Store.get('dailyPlan', {});
  const dailyPlan = storedPlan && typeof storedPlan === 'object' && !Array.isArray(storedPlan) ? storedPlan : {};
  const todayKey = () => Study.dateKey(new Date());
  const Club = window.EGIUClub;
  const club = Club.normalize(Store.get('club', null), todayKey());
  const saveClub = () => Store.set('club', club);
  saveClub();
  const dayState = (day) => Club.dayStatus(activity, day, club);
  const clubLedger = () => Club.ledger(activity, club, todayKey());
  function ensureGoal(unit) {
    const day = todayKey();
    if (Study.isWeekend(day)) return null;
    if (!club.goals[day]) {
      const u = D.units[unit] || plannedUnit(day);
      club.goals[day] = { unit: u.n, required: Club.requiredModes(unitTypes(u), club.policy) };
      saveClub();
    }
    return club.goals[day];
  }
  function updatePolicy(policy) {
    club.policy = policy === 'all' ? 'all' : 'core';
    const goal = club.goals[todayKey()];
    if (goal && !dayState(todayKey()).done) goal.required = Club.requiredModes(unitTypes(D.units[goal.unit]), club.policy);
    saveClub();
  }
  function recordActivity(context, results = []) {
    if (context.unit) ensureGoal(context.unit);
    const before = clubLedger(), wasDone = dayState(todayKey()).done;
    const ts = Date.now();
    const units = [...new Set(results.map((r) => r.item.ref && r.item.ref.u).filter((n) => D.units[n]))];
    activity.push({ id: ts + '-' + Math.random().toString(36).slice(2), ts, day: todayKey(),
      kind: context.kind || 'practice', units: context.unit ? [context.unit] : units,
      answers: results.length, correct: results.filter((r) => r.ok).length,
      week: context.week || null, title: context.title || '', mode: context.mode || null });
    Store.set('activity', activity);
    const after = clubLedger();
    return { xp: after.xp - before.xp, closed: !wasDone && dayState(todayKey()).done, week: after.weeks.length > before.weeks.length };
  }
  let mistakes = Store.get('mistakes', []);
  const mkey = (r) => r.u + ':' + r.k + ':' + r.i;
  function addMistake(r) {
    if (!mistakes.some((m) => mkey(m) === mkey(r))) {
      mistakes.push(r);
      Store.set('mistakes', mistakes);
    }
  }
  function removeMistake(r) {
    const n = mistakes.length;
    mistakes = mistakes.filter((m) => mkey(m) !== mkey(r));
    if (n !== mistakes.length) Store.set('mistakes', mistakes);
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
      for (const v of variants(norm(a))) if (u.has(v)) return true;
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
  function unitPct(u) {
    const ts = unitTypes(u);
    if (!ts.length) return 0;
    return Math.round(ts.reduce((s, t) => s + ((getProg(u.n, t) || {}).best || 0), 0) / ts.length);
  }

  function makeItem(t, u, kind, i) {
    prep(u);
    const data = kind === 'gap' ? u.gaps[i] : kind === 'err' ? u.errs[i] : u.trs[i];
    return { t, data, ref: { u: u.n, k: kind, i } };
  }

  function unitItems(u, t) {
    prep(u);
    const k = TYPES[t].kind;
    const idx = k === 'gap' ? u.gaps.map((_, i) => i)
      : k === 'order' ? u.orderIdx
        : k === 'err' ? u.errs.map((_, i) => i)
          : u.trs.map((_, i) => i);
    return shuffle(idx).map((i) => makeItem(t, u, k === 'order' ? 'gap' : k, i));
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
        const ok = opts[i] === g.correct;
        btns.forEach((b, k) => {
          b.disabled = true;
          if (opts[k] === g.correct) b.classList.add('right');
        });
        if (!ok) btns[i].classList.add('wrong');
        $('.gap', area).textContent = showOpt(g.correct);
        finish({ ok, correct: hl(g), say: g.full });
      };
      btns.forEach((b, i) => (b.onclick = () => choose(i)));
      return { keys: (n) => n <= opts.length && choose(n - 1) };
    },

    fill(area, g, finish, listenMode) {
      area.innerHTML = `<div class="task">${listenMode ? 'Прослушайте и впишите пропущенные слова' : 'Впишите правильную форму'}</div>
        ${listenMode ? audioBtns() : ''}
        <p class="sent" lang="en">${esc(g.before)}<input class="gapin" lang="en" aria-label="Пропущенные слова" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">${!listenMode && g.hint ? `<span class="hint">(${esc(g.hint)})</span>` : ''}${esc(g.after)}</p>
        ${listenMode ? '' : '<button class="btn link small showopts" type="button">Показать варианты</button><div class="optlist"></div>'}`;
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
          finish({ ok: same(v, g.answers), correct: hl(g), say: listenMode ? null : g.full, user: v, override: true });
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
          if (same(v, [g.full])) return finish({ ok: true, correct: esc(g.full) });
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
          const ok = ans.map((x) => x.t).join(' ') === body;
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
          finish({ ok: same(v, t.a), correct: t.a.map(esc).join('<br><small>или:</small> '), say: t.a[0], user: v, override: true });
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

  function wireRecorder(btn, out) {
    if (!btn) return;
    if (!navigator.mediaDevices || !window.MediaRecorder) { btn.disabled = true; btn.textContent = 'Запись недоступна'; return; }
    let rec = null;
    btn.onclick = async () => {
      if (rec) { rec.stop(); return; }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const chunks = [];
        rec = new MediaRecorder(stream);
        rec.ondataavailable = (e) => chunks.push(e.data);
        rec.onstop = () => {
          stream.getTracks().forEach((t) => t.stop());
          const url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType }));
          out.innerHTML = `<audio controls src="${url}"></audio>`;
          rec = null;
          btn.textContent = 'Записать ещё раз';
          btn.classList.remove('on');
        };
        rec.start();
        btn.textContent = 'Стоп';
        btn.classList.add('on');
      } catch (e) {
        toast('Нет доступа к микрофону');
      }
    };
  }

  // ---------- сессия упражнений ----------
  let keyHandler = null;
  document.addEventListener('keydown', (e) => keyHandler && keyHandler(e));

  function session({ title, back, items, onDone, context = {} }) {
    let pos = 0, ctl = {}, answered = false, ended = false;
    const res = [];
    app.innerHTML = `<div class="session">
      <div class="sess-top">
        <button class="btn ghost quit" type="button" aria-label="Вернуться к выбору упражнений" title="Выйти">${icon('close')}</button>
        <div class="bar" role="progressbar" aria-label="Прогресс занятия" aria-valuemin="0" aria-valuemax="${items.length}" aria-valuenow="0"><i></i></div><span class="count" aria-live="polite"></span>
      </div>
      <h1 class="sess-title">${esc(title)}</h1>
      <div class="card ex"><div class="area"></div><div class="fb" role="status" aria-live="polite" aria-atomic="true"></div>
        <div class="actions"><button class="btn primary main" type="button"></button></div>
      </div></div>`;
    const area = $('.area'), fb = $('.fb'), btn = $('.main'), bar = $('.bar i'), count = $('.count');
    $('.quit').onclick = () => go(back);

    function show() {
      answered = false;
      fb.className = 'fb';
      fb.innerHTML = '';
      count.textContent = `${pos + 1} из ${items.length}`;
      bar.style.width = (pos / items.length) * 100 + '%';
      $('.sess-top .bar').setAttribute('aria-valuenow', pos);
      area.innerHTML = '';
      ctl = R[items[pos].t](area, items[pos].data, finish) || {};
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
      r.item = it;
      res[pos] = r;
      if (it.ref) (r.ok ? removeMistake : addMistake)(it.ref);
      const draw = () => {
        fb.className = 'fb ' + (r.ok ? 'good' : 'bad');
        fb.innerHTML = `<div class="verdict">${icon(r.ok ? 'check' : 'close')}${r.ok ? 'Верно' : 'Нужно поправить'}${r.note ? ` <small>(${esc(r.note)})</small>` : ''}</div>
          ${r.correct ? `<div class="answer">${r.ok ? '' : '<span class="lbl">Правильно:</span> '}${r.correct}</div>` : ''}
          <div class="fb-actions">
            ${r.say ? `<button class="btn small say" type="button">${icon('volume')} Послушать</button>` : ''}
            ${!r.ok && r.override ? '<button class="btn small link ovr" type="button">Мой ответ тоже верный</button>' : ''}
          </div>`;
        const s = $('.say', fb);
        if (s) s.onclick = () => speak(r.say);
        const o = $('.ovr', fb);
        if (o) o.onclick = () => {
          r.ok = true;
          r.score = 1;
          if (it.ref) removeMistake(it.ref);
          draw();
        };
      };
      draw();
      if (r.say && settings.autoplay) speak(r.say);
      btn.style.display = '';
      btn.textContent = pos + 1 < items.length ? 'Далее →' : 'Результат';
      btn.onclick = next;
      btn.focus();
      updateNav();
    }

    function next() {
      pos++;
      if (pos < items.length) show();
      else end();
    }

    function end() {
      if (ended) return;
      ended = true;
      keyHandler = null;
      bar.style.width = '100%';
      $('.sess-top .bar').setAttribute('aria-valuenow', items.length);
      const pct = Math.round((res.reduce((s, r) => s + r.score, 0) / res.length) * 100);
      if (onDone) onDone(pct);
      const reward = recordActivity({ ...context, title }, res);
      const wrong = res.filter((r) => !r.ok);
      const msg = pct >= 90 ? 'Хороший результат. Можно перейти к следующему упражнению.' : pct >= 70 ? 'Хороший результат. Осталось разобрать ошибки.' : pct >= 50 ? 'Есть над чем поработать. Повтори сложные задания.' : 'Вернись к правилу в книге и попробуй ещё раз.';
      $('.ex').innerHTML = `<div class="summary">
        <div class="bigpct">${pct}%</div><p>${msg}</p>
        ${rewardPanel(reward)}
        ${wrong.length ? `<h3>Ошибки (${wrong.length})</h3><ul class="wronglist">${wrong.map((r) => `<li>${r.correct || esc(r.item.data.full || '')}${r.user ? `<div class="muted small">ваш ответ: ${esc(r.user)}</div>` : ''}</li>`).join('')}</ul>` : ''}
        <div class="actions">
          ${wrong.length ? '<button class="btn primary again-wrong" type="button">Повторить ошибки</button>' : ''}
          <button class="btn again" type="button">Ещё раз</button>
          <button class="btn ghost back" type="button">Назад</button>
        </div></div>`;
      const aw = $('.again-wrong');
      if (aw) aw.onclick = () => session({ title: title + ' · ошибки', back, items: shuffle(wrong.map((r) => r.item)), onDone: null });
      $('.again').onclick = () => session({ title, back, items: shuffle(items), onDone, context });
      $('.back').onclick = () => go(back);
    }

    keyHandler = (e) => {
      const tag = e.target.tagName;
      if (e.key === 'Enter' && !e.shiftKey) {
        if (tag === 'BUTTON' || tag === 'A') return;
        if (btn.style.display !== 'none') { e.preventDefault(); btn.click(); }
      } else if (!answered && ctl.keys && /^[1-9]$/.test(e.key) && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        ctl.keys(+e.key);
      }
    };
    show();
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
    const done = activity.find((e) => e.day === day && ['unit', 'writing'].includes(e.kind));
    if (done) return D.units[done.units[0]];
    const learned = new Set(activity.filter((e) => ['unit', 'writing'].includes(e.kind)).flatMap((e) => e.units));
    const inBook = D.list.find((u) => book[u.n] && !learned.has(u.n));
    if (inBook) return inBook;
    const latest = activity.slice().reverse().find((e) => ['unit', 'writing'].includes(e.kind));
    return latest ? D.units[latest.units[0] + 1] || D.units[145] : D.units[Store.get('last', 1)] || D.list[0];
  }
  function clubBoard() {
    const ledger = clubLedger();
    return `<section class="club-board" aria-label="Уровень практики и серия дней">
      <div class="club-identity"><span class="club-monogram" aria-hidden="true">G<span>U</span></span><div><span class="club-kicker" lang="en">The Study Club</span><b>Уровень практики ${ledger.level}</b></div></div>
      <div class="club-experience"><div><b>${ledger.xp} XP</b><span>до следующего уровня ${ledger.remaining} XP</span></div><div class="club-meter" role="progressbar" aria-label="До следующего уровня" aria-valuemin="0" aria-valuemax="200" aria-valuenow="${ledger.progress}"><i style="width:${ledger.progress / 2}%"></i></div></div>
      <div class="club-streak"><b>${ledger.streak}</b><span>${plural(ledger.streak, 'закрытый день', 'закрытых дня', 'закрытых дней')} подряд</span></div>
    </section>`;
  }
  function clubAwards() {
    const ledger = clubLedger();
    const awards = [{ id: 'first', en: 'First day', title: 'Первый закрытый день', hint: 'Заверши свой дневной набор.' },
      { id: 'weekend', en: 'Weekend', title: 'Оба повторения', hint: 'Повтори материал в субботу и воскресенье одной недели.' },
      { id: 'week', en: 'Full week', title: 'Полная неделя', hint: 'Закрой пять будней и оба повторения.' }];
    return `<section class="club-awards" aria-label="Печати дневника"><span class="eyebrow">Печати дневника</span><div class="award-list">${awards.map((award) => `<div class="award ${ledger.awards[award.id] ? 'is-earned' : ''}" title="${esc(award.hint)}"><span class="award-seal" aria-hidden="true"><small lang="en">Study Club</small>${icon(ledger.awards[award.id] ? 'check' : 'book')}<em lang="en">${award.en}</em></span><b>${award.title}</b><span>${ledger.awards[award.id] ? 'Получено' : award.hint}</span></div>`).join('')}</div>
      <p>${ledger.weeks.length ? `${ledger.weeks.length} ${plural(ledger.weeks.length, 'недельная печать', 'недельные печати', 'недельных печатей')} в коллекции.` : 'Каждая полностью закрытая неделя добавляет новую печать.'}</p></section>`;
  }
  function goalList(goal, state) {
    const rewarded = new Set(activity.filter((e) => e.day === todayKey() && ['unit', 'writing'].includes(e.kind)).map((e) => e.mode));
    return `<ol class="goal-list" aria-label="Занятия на сегодня">${goal.required.map((t) => `<li><a class="${state.completed.includes(t) ? 'is-complete' : ''}" href="#/u/${goal.unit}/${t}"><span class="goal-check" aria-hidden="true">${state.completed.includes(t) ? icon('check') : ''}</span><span>${TYPES[t].name}</span><small>${state.completed.includes(t) ? 'готово' : rewarded.has(t) ? 'впереди' : '+10 XP'}</small></a></li>`).join('')}</ol>`;
  }
  function rewardPanel(reward) {
    const day = todayKey(), state = dayState(day), goal = club.goals[day];
    const next = goal && !Study.isWeekend(day) ? goal.required.find((t) => !state.completed.includes(t)) : null;
    return `<div class="reward-panel${reward.closed ? ' just-closed' : ''}" role="status">
      ${reward.closed ? `<span class="day-stamp" lang="en">Day<br>complete</span>` : icon('check')}
      <div><b>${reward.week ? 'Полная неделя — печать твоя!' : reward.closed ? 'День закрыт. Хорошая работа.' : 'Подход сохранён.'}</b>
        <p>${reward.xp ? `+${reward.xp} XP · ` : ''}${next ? `${state.completed.filter((t) => goal.required.includes(t)).length} из ${goal.required.length} занятий. Следующее — «${TYPES[next].name}».` : 'Результат записан в дневник.'}</p>
        ${next ? `<a class="btn small primary" href="#/u/${goal.unit}/${next}">Следующее занятие ${icon('arrow')}</a>` : '<a href="#/calendar">Посмотреть неделю →</a>'}</div></div>`;
  }
  function todayPlan() {
    const day = todayKey();
    const goal = ensureGoal();
    const state = dayState(day);
    const weekend = Study.isWeekend(day);
    const u = plannedUnit(day);
    return `<div class="today-plan">
      <span class="eyebrow">${dateLabel(day, { weekday: 'long', day: 'numeric', month: 'long' })}</span>
      <h3>${weekend ? 'Повторить неделю' : 'Юнит на сегодня'}</h3>
      ${state.done ? `<p class="plan-complete">${icon('check')} День закрыт</p>` : ''}
      ${weekend ? `<p>${state.units.length ? `Вспомни ${state.units.length} ${plural(state.units.length, 'юнит', 'юнита', 'юнитов')}, которые закреплял в будни. В наборе будет задание из каждого.` : 'На этой неделе пока нет записанных юнитов. Завершай упражнения в будни — здесь появится набор для повторения.'}</p>
        ${state.units.length && !state.done ? '<p class="plan-help">+25 XP за полное повторение сегодня.</p>' : ''}
        ${state.units.length ? `<a class="btn primary" href="#/review/${day}">${state.done ? 'Повторить ещё раз' : 'Начать повторение'} ${icon('arrow')}</a>` : '<a class="btn" href="#/">Выбрать юнит</a>'}`
        : `<label class="plan-label" for="today-unit">Один юнит после книги</label><select id="today-unit"${state.done ? ' disabled' : ''}>${D.list.map((item) => `<option value="${item.n}"${item.n === u.n ? ' selected' : ''}>${String(item.n).padStart(2, '0')} · ${esc(item.title)}</option>`).join('')}</select>
        <label class="plan-label policy-label" for="goal-policy">${state.done ? 'Набор на следующие дни' : 'Набор занятий'}</label><select id="goal-policy"><option value="core"${club.policy === 'core' ? ' selected' : ''}>Основной набор · 4 занятия</option><option value="all"${club.policy === 'all' ? ' selected' : ''}>Все упражнения юнита</option></select>
        <div class="goal-heading"><b>${state.completed.filter((t) => goal.required.includes(t)).length} / ${goal.required.length} завершено</b><span>+20 XP за день</span></div>
        ${goalList(goal, state)}
        <p class="plan-help">За другие режимы тоже получишь XP. Повтор пройденного режима сохраняет результат.</p>
        <a class="btn primary today-start" href="#/u/${u.n}${state.done ? '' : '/' + (goal.required.find((t) => !state.completed.includes(t)) || goal.required[0])}">${state.done ? 'Продолжить практику' : 'Следующее занятие'} ${icon('arrow')}</a>`}
    </div>`;
  }
  function wireTodayPlan() {
    const select = $('#today-unit');
    if (!select) return;
    select.onchange = () => {
      dailyPlan[todayKey()] = +select.value;
      Store.set('dailyPlan', dailyPlan);
      club.goals[todayKey()] = { unit: +select.value, required: Club.requiredModes(unitTypes(D.units[select.value]), club.policy) };
      saveClub(); route();
    };
    $('#goal-policy').onchange = (e) => {
      updatePolicy(e.target.value); route();
    };
  }
  function calendarPage(day) {
    ensureGoal();
    const week = Study.weekStart(day), today = todayKey();
    const stats = Study.summary(activity, day);
    const rows = activity.filter((e) => e.day === day);
    const state = dayState(day);
    const units = Study.weekUnits(activity, day);
    app.innerHTML = `<div class="calendar-page">
      <span class="eyebrow">Личный ритм / 5 + 2</span><h1>Календарь занятий</h1>
      <p class="page-intro">Пн–пт — один юнит после книги. Сб и вс — повторение пройденного за неделю.</p>
      ${clubBoard()}
      <div class="calendar-layout">
        <section class="calendar-main" aria-labelledby="week-title">
          <div class="week-heading"><h2 id="week-title">${weekLabel(day)}</h2><div class="week-controls">
            <a class="btn ghost" href="#/calendar/${Study.shift(day, -7)}" aria-label="Предыдущая неделя">←</a>
            <a class="btn ghost small" href="#/calendar/${today}">Сегодня</a>
            <a class="btn ghost" href="#/calendar/${Study.shift(day, 7)}" aria-label="Следующая неделя">→</a></div></div>
          ${weekGrid(day, day)}
          <p class="calendar-legend"><span>${icon('check')} план выполнен</span><span><b>·</b> другая практика</span><span>— без записи</span></p>
          <div class="week-stats" aria-label="Статистика за выбранную неделю">
            <div><b>${stats.days}<small>/ 7</small></b><span>${plural(stats.days, 'активный день', 'активных дня', 'активных дней')}</span></div>
            <div><b>${stats.sessions}</b><span>${plural(stats.sessions, 'подход', 'подхода', 'подходов')}</span></div>
            <div><b>${stats.answers}</b><span>${plural(stats.answers, 'задание', 'задания', 'заданий')}</span></div>
            <div><b>${stats.accuracy == null ? '—' : stats.accuracy + '%'}</b><span>верных ответов</span></div>
          </div>
          <p class="stats-note">${stats.answers ? `${stats.correct} из ${stats.answers} ${plural(stats.answers, 'ответа', 'ответов', 'ответов')} полностью верны. ` : ''}Письмо учитывается как подход, без оценки правильности.</p>
          <section class="day-history" aria-labelledby="day-title"><div class="history-heading"><h2 id="day-title">${dateLabel(day, { weekday: 'long', day: 'numeric', month: 'long' })}</h2>${state.done ? '<span class="status-done">План выполнен</span>' : ''}</div>
            ${rows.length ? `<ol class="activity-list">${rows.map((e) => `<li><div><b>${esc(e.title || (e.kind === 'writing' ? 'Свободное письмо' : 'Практика'))}</b><span>${e.kind === 'writing' ? 'Сохранён текст · без оценки' : `${e.answers} ${plural(e.answers, 'задание', 'задания', 'заданий')} · ${e.correct} верно`}</span></div>${Number.isFinite(e.ts) ? `<time datetime="${new Date(e.ts).toISOString()}">${new Date(e.ts).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</time>` : ''}</li>`).join('')}</ol>`
              : `<p class="history-empty">${day > today ? 'Занятие впереди. После завершения оно появится здесь.' : 'Завершённых подходов в этот день нет.'}</p>`}
          </section>
          <p class="history-note">История накапливается с этого обновления. Старые лучшие результаты сохранены в юнитах. Даты — по времени устройства.</p>
        </section>
        <aside class="calendar-aside" aria-label="Занятие и повторение">${todayPlan()}
          ${clubAwards()}
          <div class="week-topics"><span class="eyebrow">Для повторения · ${weekLabel(week)}</span><h3>Юниты этой недели</h3>
            ${units.length ? `<div class="review-units">${units.map((n) => `<a href="#/u/${n}"><small>${String(n).padStart(2, '0')}</small><span lang="en">${esc(D.units[n].title)}</span></a>`).join('')}</div><a class="btn" href="#/review/${week}">Повторить эти юниты ${icon('arrow')}</a>` : '<p>Здесь появятся юниты с завершёнными подходами с понедельника по пятницу.</p>'}
          </div>
        </aside>
      </div></div>`;
    wireTodayPlan();
  }
  function reviewPage(day) {
    const week = Study.weekStart(day), units = Study.weekUnits(activity, day);
    if (!units.length) {
      app.innerHTML = `<div class="page-narrow"><span class="eyebrow">Повторение / ${weekLabel(day)}</span><h1>Пока нечего повторять</h1><p class="page-intro">На этой неделе нет записанных подходов к юнитам в будни. Заверши упражнение после книги — его тема войдёт в недельное повторение.</p><a class="btn primary" href="#/">Выбрать юнит ${icon('arrow')}</a><a class="btn ghost" href="#/calendar/${day}">К календарю</a></div>`;
      return;
    }
    // One form of each example; every studied unit is covered before filling the set.
    const pool = shuffle(units.flatMap((n) => {
      const u = D.units[n];
      return ['mc', 'fill', 'err', 'tr'].flatMap((t) => available(u, t) ? unitItems(u, t) : []);
    }));
    const items = Study.reviewSelection(pool);
    session({ title: `Повторение недели · ${weekLabel(day)}`, back: '#/calendar/' + day,
      items: shuffle(items), context: { kind: 'review', week } });
  }

  function unitRow(u) {
    const pct = unitPct(u);
    const hasProgress = unitTypes(u).some((t) => getProg(u.n, t));
    return `<a class="urow" href="#/u/${u.n}">
      <span class="unum">${String(u.n).padStart(2, '0')}</span><span class="utitle" lang="en">${esc(u.title)}</span>
      ${book[u.n] ? `<span class="bk" role="img" aria-label="Пройдено в книге" title="Пройдено в книге">${icon('check')}</span>` : ''}
      ${hasProgress ? `<span class="upct" title="Средний лучший результат по режимам">${pct}%</span>` : ''}${bar(pct)}</a>`;
  }

  function home() {
    ensureGoal();
    const last = D.units[Store.get('last', 0)];
    const current = last || D.list[0];
    const started = D.list.filter((u) => unitTypes(u).some((t) => getProg(u.n, t))).length;
    const inBook = D.list.filter((u) => book[u.n]).length;
    let filter = Store.get('homeFilter', 'all') === 'book' ? 'book' : 'all';
    app.innerHTML = `
      <section class="hero" aria-labelledby="home-title">
        <div><span class="eyebrow">English Grammar in Use / личная практика</span>
          <h1 id="home-title">После книги —<br><em>практика.</em></h1>
          <p>Пройди юнит у Мёрфи, затем закрепи его здесь.<br>Выбери упражнение и возвращайся к сложным местам.</p></div>
        <div class="stats" aria-label="Твой прогресс">
          <div><b>${inBook}<span class="sr-only"> из ${D.list.length}</span></b><span>пройдено в книге</span></div>
          <div><b>${started}</b><span>${plural(started, 'юнит', 'юнита', 'юнитов')} с результатом</span></div>
          <div><b>${mistakes.length}</b><span>${plural(mistakes.length, 'ошибка', 'ошибки', 'ошибок')} на повтор</span></div>
        </div>
      </section>
      ${clubBoard()}
      <section class="home-week" aria-label="Текущая неделя"><div class="week-heading"><h2>На этой неделе <span>${weekLabel(todayKey())}</span></h2><a href="#/calendar">Календарь ${icon('arrow')}</a></div>${weekGrid(todayKey())}</section>
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
          <a class="aside-link" href="#/mistakes">${icon('tr')}<span>Разобрать ошибки</span><small>${mistakes.length}</small></a>
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
      const matches = (u) => (!q || String(u.n) === q || u.title.toLowerCase().includes(q) || u.section.en.toLowerCase().includes(q) || u.section.ru.toLowerCase().includes(q)) && (filter !== 'book' || book[u.n]);
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
        return `<details class="sec"${open ? ' open' : ''}>
          <summary><span class="sec-index">${String(i + 1).padStart(2, '0')}</span><span class="sec-t"><span lang="en">${esc(section.en)}</span><small>${esc(section.ru)}</small></span>
            <span class="sec-range" aria-label="Юниты ${section.units[0].n}–${section.units[section.units.length - 1].n}">${String(section.units[0].n).padStart(2, '0')}–${String(section.units[section.units.length - 1].n).padStart(2, '0')}</span>${icon('chevron')}</summary>
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
    const goal = ensureGoal(u.n), state = dayState(todayKey());
    Store.set('last', u.n);
    const prev = D.units[u.n - 1], next = D.units[u.n + 1];
    const groups = {};
    unitTypes(u).forEach((t) => (groups[TYPES[t].group] = groups[TYPES[t].group] || []).push(t));
    const hasProgress = unitTypes(u).some((t) => getProg(u.n, t));
    app.innerHTML = `
      <div class="crumbs"><a href="#/">Оглавление</a> / <span lang="en">${esc(u.section.en)}</span></div>
      <div class="unit-heading"><span class="unit-number"><small>UNIT</small>${String(u.n).padStart(2, '0')}</span><h1 lang="en">${esc(u.title)}</h1></div>
      <div class="unit-layout">
        <aside class="unit-annotation" aria-label="Правило и отметка книги">
          ${u.tip ? `<div class="tip"><span class="eyebrow">Коротко о правиле</span>${esc(u.tip)}</div>` : ''}
          <label class="bookdone"><input type="checkbox"${book[u.n] ? ' checked' : ''}> Пройдено в книге</label>
          <p class="muted small">Сначала прочитай правило и сделай задания в книге. Здесь — дополнительная практика.</p>
        </aside>
        <section class="unit-practice" aria-labelledby="practice-title">
          <div class="practice-head"><h2 id="practice-title">Закрепить тему</h2><span class="muted small">${hasProgress ? `Средний лучший результат: ${unitPct(u)}%` : 'Выбери упражнение'}</span></div>
          ${goal && goal.unit === u.n ? `<section class="unit-goal" aria-label="Дневной набор"><div class="goal-heading"><b>${state.done ? 'День закрыт' : `Дневной набор · ${state.completed.filter((t) => goal.required.includes(t)).length} / ${goal.required.length}`}</b><a href="#/calendar">Дневник →</a></div>${goalList(goal, state)}</section>` : goal && !state.done ? '<div class="unit-goal-note"><span>Можно сделать этот юнит целью на сегодня.</span><button class="btn small make-today-unit" type="button">Выбрать на сегодня</button></div>' : ''}
          ${Object.keys(GROUPS).filter((g) => groups[g]).map((g) => `
            <h3 class="grp">${GROUPS[g]}</h3>
            <div class="grid">${groups[g].map((t) => {
              const p = getProg(u.n, t), n = available(u, t);
              return `<a class="excard" href="#/u/${u.n}/${t}">
                <span class="ico">${icon(TYPES[t].icon)}</span><span class="nm">${TYPES[t].name}</span>
                <span class="ds">${TYPES[t].desc}${t === 'write' ? '' : ` · ${n} ${plural(n, 'задание', 'задания', 'заданий')}`}</span>
                ${p ? `<span class="sc ${p.best >= 80 ? 'hi' : ''}" title="Лучший результат">${t === 'write' ? '✓' : p.best + '%'}</span>` : ''}
                ${icon('arrow').replace('class="icon"', 'class="icon ex-arrow"')}
              </a>`;
            }).join('')}</div>`).join('')}
        </section>
      </div>
      <div class="unav">
        ${prev ? `<a class="btn ghost" href="#/u/${prev.n}">← Unit ${prev.n}</a>` : '<span></span>'}
        ${next ? `<a class="btn ghost" href="#/u/${next.n}">Unit ${next.n} →</a>` : ''}
      </div>`;
    $('.bookdone input').onchange = (e) => {
      if (e.target.checked) book[u.n] = true;
      else delete book[u.n];
      Store.set('book', book);
    };
    const makeToday = $('.make-today-unit');
    if (makeToday) makeToday.onclick = () => {
      club.goals[todayKey()] = { unit: u.n, required: Club.requiredModes(unitTypes(u), club.policy) };
      dailyPlan[todayKey()] = u.n;
      Store.set('dailyPlan', dailyPlan); saveClub(); route();
    };
  }

  function startUnit(u, t) {
    if (!TYPES[t] || !available(u, t)) return go('#/u/' + u.n);
    ensureGoal(u.n);
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
        <div class="model" hidden><b>Пример:</b> ${esc(model || '')}
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
      toast(reward.closed ? `День закрыт · +${reward.xp} XP` : reward.xp ? `Текст сохранён · +${reward.xp} XP` : 'Текст сохранён');
      go('#/u/' + u.n);
    };
  }

  function mixPage() {
    const bookUnits = D.list.filter((u) => book[u.n]);
    const mixTypes = ['mc', 'fill', 'order', 'err', 'tr', 'lgap', 'dict', 'speak'];
    const sel = Store.get('mixTypes', ['mc', 'fill']);
    app.innerHTML = `<div class="page-narrow">
      <span class="eyebrow">Повторение / практика</span><h1>Смешанная практика</h1>
      <p class="page-intro">Случайные задания из выбранных тем — хороший способ повторения.</p>
      <div class="card form">
        <label class="row"><input type="checkbox" class="onlybook"${bookUnits.length ? ' checked' : ' disabled'}> Только юниты, отмеченные «Пройдено в книге» (${bookUnits.length})</label>
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
      if ($('.onlybook').checked) units = units.filter((u) => book[u.n]);
      if (!units.length || !types.length) { toast('Выберите хотя бы одну тему и тип задания'); return; }
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

  function mistakeItems() {
    return mistakes.map((r) => {
      const u = D.units[r.u];
      if (!u) return null;
      const it = makeItem(r.k === 'gap' ? 'fill' : r.k, u, r.k, r.i);
      return it.data ? it : null;
    }).filter(Boolean);
  }

  function mistakesPage() {
    const items = mistakeItems();
    const byUnit = {};
    mistakes.forEach((r) => (byUnit[r.u] = (byUnit[r.u] || 0) + 1));
    app.innerHTML = `<div class="page-narrow">
      <span class="eyebrow">Повторение / сложные места</span><h1>Работа над ошибками</h1>
      <div class="card">
        ${items.length ? `<p>Заданий на повторение: <b>${items.length}</b>. Задание исчезает из списка, когда вы ответите на него правильно.</p>
          <div class="chips">${Object.keys(byUnit).sort((a, b) => a - b).map((n) => `<a class="chip" href="#/u/${n}">Unit ${n} · ${byUnit[n]}</a>`).join('')}</div>
          <div class="actions"><button class="btn primary start" type="button">Повторить (до 20)</button>
          <button class="btn ghost clear" type="button">Очистить список</button></div>`
        : `<div class="empty"><h2>Пока без ошибок</h2><p>Здесь появятся задания, которые стоит повторить. После правильного ответа они уйдут из списка.</p><a class="btn" href="#/">Выбрать юнит ${icon('arrow')}</a></div>`}
      </div></div>`;
    if (!items.length) return;
    $('.start').onclick = () => session({ title: 'Работа над ошибками', back: '#/mistakes', items: shuffle(items).slice(0, 20) });
    $('.clear').onclick = () => {
      if (!confirm('Очистить список ошибок?')) return;
      mistakes = [];
      Store.set('mistakes', mistakes);
      mistakesPage();
      updateNav();
    };
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
    if (L.kind === 'snd') items = shuffle(L.items).slice(0, 15).map(([word, cat]) => ({ t: 'snd', data: { word, cat, cats: L.cats, task: L.task } }));
    else if (L.kind === 'pair') items = shuffle(L.items).slice(0, 12).map(([a, b]) => ({ t: 'pair', data: { a, b } }));
    else items = shuffle(L.items).slice(0, 10).map((w) => ({ t: 'speak', data: { full: w } }));
    session({ title: L.title, back: '#/pron', items, onDone: (pct) => saveProg('lab', k, pct) });
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
        <label class="row">Будний набор: <select class="routine"><option value="core">Основной набор · 4 занятия</option><option value="all">Все упражнения юнита</option></select></label>
        <p class="muted small">Основной набор: впиши форму, перефразируй, письмо и диктант. Выбор применяется к незакрытому сегодняшнему дню и следующим дням.</p>
        <p class="muted small">10 XP за новый режим дня · 20 XP за закрытый будний план · 25 XP за повторение выходного · 50 XP за полную неделю. Каждые 200 XP — новый уровень практики.</p>
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
    $('.routine').value = club.policy;
    $('.routine').onchange = (e) => updatePolicy(e.target.value);
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
      Object.keys(localStorage).filter((k) => k.startsWith('egiu:')).forEach((k) => localStorage.removeItem(k));
      location.reload();
    };
  }

  // ---------- маршрутизация ----------
  function updateNav() {
    const c = $('#mcount');
    c.textContent = mistakes.length || '';
    c.hidden = !mistakes.length;
  }

  function route() {
    keyHandler = null;
    if (synth) synth.cancel();
    if (recog) { recog.abort(); recog = null; }
    const p = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    const nav = { u: 'home', calendar: 'calendar', review: 'calendar', mix: 'mix', mistakes: 'mistakes', pron: 'pron', settings: 'settings' }[p[0]] || 'home';
    $$('[data-nav]').forEach((a) => {
      const active = a.dataset.nav === nav;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    if (p[0] === 'u' && D.units[p[1]]) {
      const u = D.units[p[1]];
      if (p[2]) startUnit(u, p[2]);
      else unitPage(u);
    } else if (p[0] === 'calendar') calendarPage(Study.date(p[1]) ? p[1] : todayKey());
    else if (p[0] === 'review') reviewPage(Study.date(p[1]) ? p[1] : todayKey());
    else if (p[0] === 'mix') mixPage();
    else if (p[0] === 'mistakes') mistakesPage();
    else if (p[0] === 'pron') (p[1] ? labRun(p[1]) : labPage());
    else if (p[0] === 'settings') settingsPage();
    else home();
    updateNav();
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', route);
  route();
})();
