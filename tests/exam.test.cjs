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
test('transfer form identity survives paused exam export and cannot collide with original refs',()=>{
 const a=bank().map(it=>({...it,ref:{...it.ref,b:'transfer',v:'A'}}));let s=E.start({},36,a,'transfer','2026-10-13');s=E.answer(s,36,E.key(a[0]),{ok:true,user:'new'});
 s=E.normalize(JSON.parse(JSON.stringify(s)));assert.equal(E.status(s,36).draft.items[0].ref.b,'transfer');assert.equal(E.status(s,36).draft.items[0].ref.v,'A');assert.notEqual(E.key(a[0]),E.key(bank()[0]));assert.notEqual(E.key(a[0]),E.key({...a[0],ref:{...a[0].ref,v:'B'}}));
});
test('an explicit appeal can correct a submitted answer once without another attempt',()=>{
 const s=E.finish(answered(10),36),key=E.key(bank()[10]);
 const accepted=E.accept(s,36,'a',key,'answer');assert.equal(E.status(accepted,36).passed,true);assert.equal(E.status(accepted,36).attempts,1);
 assert.equal(E.status(s,36).passed,false);assert.equal(E.status(accepted,36).last.answers[key].accepted,true);
 assert.equal(E.status(E.normalize(JSON.parse(JSON.stringify(accepted))),36).last.answers[key].accepted,true);
 assert.deepEqual(E.accept(accepted,36,'a',key,'answer'),accepted);
 assert.deepEqual(E.accept(s,36,'a',key,'another answer'),s);assert.deepEqual(E.accept(s,36,'other',key,'answer'),s);
 assert.deepEqual(E.accept(answered(10),36,'a',key,'answer'),answered(10));
});
test('manual credit passes a completed exam without rewriting its score, answers or completion day',()=>{
 assert.equal(typeof E.credit,'function');
 const before=E.finish(answered(10),36),credited=E.credit(before,36,'a','2026-10-20');
 assert.equal(E.status(before,36).passed,false);assert.equal(E.status(credited,36).passed,true);
 assert.equal(E.status(credited,36).best,77);assert.equal(E.status(credited,36).attempts,1);
 assert.deepEqual(E.status(credited,36).last.answers,E.status(before,36).last.answers);
 assert.equal(E.status(credited,36).last.day,'2026-10-12');
 assert.equal(E.status(credited,36).last.manualPass.day,'2026-10-20');
 assert.equal(E.canClose(credited,36,false),false);assert.equal(E.canClose(credited,36,true),true);
});
test('manual credit cannot skip an unfinished exam or touch an unrelated attempt and is idempotent',()=>{
 assert.equal(typeof E.credit,'function');
 const unfinished=answered(10);assert.equal(E.credit(unfinished,36,'a','2026-10-20'),unfinished);
 const done=E.finish(answered(10),36);
 for(const [unit,id,day]of [[37,'a','2026-10-20'],[36,'other','2026-10-20'],[36,'a','bad'],[36,'a','2026-10-11']])assert.equal(E.credit(done,unit,id,day),done);
 const active=E.start(done,36,bank(),'b','2026-10-20');assert.equal(E.credit(active,36,'a','2026-10-20'),active);
 const credited=E.credit(done,36,'a','2026-10-20');assert.equal(E.credit(credited,36,'a','2026-10-21'),credited);
 const passed=E.finish(answered(11),36);assert.equal(E.credit(passed,36,'a','2026-10-20'),passed);
});
test('manual credit survives export while malformed or premature imported credits do not pass',()=>{
 assert.equal(typeof E.credit,'function');
 const done=E.finish(answered(10),36),credited=E.normalize(JSON.parse(JSON.stringify(E.credit(done,36,'a','2026-10-20'))));
 assert.equal(E.status(credited,36).passed,true);assert.equal(E.status(credited,36).best,77);
 for(const manualPass of [true,{day:'bad'},{day:'2026-10-11'}]){
  const state=JSON.parse(JSON.stringify(done));state.units[36].history[0].manualPass=manualPass;
  assert.equal(E.status(E.normalize(state),36).passed,false);
 }
 const draft=answered(10);delete draft.units[36].draft.answers[E.key(bank()[0])];draft.units[36].draft.manualPass={day:'2026-10-20'};
 const imported=E.normalize(draft);assert.equal(E.canClose(imported,36,true),false);assert.equal(imported.units[36].draft.manualPass,undefined);
});
test('a failed retake preserves the earlier manual pass without marking the new attempt correct',()=>{
 assert.equal(typeof E.credit,'function');
 let s=E.credit(E.finish(answered(10),36),36,'a','2026-10-20');s=E.start(s,36,bank(),'b','2026-10-21');
 for(const it of bank())s=E.answer(s,36,E.key(it),{ok:false,user:'new answer'});
 s=E.finish(s,36,'2026-10-21');assert.equal(E.status(s,36).passed,true);assert.equal(E.status(s,36).attempts,2);
 assert.equal(E.status(s,36).last.manualPass,undefined);assert.equal(E.status(s,36).best,77);
 assert.equal(Object.values(E.status(s,36).last.answers).filter(a=>a.ok).length,0);
});
test('a manual pass respects weekday, prerequisites, sequence and one-unit rewards',()=>{
 assert.equal(typeof E.credit,'function');
 const C=require('../js/course.js'),Club=require('../js/club.js'),day='2026-10-20';
 const exam=E.credit(E.finish(answered(10),36),36,'a',day),club=Club.normalize({since:day},day),course=C.normalize({since:day});
 assert.equal(C.close(course,day,36,E.canClose(exam,36,false),36),course);
 const closed=C.close(course,day,36,E.canClose(exam,36,true),36);
 assert.deepEqual(closed.closed,{'2026-10-20':36});assert.equal(Club.ledger([],club,day,closed).xp,20);
 assert.equal(C.close(closed,day,37,true,37),closed);assert.equal(Club.ledger([],club,day,C.close(closed,day,36,true,36)).xp,20);
 assert.equal(C.close(course,'2026-10-24',36,true,36),course);
 assert.equal(C.close(course,day,37,true,37),course);
});
test('an imported draft cannot carry manual credit into its eventual submission',()=>{
 const draft=answered(0);draft.units[36].draft.manualPass={day:'2026-10-20'};
 const normalized=E.normalize(draft);assert.equal(normalized.units[36].draft.manualPass,undefined);
 assert.equal(E.status(E.finish(normalized,36,'2026-10-20'),36).passed,false);
});
