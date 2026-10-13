/* Optional API calls are initiated only by a labelled user button. Credentials never enter exports. */
(function(root){
 'use strict';
 root.EGIUAITutorUI=function(h){
  const {A,esc,$,getOptions,setOptions,getRows,setRows,today,getReview,saveReview}=h;
  let sessionStore=null,localStore=null;try{sessionStore=root.sessionStorage;}catch(e){}try{localStore=root.localStorage;}catch(e){}
  const keyVault=A.vault(sessionStore,localStore);
  const client=A.client({day:today,getRows,setRows,fetch:(...args)=>root.fetch(...args)});
  const money=n=>n===null?'нет точных данных':new Intl.NumberFormat('ru-RU',{maximumFractionDigits:2,minimumFractionDigits:2}).format(n)+' ₽';
  function settings(container){
   const o=getOptions();container.insertAdjacentHTML('beforeend',`<section class="card api-settings"><h2>Разбор с преподавателем ИИ · необязательно</h2><p>Отправляется только выбранный текст, задание и правило юнита в ProxyAPI и выбранную модель. Запрос выполняется по кнопке; закрытие дня и экзамен от него не зависят.</p><form class="api-form"><label>Модель<select name="model">${Object.entries(A.models).map(([id,m])=>`<option value="${id}"${o.model===id?' selected':''}>${esc(m.name)} · ${m.input}/${m.output} ₽ за 1 млн токенов</option>`).join('')}</select></label><label>API-ключ ProxyAPI<input name="key" type="password" autocomplete="off" placeholder="Вставь ключ сюда, без отправки в чат"></label><label class="api-remember"><input name="remember" type="checkbox"${keyVault.remembered()?' checked':''}> Запомнить ключ на этом устройстве</label><p class="muted small">Без этой отметки ключ хранится до закрытия вкладки. При запоминании — в браузере, отдельно от файла прогресса.</p><label>Лимит приложения на день, ₽<input name="limit" type="number" min="0.1" max="50" step="0.1" value="${o.limit}"></label><div class="actions"><button class="btn primary small" type="submit">Сохранить подключение</button><button class="btn ghost small forget-key" type="button">Удалить ключ из браузера</button></div></form><p class="api-status" role="status">${keyVault.get()?'Ключ добавлен. Платный запрос ещё не выполняется.':'Ключ не добавлен. Локальная проверка работает.'}</p><p>За сегодня учтено ${money(A.spent(getRows(),today()))}. После сетевого сбоя учитывается верхняя оценка возможного списания.</p><p class="muted small">Тарифы сохранены на ${A.PRICE_DATE}; окончательное списание — в ProxyAPI. Для ограничения расходов на стороне сервиса создай отдельный ключ с бюджетом, например 100 ₽ в месяц, и разреши только выбранную модель. <a href="https://proxyapi.ru/docs/api-keys" target="_blank" rel="noopener noreferrer">Настройка бюджета ключа</a> · <a href="https://proxyapi.ru/models/browse" target="_blank" rel="noopener noreferrer">Текущие тарифы</a>.</p><p class="muted small">На запрос: до 4000 символов текста и 2000 выходных токенов, включая рассуждения. Автоматических повторов и перехода на более дорогую модель нет.</p></section>`);
   const form=$('.api-form',container);form.elements.key.value=keyVault.get();form.onsubmit=e=>{e.preventDefault();const limit=Number(form.elements.limit.value);if(!Number.isFinite(limit)||limit<.1||limit>50){$('.api-status',container).textContent='Лимит должен быть от 0,1 до 50 ₽.';return;}try{if(form.elements.key.value.trim())keyVault.set(form.elements.key.value,form.elements.remember.checked);setOptions({model:form.elements.model.value,limit});$('.api-status',container).textContent='Настройки сохранены. Запрос — только по кнопке рядом с текстом.';}catch(e){$('.api-status',container).textContent=e.message;}};$('.forget-key',container).onclick=()=>{keyVault.forget();form.elements.key.value='';$('.api-status',container).textContent='Ключ удалён. Локальная проверка доступна.';};
  }
  const kindLabels={error:'Ошибка формы или смысла',style:'Стиль · необязательно',alternative:'Допустимый вариант',uncertain:'Нужен контекст'};
  function render(r,source){return `<div class="ai-review"><h3>Разбор ${esc(A.models[r.model].name)}</h3><p class="muted small">${r.day} · ${money(r.cost)} по сохранённому тарифу. ${r.source!==source?'Это разбор предыдущей версии текста.':'Сохранённый разбор этого текста.'}</p><p>${esc(r.review.summary)}</p>${r.review.corrections.map(c=>`<article class="ai-correction"><b>${kindLabels[c.kind]}</b><p lang="en">${esc(c.original)} ${c.suggestion?'→ '+esc(c.suggestion):''}</p><p>${esc(c.reason)}</p></article>`).join('')}<details><summary>Версия с минимальными исправлениями</summary><p class="story" lang="en">${esc(r.review.revised)}</p></details><p><b>Закрепление:</b> ${esc(r.review.followUp)}</p><p class="muted small">Подсказки модели могут ошибаться. Сверь смысл и правило; они не изменяют оценку экзамена или ранг.</p></div>`;}
  function attach({container,n,kind,readText,task,rule,applyRevision}){
   container.insertAdjacentHTML('beforeend',`<div class="optional-tutor"><div class="actions"><button class="btn small api-check" type="button">Разобрать через ProxyAPI · платно</button><a class="small" href="#/settings">Настройки и лимит</a></div><p class="muted small">Отправится этот текст и правило юнита. До 4000 символов; без истории занятий и записи голоса.</p><div class="api-output" aria-live="polite"></div></div>`);
   const box=$('.optional-tutor',container),output=$('.api-output',box),button=$('.api-check',box);
   function show(r){output.innerHTML=render(r,readText());if(applyRevision){output.insertAdjacentHTML('beforeend','<button class="btn small apply-revision" type="button">Вставить в исправленную версию</button>');$('.apply-revision',output).onclick=()=>applyRevision(r.review.revised);}}
   const previous=getReview(n,kind);if(previous&&readText().trim())show(previous);
   button.onclick=async()=>{
    const options=getOptions(),text=readText();const old=getReview(n,kind);if(old&&old.source===text&&old.task===task&&old.model===options.model){show(old);return;}
    let price;try{price=A.estimate(A.payload({...options,text,task,rule}));}catch(e){output.textContent=e.message;return;}
    if(!keyVault.get()){output.textContent='Добавь API-ключ в настройках. Локальная проверка остаётся доступной.';return;}
    button.disabled=true;output.textContent=`Выполняется разбор. Верхняя оценка по сохранённому тарифу: ${money(price)}.`;
    try{const result=await client.check({...options,key:keyVault.get(),text,task,rule});const saved={...result,task};saveReview(n,kind,saved);show(saved);}
    catch(e){output.textContent=e.message;}
    finally{button.disabled=false;}
   };
  }
  function attachDispute({container,exercise,text,onAccept}){
   const D=h.Disputes;
   container.insertAdjacentHTML('beforeend','<div class="optional-tutor dispute-tutor"><div class="actions"><button class="btn small dispute-check" type="button">Проверить с ИИ · платно</button><a class="small" href="#/settings">Настройки и лимит</a></div><p class="muted small">ИИ сравнит задание, твой ответ и ответ тренажёра. Разбор сохраняется; зачесть ответ можно отдельной кнопкой.</p><div class="dispute-output" aria-live="polite"></div></div>');
   const box=$('.dispute-tutor',container),output=$('.dispute-output',box),button=$('.dispute-check',box);
   function show(r){
    if(!output.isConnected)return;
    const v=r.review,labels={acceptable:'Твой ответ допустим',incorrect:'Ответ нужно исправить',uncertain:'Не хватает контекста'};
    output.innerHTML=`<div class="ai-adjudication" data-verdict="${v.verdict}"><h3>${labels[v.verdict]}</h3><p class="muted small">${esc(A.models[r.model].name)} · ${r.day} · ${money(r.cost)} по сохранённому тарифу · сохранённый разбор</p><p>${esc(v.explanation)}</p>${v.translation?`<p><b>Перевод:</b> ${esc(v.translation)}</p>`:''}${v.suggestedAnswer?`<p><b>Вариант ответа:</b> <span lang="en">${esc(v.suggestedAnswer)}</span></p>`:''}<p class="muted small">Сверь объяснение с правилом. Оценка изменится только после твоего подтверждения.</p>${v.verdict==='acceptable'&&onAccept?'<button class="btn small primary accept-dispute" type="button">Зачесть мой ответ</button>':''}</div>`;
    const accept=$('.accept-dispute',output);if(accept)accept.onclick=()=>{if(!accept.isConnected)return;accept.disabled=true;if(onAccept()===false){accept.disabled=false;output.insertAdjacentHTML('beforeend','<p>Этот ответ уже изменился. Открой актуальный разбор.</p>');}};
   }
   const old=D.cached(h.getDisputes(),exercise,text,getOptions().model);if(old)show(old);
   button.onclick=async()=>{
    const options=getOptions(),previous=D.cached(h.getDisputes(),exercise,text,options.model);if(previous){show(previous);return;}
    let price;try{price=A.estimate(A.payload({...options,type:'dispute',exercise,text}));}catch(e){output.textContent=e.message;return;}
    if(!keyVault.get()){output.textContent='Добавь API-ключ в настройках. Ручная проверка остаётся доступной.';return;}
    button.disabled=true;output.textContent=`Выполняется проверка. Верхняя оценка по сохранённому тарифу: ${money(price)}.`;
    try{const result=await client.check({...options,type:'dispute',exercise,text,key:keyVault.get()});const saved={...result,exercise};h.setDisputes(D.remember(h.getDisputes(),saved));show(saved);}catch(e){if(output.isConnected)output.textContent=e.message;}finally{button.disabled=false;}
   };
  }
  return {settings,attach,attachDispute,forget:keyVault.forget};
 };
})(window);
