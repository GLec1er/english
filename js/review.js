/* Persistent error journal with calendar-based reinforcement intervals. */
(function(root){
  'use strict';
  const Study=typeof module!=='undefined'&&module.exports?require('./study.js'):root.EGIUStudy;
  const key=r=>`${r.u}:${r.k}:${r.i}`;
  const valid=r=>r&&Number.isInteger(r.u)&&r.u>=1&&r.u<=145&&Number.isInteger(r.i)&&r.i>=0&&r.i<({gap:8,err:3,tr:2}[r.k]||0);
  function normalize(raw,day){
    const used=new Set();return (Array.isArray(raw)?raw:[]).filter(r=>{if(!valid(r)||used.has(key(r)))return false;used.add(key(r));return true;}).map(r=>({u:r.u,k:r.k,i:r.i,
      stage:Number.isInteger(r.stage)&&r.stage>=0&&r.stage<=3?r.stage:0,
      lapses:Number.isInteger(r.lapses)&&r.lapses>=0?r.lapses:1,
      due:Study.date(r.due)?r.due:day,lastReviewDay:Study.date(r.lastReviewDay)?r.lastReviewDay:null,
      lastAnswer:typeof r.lastAnswer==='string'?r.lastAnswer.slice(0,5000):'',lastMode:typeof r.lastMode==='string'?r.lastMode.slice(0,20):'',
      lastEvent:typeof r.lastEvent==='string'?r.lastEvent:'',undo:r.undo&&valid(r.undo)&&key(r.undo)===key(r)?normalize([{...r.undo,undo:null}],day)[0]:null,createdEvent:typeof r.createdEvent==='string'?r.createdEvent:''}));
  }
  function record(rows,ref,result,day,event){
    if(!valid(ref)||!Study.date(day)||!event)return rows;
    const i=rows.findIndex(r=>key(r)===key(ref)),old=rows[i];
    if(old&&old.lastEvent===event)return rows;
    if(result.ok && !old)return rows;
    const base=old || normalize([{...ref,lapses:0}],day)[0];
    let next={...base,lastEvent:event,undo:old?{...old,undo:null}:null,createdEvent:old?old.createdEvent:event};
    if(!result.ok)next={...next,stage:0,lapses:base.lapses+1,due:Study.shift(day,1),lastReviewDay:null,lastAnswer:String(result.user||'').slice(0,5000),lastMode:result.mode||''};
    else if(base.stage<3 && base.due<=day && base.lastReviewDay!==day)next={...next,stage:base.stage+1,due:Study.shift(day,base.stage===0?3:7),lastReviewDay:day};
    const out=rows.slice();if(i<0)out.push(next);else out[i]=next;return out;
  }
  function undo(rows,ref,event){
    return rows.flatMap(r=>key(r)!==key(ref)||r.lastEvent!==event?[r]:r.undo?[r.undo]:r.createdEvent===event?[]:[r]);
  }
  const due=(rows,day)=>rows.filter(r=>r.stage<3&&r.due<=day).sort((a,b)=>a.due.localeCompare(b.due)||b.lapses-a.lapses||a.u-b.u);
  const summary=(rows,day)=>({active:rows.filter(r=>r.stage<3).length,due:due(rows,day).length,mastered:rows.filter(r=>r.stage===3).length,total:rows.length});
  const api={key,normalize,record,undo,due,summary};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.EGIUReview=api;
})(typeof window==='undefined'?globalThis:window);
