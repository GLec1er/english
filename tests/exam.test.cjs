const { test } = require('node:test');
const assert = require('node:assert/strict');
let E = {}; try { E = require('../js/exam.js'); } catch (e) { if(e.code!=='MODULE_NOT_FOUND')throw e; }
const pool = () => ['mc','fill','order','lgap','dict'].flatMap(t=>Array.from({length:8},(_,i)=>({t,ref:{u:36,k:'gap',i}}))).concat(Array.from({length:3},(_,i)=>({t:'err',ref:{u:36,k:'err',i}})),Array.from({length:2},(_,i)=>({t:'tr',ref:{u:36,k:'tr',i}})));
const bank = () => E.select(pool(),()=>0.4);
function answered(n) { let s=E.start({},36,bank(),'a','2026-10-12'); bank().forEach((it,i)=>s=E.answer(s,36,E.key(it),{ok:i<n,user:'answer'})); return s; }
test('exam selects distinct examples across seven automatically graded formats',()=>{
 const b=bank(); assert.equal(b.length,13); assert.equal(new Set(b.map(E.key)).size,13);
 assert.deepEqual([...new Set(b.map(it=>it.t))].sort(),['dict','err','fill','lgap','mc','order','tr']);
});
test('exam falls back to form input when sentences cannot use word order',()=>{const b=E.select(pool().filter(it=>it.t!=='order'));assert.equal(b.length,13);assert.equal(new Set(b.map(E.key)).size,13);});
test('a paused exam survives JSON export and resumes only unchecked questions',()=>{
 let s=E.start({},36,bank(),'a','2026-10-12');s=E.answer(s,36,E.key(bank()[0]),{ok:false,user:'wrong'});
 const restored=E.normalize(JSON.parse(JSON.stringify(s)));assert.equal(E.status(restored,36).draft.answers[E.key(bank()[0])].user,'wrong');assert.equal(E.status(restored,36).answered,1);assert.equal(E.canClose(restored,36,true),false);
});
test('ten of thirteen fails and eleven passes without rounded threshold shortcuts',()=>{
 const fail=E.finish(answered(10),36);const pass=E.finish(answered(11),36);
 assert.equal(E.status(fail,36).passed,false);assert.equal(E.status(pass,36).passed,true);
 assert.equal(E.canClose(pass,36,false),false);assert.equal(E.canClose(pass,36,true),true);assert.equal(E.canClose(pass,37,true),false);
});
test('unfinished exams cannot be submitted; final submission is idempotent',()=>{
 const s=E.start({},36,bank(),'a','2026-10-12');assert.equal(E.status(E.finish(s,36),36).attempts,0);
 const done=E.finish(answered(13),36);assert.equal(E.status(E.finish(done,36),36).attempts,1);assert.equal(E.status(done,36).draft,null);
});
test('a failed retake preserves the prior pass and original completed answer is immutable',()=>{
 let s=E.finish(answered(13),36);s=E.start(s,36,bank(),'b','2026-10-13');bank().forEach(it=>s=E.answer(s,36,E.key(it),{ok:false,user:'wrong'}));
 s=E.answer(s,36,E.key(bank()[0]),{ok:true,user:'changed'});assert.equal(E.status(s,36).draft.answers[E.key(bank()[0])].ok,false);
 s=E.finish(s,36);assert.equal(E.status(s,36).passed,true);assert.equal(E.status(s,36).attempts,2);
});
test('malformed imports and duplicate exams do not fabricate passes',()=>{
 assert.equal(E.status(E.normalize({units:{36:{history:[{id:'x',day:'bad',items:[],answers:{},pct:100}]},146:{passed:true}}}),36).passed,false);
 const good=E.finish(answered(13),36);good.units[36].history.push(good.units[36].history[0]);assert.equal(E.status(E.normalize(good),36).attempts,1);
});
test('finishing a resumed attempt records its completion day rather than its start day',()=>{const s=E.finish(answered(13),36,'2026-10-13');assert.equal(E.status(s,36).last.day,'2026-10-13');});
test('exam closure preserves old days and refuses a second unit or weekend closure',()=>{
 const C=require('../js/course.js');let c=C.normalize({since:'2026-10-12',closed:{'2026-10-12':35}});
 let s=E.finish(answered(11),36);assert.deepEqual(C.close(c,'2026-10-13',36,E.canClose(s,36,false),36).closed,{'2026-10-12':35});
 c=C.close(c,'2026-10-13',36,E.canClose(s,36,true),36);assert.deepEqual(c.closed,{'2026-10-12':35,'2026-10-13':36});
 assert.deepEqual(C.close(c,'2026-10-13',37,true,37).closed,c.closed);assert.deepEqual(C.close(c,'2026-10-17',37,true,37).closed,c.closed);
});
test('all 145 real units produce thirteen unique assessable examples',()=>{
 const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');const ctx={};ctx.window=ctx;vm.createContext(ctx);const dir=path.join(__dirname,'../js');vm.runInContext(fs.readFileSync(path.join(dir,'registry.js'),'utf8'),ctx);
 fs.readdirSync(path.join(dir,'data')).filter(f=>f.endsWith('.js')).forEach(f=>vm.runInContext(fs.readFileSync(path.join(dir,'data',f),'utf8'),ctx));
 for(const u of ctx.EGIU.list){const gaps=Array.from(u.g,(g,i)=>{const m=g.match(/^(.*?)\[([^\]]+)\](?:\(([^)]*)\))?(.*)$/);const correct=m[2].split('|')[0].split('/')[0];const words=(m[1]+correct+m[4]).split(' ').length;return {i,words};});const p=['mc','fill','lgap','dict','order'].flatMap(t=>gaps.filter(g=>t!=='order'||g.words>=3&&g.words<=14).map(g=>({t,ref:{u:u.n,k:'gap',i:g.i}}))).concat(Array.from(u.e,(_,i)=>({t:'err',ref:{u:u.n,k:'err',i}})),Array.from(u.t,(_,i)=>({t:'tr',ref:{u:u.n,k:'tr',i}})));const b=E.select(p);assert.equal(b.length,13,'unit '+u.n);assert.equal(new Set(b.map(E.key)).size,13);}
});
