const test=require('node:test'),assert=require('node:assert/strict');
let C={};try{C=require('../js/corrections.js')}catch(e){if(e.code!=='MODULE_NOT_FOUND')throw e;}
const E=require('../js/exam.js'),R=require('../js/review.js'),L=require('../js/learning.js');
function fixture(){
 const items=['mc','fill','order','mc','fill','order','dict','lgap','err','err','err','tr','tr'].map((t,i)=>({t,ref:{u:37,k:i<8?'gap':i<11?'err':'tr',i:i<8?i:i<11?i-8:i-11,b:'transfer',v:'A'}}));
 const bad={5:'Would you like to organize the evening film with us?',10:'Would you like to organize the charity sale with us?',11:'Would you like to organize the craft exhibition with us'};
 let exams=E.start({},37,items,'qa-a','2026-10-13'),mistakes=[];
 items.forEach((it,i)=>{const result={ok:bad[i]===undefined,user:bad[i]||'checked'};exams=E.answer(exams,37,E.key(it),result);if(!result.ok)mistakes=R.record(mistakes,it.ref,{...result,mode:it.t},'2026-10-13','qa-a:'+E.key(it));});exams=E.finish(exams,37);
 const learning=L.normalize({seen:items.map(E.key),forms:{37:[{v:'A',event:'qa-a'}]},evidence:{37:{application:{correct:10,total:13},reading:true}}},'2026-10-13');
 return {exams,mistakes,learning,activity:[{id:'a',session:'qa-a',kind:'exam',answers:13,correct:10}],steps:{},course:{closed:{}}};
}
test('repair accepts spelling-only exam errors and updates the same attempt, errors, statistics and skill evidence',()=>{
 const input=fixture(),out=C.repairSpelling(input,'2026-10-13');assert.equal(out.changes.length,2);assert.equal(E.status(out.exams,37).attempts,1);assert.equal(E.status(out.exams,37).best,92);assert.equal(out.activity.length,1);assert.equal(out.activity[0].answers,13);assert.equal(out.activity[0].correct,12);
 assert.equal(out.mistakes.length,1);assert.equal(out.mistakes[0].i,5);assert.deepEqual(out.learning.evidence[37].application,{correct:12,total:13});assert.equal(out.learning.evidence[37].reading,true);assert.deepEqual(input.exams,fixture().exams);assert.deepEqual(out.course.closed,{});
 const twice=C.repairSpelling(out,'2026-10-13');assert.equal(twice.changes.length,0);assert.deepEqual(twice.exams,out.exams);assert.deepEqual(twice.activity,out.activity);
});
test('repair preserves a superseding error and refuses to infer unlinked learning evidence',()=>{
 const state=fixture(),ref={u:37,k:'err',i:2,b:'transfer',v:'A'};state.mistakes=R.record(state.mistakes,ref,{ok:false,user:'new grammar error',mode:'err'},'2026-10-14','new-event');state.learning.forms[37][0].event='another-session';
 const out=C.repairSpelling(state,'2026-10-14');assert.ok(out.mistakes.some(r=>r.lastEvent==='new-event'&&r.lastAnswer==='new grammar error'));assert.deepEqual(out.learning.evidence[37].application,{correct:10,total:13});
});
