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
test('finishing weekly work removes its attention badge without deleting future spaced reviews',()=>{
 assert.equal(typeof W.attentionCount,'function','actionable error counter is missing');
 const R=require('../js/review.js'),day='2026-10-17';
 const reviews=R.normalize([{...ref,stage:1,due:'2026-10-20',lastReviewDay:day}],day);
 let s=initial();s=W.read(s,'2026-10-12','37:gap:1');
 for(const phase of ['original','first'])s=W.answer(s,'2026-10-12','37:gap:1',phase,{ok:true,user:'correct'},phase);
 assert.equal(W.attentionCount(s,reviews,day),1);
 const before=JSON.stringify(reviews);
 s=W.answer(s,'2026-10-12','37:gap:1','second',{ok:true,user:'correct'},'second');
 assert.equal(W.attentionCount(s,reviews,day),0);
 assert.equal(W.attentionCount(s,reviews,'2026-10-20'),1);
 assert.equal(JSON.stringify(reviews),before);
 assert.equal(R.summary(reviews,day).active,1);
});
test('one example due in multiple review queues is counted once, including old unfinished weeks',()=>{
 assert.equal(typeof W.attentionCount,'function','actionable error counter is missing');
 const R=require('../js/review.js'),day='2026-10-19';
 const reviews=R.normalize([{...ref,due:day},{u:36,k:'gap',i:0,due:day},{u:38,k:'gap',i:0,stage:2,due:'2026-10-22'}],day);
 const s=W.capture(initial(),ref,bad,day,'new-week');
 assert.equal(W.attentionCount(s,reviews,day),2);
 assert.equal(W.attentionCount(complete(s),reviews,day),2);
});
test('cancelled errors, future imported work and mastered reviews do not create attention today',()=>{
 assert.equal(typeof W.attentionCount,'function','actionable error counter is missing');
 const R=require('../js/review.js'),day='2026-10-17';
 let s=W.cancel(initial(),ref,'bad-1');
 s=W.capture(s,ref,bad,'2026-10-18','tomorrow');
 s=W.capture(s,{u:36,k:'gap',i:0},bad,'2026-10-19','future-week');
 const reviews=R.normalize([{...ref,stage:3,due:day}],day);
 assert.equal(W.attentionCount(s,reviews,day),0);
 assert.equal(W.attentionCount(s,reviews,'2026-10-18'),1);
 assert.equal(W.attentionCount(s,reviews,'2026-10-19'),2);
 assert.equal(W.attentionCount(s,reviews,'invalid'),0);
});
test('weekly groups merge examples of the same topic and retain the furthest unfinished progress',()=>{
 assert.equal(typeof W.groups,'function');
 let s=initial();s=W.capture(s,{u:37,k:'err',i:0},bad,'2026-10-14','err');
 s=W.read(s,'2026-10-12','37:err:0');s=W.answer(s,'2026-10-12','37:err:0','original',{ok:true,user:'correct'},'original');
 s=W.capture(s,{u:37,k:'gap',i:2},{...bad,mode:'dict'},'2026-10-14','listening');
 const groups=W.groups(s,'2026-10-12');
 assert.deepEqual(groups.map(g=>[g.id,g.rows.length]),[['37:grammar',2],['37:listening',1]]);
 assert.equal(groups[0].source.ref.k,'err');assert.equal(groups[0].steps,2);
 assert.equal(W.weekStatus(s,'2026-10-12').total,2);
});
test('one shared weekly set closes its topic without manufacturing answers for the other sources',()=>{
 assert.equal(typeof W.answerGroup,'function');
 let s=W.capture(initial(),{u:37,k:'err',i:0},bad,'2026-10-14','err');
 s=W.readGroup(s,'2026-10-12','37:grammar');
 for(const phase of ['original','first'])s=W.answerGroup(s,'2026-10-12','37:grammar',phase,{ok:true,user:'correct'},phase);
 assert.equal(W.weekStatus(s,'2026-10-12').pending,1);
 s=W.answerGroup(s,'2026-10-12','37:grammar','second',{ok:true,user:'correct'},'second');
 assert.equal(W.weekStatus(s,'2026-10-12').pending,0);
 assert.equal(W.done(s.weeks['2026-10-12']['37:err:0']),true);
 assert.deepEqual(s.weeks['2026-10-12']['37:err:0'].answers,{});
 s=W.normalize(JSON.parse(JSON.stringify(s)),'2026-10-19');
 assert.equal(W.status(s,'2026-10-19').blocked,false);
 const reopened=W.capture(s,{u:37,k:'err',i:0},bad,'2026-10-18','new-error');
 assert.equal(W.weekStatus(reopened,'2026-10-12').pending,1);
 assert.equal(W.weekStatus(W.cancel(reopened,{u:37,k:'err',i:0},'new-error'),'2026-10-12').pending,0);
});
test('weekly group completion cannot skip its stages or accept incomplete and foreign shared evidence',()=>{
 assert.equal(typeof W.answerGroup,'function');
 let s=W.capture(initial(),{u:37,k:'err',i:0},bad,'2026-10-14','err');
 assert.deepEqual(W.answerGroup(s,'2026-10-12','37:grammar','second',{ok:true,user:'x'},'skip'),s);
 const rows=s.weeks['2026-10-12'];
 rows['37:err:0'].shared={...rows['37:gap:1'],read:true,answers:{second:{ok:true,user:'x',event:'fake'}}};
 const normalized=W.normalize(s,'2026-10-17');
 assert.equal(W.done(normalized.weeks['2026-10-12']['37:err:0']),false);
 assert.equal(W.attentionCount(normalized,[],'2026-10-17'),1);
});
test('a weekly topic settles due spaced members once while preserving later dates and listening',()=>{
 const R=require('../js/review.js'),day='2026-10-17',other={u:37,k:'err',i:0},audio={u:37,k:'gap',i:2},future={u:37,k:'gap',i:3};
 let s=W.capture(initial(),other,bad,'2026-10-14','other');
 s=W.capture(s,audio,{...bad,mode:'dict'},'2026-10-14','audio');
 let reviews=R.normalize([{...ref,lastMode:'fill',due:day,lastAnswer:'mine'},{...other,lastMode:'err',due:day,lastAnswer:'other'},{...audio,lastMode:'dict',due:day},{...future,lastMode:'fill',due:'2026-10-20'}],day);
 s=W.readGroup(s,'2026-10-12','37:grammar');
 s=W.answerGroup(s,'2026-10-12','37:grammar','original',{ok:true,user:'correct'},'original');
 reviews=R.record(reviews,ref,{ok:true},day,'original');
 for(const p of ['first','second'])s=W.answerGroup(s,'2026-10-12','37:grammar',p,{ok:true,user:'correct'},p);
 const g=W.groups(s,'2026-10-12').find(g=>g.id==='37:grammar');
 reviews=R.recordGroup(reviews,g.rows.map(r=>r.ref),{ok:true},day,'second',{ref,mode:'fill'});
 assert.equal(W.weekStatus(s,'2026-10-12').pending,1);
 assert.deepEqual(reviews.map(r=>[R.state(r).stage,R.state(r).due]),[[1,'2026-10-20'],[1,'2026-10-20'],[0,day],[0,'2026-10-20']]);
 assert.equal(reviews[1].lastAnswer,'other');assert.deepEqual(s.weeks['2026-10-12']['37:err:0'].answers,{});
});
test('a completed proof from another unit or channel cannot close a weekly source',()=>{
 const s=initial(),week='2026-10-12',row=s.weeks[week]['37:gap:1'];
 const proof=complete(initial()).weeks[week]['37:gap:1'];
 for(const shared of [{...proof,ref:{...ref,u:36}},{...proof,mode:'dict'}]){
  const imported=W.normalize({...s,weeks:{[week]:{'37:gap:1':{...row,shared}}}},'2026-10-17');
  assert.equal(W.weekStatus(imported,week).pending,1);
 }
});
