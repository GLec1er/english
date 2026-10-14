const test=require('node:test'),assert=require('node:assert/strict'),Learning=require('../js/learning.js');
let P={};try{P=require('../js/weekly-practice.js');}catch(e){if(e.code!=='MODULE_NOT_FOUND')throw e;}
test('every unit has two additional practice contexts separated from A/B assessments and the reading story',()=>{
 for(let u=1;u<=145;u++){
  const pack=Learning.content(u),old=new Set();
  for(const v of ['A','B'])for(const [k,len]of [['gap',8],['err',3],['tr',2]])for(let i=0;i<len;i++){
   const source=Learning.question({u,b:'transfer',v,k,i}).data;old.add(source.full||source.a[0]);
  }
  for(const [k,len]of [['gap',8],['err',3],['tr',2]])for(let i=0;i<len;i++){
   const ref={u,b:'transfer',v:'A',k,i},q=Learning.question(ref),tasks=P.drills({t:k==='gap'?'fill':k,ref,data:q.data});
   assert.equal(tasks.length,2);assert.equal(tasks[0].t,'fill');assert.equal(tasks[1].t,'err');
   const texts=tasks.map(t=>t.data.full||t.data.a[0]);assert.notEqual(texts[0],texts[1]);
   tasks.forEach((t,j)=>{assert.ok(t.note.translation&&t.note.explanation);assert.ok(!old.has(texts[j]),`${u} ${k} ${i} assessment collision`);assert.ok(!pack.story.includes(texts[j]));});
  }
 }
});
test('listening failures receive fresh dictation and a listening gap rather than an unrelated format',()=>{
 const ref={u:37,b:'transfer',v:'B',k:'gap',i:2},q=Learning.question(ref);
 const tasks=P.drills({t:'dict',ref,data:q.data});assert.deepEqual(tasks.map(t=>t.t),['dict','lgap']);
 assert.ok(tasks[0].data.full);assert.ok(tasks[1].data.correct);assert.deepEqual(P.drills({ref:{u:146}}),[]);
});
