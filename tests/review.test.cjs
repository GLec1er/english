const {test}=require('node:test');const assert=require('node:assert/strict');
let R={};try{R=require('../js/review.js');}catch(e){if(e.code!=='MODULE_NOT_FOUND')throw e;}
const ref={u:36,k:'gap',i:0};const day='2026-10-12';
test('old error references migrate to a due queue without losing examples',()=>{const rows=R.normalize([ref,ref,{u:999,k:'gap',i:0},{u:36,k:'write',i:0},null],day);assert.equal(rows.length,1);assert.equal(rows[0].stage,0);assert.equal(R.due(rows,day).length,1);});
test('legacy queued errors require three correct checks separated by due dates',()=>{
 let rows=R.normalize([ref],day);
 rows=R.record(rows,ref,{ok:true},day,'b');assert.equal(rows[0].stage,1);assert.equal(rows[0].due,'2026-10-15');
 rows=R.record(rows,ref,{ok:true},'2026-10-13','c');assert.equal(rows[0].stage,1);
 rows=R.record(rows,ref,{ok:true},'2026-10-15','d');assert.equal(rows[0].stage,2);assert.equal(rows[0].due,'2026-10-22');
 rows=R.record(rows,ref,{ok:true},'2026-10-22','e');assert.equal(rows[0].stage,3);assert.equal(R.due(rows,'2026-10-22').length,0);
});
test('a newly wrong answer becomes due tomorrow; early repetition cannot advance',()=>{
 let rows=R.record([],ref,{ok:false,user:'wrong',mode:'mc'},day,'a');assert.equal(rows[0].due,'2026-10-13');
 rows=R.record(rows,ref,{ok:true},day,'b');assert.equal(rows[0].stage,0);
 rows=R.record(rows,ref,{ok:true},'2026-10-13','c');assert.equal(rows[0].stage,1);assert.equal(rows[0].due,'2026-10-16');
});
test('relapse brings a mastered item back with its latest answer and recurrence count',()=>{
 let rows=R.normalize([{...ref,stage:3,lapses:2,due:'2026-10-01',lastAnswer:'old'}],day);
 rows=R.record(rows,ref,{ok:false,user:'new',mode:'dict'},day,'a');assert.equal(rows[0].stage,0);assert.equal(rows[0].lapses,3);assert.equal(rows[0].lastAnswer,'new');assert.equal(rows[0].lastMode,'dict');
});
test('repeated event and same day success never advance twice',()=>{
 let rows=R.normalize([ref],day);rows=R.record(rows,ref,{ok:true},day,'a');rows=R.record(rows,ref,{ok:true},day,'a');rows=R.record(rows,ref,{ok:true},day,'b');assert.equal(rows[0].stage,1);
});
test('manual confirmation undoes only the false error event and preserves prior reinforcement',()=>{
 const old=R.normalize([{...ref,stage:2,lapses:3,due:'2026-10-20',lastAnswer:'old'}],day);
 const bad=R.record(old,ref,{ok:false,user:'valid'},day,'a');assert.deepEqual(R.undo(bad,ref,'a'),old);
 assert.equal(R.undo(R.record([],ref,{ok:false},day,'a'),ref,'a').length,0);
});
test('queue prioritizes overdue repeated errors and keeps mastered records in totals',()=>{
 const rows=R.normalize([{...ref,due:'2026-10-10',lapses:3},{u:36,k:'err',i:0,due:'2026-10-10',lapses:1},{u:36,k:'tr',i:0,stage:3,due:day}],day);
 assert.deepEqual(R.due(rows,day).map(r=>r.k),['gap','err']);assert.deepEqual(R.summary(rows,day),{active:2,due:2,mastered:1,total:3});
});
test('malformed imported undo data is sanitized before manual confirmation',()=>{
 const rows=R.normalize([{...ref,stage:0,lastEvent:'a',undo:{...ref,stage:999,due:'bad',lapses:-5}}],day);
 const undone=R.undo(rows,ref,'a');assert.equal(undone[0].stage,0);assert.equal(undone[0].due,day);assert.equal(undone[0].lapses,1);
});
test('imported undo cannot replace an error with a different question',()=>{
 const rows=R.normalize([{...ref,stage:0,lastEvent:'a',undo:{u:37,k:'gap',i:0,stage:3,due:day}}],day);assert.equal(R.undo(rows,ref,'a')[0].u,36);
});
test('transfer errors and categories preserve form identity while old refs retain their keys',()=>{
 const newer={...ref,b:'transfer',v:'B'};const rows=R.normalize([ref,{...newer,category:'spelling'}],day);assert.equal(rows.length,2);assert.equal(rows[1].v,'B');assert.equal(rows[1].category,'spelling');assert.notEqual(R.key(rows[0]),R.key(rows[1]));assert.equal(R.key(rows[0]),'36:gap:0');
});
test('related examples share a unit topic while listening and other units stay separate',()=>{
 assert.equal(typeof R.groups,'function');
 const rows=R.normalize([{...ref,lastMode:'fill'},{u:36,k:'err',i:0,lastMode:'err'},{u:36,k:'gap',i:1,lastMode:'dict'},{u:37,k:'gap',i:0,lastMode:'fill'}],day);
 const before=JSON.stringify(rows),groups=R.groups(rows);
 assert.deepEqual(groups.map(g=>[g.id,g.rows.length]),[['36:grammar',2],['36:listening',1],['37:grammar',1]]);
 assert.equal(JSON.stringify(rows),before);
});
test('a shared check schedules due examples without inventing their individual correct answers',()=>{
 assert.equal(typeof R.recordGroup,'function');
 const refs=[ref,{u:36,k:'err',i:0}],source={ref,mode:'fill'},day='2026-10-17';
 let rows=R.normalize(refs.map(r=>({...r,lastMode:r.k==='gap'?'fill':'err',lastAnswer:'saved error',lastEvent:R.key(r),due:day})),day);
 rows=R.recordGroup(rows,refs,{ok:true},day,'group-check',source);
 assert.equal(rows[1].stage,0);assert.equal(rows[1].lastAnswer,'saved error');assert.equal(rows[1].lastEvent,'36:err:0');
 assert.equal(R.state(rows[1]).stage,1);assert.equal(R.state(rows[1]).due,'2026-10-20');
 assert.equal(R.due(rows,day).length,0);assert.equal(R.due(rows,'2026-10-20').length,2);
 rows=R.normalize(JSON.parse(JSON.stringify(rows)),day);assert.equal(R.state(rows[1]).stage,1);
 assert.deepEqual(R.recordGroup(rows,refs,{ok:true},day,'another-check',source),rows);
 rows=R.recordGroup(rows,refs,{ok:true},'2026-10-20','second-check',source);
 assert.equal(R.state(rows[1]).stage,2);assert.equal(R.state(rows[1]).due,'2026-10-27');
 rows=R.recordGroup(rows,refs,{ok:true},'2026-10-27','third-check',source);
 assert.equal(R.summary(rows,'2026-10-27').mastered,2);
});
test('a fresh rejection reopens only its source and cancellation restores the shared schedule',()=>{
 assert.equal(typeof R.recordGroup,'function');
 const refs=[ref,{u:36,k:'err',i:0}],source={ref,mode:'fill'};
 const base=R.recordGroup(R.normalize(refs.map(r=>({...r,lastMode:'fill'})),day),refs,{ok:true},day,'group',source);
 const bad=R.record(base,ref,{ok:false,user:'new',mode:'fill'},'2026-10-13','new-error');
 assert.equal(R.state(bad[0]).stage,0);assert.equal(R.state(bad[0]).due,'2026-10-14');
 assert.equal(R.state(bad[1]).stage,1);
 assert.deepEqual(R.undo(R.normalize(JSON.parse(JSON.stringify(bad)),'2026-10-13'),ref,'new-error'),base);
});
test('wrong, early and foreign group checks cannot skip spaced review or merge listening',()=>{
 assert.equal(typeof R.recordGroup,'function');
 const refs=[ref,{u:36,k:'gap',i:1},{u:37,k:'gap',i:0}],source={ref,mode:'fill'};
 const rows=R.normalize([{...ref,due:'2026-10-15',lastMode:'fill'},{...refs[1],due:day,lastMode:'dict'},{...refs[2],due:day,lastMode:'fill'}],day);
 assert.deepEqual(R.recordGroup(rows,refs,{ok:false},day,'bad',source),rows);
 assert.deepEqual(R.recordGroup(rows,refs,{ok:true},day,'early',source),rows);
 const invalid=R.normalize([{...rows[0],groupReview:{stage:3,due:day,lastReviewDay:day,event:'fake',sourceEvent:'',source:{ref:refs[2],mode:'fill'}}}],day);
 assert.equal(R.state(invalid[0]).stage,0);
});
test('an individual success uses shared progress and an early answer preserves it through reload',()=>{
 const refs=[ref,{u:36,k:'err',i:0}],source={ref,mode:'fill'};
 let rows=R.recordGroup(R.normalize(refs.map(r=>({...r,lastMode:'fill'})),day),refs,{ok:true},day,'group',source);
 rows=R.record(rows,ref,{ok:true},'2026-10-13','early');
 rows=R.normalize(JSON.parse(JSON.stringify(rows)),'2026-10-13');
 assert.equal(R.state(rows[0]).stage,1);assert.equal(R.state(rows[0]).due,'2026-10-15');
 rows=R.record(rows,ref,{ok:true},'2026-10-15','due');
 assert.equal(R.state(rows[0]).stage,2);assert.equal(R.state(rows[0]).due,'2026-10-22');
 assert.equal(rows[0].groupReview,undefined);
});
test('shared progress retains transfer form identities and cannot revive after a newer failure',()=>{
 const a={...ref,b:'transfer',v:'A'},b={...ref,b:'transfer',v:'B'},source={ref:a,mode:'fill'};
 let rows=R.normalize([a,b].map(r=>({...r,lastMode:'fill',lastEvent:'old',lastAnswer:r.v})),day);
 rows=R.recordGroup(rows,[a,b],{ok:true},day,'group',source);
 rows=R.normalize(JSON.parse(JSON.stringify(rows)),day);
 assert.deepEqual(rows.map(r=>[R.key(r),r.lastAnswer,R.state(r).stage]),[['36:transfer:A:gap:0','A',1],['36:transfer:B:gap:0','B',1]]);
 const saved=rows[1].groupReview;
 rows=R.record(rows,b,{ok:false,user:'new',mode:'fill'},'2026-10-13','new');
 rows[1].groupReview=saved;
 rows=R.normalize(rows,'2026-10-13');
 assert.equal(R.state(rows[1]).stage,0);assert.equal(R.state(rows[1]).due,'2026-10-14');
});
test('shared evidence stores only a source reference even when a renderer supplies a full journal row',()=>{
 const rows=R.normalize([{...ref,lastMode:'fill',lastAnswer:'private original'}],day);
 const result=R.recordGroup(rows,[ref],{ok:true},day,'shared',{ref:rows[0],mode:'fill'});
 assert.deepEqual(result[0].groupReview.source,{ref,mode:'fill'});
});
