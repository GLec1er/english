const {test}=require('node:test');const assert=require('node:assert/strict');
const Learning=require('../js/learning.js');
test('all 145 units include context, comprehension, self-review and two complete distinct forms',()=>{
 const all=new Set();
 for(let n=1;n<=145;n++){
  const p=Learning.content(n);assert.ok(p,'unit '+n);assert.ok(p.story.length>100);assert.ok(p.translation.length>80);assert.equal(p.questions.length,3);assert.equal(p.criteria.length,3);assert.equal(p.phrases.length,3);assert.ok(p.writePrompt&&p.spokenPrompt);p.focus.forEach(f=>assert.doesNotThrow(()=>new RegExp(f.pattern,'i')));
  const local=new Set([p.story]);for(const v of ['A','B']){
   const b=p.banks[v];assert.equal(b.g.length,8);assert.equal(b.e.length,3);assert.equal(b.t.length,2);
   for(const [k,len] of [['gap',8],['err',3],['tr',2]])for(let i=0;i<len;i++){
    const q=Learning.question({u:n,b:'transfer',v,k,i});assert.ok(q);assert.ok(q.note.translation&&q.note.why);assert.ok(q.data.full||q.data.a[0]);const text=q.data.full||q.data.a[0];assert.ok(!local.has(text),`duplicate unit ${n} ${v} ${k} ${i}`);local.add(text);const ref=Learning.key({u:n,b:'transfer',v,k,i});assert.ok(!all.has(ref));all.add(ref);
   }
  }
  p.questions.forEach(q=>{assert.ok(q.options.length>=3);assert.ok(q.options[q.answer]);assert.ok(q.why)});
 }
 assert.equal(all.size,3770);
});
test('unknown bank refs cannot silently fall back to another question',()=>{
 assert.equal(Learning.question({u:36,b:'transfer',v:'C',k:'gap',i:0}),null);
 assert.equal(Learning.question({u:36,b:'transfer',v:'A',k:'gap',i:8}),null);
});
test('assessment forms cover exactly 13 distinct sources with all available formats',()=>{
 const Exam=require('../js/exam.js');
 for(let n=1;n<=145;n++)for(const v of ['A','B']){
  const pool=[];for(let i=0;i<8;i++)for(const t of ['mc','fill','order','lgap','dict']){const ref={u:n,b:'transfer',v,k:'gap',i};const q=Learning.question(ref);if(t!=='order'||q.data.full.split(' ').length<=14)pool.push({t,ref});}for(const [k,len]of[['err',3],['tr',2]])for(let i=0;i<len;i++)pool.push({t:k,ref:{u:n,b:'transfer',v,k,i}});
  const selected=Exam.select(pool,()=>.5);assert.equal(selected.length,13);assert.equal(new Set(selected.map(Exam.key)).size,13);assert.ok(selected.some(x=>x.t==='lgap'));assert.ok(selected.some(x=>x.t==='dict'));assert.ok(Exam.start(Exam.normalize({}),n,selected,'test','2026-10-13').units[n].draft);
 }
});
test('new sources are separate from original training and contextual reading',()=>{
 const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');const c={window:{}};vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/registry.js'),'utf8'),c);c.EGIU=c.window.EGIU;for(const f of fs.readdirSync(path.join(__dirname,'../js/data')))vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/data',f),'utf8'),c);
 const canonical=s=>s.toLowerCase().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim();
 for(let n=1;n<=145;n++){
  const u=c.EGIU.units[n],p=Learning.content(n);const old=new Set(u.g.map(s=>canonical(s.replace(/\[([^\]]+)\](?:\([^)]*\))?/,(_,opts)=>opts.split('|')[0].split('/')[0]))).concat(u.e.map(s=>canonical(s.split('=>')[1].split('||')[0])),u.t.map(s=>canonical(s.split('=>')[1].split('||')[0]))));
  for(const v of ['A','B'])for(const[k,len]of[['gap',8],['err',3],['tr',2]])for(let i=0;i<len;i++){const d=Learning.question({u:n,b:'transfer',v,k,i}).data,text=d.full||d.a[0];assert.ok(!old.has(canonical(text)),`original collision ${n} ${v} ${k} ${i}`);assert.ok(!p.story.includes(text),`story collision ${n}`);}
 }
});
test('editing stems contain only the sentence, so editing a prefilled answer cannot submit instructions',()=>{
 for(let n=1;n<=145;n++)for(const v of ['A','B'])for(let i=0;i<3;i++){const q=Learning.question({u:n,b:'transfer',v,k:'err',i});assert.ok(!/[А-Яа-яЁё]/.test(q.data.q),`${n} ${v} ${i}`);}
});
test('closed-class form prompts do not reveal the preposition or article answer in the hint',()=>{
 for(const n of [72,73,121,123,126,129,145])for(const v of ['A','B'])for(let i=0;i<8;i++){const d=Learning.question({u:n,b:'transfer',v,k:'gap',i}).data;assert.notEqual(d.hint.toLowerCase(),d.correct.toLowerCase(),`${n} ${v} ${i}`);}
});
