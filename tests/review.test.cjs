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
