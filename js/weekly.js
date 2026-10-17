/* Saved weekly revision is separate from the spaced error journal. */
(function(root){
 'use strict';
 const node=typeof module!=='undefined'&&module.exports;
 const Study=node?require('./study.js'):root.EGIUStudy,Review=node?require('./review.js'):root.EGIUReview;
 const phases=['original','first','second'],key=Review.key;
 const text=(s,max=5000)=>typeof s==='string'?s.slice(0,max):'';
 function reference(r){const n=Review.normalize([r],'2000-01-03')[0];return n?{u:n.u,k:n.k,i:n.i,...(n.b?{b:n.b,v:n.v}:{})}:null;}
 const sourceMode=(ref,mode)=>ref.k==='gap'?(['mc','fill','order','lgap','dict','speak'].includes(mode)?mode:'fill'):ref.k;
 function cleanRow(raw,week,depth=1){
  if(!raw||!reference(raw.ref)||!Study.date(raw.day)||Study.weekStart(raw.day)!==week||!text(raw.event,200))return null;
  const row={ref:reference(raw.ref),event:text(raw.event,200),day:raw.day,user:text(raw.user),mode:sourceMode(raw.ref,raw.mode),read:raw.read===true,answers:{},previous:null};
  if(row.read)for(const phase of phases){const a=raw.answers&&raw.answers[phase];if(!a||typeof a.ok!=='boolean'||!text(a.event,200))break;row.answers[phase]={ok:a.ok,user:text(a.user),event:text(a.event,200)};if(!a.ok)break;}
  if(depth&&raw.previous){const prev=cleanRow(raw.previous,week,depth-1);if(prev&&key(prev.ref)===key(row.ref))row.previous=prev;}
  return row;
 }
 function normalize(raw,day){
  raw=raw&&typeof raw==='object'?raw:{};
  const since=Study.date(raw.since)&&Study.weekStart(raw.since)===raw.since?raw.since:Study.weekStart(day);
  const s={version:1,since,seeded:raw.seeded===true,seen:[...new Set((Array.isArray(raw.seen)?raw.seen:[]).filter(e=>typeof e==='string'&&e.length>0&&e.length<=200))],weeks:{}};
  for(const [week,rows]of Object.entries(raw.weeks||{})){
   if(!Study.date(week)||Study.weekStart(week)!==week||week<since||!rows||typeof rows!=='object')continue;
   const out={};for(const [k,r]of Object.entries(rows)){const row=cleanRow(r,week);if(row&&key(row.ref)===k)out[k]=row;}
   s.weeks[week]=out;
   for(const row of Object.values(out))for(const event of [row.event,row.previous?.event])if(event&&!s.seen.includes(event))s.seen.push(event);
  }
  return s;
 }
 const done=row=>row.read&&phases.every(p=>row.answers[p]&&row.answers[p].ok);
 function replace(s,week,k,row){return {...s,weeks:{...s.weeks,[week]:{...s.weeks[week],[k]:row}}};}
 function capture(s,ref,result,day,event){
  if(!result||result.ok!==false||!reference(ref)||!Study.date(day)||day<s.since||!text(event,200))return s;
  if(s.seen.includes(event))return s;
  const week=Study.weekStart(day),k=key(ref),old=s.weeks[week]&&s.weeks[week][k];
  if(old&&(old.event===event||day<old.day))return s;
  return replace({...s,seen:s.seen.concat(text(event,200))},week,k,{ref:reference(ref),event:text(event,200),day,user:text(result.user),mode:sourceMode(ref,result.mode),read:false,answers:{},previous:old?{...old,previous:null}:null});
 }
 function read(s,week,k){const r=s.weeks[week]&&s.weeks[week][k];return !r||r.read?s:replace(s,week,k,{...r,read:true});}
 function answer(s,week,k,phase,result,event){
  const r=s.weeks[week]&&s.weeks[week][k],i=phases.indexOf(phase);
  if(!r||!r.read||i<0||!result||typeof result.ok!=='boolean'||!text(event,200)||r.answers[phase]?.ok||i>0&&!r.answers[phases[i-1]]?.ok)return s;
  return replace(s,week,k,{...r,answers:{...r.answers,[phase]:{ok:result.ok,user:text(result.user),event:text(event,200)}}});
 }
 function cancel(s,ref,event){
  let out=s;for(const [week,rows]of Object.entries(s.weeks)){const k=key(ref),r=rows[k];if(!r)continue;
   if(r.event===event){if(r.previous)out=replace(out,week,k,r.previous);else{const copy={...out.weeks[week]};delete copy[k];out={...out,weeks:{...out.weeks,[week]:copy}};}}
   else if(r.previous&&r.previous.event===event)out=replace(out,week,k,{...r,previous:null});
  }return out;
 }
 function weekStatus(s,week){const rows=Object.values(s.weeks[week]||{}),completed=rows.filter(done).length;return {week,total:rows.length,done:completed,pending:rows.length-completed,steps:rows.reduce((n,r)=>n+(r.read?1:0)+phases.filter(p=>r.answers[p]?.ok).length,0)};}
 function status(s,day){const current=Study.weekStart(day),debts=Object.keys(s.weeks).filter(w=>w<current).sort().map(w=>weekStatus(s,w)).filter(w=>w.pending);return {blocked:debts.length>0,oldest:debts[0]?.week||null,debts,current:weekStatus(s,current)};}
 function attentionCount(s,reviews,day){
  if(!Study.date(day))return 0;
  const current=Study.weekStart(day),refs=new Set(Review.due(reviews,day).map(key));
  for(const [week,rows]of Object.entries(s.weeks))if(week<=current)for(const row of Object.values(rows))if(row.day<=day&&!done(row))refs.add(key(row.ref));
  return refs.size;
 }
 function canStart(s,course,day,unit){return !status(s,day).blocked||Object.entries(course.closed).some(([d,n])=>d<=day&&n===unit);}
 function seed(s,mistakes,activity,exams,steps,day){
  if(s.seeded)return s;
  let out=s;const dates=new Map();
  for(const e of activity){if(e.session)dates.set(e.session,e.day);dates.set(e.id,e.day);}
  for(const u of Object.values(exams.units||{}))for(const a of (u.history||[]).concat(u.draft?[u.draft]:[]))dates.set(a.id,a.day);
  for(const entry of Object.values(steps))for(const a of Object.values(entry.answers||{}))if(a.reviewEvent&&a.ts)dates.set(a.reviewEvent,Study.dateKey(new Date(a.ts)));
  for(const r of mistakes){
   const event=r.createdEvent;if(!event)continue;
   let source=dates.get(event);
   if(!source){const id=[...dates.keys()].find(id=>event.startsWith(id+':'));if(id)source=dates.get(id);}
   if(!source){const match=event.match(/^(?:exam-)?(\d{13})-/);if(match)source=Study.dateKey(new Date(+match[1]));}
   if(source&&Study.weekStart(source)===Study.weekStart(day))out=capture(out,r,{ok:false,user:r.lastAnswer,mode:r.lastMode},source,event);
  }
  return {...out,seeded:true};
 }
 const api={normalize,capture,read,answer,cancel,status,weekStatus,attentionCount,canStart,seed,done,key,phases};
 if(node)module.exports=api;else root.EGIUWeekly=api;
})(typeof window==='undefined'?globalThis:window);
