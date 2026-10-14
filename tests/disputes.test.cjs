const test=require('node:test'),assert=require('node:assert/strict');
let D={};try{D=require('../js/disputes.js')}catch(e){if(e.code!=='MODULE_NOT_FOUND')throw e;}
const S=require('../js/steps.js'),R=require('../js/review.js');
const E=require('../js/exam.js');
const ref={u:36,k:'gap',i:0},item={ref,t:'fill',data:{before:'I ',after:' go.',hint:'',answers:['would'],expectedAnswers:['would','could'],grammarAnswers:['would','could'],correct:'would',full:'I would go.',orderAnswers:['I would go.']}};
const verdict={verdict:'acceptable',explanation:'Оба варианта допустимы.',translation:'Я мог бы пойти.',suggestedAnswer:'could'};
test('adjudication preserves gap format and the complete exercise context',()=>{assert.deepEqual(D.exercise(item,'Modal + infinitive'),{mode:'fill',prompt:'I ___ go.',hint:'',expected:['would','could'],rule:'Modal + infinitive',meaning:'',words:[],heard:''});});
test('listening uses the recording rather than grammatical alternatives; order keeps supplied words',()=>{
 const l=D.exercise({...item,t:'lgap'},'Modal');assert.deepEqual(l.expected,['would']);assert.equal(l.heard,'I would go.');
 const d=D.exercise({...item,t:'dict'},'Modal');assert.deepEqual(d.expected,['I would go.']);assert.equal(d.heard,'I would go.');
 const o=D.exercise({...item,t:'order'},'Modal');assert.deepEqual(o.words,['I','would','go']);assert.deepEqual(o.expected,['I would go.']);
});
test('editing and paraphrase keep their actual instructions; unsupported tasks have no appeal',()=>{
 assert.equal(D.exercise({ref:{...ref,k:'tr'},t:'tr',data:{q:'Rewrite using would.',a:['I would go.']}},'Modal').prompt,'Rewrite using would.');
 assert.equal(D.exercise({ref:{...ref,k:'err'},t:'err',data:{q:'I would went.',a:['I would go.']}},'Modal').prompt,'I would went.');
 assert.equal(D.exercise({t:'snd',data:{word:'cat'}},''),null);
});
test('a cached verdict survives export but cannot be reused for another answer, mode, rule or model',()=>{
 const exercise=D.exercise(item,'Modal'),row={exercise,source:'could',model:'openai/gpt-5.6-luna',day:'2026-10-13',cost:.12,review:verdict,key:'secret'};
 const saved=D.remember([],row),loaded=D.normalize(JSON.parse(JSON.stringify(saved)));
 assert.equal(JSON.stringify(loaded).includes('secret'),false);assert.equal(D.cached(loaded,exercise,'could',row.model).review.verdict,'acceptable');
 assert.equal(D.cached(loaded,exercise,'will',row.model),null);assert.equal(D.cached(loaded,{...exercise,mode:'mc'},'could',row.model),null);assert.equal(D.cached(loaded,{...exercise,rule:'Changed'},'could',row.model),null);assert.equal(D.cached(loaded,exercise,'could','openai/gpt-5-mini'),null);
 assert.equal(D.remember(saved,row).length,1);assert.equal(D.normalize([{...row,review:{...verdict,verdict:'invented'}}]).length,0);
 const blank=D.remember([],{...row,source:''});assert.equal(D.cached(blank,exercise,'',row.model).source,'');
});
test('accepting a journal appeal restores earlier reinforcement and corrects the same saved activity',()=>{
 const old=R.normalize([{...ref,stage:2,due:'2026-10-20',lapses:3}], '2026-10-13');
 const mistakes=R.record(old,ref,{ok:false,user:'could',mode:'fill'},'2026-10-13','session:0'),row=mistakes[0];
 const state={mistakes,steps:{'36:fill':S.record(null,'gap:0',{ok:false,score:0,user:'could',reviewEvent:'session:0',eventId:'activity'},123)},exams:{units:{}},activity:[{id:'activity',answers:1,correct:0}]};
 const result=D.resolve(state,row);assert.deepEqual(result.mistakes,old);assert.equal(result.steps['36:fill'].answers['gap:0'].ok,true);assert.deepEqual(result.activity,[{id:'activity',answers:1,correct:1}]);
 assert.deepEqual(D.resolve(result,row),result);
 const newer={...state,mistakes:R.record(mistakes,ref,{ok:false,user:'new',mode:'fill'},'2026-10-13','new:0')};assert.deepEqual(D.resolve(newer,row),newer);
});
test('journal exam acceptance updates only the rejected attempt and its existing scored activity',()=>{
 const items=['fill','fill','fill','fill','fill','fill','fill','fill','err','err','err','tr','tr'].map((t,i)=>({t,ref:{u:36,k:i<8?'gap':i<11?'err':'tr',i:i<8?i:i<11?i-8:i-11}}));
 let exams=E.start({},36,items,'exam-a','2026-10-13');items.forEach((it,i)=>exams=E.answer(exams,36,E.key(it),{ok:i!==0&&i!==1&&i!==2,user:'could'}));exams=E.finish(exams,36);
 const mistakes=R.record([],ref,{ok:false,user:'could',mode:'fill'},'2026-10-13','exam-a:36:gap:0');
 const state={mistakes,steps:{},exams,activity:[{id:'exam-activity',session:'exam-a',kind:'exam',answers:13,correct:10}]},accepted=D.resolve(state,mistakes[0]);
 assert.equal(E.status(accepted.exams,36).passed,true);assert.equal(E.status(accepted.exams,36).attempts,1);assert.equal(accepted.mistakes.length,0);assert.equal(accepted.activity.length,1);assert.equal(accepted.activity[0].correct,11);assert.equal(accepted.activity[0].answers,13);
});
test('a single false rejection can be dismissed after a later correct review without undoing that success',()=>{
 let mistakes=R.record([],ref,{ok:false,user:'could',mode:'fill'},'2026-10-13','bad:0');mistakes=R.record(mistakes,ref,{ok:true,user:'would',mode:'fill'},'2026-10-13','good:0');
 const state={mistakes,steps:{'36:fill':S.record(null,'gap:0',{ok:false,score:0,user:'could',reviewEvent:'bad:0',eventId:'original'},123)},exams:{units:{}},activity:[{id:'original',answers:1,correct:0},{id:'good',answers:1,correct:1}]};
 const out=D.resolve(state,mistakes[0]);assert.equal(out.mistakes.length,0);assert.equal(out.steps['36:fill'].answers['gap:0'].ok,true);assert.deepEqual(out.activity,[{id:'original',answers:1,correct:1},{id:'good',answers:1,correct:1}]);
});
