const test=require('node:test'),assert=require('node:assert/strict');
let W={};try{W=require('../js/weekly.js');}catch(e){if(e.code!=='MODULE_NOT_FOUND')throw e;}
const ref={u:37,k:'gap',i:1},bad={ok:false,user:'to close',mode:'fill'};
const initial=()=>W.capture(W.normalize({},'2026-10-14'),ref,bad,'2026-10-14','bad-1');
function complete(s,week='2026-10-12'){
 s=W.read(s,week,'37:gap:1');
 for(const phase of ['original','first','second'])s=W.answer(s,week,'37:gap:1',phase,{ok:true,user:'correct'},'answer-'+phase);
 return s;
}
test('weekend work warns before Monday, then remains a debt until actually completed',()=>{
 const s=initial();
 assert.equal(W.status(s,'2026-10-17').blocked,false);assert.equal(W.status(s,'2026-10-17').current.pending,1);
 assert.equal(W.status(s,'2026-10-19').blocked,true);assert.equal(W.status(s,'2026-10-26').blocked,true);
 assert.equal(W.status(complete(s),'2026-10-19').blocked,false);
 assert.equal(W.status(W.normalize({},'2026-10-14'),'2026-10-19').blocked,false);
});
test('reading and each correct revision task persist separately; wrong answers do not close a week',()=>{
 let s=initial();s=W.answer(s,'2026-10-12','37:gap:1','original',{ok:true,user:'closing'},'before-read');
 assert.equal(W.status(s,'2026-10-19').blocked,true);
 s=W.read(s,'2026-10-12','37:gap:1');s=W.answer(s,'2026-10-12','37:gap:1','original',{ok:true,user:'closing'},'original');
 s=W.answer(s,'2026-10-12','37:gap:1','first',{ok:false,user:'wrong'},'first');
 s=W.normalize(JSON.parse(JSON.stringify(s)),'2026-10-19');
 assert.equal(s.weeks['2026-10-12']['37:gap:1'].read,true);assert.equal(s.weeks['2026-10-12']['37:gap:1'].answers.original.ok,true);
 assert.equal(s.weeks['2026-10-12']['37:gap:1'].answers.first.ok,false);assert.equal(W.status(s,'2026-10-19').blocked,true);
 assert.equal(W.status(complete(s),'2026-10-19').blocked,false);
});
test('ordinary successes cannot erase weekly work; a new rejection reopens it without duplicate sources',()=>{
 let s=complete(initial());
 assert.equal(W.capture(s,ref,{ok:true,user:'correct'},'2026-10-16','success'),s);
 s=W.capture(s,ref,bad,'2026-10-16','bad-2');assert.equal(Object.keys(s.weeks['2026-10-12']).length,1);
 assert.equal(W.status(s,'2026-10-19').blocked,true);
 assert.equal(W.capture(s,ref,bad,'2026-10-16','bad-2'),s);
 s=W.cancel(s,ref,'bad-2');assert.equal(W.status(s,'2026-10-19').blocked,false);
 s=W.cancel(s,ref,'bad-1');assert.equal(Object.keys(s.weeks['2026-10-12']).length,0);
});
test('recovering the same exam rejection in a later week does not create a second debt',()=>{
 const s=complete(initial());
 assert.equal(W.capture(s,ref,bad,'2026-10-19','bad-1'),s);
 assert.equal(W.status(s,'2026-10-26').blocked,false);
});
test('old captured events cannot reopen work after several later errors and a reload',()=>{
 let s=W.capture(initial(),ref,bad,'2026-10-15','bad-2');
 s=W.capture(s,ref,bad,'2026-10-16','bad-3');s=complete(s);
 s=W.normalize(JSON.parse(JSON.stringify(s)),'2026-10-19');
 assert.equal(W.capture(s,ref,bad,'2026-10-19','bad-1'),s);
});
test('only closed units remain accessible during debt, including when a Monday was skipped',()=>{
 const s=initial(),course={closed:{'2026-10-13':37}};
 assert.equal(W.canStart(s,course,'2026-10-19',38),false);assert.equal(W.canStart(s,course,'2026-10-19',37),true);
 assert.equal(W.canStart(s,course,'2026-10-26',38),false);assert.equal(W.canStart(complete(s),course,'2026-10-26',38),true);
});
test('finishing old debt admits lessons even when the current week has new mistakes',()=>{
 let s=W.capture(initial(),{u:36,k:'gap',i:0},bad,'2026-10-19','new-week');
 assert.equal(W.status(s,'2026-10-19').oldest,'2026-10-12');
 s=complete(s);assert.equal(W.status(s,'2026-10-19').blocked,false);
 assert.equal(W.status(s,'2026-10-19').current.pending,1);
 assert.equal(W.status(s,'2026-10-26').oldest,'2026-10-19');
});
test('week rollover across New Year uses calendar weeks and imported completion cannot precede its prerequisites',()=>{
 let s=W.capture(W.normalize({},'2026-12-31'),ref,bad,'2026-12-31','year');
 assert.equal(W.status(s,'2027-01-04').oldest,'2026-12-28');
 s=W.normalize({...s,weeks:{...s.weeks,'2026-12-28':{'37:gap:1':{...s.weeks['2026-12-28']['37:gap:1'],read:false,answers:{second:{ok:true,user:'x',event:'fake'}}}}}},'2027-01-04');
 assert.equal(W.status(s,'2027-01-04').blocked,true);assert.deepEqual(s.weeks['2026-12-28']['37:gap:1'].answers,{});
 assert.equal(W.capture(s,{u:146,k:'gap',i:0},bad,'2026-12-31','bad'),s);
});
test('bootstrap includes dated current-week errors, skips undated legacy errors, and never reseeds completed work',()=>{
 const rows=[{...ref,createdEvent:'legacy',lastEvent:'legacy',lastAnswer:'wrong',lastMode:'fill'}, {u:36,k:'tr',i:0,createdEvent:'1760000000000-old',lastAnswer:'old'}, {u:37,k:'err',i:0,b:'transfer',v:'A',createdEvent:'attempt:37:transfer:A:err:0',lastAnswer:'wrong',lastMode:'err'}];
 const exams={units:{37:{history:[{id:'attempt',day:'2026-10-13',items:[],answers:{}}]}}};
 let s=W.seed(W.normalize({},'2026-10-14'),rows,[],exams,{},'2026-10-14');
 assert.deepEqual(Object.keys(s.weeks['2026-10-12']),['37:transfer:A:err:0']);
 const again=W.seed(s,rows,[],exams,{},'2026-10-19');assert.equal(again,s);
});
test('an imported error cannot select a renderer incompatible with its source kind',()=>{
 const s=initial(),r=s.weeks['2026-10-12']['37:gap:1'];
 const imported=W.normalize({...s,weeks:{'2026-10-12':{'37:gap:1':{...r,mode:'tr'}}}},'2026-10-19');
 assert.equal(imported.weeks['2026-10-12']['37:gap:1'].mode,'fill');
});
