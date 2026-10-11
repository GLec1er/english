/* English Grammar in Use — тренажёр */
(function () {
  'use strict';

  const D = window.EGIU;
  const app = document.getElementById('app');
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ESC[c]);
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

  const DEFAULTS = { accent: 'en-GB', voice: '', rate: 0.95, autoplay: true, mixCount: 15 };
  const settings = Object.assign({}, DEFAULTS, Store.get('settings', {}));
  const saveSettings = () => Store.set('settings', settings);

  const progress = Store.get('progress', {});
  const getProg = (key, t) => (progress[key] && progress[key][t]) || null;
  function saveProg(key, t, pct) {
    const p = (progress[key] = progress[key] || {});
    const prev = p[t] || { best: 0 };
    p[t] = { best: Math.max(prev.best, pct), last: pct, ts: Date.now() };
    Store.set('progress', progress);
  }

  const book = Store.get('book', {});
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
    mc: { name: 'Выбор ответа', icon: '☑️', group: 'g', kind: 'gap', desc: 'выберите правильную форму' },
    fill: { name: 'Впиши форму', icon: '✏️', group: 'g', kind: 'gap', desc: 'напишите слово в нужной форме' },
    order: { name: 'Порядок слов', icon: '🧩', group: 'g', kind: 'order', desc: 'соберите предложение' },
    err: { name: 'Найди ошибку', icon: '🔍', group: 'g', kind: 'err', desc: 'исправьте предложение' },
    tr: { name: 'Перефразируй', icon: '🔁', group: 'w', kind: 'tr', desc: 'напишите предложение по заданию' },
    write: { name: 'Свободное письмо', icon: '📝', group: 'w', kind: 'write', desc: 'короткий текст на тему юнита' },
    lgap: { name: 'Услышь и впиши', icon: '👂', group: 'l', kind: 'gap', desc: 'прослушайте и заполните пропуск' },
    dict: { name: 'Диктант', icon: '🎧', group: 'l', kind: 'gap', desc: 'запишите предложение на слух' },
    speak: { name: 'Произнеси', icon: '🎤', group: 'p', kind: 'gap', desc: 'повторите вслух — браузер проверит' },
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
  const audioBtns = () =>
    '<div class="audio"><button class="btn play" type="button">▶ Слушать</button>' +
    '<button class="btn play" type="button" data-rate="0.6">🐢 Медленно</button></div>';
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
        <p class="sent">${esc(g.before)}<span class="gap">&nbsp;</span>${esc(g.after)}</p>
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
        <p class="sent">${esc(g.before)}<input class="gapin" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">${!listenMode && g.hint ? `<span class="hint">(${esc(g.hint)})</span>` : ''}${esc(g.after)}</p>
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
        <textarea class="textin" rows="2" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="Пишите здесь…"></textarea>`;
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
        <p class="sent wrongsent">${esc(e.q)}</p>
        <textarea class="textin" rows="2" autocomplete="off" spellcheck="false"></textarea>`;
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
        <p class="sent">${esc(t.q)}</p>
        <textarea class="textin" rows="2" autocomplete="off" spellcheck="false" placeholder="Ваш вариант…"></textarea>`;
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
        <p class="sent big">${esc(text)}</p>
        <div class="audio">
          <button class="btn play" type="button">▶ Слушать</button>
          <button class="btn play" type="button" data-rate="0.6">🐢 Медленно</button>
          ${SR ? '<button class="btn mic" type="button">🎤 Говорить</button>' : '<button class="btn rec" type="button">⏺ Записать себя</button>'}
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
              <div class="pct">${pct}% ${pct >= 90 ? '🌟 Отлично!' : pct >= 70 ? '👍 Хорошо' : '— попробуйте ещё раз (красные слова)'}</div>`;
          }, (on) => {
            mic.classList.toggle('on', on);
            mic.textContent = on ? '⏹ Слушаю…' : '🎤 Говорить';
          });
        };
        return { check: () => finish({ ok: best >= 0.8, score: best, note: `лучший результат: ${Math.round(best * 100)}%`, say: null }), label: 'Готово' };
      }
      // нет распознавания речи: записываем себя и сравниваем на слух
      res.innerHTML = '<p class="muted small">Браузер не умеет распознавать речь (лучше всего работает Chrome). Запишите себя, сравните с образцом и оцените сами.</p><div class="recout"></div><div class="selfrate"><button class="btn good" type="button">👍 Похоже</button><button class="btn bad" type="button">🔁 Нужно ещё</button></div>';
      wireRecorder($('.rec', area), $('.recout', area));
      $('.selfrate .good', area).onclick = () => finish({ ok: true });
      $('.selfrate .bad', area).onclick = () => finish({ ok: false, say: null });
      return {};
    },

    snd(area, d, finish) {
      area.innerHTML = `<div class="task">${esc(d.task)}</div>
        <p class="sent big">${esc(d.word)} <button class="btn small play" type="button">🔊</button></p>
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
          btn.textContent = '⏺ Записать ещё раз';
          btn.classList.remove('on');
        };
        rec.start();
        btn.textContent = '⏹ Стоп';
        btn.classList.add('on');
      } catch (e) {
        toast('Нет доступа к микрофону');
      }
    };
  }

  // ---------- сессия упражнений ----------
  let keyHandler = null;
  document.addEventListener('keydown', (e) => keyHandler && keyHandler(e));

  function session({ title, back, items, onDone }) {
    let pos = 0, ctl = {}, answered = false;
    const res = [];
    app.innerHTML = `<div class="session">
      <div class="sess-top">
        <button class="btn ghost quit" type="button" title="Выйти">✕</button>
        <div class="bar"><i></i></div><span class="count"></span>
      </div>
      <div class="sess-title">${esc(title)}</div>
      <div class="card ex"><div class="area"></div><div class="fb"></div>
        <div class="actions"><button class="btn primary main" type="button"></button></div>
      </div></div>`;
    const area = $('.area'), fb = $('.fb'), btn = $('.main'), bar = $('.bar i'), count = $('.count');
    $('.quit').onclick = () => go(back);

    function show() {
      answered = false;
      fb.className = 'fb';
      fb.innerHTML = '';
      count.textContent = `${pos + 1} / ${items.length}`;
      bar.style.width = (pos / items.length) * 100 + '%';
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
        fb.innerHTML = `<div class="verdict">${r.ok ? '✅ Верно!' : '❌ Не совсем'}${r.note ? ` <small>(${esc(r.note)})</small>` : ''}</div>
          ${r.correct ? `<div class="answer">${r.ok ? '' : '<span class="lbl">Правильно:</span> '}${r.correct}</div>` : ''}
          <div class="fb-actions">
            ${r.say ? '<button class="btn small say" type="button">🔊 Послушать</button>' : ''}
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
      keyHandler = null;
      bar.style.width = '100%';
      const pct = Math.round((res.reduce((s, r) => s + r.score, 0) / res.length) * 100);
      if (onDone) onDone(pct);
      const wrong = res.filter((r) => !r.ok);
      const msg = pct >= 90 ? '🏆 Превосходно!' : pct >= 70 ? '👍 Хороший результат' : pct >= 50 ? '💪 Неплохо, но стоит повторить' : '📖 Перечитайте правило и попробуйте снова';
      $('.ex').innerHTML = `<div class="summary">
        <div class="bigpct">${pct}%</div><p>${msg}</p>
        ${wrong.length ? `<h3>Ошибки (${wrong.length})</h3><ul class="wronglist">${wrong.map((r) => `<li>${r.correct || esc(r.item.data.full || '')}${r.user ? `<div class="muted small">ваш ответ: ${esc(r.user)}</div>` : ''}</li>`).join('')}</ul>` : ''}
        <div class="actions">
          ${wrong.length ? '<button class="btn primary again-wrong" type="button">Повторить ошибки</button>' : ''}
          <button class="btn again" type="button">Ещё раз</button>
          <button class="btn ghost back" type="button">Назад</button>
        </div></div>`;
      const aw = $('.again-wrong');
      if (aw) aw.onclick = () => session({ title, back, items: shuffle(wrong.map((r) => r.item)), onDone: null });
      $('.again').onclick = () => session({ title, back, items: shuffle(items), onDone });
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

  function unitRow(u) {
    const pct = unitPct(u);
    return `<a class="urow" href="#/u/${u.n}">
      <span class="unum">${u.n}</span><span class="utitle">${esc(u.title)}</span>
      ${book[u.n] ? '<span class="bk" title="Выполнен в книге">📗</span>' : ''}
      <span class="upct">${pct ? pct + '%' : ''}</span>${bar(pct)}</a>`;
  }

  function home() {
    const last = D.units[Store.get('last', 0)];
    const started = D.list.filter((u) => unitPct(u) > 0).length;
    const inBook = D.list.filter((u) => book[u.n]).length;
    app.innerHTML = `
      <section class="hero card">
        <h1>Тренажёр по English Grammar in Use</h1>
        <p>Все ${D.list.length} юнитов книги Raymond Murphy. Для каждой темы — задания на грамматику, письмо, аудирование и произношение.</p>
        <div class="stats">
          <div><b>${started}</b><span>юнитов начато</span></div>
          <div><b>${inBook}</b><span>отмечено в книге</span></div>
          <div><b>${mistakes.length}</b><span>ошибок на повтор</span></div>
        </div>
        ${last ? `<a class="btn primary" href="#/u/${last.n}">Продолжить: Unit ${last.n} →</a>` : ''}
      </section>
      <input class="search" type="search" placeholder="Поиск: номер юнита или тема (например, 12 или passive)">
      <div class="sections"></div>`;
    const box = $('.sections');
    const drawSections = () => {
      box.innerHTML = D.sections.map((s) => {
        const pct = Math.round(s.units.reduce((a, u) => a + unitPct(u), 0) / s.units.length);
        const open = last && last.section === s;
        return `<details class="sec card"${open ? ' open' : ''}>
          <summary><span class="sec-t">${esc(s.en)}<small>${esc(s.ru)} · юниты ${s.units[0].n}–${s.units[s.units.length - 1].n}</small></span><span class="upct">${pct ? pct + '%' : ''}</span></summary>
          <div class="ulist">${s.units.map(unitRow).join('')}</div></details>`;
      }).join('');
    };
    drawSections();
    $('.search').oninput = (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) return drawSections();
      const hits = D.list.filter((u) => String(u.n) === q || u.title.toLowerCase().includes(q) || u.section.en.toLowerCase().includes(q) || u.section.ru.toLowerCase().includes(q));
      box.innerHTML = `<div class="card ulist">${hits.map(unitRow).join('') || '<p class="muted">Ничего не найдено</p>'}</div>`;
    };
  }

  function unitPage(u) {
    prep(u);
    Store.set('last', u.n);
    const prev = D.units[u.n - 1], next = D.units[u.n + 1];
    const groups = {};
    unitTypes(u).forEach((t) => (groups[TYPES[t].group] = groups[TYPES[t].group] || []).push(t));
    app.innerHTML = `
      <div class="crumbs"><a href="#/">Темы</a> › ${esc(u.section.en)}</div>
      <h1 class="utitle-h"><span class="unum big">Unit ${u.n}</span>${esc(u.title)}</h1>
      ${u.tip ? `<div class="tip card">💡 ${esc(u.tip)}</div>` : ''}
      <label class="bookdone"><input type="checkbox"${book[u.n] ? ' checked' : ''}> Юнит в книге выполнен</label>
      ${Object.keys(GROUPS).filter((g) => groups[g]).map((g) => `
        <h3 class="grp">${GROUPS[g]}</h3>
        <div class="grid">${groups[g].map((t) => {
          const p = getProg(u.n, t);
          const n = available(u, t);
          return `<a class="excard card" href="#/u/${u.n}/${t}">
            <span class="ico">${TYPES[t].icon}</span>
            <span class="nm">${TYPES[t].name}</span>
            <span class="ds">${TYPES[t].desc}${t === 'write' ? '' : ` · ${n}`}</span>
            ${p ? `<span class="sc ${p.best >= 80 ? 'hi' : ''}">${t === 'write' ? '✓' : p.best + '%'}</span>` : ''}
          </a>`;
        }).join('')}</div>`).join('')}
      <div class="unav">
        ${prev ? `<a class="btn ghost" href="#/u/${prev.n}">← Unit ${prev.n}</a>` : '<span></span>'}
        ${next ? `<a class="btn ghost" href="#/u/${next.n}">Unit ${next.n} →</a>` : ''}
      </div>`;
    $('.bookdone input').onchange = (e) => {
      if (e.target.checked) book[u.n] = true;
      else delete book[u.n];
      Store.set('book', book);
    };
  }

  function startUnit(u, t) {
    if (!TYPES[t] || !available(u, t)) return go('#/u/' + u.n);
    Store.set('last', u.n);
    if (t === 'write') return writePage(u);
    session({
      title: `Unit ${u.n} · ${TYPES[t].name}`,
      back: '#/u/' + u.n,
      items: unitItems(u, t),
      onDone: (pct) => saveProg(u.n, t, pct),
    });
  }

  function writePage(u) {
    const [task, model] = u.w;
    const key = 'write:' + u.n;
    app.innerHTML = `
      <div class="crumbs"><a href="#/">Темы</a> › <a href="#/u/${u.n}">Unit ${u.n}</a></div>
      <h1>📝 Свободное письмо</h1>
      <div class="card">
        <p class="task">${esc(task)}</p>
        ${u.tip ? `<p class="muted small">Правило: ${esc(u.tip)}</p>` : ''}
        <textarea class="essay" rows="9" spellcheck="true" lang="en" placeholder="Write here…"></textarea>
        <div class="wbar"><span class="wc"></span>
          <button class="btn small listen-me" type="button">🔊 Прочитать мой текст</button>
          <button class="btn small show-model" type="button">Показать пример</button>
        </div>
        <div class="model" hidden><b>Пример:</b> ${esc(model || '')}
          <div><button class="btn small say-model" type="button">🔊</button></div></div>
        <details class="check"><summary>Проверь себя</summary><ul>
          <li>В каждом предложении есть подлежащее и сказуемое?</li>
          <li>Ты использовал(а) грамматику этого юнита хотя бы 3–4 раза?</li>
          <li>Формы глаголов согласованы со временем (вчера → past, сейчас → present…)?</li>
          <li>Прослушай свой текст (кнопка 🔊) — где звучит странно, там часто ошибка.</li>
        </ul></details>
        <div class="actions"><button class="btn primary done" type="button">Готово ✓</button>
          <a class="btn ghost" href="#/u/${u.n}">Назад</a></div>
      </div>`;
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
      toast('Сохранено ✓');
      go('#/u/' + u.n);
    };
  }

  function mixPage() {
    const bookUnits = D.list.filter((u) => book[u.n]);
    const mixTypes = ['mc', 'fill', 'order', 'err', 'tr', 'lgap', 'dict', 'speak'];
    const sel = Store.get('mixTypes', ['mc', 'fill']);
    app.innerHTML = `
      <h1>🎲 Смешанная практика</h1>
      <p class="muted">Случайные задания из выбранных тем — хороший способ повторения.</p>
      <div class="card form">
        <label class="row"><input type="checkbox" class="onlybook"${bookUnits.length ? ' checked' : ' disabled'}> Только юниты, отмеченные «выполнен в книге» (${bookUnits.length})</label>
        <h3>Разделы <button class="btn link small all" type="button">все</button> <button class="btn link small none" type="button">ни одного</button></h3>
        <div class="checks secs">${D.sections.map((s, i) => `<label><input type="checkbox" value="${i}" checked> ${esc(s.en)}</label>`).join('')}</div>
        <h3>Типы заданий</h3>
        <div class="checks types">${mixTypes.map((t) => `<label><input type="checkbox" value="${t}"${sel.includes(t) ? ' checked' : ''}> ${TYPES[t].icon} ${TYPES[t].name}</label>`).join('')}</div>
        <label class="row">Количество заданий: <input type="number" class="cnt" min="5" max="60" value="${settings.mixCount}"></label>
        <div class="actions"><button class="btn primary start" type="button">Начать</button></div>
      </div>`;
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
    app.innerHTML = `
      <h1>🔁 Работа над ошибками</h1>
      <div class="card">
        ${items.length ? `<p>Заданий на повторение: <b>${items.length}</b>. Задание исчезает из списка, когда вы ответите на него правильно.</p>
          <div class="chips">${Object.keys(byUnit).sort((a, b) => a - b).map((n) => `<a class="chip" href="#/u/${n}">Unit ${n} · ${byUnit[n]}</a>`).join('')}</div>
          <div class="actions"><button class="btn primary start" type="button">Повторить (до 20)</button>
          <button class="btn ghost clear" type="button">Очистить список</button></div>`
        : '<p>Ошибок нет 🎉 Здесь будут собираться задания, в которых вы ошиблись.</p>'}
      </div>`;
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
      <h1>🔊 Звуки и произношение</h1>
      <p class="muted">Темы произношения, которые чаще всего связаны с грамматикой: окончания, сокращения, слабые формы.</p>
      <div class="grid">${Object.keys(L).map((k) => {
        const p = getProg('lab', k);
        return `<a class="excard card" href="#/pron/${k}"><span class="ico">${L[k].icon}</span><span class="nm">${esc(L[k].title)}</span><span class="ds">${esc(L[k].short)}</span>${p ? `<span class="sc ${p.best >= 80 ? 'hi' : ''}">${p.best}%</span>` : ''}</a>`;
      }).join('')}</div>
      ${Object.keys(L).map((k) => `<div class="card tip"><b>${L[k].icon} ${esc(L[k].title)}.</b> ${esc(L[k].tip)}</div>`).join('')}
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
    app.innerHTML = `
      <h1>⚙️ Настройки</h1>
      <div class="card form">
        <label class="row">Акцент:
          <select class="accent"><option value="en-GB">британский (как в книге)</option><option value="en-US">американский</option></select></label>
        <label class="row">Голос:
          <select class="voice"><option value="">автоматически</option>${voices.map((v) => `<option value="${esc(v.voiceURI)}">${esc(v.name)} (${esc(v.lang)})</option>`).join('')}</select></label>
        <label class="row">Скорость речи: <input type="range" class="rate" min="0.5" max="1.3" step="0.05"> <span class="ratev"></span></label>
        <div><button class="btn small test" type="button">🔊 Проверить голос</button></div>
        <label class="row"><input type="checkbox" class="autoplay"> Озвучивать правильный ответ после проверки</label>
        <p class="muted small">Озвучка: ${synth ? 'доступна' : 'недоступна'} · Распознавание речи: ${SR ? 'доступно' : 'недоступно (используйте Chrome)'}</p>
      </div>
      <div class="card form">
        <h3>Прогресс</h3>
        <p class="muted small">Прогресс хранится только в этом браузере. Чтобы перенести его на другое устройство, сохраните файл и загрузите его там.</p>
        <div class="actions">
          <button class="btn export" type="button">💾 Сохранить в файл</button>
          <label class="btn">📂 Загрузить из файла<input type="file" class="import" accept=".json" hidden></label>
          <button class="btn ghost danger reset" type="button">Сбросить всё</button>
        </div>
      </div>`;
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
    const nav = { u: 'home', mix: 'mix', mistakes: 'mistakes', pron: 'pron', settings: 'settings' }[p[0]] || 'home';
    $$('[data-nav]').forEach((a) => a.classList.toggle('active', a.dataset.nav === nav));
    if (p[0] === 'u' && D.units[p[1]]) {
      const u = D.units[p[1]];
      if (p[2]) startUnit(u, p[2]);
      else unitPage(u);
    } else if (p[0] === 'mix') mixPage();
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
