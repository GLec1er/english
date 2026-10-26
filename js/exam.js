/* Mixed unit assessments; only complete attempts can unlock course closure. */
(function(root) {
  'use strict';
  const Study = typeof module !== 'undefined' && module.exports ? require('./study.js') : root.EGIUStudy;
  const modes = ['mc','fill','order','lgap','dict','err','tr'];
  const key = it => it.ref.b ? `${it.ref.u}:${it.ref.b}:${it.ref.v}:${it.ref.k}:${it.ref.i}` : `${it.ref.u}:${it.ref.k}:${it.ref.i}`;
  const validRef = r => r && Number.isInteger(r.u) && r.u >= 1 && r.u <= 145 && Number.isInteger(r.i) && r.i >= 0 && r.i < ({gap:8,err:3,tr:2}[r.k] || 0) && (!r.b || (r.b==='transfer' && ['A','B'].includes(r.v)));
  function select(pool, random = Math.random) {
    const bag = pool.slice(), used = new Set(), chosen = [];
    function take(t, n) {
      for (let i=0; i<n; i++) {
        const candidates = bag.filter(it => it.t===t && validRef(it.ref) && !used.has(key(it)));
        if (!candidates.length) break;
        const it = candidates[Math.floor(random()*candidates.length)];
        chosen.push(it); used.add(key(it));
      }
    }
    // Reserve order-compatible sentences first; fill covers unavailable slots.
    take('order',2); take('mc',2); take('fill',2); take('lgap',1); take('dict',1);
    take('fill',8-chosen.length); take('err',3); take('tr',2);
    return chosen;
  }
  function cleanAttempt(raw, unit) {
    if (!raw || typeof raw.id!=='string' || !raw.id || raw.id.length>100 || !Study.date(raw.day) || !Array.isArray(raw.items) || raw.items.length!==13) return null;
    const items = raw.items.filter(it => it && modes.includes(it.t) && validRef(it.ref) && it.ref.u===unit && (it.ref.k==='gap' ? ['mc','fill','order','lgap','dict'].includes(it.t) : it.t===it.ref.k)).map(it=>({t:it.t,ref:{u:unit,k:it.ref.k,i:it.ref.i,...(it.ref.b?{b:it.ref.b,v:it.ref.v}:{})}}));
    if(items.length!==13 || new Set(items.map(key)).size!==13) return null;
    const answers={};
    items.forEach(it=>{const a=raw.answers && raw.answers[key(it)];if(a&&typeof a.ok==='boolean')answers[key(it)]={ok:a.ok,user:typeof a.user==='string'?a.user.slice(0,5000):'',...(a.ok&&a.accepted===true?{accepted:true}:{}),...(a.ok&&a.correction==='spelling'?{correction:'spelling'}:{})};});
    const manualPass=Object.keys(answers).length===13&&Study.date(raw.manualPass?.day)&&raw.manualPass.day>=raw.day?{day:raw.manualPass.day}:null;
    return {id:raw.id,day:raw.day,items,answers,...(manualPass?{manualPass}:{}),...(Study.date(raw.startedDay)&&raw.startedDay<=raw.day?{startedDay:raw.startedDay}:{}),...(Study.date(raw.lessonDay)&&!Study.isWeekend(raw.lessonDay)&&raw.lessonDay<=raw.day?{lessonDay:raw.lessonDay}:{})};
  }
  function normalize(raw) {
    const state={version:1,units:{}};
    Object.entries(raw && raw.units || {}).forEach(([n,v])=>{
      const u=+n;if(!Number.isInteger(u)||u<1||u>145||!v)return;
      const ids=new Set(),history=[];
      (Array.isArray(v.history)?v.history:[]).forEach(a=>{a=cleanAttempt(a,u);if(a&&Object.keys(a.answers).length===13&&!ids.has(a.id)){ids.add(a.id);history.push(a);}});
      const draft=cleanAttempt(v.draft,u);
      if(draft)delete draft.manualPass;
      state.units[u]={history,draft:draft&&!ids.has(draft.id)?draft:null};
    });
    return state;
  }
  const passed=attempt=>!!attempt&&Object.keys(attempt.answers).length===13&&(Object.values(attempt.answers).filter(r=>r.ok).length/13>=0.8||!!(Study.date(attempt.manualPass?.day)&&attempt.manualPass.day>=attempt.day));
  function status(state,unit) {
    const row=state.units && state.units[unit] || {history:[],draft:null};
    const grades=row.history.map(a=>Object.values(a.answers).filter(r=>r.ok).length);
    const last=row.history[row.history.length-1] || null;
    return {draft:row.draft,answered:row.draft?Object.keys(row.draft.answers).length:0,attempts:row.history.length,passed:row.history.some(passed),best:grades.length?Math.round(Math.max(...grades)/13*100):null,last};
  }
  function start(state,unit,items,id,day,lessonDay=day) {
    state=normalize(state);const draft=cleanAttempt({id,day,startedDay:day,lessonDay,items,answers:{}},unit);if(!draft)return state;
    const row=state.units[unit] || {history:[],draft:null};
    if(row.draft || row.history.some(a=>a.id===id))return state;
    return {...state,units:{...state.units,[unit]:{...row,draft}}};
  }
  function answer(state,unit,itemKey,result) {
    const row=state.units && state.units[unit],a=row && row.draft;
    if(!a || a.answers[itemKey] || !a.items.some(it=>key(it)===itemKey) || typeof result.ok!=='boolean')return state;
    return {...state,units:{...state.units,[unit]:{...row,draft:{...a,answers:{...a.answers,[itemKey]:{ok:result.ok,user:String(result.user || '').slice(0,5000)}}}}}};
  }
  function finish(state,unit,day,lessonDay) {
    const row=state.units && state.units[unit],a=row && row.draft;
    if(!a || Object.keys(a.answers).length!==13)return state;
    return {...state,units:{...state.units,[unit]:{history:row.history.concat({...a,startedDay:a.startedDay||a.day,day:Study.date(day)?day:a.day,...(Study.date(lessonDay)&&!Study.isWeekend(lessonDay)&&lessonDay<=(Study.date(day)?day:a.day)?{lessonDay}: {})}),draft:null}}};
  }
  const canClose=(state,unit,complete)=>complete===true && status(state,unit).passed;
  function credit(state,unit,id,day){
    const row=state.units&&state.units[unit],attempt=row&&row.history.find(a=>a.id===id),clean=cleanAttempt(attempt,unit);
    if(!row||row.draft||!clean||Object.keys(clean.answers).length!==13||!Study.date(day)||day<attempt.day||passed(attempt))return state;
    return {...state,units:{...state.units,[unit]:{...row,history:row.history.map(a=>a.id===id?{...a,manualPass:{day}}:a)}}};
  }
  function accept(state,unit,id,itemKey,user,reason){
    const row=state.units&&state.units[unit],attempt=row&&row.history.find(a=>a.id===id),answer=attempt&&attempt.answers[itemKey];
    if(!answer||answer.ok||answer.user!==user)return state;
    const amended={...attempt,answers:{...attempt.answers,[itemKey]:{...answer,ok:true,accepted:true,...(reason==='spelling'?{correction:'spelling'}:{})}}};
    return {...state,units:{...state.units,[unit]:{...row,history:row.history.map(a=>a.id===id?amended:a)}}};
  }
  const api={key,select,normalize,start,answer,finish,status,canClose,accept,credit,passed};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.EGIUExam=api;
})(typeof window==='undefined'?globalThis:window);
