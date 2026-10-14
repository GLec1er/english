/* Weekly review: explanation, original response and two related examples. */
(function(root){
 'use strict';
 root.EGIUWeeklyUI=function(host){
  const {W,P,app,$,esc,getState,setState,today,dateLabel,weekLabel,units,sourceItem,answerNote,R,Notes,go,record,correctActivity,originalAnswer,undoOriginal,appeal,setKeys}=host;
  const save=s=>setState(s),path=(week,k)=>'#/weekly/'+week+(k?'/'+encodeURIComponent(k):'');
  const source=row=>sourceItem(row),rowSteps=r=>(r.read?1:0)+W.phases.filter(p=>r.answers[p]?.ok).length;
  function banner(day=today()){
   const st=W.status(getState(),day),info=st.blocked?st.debts[0]:st.current;
   if(!info.pending)return '';
   const deadline=host.shift(info.week,7);
   return `<section class="weekly-notice${st.blocked?' is-blocked':''}" aria-label="Обязательная работа над ошибками"><span class="eyebrow">Ошибки недели</span><h2>${st.blocked?'Сначала закрепи ошибки предыдущей недели':'Подготовься к следующей неделе'}</h2><p>${st.blocked?'Новые юниты откроются после работы над ошибками. Пройденные юниты и повторение доступны.':`До понедельника, ${dateLabel(deadline)}, разбери ошибки этой недели. Новые уроки откроются только после этой работы.`}</p><div class="weekly-notice-footer"><span>${info.done} / ${info.total} ошибок закреплено</span><a class="btn ${st.blocked?'primary':''} small" href="${path(info.week)}">Разобрать ошибки · ${info.pending}</a></div></section>`;
  }
  function blockedPage(){app.innerHTML=`<div class="page-narrow"><span class="eyebrow">The Study Club / Revision first</span><h1>Сначала работа над ошибками</h1>${banner()}<a class="btn ghost" href="#/">К оглавлению</a></div>`;}
  function page(week){
   const state=getState(),st=W.status(state,today());week=week||st.oldest||st.current.week;
   const info=W.weekStatus(state,week),rows=Object.values(state.weeks[week]||{});
   app.innerHTML=`<div class="page-narrow weekly-page"><span class="eyebrow">The Study Club / Weekend revision</span><h1>Ошибки недели</h1><p class="page-intro">${weekLabel(week)}<br>Разбор → свой ответ → два дополнительных примера темы.</p>${st.blocked?banner():''}<div class="card weekly-overview"><h2>${info.pending?'Закрепить перед новой неделей':info.total?'Недельная работа завершена':'На этой неделе ошибок нет'}</h2><p>${info.done} / ${info.total} ошибок · ${info.steps} / ${info.total*4} шагов</p><p class="muted small">Каждый шаг сохраняется. Повторения через несколько дней продолжатся по своему расписанию.</p>${!info.pending?'<a class="btn primary" href="#/calendar">К календарю</a>':''}</div>${rows.map(r=>`<article class="card weekly-error"><div class="weekly-error-heading"><b>Unit ${r.ref.u} · <span lang="en">${esc(units[r.ref.u].title)}</span></b><span>${rowSteps(r)} / 4</span></div><p class="muted small">Твой ответ: <span lang="en">${esc(r.user||'∅')}</span></p><p>${W.done(r)?'Разобрано и закреплено':r.read?'Разбор прочитан. Продолжи с оставшихся заданий.':'Вспомни, почему этот ответ не подошёл.'}</p><a class="btn ${W.done(r)?'ghost':'primary'} small" href="${path(week,W.key(r.ref))}">${W.done(r)?'Посмотреть разбор':'Продолжить'}</a></article>`).join('')}${st.debts.filter(w=>w.week!==week).map(w=>`<a class="aside-link" href="${path(w.week)}">${weekLabel(w.week)} · осталось ${w.pending}</a>`).join('')}<a class="btn ghost" href="#/mistakes">Интервальное повторение →</a></div>`;
  }
  function run(week,k){
   let row=getState().weeks[week]&&getState().weeks[week][k];if(!row)return page(week);
   const original=source(row);if(!original){app.innerHTML='<div class="page-narrow"><h1>Задание недоступно</h1><p>Сохрани прогресс в настройках: исходный пример нужно восстановить перед зачётом.</p><a href="#/settings">Настройки</a></div>';return;}
   const note=answerNote(original,{ok:false}),drills=P.drills(original);
   const heading=()=>`<div class="crumbs"><a href="${path(week)}">Ошибки недели</a> / Unit ${row.ref.u}</div><h1 class="weekly-run-title">${esc(units[row.ref.u].title)}</h1><p class="weekly-progress">${rowSteps(row)} / 4 шагов · сохраняется сразу</p>`;
   function explain(){
    const correct=original.data.full||original.data.a[0];
    app.innerHTML=`<div class="page-narrow weekly-run">${heading()}<div class="card"><span class="eyebrow">Разбор твоей ошибки</span><p class="muted small">Твой ответ</p><p lang="en">${esc(row.user||'∅')}</p><p class="muted small">Верный вариант</p><p class="sent" lang="en">${esc(correct)}</p>${Notes.render(note)}<div class="actions"><button class="btn primary weekly-read" type="button">Разбор прочитан — проверить себя</button><a class="btn ghost" href="${path(week)}">Продолжить позже</a></div></div></div>`;
    $('.weekly-read').onclick=()=>{save(W.read(getState(),week,k));row=getState().weeks[week][k];show();};
   }
   function show(){
    row=getState().weeks[week][k];
    if(W.done(row)){
     setKeys(null);
     app.innerHTML=`<div class="page-narrow weekly-run">${heading()}${host.dayCelebration?host.dayCelebration():''}<div class="card"><h2>Работа по этой ошибке завершена</h2><p>Разбор прочитан, исходный ответ исправлен и два дополнительных задания решены.</p>${Notes.render(note)}<a class="btn primary" href="${path(week)}">К остальным ошибкам</a></div></div>`;return;
    }
    const phase=W.phases.find(p=>!row.answers[p]?.ok),index=W.phases.indexOf(phase),it=index===0?original:drills[index-1];
    app.innerHTML=`<div class="page-narrow weekly-run">${heading()}<p class="page-intro">${index===0?'Вспомни и исправь исходное задание без подсказки.':`Дополнительный пример темы · ${index} из 2.`}</p><div class="card ex"><div class="area"></div><div class="fb" role="status" aria-live="polite"></div><div class="actions"><button class="btn primary weekly-check" type="button">Проверить</button><a class="btn ghost" href="${path(week)}">Продолжить позже</a></div></div></div>`;
    const area=$('.area'),fb=$('.fb'),button=$('.weekly-check');let checked=false,result=null,event=null;
    const ctl=R[it.t](area,{...it.data,review:true},finish)||{};button.hidden=!ctl.check;button.textContent=ctl.label||'Проверить';button.onclick=()=>ctl.check&&ctl.check();
    if(index>0&&!['dict','lgap'].includes(it.t))area.insertAdjacentHTML('afterbegin',`<p class="muted small">Сохрани смысл: ${esc(it.note.translation)}</p>`);
    setKeys(e=>{const tag=e.target.tagName;if(e.key==='Enter'&&!e.shiftKey){if(tag==='BUTTON'||tag==='A')return;if(!button.hidden){e.preventDefault();button.click();}}else if(!checked&&ctl.keys&&/^[1-9]$/.test(e.key)&&tag!=='INPUT'&&tag!=='TEXTAREA')ctl.keys(+e.key);});
    function finish(r){
     if(checked)return;checked=true;result=r;event=Date.now()+'-weekly-'+Math.random().toString(36).slice(2);
     save(W.answer(getState(),week,k,phase,r,event));
     r.activityId=record(row,it,r,event);
     if(index===0)originalAnswer(original,r,event);
     draw();
    }
    function draw(){
     const r=result;fb.className='fb '+(r.ok?'good':'bad');
     fb.innerHTML=`<div class="verdict">${r.ok?'Верно · шаг сохранён':'Нужно поправить'}</div>${r.correct?`<div class="answer">${r.correct}</div>`:''}${Notes.render(it.note||note)}${!r.ok?'<div class="answer-dispute"></div>':''}`;
     button.hidden=false;button.textContent=r.ok?'Следующий шаг →':'Попробовать ещё раз';button.onclick=show;
     if(!r.ok)appeal($('.answer-dispute'),it,r.user,()=>{
      if(result.ok)return false;result.ok=true;result.score=1;save(W.answer(getState(),week,k,phase,result,event));correctActivity(result.activityId);if(index===0)undoOriginal(original,event);draw();return true;
     });
     $('.weekly-progress').textContent=`${rowSteps(getState().weeks[week][k])} / 4 шагов · сохраняется сразу`;
     button.focus();
    }
   }
   if(!row.read)explain();else show();
  }
  return {banner,page,run,blockedPage};
 };
})(typeof window==='undefined'?globalThis:window);
