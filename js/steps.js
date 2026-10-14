/* Persistent completion of individual questions, separate from correctness. */
(function(root){
  'use strict';
  const modes=['mc','fill','order','err','tr','write','lgap','dict','speak'];
  function cleanAnswer(value){
    if(!value || typeof value.ok!=='boolean' || !Number.isFinite(value.score) || value.score<0 || value.score>1) return null;
    return {ok:value.ok,score:value.score,user:typeof value.user==='string'?value.user.slice(0,4000):'',ts:Number.isFinite(value.ts)?value.ts:0,...(typeof value.reviewEvent==='string'&&value.reviewEvent.length<=150?{reviewEvent:value.reviewEvent}:{}),...(typeof value.eventId==='string'&&value.eventId.length<=100?{eventId:value.eventId}:{})};
  }
  function normalize(raw){
    const result={};
    if(!raw || typeof raw!=='object') return result;
    Object.entries(raw).forEach(([id,entry])=>{
      const [unit,mode]=id.split(':');
      if(!/^\d+$/.test(unit)||+unit<1||+unit>145||!modes.includes(mode)||id!==+unit+':'+mode||!entry||!entry.answers||typeof entry.answers!=='object') return;
      const answers={};
      Object.entries(entry.answers).forEach(([key,value])=>{
        const answer=cleanAnswer(value);
        if(/^(gap|err|tr|write):\d+$/.test(key)&&answer) answers[key]=answer;
      });
      result[id]={answers};
    });
    return result;
  }
  function record(entry,key,result,ts){
    const answer=cleanAnswer({...result,ts});
    return {answers:{...((entry||{}).answers||{}),...(answer?{[key]:answer}:{})}};
  }
  function status(entry,keys,legacyComplete){
    const unique=[...new Set(keys)];
    const pending=legacyComplete?[]:unique.filter(k=>!entry||!entry.answers||!entry.answers[k]);
    const total=unique.length,done=total-pending.length;
    return {done,total,pct:total?Math.round(done/total*100):0,complete:total>0&&done===total,pending};
  }
  function accept(entry,key,event,user){const a=entry&&entry.answers[key];if(!a||a.ok||!event||a.reviewEvent!==event||a.user!==user)return entry;return {answers:{...entry.answers,[key]:{...a,ok:true,score:1}}};}
  const api={normalize,record,status,accept};
  if(typeof module!=='undefined'&&module.exports) module.exports=api;else root.EGIUSteps=api;
})(typeof window==='undefined'?globalThis:window);
