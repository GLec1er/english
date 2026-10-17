/* Persistent error journal with calendar-based reinforcement intervals. */
(function(root){
  'use strict';
  const Study=typeof module!=='undefined'&&module.exports?require('./study.js'):root.EGIUStudy;
  const key=r=>r.b?`${r.u}:${r.b}:${r.v}:${r.k}:${r.i}`:`${r.u}:${r.k}:${r.i}`;
  const valid=r=>r&&Number.isInteger(r.u)&&r.u>=1&&r.u<=145&&Number.isInteger(r.i)&&r.i>=0&&r.i<({gap:8,err:3,tr:2}[r.k]||0)&&(!r.b||(r.b==='transfer'&&['A','B'].includes(r.v)));
  const topic=(ref,mode=ref.lastMode)=>`${ref.u}:${['dict','lgap','speak'].includes(mode)?'listening':'grammar'}`;
  function groups(rows){const out=new Map();for(const row of rows){const id=topic(row);if(!out.has(id))out.set(id,{id,unit:row.u,kind:id.split(':')[1],rows:[]});out.get(id).rows.push(row);}return [...out.values()];}
  function proof(row){const p=row.groupReview;return p&&valid(p.source?.ref)&&topic(p.source.ref,p.source.mode)===topic(row)&&p.sourceEvent===row.lastEvent&&Number.isInteger(p.stage)&&p.stage>=1&&p.stage<=3&&Study.date(p.due)&&Study.date(p.lastReviewDay)&&typeof p.event==='string'&&p.event?{stage:p.stage,due:p.due,lastReviewDay:p.lastReviewDay,event:p.event,sourceEvent:p.sourceEvent,source:{ref:{u:p.source.ref.u,k:p.source.ref.k,i:p.source.ref.i,...(p.source.ref.b?{b:p.source.ref.b,v:p.source.ref.v}:{})},mode:p.source.mode}}:null;}
  const state=row=>proof(row)||row;
  function normalize(raw,day){
    const used=new Set();return (Array.isArray(raw)?raw:[]).filter(r=>{if(!valid(r)||used.has(key(r)))return false;used.add(key(r));return true;}).map(r=>({u:r.u,k:r.k,i:r.i,...(r.b?{b:r.b,v:r.v}:{}),category:['grammar','meaning','spelling','order','listening','review'].includes(r.category)?r.category:'review',
      stage:Number.isInteger(r.stage)&&r.stage>=0&&r.stage<=3?r.stage:0,
      lapses:Number.isInteger(r.lapses)&&r.lapses>=0?r.lapses:1,
      due:Study.date(r.due)?r.due:day,lastReviewDay:Study.date(r.lastReviewDay)?r.lastReviewDay:null,
      lastAnswer:typeof r.lastAnswer==='string'?r.lastAnswer.slice(0,5000):'',lastMode:typeof r.lastMode==='string'?r.lastMode.slice(0,20):'',
      lastEvent:typeof r.lastEvent==='string'?r.lastEvent:'',undo:r.undo&&valid(r.undo)&&key(r.undo)===key(r)?normalize([{...r.undo,undo:null}],day)[0]:null,createdEvent:typeof r.createdEvent==='string'?r.createdEvent:'',...(proof(r)?{groupReview:proof(r)}:{})}));
  }
  function record(rows,ref,result,day,event){
    if(!valid(ref)||!Study.date(day)||!event)return rows;
    const i=rows.findIndex(r=>key(r)===key(ref)),old=rows[i];
    if(old&&old.lastEvent===event)return rows;
    if(result.ok && !old)return rows;
    const base=old || normalize([{...ref,lapses:0}],day)[0];
    let next={...base,lastEvent:event,undo:old?{...old,undo:null}:null,createdEvent:old?old.createdEvent:event};
    const effective=state(base);
    if(!result.ok){delete next.groupReview;next={...next,stage:0,lapses:base.lapses+1,due:Study.shift(day,1),lastReviewDay:null,lastAnswer:String(result.user||'').slice(0,5000),lastMode:result.mode||''};}
    else if(effective.stage<3 && effective.due<=day && effective.lastReviewDay!==day){delete next.groupReview;next={...next,stage:effective.stage+1,due:Study.shift(day,effective.stage===0?3:7),lastReviewDay:day};}
    else if(next.groupReview)next.groupReview={...next.groupReview,sourceEvent:event};
    const out=rows.slice();if(i<0)out.push(next);else out[i]=next;return out;
  }
  function undo(rows,ref,event){
    return rows.flatMap(r=>key(r)!==key(ref)||r.lastEvent!==event?[r]:r.undo?[r.undo]:r.createdEvent===event?[]:[r]);
  }
  function dismiss(rows,ref,event,user){const current=rows.find(r=>key(r)===key(ref));if(!current||current.lastEvent!==event||current.lastAnswer!==user)return rows;return current.lapses===1?rows.filter(r=>key(r)!==key(ref)):undo(rows,ref,event);}
  function recordGroup(rows,refs,result,day,event,source){
    if(!result?.ok||!Study.date(day)||!event||!valid(source?.ref)||!refs.some(r=>key(r)===key(source.ref)))return rows;
    const targets=new Set(refs.filter(valid).map(key)),id=topic(source.ref,source.mode);
    const ref=source.ref,attribution={ref:{u:ref.u,k:ref.k,i:ref.i,...(ref.b?{b:ref.b,v:ref.v}:{})},mode:source.mode};
    return rows.map(row=>{const s=state(row);if(!targets.has(key(row))||topic(row)!==id||s.stage>=3||s.due>day||s.lastReviewDay===day)return row;
      return {...row,groupReview:{stage:s.stage+1,due:Study.shift(day,s.stage===0?3:7),lastReviewDay:day,event,sourceEvent:row.lastEvent,source:attribution}};
    });
  }
  const due=(rows,day)=>rows.filter(r=>state(r).stage<3&&state(r).due<=day).sort((a,b)=>state(a).due.localeCompare(state(b).due)||b.lapses-a.lapses||a.u-b.u);
  const summary=(rows,day)=>({active:rows.filter(r=>state(r).stage<3).length,due:due(rows,day).length,mastered:rows.filter(r=>state(r).stage===3).length,total:rows.length});
  const api={key,topic,groups,state,recordGroup,normalize,record,undo,dismiss,due,summary};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.EGIUReview=api;
})(typeof window==='undefined'?globalThis:window);
