/* Weekly review: explanation, original response and two related examples. */
(function(root){
 'use strict';
 root.EGIUWeeklyUI=function(host){
  const {W,P,app,$,esc,getState,setState,today,dateLabel,weekLabel,units,sourceItem,answerNote,R,Notes,go,record,correctActivity,originalAnswer,undoOriginal,appeal,setKeys}=host;
  const save=s=>setState(s),path=(week,k)=>'#/weekly/'+week+(k?'/'+encodeURIComponent(k):'');
  const source=row=>sourceItem(row),channel=g=>g.kind==='listening'?'На слух':'Грамматика';
  function banner(day=today()){
   const st=W.status(getState(),day),info=st.blocked?st.debts[0]:st.current;
   if(!info.pending)return '';
   const deadline=host.shift(info.week,7);
   return `<section class="weekly-notice${st.blocked?' is-blocked':''}" aria-label="Обязательная работа над ошибками"><span class="eyebrow">Ошибки недели</span><h2>${st.blocked?'Сначала закрепи ошибки предыдущей недели':'Подготовься к следующей неделе'}</h2><p>${st.blocked?'Новые юниты откроются после работы над ошибками. Пройденные юниты и повторение доступны.':`До понедельника, ${dateLabel(deadline)}, разбери ошибки этой недели. Новые уроки откроются только после этой работы.`}</p><div class="weekly-notice-footer"><span>${info.done} / ${info.total} тем закреплено</span><a class="btn ${st.blocked?'primary':''} small" href="${path(info.week)}">Разобрать ошибки · ${info.pending}</a></div></section>`;
  }
  function blockedPage(){app.innerHTML=`<div class="page-narrow"><span class="eyebrow">The Study Club / Revision first</span><h1>Сначала работа над ошибками</h1>${banner()}<a class="btn ghost" href="#/">К оглавлению</a></div>`;}
  function page(week){
   const state=getState(),st=W.status(state,today());week=week||st.oldest||st.current.week;
   const info=W.weekStatus(state,week),groups=W.groups(state,week),pending=groups.filter(g=>!g.done),completed=groups.filter(g=>g.done);
   const cards=list=>list.map(g=>`<article class="card weekly-error${g.done?' is-complete':''}"><div class="weekly-error-heading"><b>Unit ${g.unit} · <span lang="en">${esc(units[g.unit].title)}</span></b><span>${g.steps} / 4</span></div><p class="revision-topic-meta">${channel(g)} · исходных ошибок: ${g.rows.length}</p><p>${g.done?'Общий разбор темы закрыт':g.steps?'Продолжи с сохранённого шага.':'Один разбор и три ответа для всей группы.'}</p><a class="btn ${g.done?'ghost':'primary'} small" href="${path(week,g.id)}">${g.done?'Посмотреть разбор':'Разобрать тему'}</a></article>`).join('');
   app.innerHTML=`<div class="page-narrow weekly-page"><span class="eyebrow">The Study Club / Weekend revision</span><h1>Ошибки недели</h1><p class="page-intro">${weekLabel(week)}<br>Похожие ошибки объединены по теме юнита. На каждую тему: разбор → исправление → два новых примера. На слух — отдельная группа.</p>${st.blocked?banner():''}<section class="card weekly-overview" aria-label="Прогресс работы над ошибками недели"><h2>${info.pending?'Закрепить перед новой неделей':info.total?'Недельная работа завершена':'На этой неделе ошибок нет'}</h2><p class="revision-topic-meta">Исходных ошибок: ${groups.reduce((n,g)=>n+g.rows.length,0)} · тем для разбора: ${info.total}</p><div class="review-stats weekly-counts"><div><b>${info.pending}</b><span>тем осталось</span></div><div><b>${info.done}</b><span>тем закреплено</span></div><div><b>${info.total}</b><span>тем за неделю</span></div></div>${info.total?`<div class="club-meter" role="progressbar" aria-label="Шаги разбора ошибок недели" aria-valuemin="0" aria-valuemax="${info.total*4}" aria-valuenow="${info.steps}"><i style="width:${info.steps/(info.total*4)*100}%"></i></div><p class="weekly-progress">${info.steps} / ${info.total*4} шагов выполнено</p>`:''}<p class="muted small">После разбора и трёх верных ответов вся группа уходит из незавершённого списка. Исходные ответы сохраняются. Интервальные повторения через несколько дней сохраняются отдельно; будущие даты не входят в счётчик меню.</p>${!info.pending?'<a class="btn primary" href="#/calendar">К календарю</a>':''}</section><div class="weekly-pending">${cards(pending)}</div>${completed.length?`<details class="weekly-completed"><summary>Разобрано за неделю · ${completed.length}</summary><p class="muted small">Недельная работа по этим ошибкам завершена и сохранена. Дальнейшее закрепление идёт по расписанию интервальных повторений.</p>${cards(completed)}</details>`:''}${st.debts.filter(w=>w.week!==week).map(w=>`<a class="aside-link" href="${path(w.week)}">${weekLabel(w.week)} · осталось ${w.pending}</a>`).join('')}<a class="btn ghost" href="#/mistakes">Интервальное повторение →</a></div>`;
  }
  function run(week,k){
   let group=W.groups(getState(),week).find(g=>g.id===k||g.rows.some(r=>W.key(r.ref)===k));if(!group)return page(week);
   const id=group.id;let row=group.source;
   if(!group.done&&host.beforePractice&&!host.beforePractice(row.ref.u))return;
   const original=source(row);if(!original){app.innerHTML='<div class="page-narrow"><h1>Задание недоступно</h1><p>Сохрани прогресс в настройках: исходный пример нужно восстановить перед зачётом.</p><a href="#/settings">Настройки</a></div>';return;}
   const note=answerNote(original,{ok:false}),drills=P.drills(original);
   const other=group.rows.find(r=>W.key(r.ref)!==W.key(row.ref)&&!W.done(r));
   if(other){const item=source(other);if(item)drills[1]=P.drills(item)[1];}
   const refresh=()=>{group=W.groups(getState(),week).find(g=>g.id===id);row=group.source;};
   const examples=()=>`<details class="revision-examples"><summary>Все исходные ошибки темы · ${group.rows.length}</summary>${group.rows.map(r=>{const it=source(r);return it?`<article class="revision-example"><p class="muted small">${W.done(r)?'Уже закреплено':'В общем разборе темы'}</p><p lang="en">${esc(it.data.q||it.data.full||'')}</p><p class="muted small">Твой ответ: <span lang="en">${esc(r.user||'∅')}</span></p><p class="small">Верный вариант: <span lang="en">${esc(it.data.full||it.data.a[0])}</span></p>${Notes.render(answerNote(it,{ok:false}))}</article>`:'';}).join('')}</details>`;
   const heading=()=>`<div class="crumbs"><a href="${path(week)}">Ошибки недели</a> / Unit ${row.ref.u}</div><h1 class="weekly-run-title">${esc(units[row.ref.u].title)}</h1><p class="revision-topic-meta">${channel(group)} · исходных ошибок: ${group.rows.length} · один разбор</p><p class="weekly-progress">${group.steps} / 4 шагов · сохраняется сразу</p>`;
   function saveAnswer(phase,result,event){
    const wasDone=group.done;save(W.answerGroup(getState(),week,id,phase,result,event));refresh();
    if(!wasDone&&group.done&&host.groupClosed)host.groupClosed(group.rows,event,{ref:original.ref,mode:original.t});
   }
   function explain(){
    const correct=original.data.full||original.data.a[0];
    app.innerHTML=`<div class="page-narrow weekly-run">${heading()}<div class="card"><span class="eyebrow">Разбор твоей ошибки</span><p class="muted small">Твой ответ</p><p lang="en">${esc(row.user||'∅')}</p><p class="muted small">Верный вариант</p><p class="sent" lang="en">${esc(correct)}</p>${Notes.render(note)}${examples()}<div class="actions"><button class="btn primary weekly-read" type="button">Разбор прочитан — проверить себя</button><a class="btn ghost" href="${path(week)}">Продолжить позже</a></div></div></div>`;
    $('.weekly-read').onclick=()=>{save(W.readGroup(getState(),week,id));refresh();show();};
   }
   function show(){
    refresh();
    if(group.done){
     setKeys(null);
     const next=host.nextReview&&host.nextReview(group.rows);
     app.innerHTML=`<div class="page-narrow weekly-run">${heading()}${host.dayCelebration?host.dayCelebration():''}<div class="card weekly-finished"><span class="eyebrow">Недельный разбор закрыт</span><h2>Вся группа закреплена</h2><p>Разбор прочитан, исходный ответ исправлен и два дополнительных задания решены. Исходные ошибки (${group.rows.length}) учтены общим разбором темы.</p>${next?`<p class="weekly-next-review">${next>today()?`Следующая интервальная проверка — <b>${dateLabel(next)}</b>. До этой даты повторять не требуется.`:'Интервальная проверка уже доступна в разделе «Ошибки».'}</p>`:''}${examples()}<a class="btn primary" href="${path(week)}">К остальным ошибкам</a></div></div>`;return;
    }
    const phase=W.phases.find(p=>!row.answers[p]?.ok),index=W.phases.indexOf(phase),it=index===0?original:drills[index-1];
    app.innerHTML=`<div class="page-narrow weekly-run">${heading()}<p class="page-intro">${index===0?'Вспомни и исправь исходное задание без подсказки.':`Дополнительный пример темы · ${index} из 2.`}</p><div class="card ex"><div class="area"></div><div class="fb" role="status" aria-live="polite"></div><div class="actions"><button class="btn primary weekly-check" type="button">Проверить</button><a class="btn ghost" href="${path(week)}">Продолжить позже</a></div></div></div>`;
    const area=$('.area'),fb=$('.fb'),button=$('.weekly-check');let checked=false,result=null,event=null;
    const ctl=R[it.t](area,{...it.data,review:true},finish)||{};button.hidden=!ctl.check;button.textContent=ctl.label||'Проверить';button.onclick=()=>ctl.check&&ctl.check();
    if(index>0&&!['dict','lgap'].includes(it.t))area.insertAdjacentHTML('afterbegin',`<p class="muted small">Сохрани смысл: ${esc(it.note.translation)}</p>`);
    setKeys(e=>{const tag=e.target.tagName;if(e.key==='Enter'&&!e.shiftKey){if(tag==='BUTTON'||tag==='A')return;if(!button.hidden){e.preventDefault();button.click();}}else if(!checked&&ctl.keys&&/^[1-9]$/.test(e.key)&&tag!=='INPUT'&&tag!=='TEXTAREA')ctl.keys(+e.key);});
    function finish(r){
     if(checked)return;checked=true;result=r;event=Date.now()+'-weekly-'+Math.random().toString(36).slice(2);
     saveAnswer(phase,r,event);
     r.activityId=record(row,it,r,event);
     if(index===0)originalAnswer(original,r,event);
     draw();
    }
    function draw(){
     const r=result;fb.className='fb '+(r.ok?'good':'bad');
     const finished=group.done;
     fb.innerHTML=`<div class="verdict">${finished?'Тема закреплена · результат сохранён':r.ok?'Верно · шаг сохранён':'Нужно поправить'}</div>${r.correct?`<div class="answer">${r.correct}</div>`:''}${Notes.render(it.note||note)}${!r.ok?'<div class="answer-dispute"></div>':''}`;
     button.hidden=false;button.textContent=finished?'Разбор завершён →':r.ok?'Следующий шаг →':'Попробовать ещё раз';button.onclick=show;
     if(!r.ok)appeal($('.answer-dispute'),it,r.user,()=>{
      if(result.ok)return false;result.ok=true;result.score=1;saveAnswer(phase,result,event);correctActivity(result.activityId);if(index===0)undoOriginal(original,event);draw();return true;
     });
     $('.weekly-progress').textContent=`${group.steps} / 4 шагов · сохраняется сразу`;
     button.focus();
    }
   }
   if(!row.read)explain();else show();
  }
  return {banner,page,run,blockedPage};
 };
})(typeof window==='undefined'?globalThis:window);
