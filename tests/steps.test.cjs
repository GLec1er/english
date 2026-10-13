const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const file = path.join(__dirname, '../js/steps.js');
const exists = fs.existsSync(file), S = exists ? require(file) : null;
test('per-question progress is available', () => assert.ok(exists, 'per-question progress is missing'));
const check = (name, fn) => test(name, { skip: !exists }, fn);
const keys = Array.from({length:8}, (_,i)=>'gap:'+i);
check('one wrong answer is saved as 1 of 8, independently of accuracy', () => {
  const entry = S.record(null, 'gap:3', {ok:false,score:0,user:'wrong'}, 123);
  const s = S.status(entry, keys, false);
  assert.equal(s.done,1); assert.equal(s.pct,13); assert.equal(s.complete,false);
  assert.equal(s.pending.includes('gap:3'),false);
  assert.equal(entry.answers['gap:3'].user,'wrong');
});
check('repeated answer and manual confirmation do not duplicate completed questions', () => {
  let entry = S.record(null, 'gap:3', {ok:false,score:0}, 123);
  entry = S.record(entry,'gap:3',{ok:true,score:1},124);
  assert.equal(S.status(entry,keys,false).done,1);
  assert.equal(entry.answers['gap:3'].score,1);
});
check('serialization resumes only remaining questions and a full zero-score set is complete', () => {
  let entry=null;keys.forEach(k=>{entry=S.record(entry,k,{ok:false,score:0},123);});
  const loaded=S.normalize(JSON.parse(JSON.stringify({'36:fill':entry})))['36:fill'];
  assert.deepEqual(S.status(loaded,keys,false),{done:8,total:8,pct:100,complete:true,pending:[]});
});
check('legacy completed modes remain complete without inventing answer correctness', () => {
  assert.equal(S.status(null,keys,true).complete,true);
  assert.equal(S.status(null,keys,true).pct,100);
});
check('unknown imported questions, invalid scores and foreign units do not count', () => {
  const raw={'36:fill':{answers:{'gap:0':{ok:false,score:0},'gap:88':{ok:true,score:1},'gap:1':{ok:true,score:4},'html':{ok:true,score:1}}},'146:fill':{answers:{'gap:0':{ok:true,score:1}}}};
  const loaded=S.normalize(raw);
  assert.equal(S.status(loaded['36:fill'],keys,false).done,1);
  assert.equal(loaded['146:fill'],undefined);
});
check('a journal appeal corrects only the matching saved rejection event and keeps completion count',()=>{
 const entry=S.record(null,'gap:0',{ok:false,score:0,user:'could',reviewEvent:'session:0',eventId:'activity'},123);
 const loaded=S.normalize(JSON.parse(JSON.stringify({'36:fill':entry})))['36:fill'];
 const accepted=S.accept(loaded,'gap:0','session:0','could');assert.equal(accepted.answers['gap:0'].ok,true);assert.equal(accepted.answers['gap:0'].eventId,'activity');assert.equal(accepted.answers['gap:0'].ts,123);assert.equal(S.status(accepted,keys,false).done,1);
 assert.deepEqual(S.accept(loaded,'gap:0','older:0','could'),loaded);assert.deepEqual(S.accept(loaded,'gap:0','session:0','would'),loaded);
});
