/* Idempotent repair of confirmed spelling-only false rejections in immutable assessment banks. */
(function(root){
 'use strict';
 const node=typeof module!=='undefined'&&module.exports;
 const E=node?require('./exam.js'):root.EGIUExam,R=node?require('./review.js'):root.EGIUReview,L=node?require('./learning.js'):root.EGIULearning,N=node?require('./notes.js'):root.EGIUNotes;
 function repairSpelling(state,day){
  let exams=state.exams,mistakes=state.mistakes,activity=state.activity,learning=state.learning;const changes=[];
  for(const [n,row] of Object.entries(state.exams.units||{}))for(const attempt of row.history)for(const item of attempt.items){
   const key=E.key(item),answer=attempt.answers[key];if(!item.ref.b||answer.ok||! /\borgani[sz](e|es|ed|ing)\b/i.test(answer.user))continue;
   const q=L.question(item.ref);if(!q)continue;
   const expected=['dict','order'].includes(item.t)?[q.data.full]:item.t==='lgap'?[q.data.correct]:q.data.answers||q.data.a;
   if(!expected||!N.spellingOnlyMatch(answer.user,expected))continue;
   exams=E.accept(exams,+n,attempt.id,key,answer.user,'spelling');mistakes=R.undo(mistakes,item.ref,attempt.id+':'+key);changes.push({unit:+n,attempt:attempt.id,key});
  }
  if(!changes.length)return {...state,changes};
  const affected=new Set(changes.map(c=>c.attempt));
  activity=activity.map(e=>{if(e.kind!=='exam'||!affected.has(e.session))return e;const attempt=Object.values(exams.units).flatMap(r=>r.history).find(a=>a.id===e.session);return {...e,correct:Object.values(attempt.answers).filter(a=>a.ok).length};});
  for(const n of new Set(changes.map(c=>c.unit))){
   const old=state.learning.evidence[n]?.application,seen=state.learning.seen.filter(k=>k.startsWith(n+':transfer:')),first=new Map();
   for(const a of state.exams.units[n].history)for(const it of a.items){const k=E.key(it);if(it.ref.b&&seen.includes(k)&&!first.has(k))first.set(k,{attempt:a.id,form:it.ref.v,ok:a.answers[k].ok});}
   // Reconstruct evidence only when its first recorded form was this exact exam.
   if(!old||first.size!==seen.length||old.total!==first.size||old.correct!==[...first.values()].filter(r=>r.ok).length||[...first.values()].some(r=>state.learning.forms[n]?.find(f=>f.v===r.form)?.event!==r.attempt))continue;
   let correct=0;for(const [k,r] of first){const a=exams.units[n].history.find(a=>a.id===r.attempt);if(a.answers[k].ok)correct++;}
   learning={...learning,evidence:{...learning.evidence,[n]:{...learning.evidence[n],application:{correct,total:old.total}}}};
  }
  return {...state,exams,mistakes,activity,learning,changes};
 }
 const api={repairSpelling};if(node)module.exports=api;else root.EGIUCorrections=api;
})(typeof window==='undefined'?globalThis:window);
