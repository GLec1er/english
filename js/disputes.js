/* Exercise-specific AI adjudication cache and explicit correction of saved error events. */
(function(root){
 'use strict';
 const node=typeof module!=='undefined'&&module.exports;
 const A=node?require('./ai-tutor.js'):root.EGIUAITutor,Study=node?require('./study.js'):root.EGIUStudy;
 const R=node?require('./review.js'):root.EGIUReview,S=node?require('./steps.js'):root.EGIUSteps,E=node?require('./exam.js'):root.EGIUExam;
 function exercise(it,rule){
  if(!it||!it.ref||!it.data||!['mc','fill','order','err','tr','lgap','dict','speak'].includes(it.t))return null;
  const d=it.data,mode=it.t,listening=['lgap','dict','speak'].includes(mode),whole=['order','dict','speak'].includes(mode);
  const expected=mode==='lgap'?[d.correct]:mode==='dict'||mode==='speak'?[d.full]:mode==='order'?(d.orderAnswers||[d.full]):(d.expectedAnswers||d.answers||d.a);
  const prompt=whole?mode==='order'?'Собери предложение из выданных слов.':'Запиши услышанное предложение целиком.':it.ref.k==='gap'?d.before+'___'+d.after:d.q;
  return A.exerciseContext({mode,prompt,expected,rule:rule||'',hint:!whole&&!listening?d.hint||'':'',meaning:d.meaning||'',words:mode==='order'?d.full.replace(/[.!?]$/,'').split(' '):[],heard:listening?d.full:''});
 }
 const identity=(exercise,source,model)=>JSON.stringify({exercise:A.exerciseContext(exercise),source,model});
 function normalize(raw){
  const out=[];
  for(const r of (Array.isArray(raw)?raw:[]).slice(-200)){
   if(!r||!A.models[r.model]||typeof r.source!=='string'||r.source.length>4000||!Study.date(r.day))continue;
   try{const row={exercise:A.exerciseContext(r.exercise),source:r.source,model:r.model,day:r.day,cost:Number.isFinite(r.cost)&&r.cost>=0?r.cost:null,review:A.parseDispute(JSON.stringify(r.review))};const id=identity(row.exercise,row.source,row.model),index=out.findIndex(x=>identity(x.exercise,x.source,x.model)===id);if(index>=0)out.splice(index,1);out.push(row);}catch(e){}
  }
  return out;
 }
 const cached=(rows,exercise,source,model)=>normalize(rows).find(r=>identity(r.exercise,r.source,r.model)===identity(exercise,source,model))||null;
 const remember=(rows,r)=>normalize(rows.concat(r));
 function resolve(state,row){
  const current=state.mistakes.find(r=>R.key(r)===R.key(row));
  if(!current||current.lastEvent!==row.lastEvent||current.lastAnswer!==row.lastAnswer)return state;
  const mistakes=R.dismiss(state.mistakes,row,row.lastEvent,row.lastAnswer),errorEvent=row.lapses===1&&row.createdEvent?row.createdEvent:row.lastEvent;
  if(mistakes.length===state.mistakes.length&&mistakes.every((r,i)=>r===state.mistakes[i]))return state;
  let steps=state.steps,exams=state.exams,activity=state.activity;
  const entryId=row.u+':'+row.lastMode,key=row.k+':'+row.i,entry=steps[entryId];
  if(!row.b&&entry){const accepted=S.accept(entry,key,errorEvent,row.lastAnswer);if(accepted!==entry){steps={...steps,[entryId]:accepted};const eventId=entry.answers[key].eventId;activity=activity.map(e=>e.id===eventId?{...e,correct:Math.min(e.answers,e.correct+1)}:e);}}
  for(const a of E.status(exams,row.u).last?[...(exams.units[row.u].history)]:[]){
   const it=a.items.find(it=>a.id+':'+E.key(it)===errorEvent&&R.key(it.ref)===R.key(row));if(!it)continue;
   const accepted=E.accept(exams,row.u,a.id,E.key(it),row.lastAnswer);if(accepted!==exams){exams=accepted;const attempt=exams.units[row.u].history.find(x=>x.id===a.id),correct=Object.values(attempt.answers).filter(x=>x.ok).length;activity=activity.map(e=>e.session===a.id&&e.kind==='exam'?{...e,correct}:e);}
  }
  return {...state,mistakes,steps,exams,activity};
 }
 const api={exercise,normalize,cached,remember,resolve};if(node)module.exports=api;else root.EGIUDisputes=api;
})(typeof window==='undefined'?globalThis:window);
