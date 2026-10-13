const test=require('node:test'),assert=require('node:assert/strict');
let L={};try{L=require('../js/learning.js');}catch(e){if(e.code!=='MODULE_NOT_FOUND')throw e;}
const day='2026-10-13';
test('local feedback flags known patterns and never issues an overall grammar grade',()=>{
 const f=L.feedback('I can to help you. i would went home. I walked aroud the park.',{focus:[{label:'modal',pattern:'\\b(can|would)\\b'}]});
 assert.ok(f.suggestions.some(s=>s.code==='modal-to'));assert.ok(f.suggestions.some(s=>s.code==='would-past'));assert.ok(f.suggestions.some(s=>s.code==='aroud'));assert.equal(f.grade,undefined);assert.equal(f.focus[0].found,true);
 assert.equal(L.feedback('I would like to help you. Could you open the door?',{focus:[]}).suggestions.length,0);
});
test('context drafts and checked responses survive serialization without accepting foreign fields',()=>{
 let s=L.normalize({},day);s=L.saveDraft(s,36,{text:'My text',spoken:'My reply',revealed:true,checks:{meaning:true},answers:{0:1}},day);
 s=L.normalize(JSON.parse(JSON.stringify(s)),day);assert.equal(s.drafts[36].text,'My text');assert.equal(s.drafts[36].spoken,'My reply');assert.equal(s.drafts[36].answers[0],1);assert.equal(s.drafts[146],undefined);
});
test('claimed units enter retention without moving their original course day',()=>{
 const s=L.seedTopics(L.normalize({},day),{'2026-10-12':36,'2026-10-14':37},day);
 assert.equal(s.topics[36].due,day);assert.equal(s.topics[37],undefined);assert.equal(L.dueTopics(s,day).length,1);
});
test('topic retention advances only at due dates; failure schedules tomorrow',()=>{
 let s=L.seedTopics(L.normalize({},day),{'2026-10-12':36},day);
 s=L.reviewTopic(s,36,true,day,'a');assert.equal(s.topics[36].stage,1);assert.equal(s.topics[36].due,'2026-10-20');
 s=L.reviewTopic(s,36,true,day,'b');assert.equal(s.topics[36].stage,1);
 s=L.reviewTopic(s,36,true,'2026-10-20','c');assert.equal(s.topics[36].stage,2);assert.equal(s.topics[36].due,'2026-11-19');
 s=L.reviewTopic(s,36,false,'2026-11-19','d');assert.equal(s.topics[36].stage,0);assert.equal(s.topics[36].due,'2026-11-20');
});
test('phrase notebook stores own entries and cannot advance on repeated same-day checks',()=>{
 let s=L.addPhrase(L.normalize({},day),{id:'my-1',unit:36,phrase:'would you mind',meaning:'не мог бы ты',example:'Would you mind opening the window?'},day);
 assert.equal(L.duePhrases(s,day).length,1);s=L.reviewPhrase(s,'my-1',true,day);assert.equal(s.phrases['my-1'].stage,1);s=L.reviewPhrase(s,'my-1',true,day);assert.equal(s.phrases['my-1'].stage,1);
 assert.equal(Object.keys(L.addPhrase(s,{id:'bad',phrase:'',meaning:''},day).phrases).length,1);
});
test('fresh application evidence counts each question once rather than best retakes',()=>{
 let s=L.normalize({},day);const rows=Array.from({length:13},(_,i)=>({key:'36:transfer:A:'+i,ok:i<11}));
 s=L.recordApplication(s,36,rows,day);s=L.recordApplication(s,36,rows.map(r=>({...r,ok:true})),day);
 assert.deepEqual(s.evidence[36].application,{correct:11,total:13});assert.equal(L.skills(s,36).application,true);assert.equal(L.skills(s,36).speaking,false);
});
test('assessment form selection exhausts A/B before truthfully labelling familiar reuse',()=>{
 assert.deepEqual(L.nextForm([]),{form:'A',fresh:true});assert.deepEqual(L.nextForm(['A']),{form:'B',fresh:true});assert.deepEqual(L.nextForm(['A','B']),{form:'A',fresh:false});
});
test('partial retention answers save their own refs and fixed order',()=>{
 let s=L.normalize({},day);s=L.startSession(s,'topic36',[{t:'fill',ref:{u:36,b:'transfer',v:'B',k:'gap',i:0}}],'s',day);s=L.answerSession(s,'topic36','36:transfer:B:gap:0',{ok:false,user:'wrong'});
 s=L.normalize(JSON.parse(JSON.stringify(s)),day);assert.equal(s.sessions.topic36.answers['36:transfer:B:gap:0'].user,'wrong');assert.equal(s.sessions.topic36.items[0].ref.v,'B');
});
test('evidence deduplicates repeated rows inside a single save',()=>{
 const s=L.recordApplication(L.normalize({},day),36,[{key:'q1',ok:false},{key:'q1',ok:true}]);assert.deepEqual(s.evidence[36].application,{correct:0,total:1});
});
test('a manually accepted retention answer persists without creating another item',()=>{
 let s=L.startSession(L.normalize({},day),'topics',[{t:'tr',ref:{u:36,b:'transfer',v:'A',k:'tr',i:0}}],'run',day);
 s=L.answerSession(s,'topics','36:transfer:A:tr:0',{ok:false,user:'valid alternative'});s=L.acceptSessionAnswer(s,'topics','36:transfer:A:tr:0');assert.equal(L.normalize(s,day).sessions.topics.answers['36:transfer:A:tr:0'].ok,true);
});
test('malformed imported sessions cannot pair an incompatible renderer with a question',()=>{
 const s=L.normalize({sessions:{topics:{id:'test',day,items:[{t:'tr',ref:{u:36,b:'transfer',v:'A',k:'gap',i:0}}],answers:{}}}},day);assert.equal(s.sessions.topics,undefined);
});
test('form usage records one event once and alternates after both finite forms were seen',()=>{
 let s=L.normalize({},day);for(const [v,id]of[['A','one'],['A','one'],['B','two'],['A','three']])s=L.useForm(s,36,v,id);s=L.normalize(JSON.parse(JSON.stringify(s)),day);assert.equal(s.forms[36].length,3);assert.deepEqual(L.nextForm(s.forms[36].map(x=>x.v)),{form:'B',fresh:false});
});
test('optional AI feedback survives export as a dated review of its own text without credentials',()=>{
 const review={summary:'OK',corrections:[],revised:'My answer.',followUp:'Try another.'};let s=L.saveReview(L.normalize({},day),36,'context',{source:'My answer.',model:'openai/gpt-5.6-luna',review,cost:.2},day);s=L.normalize(JSON.parse(JSON.stringify(s)),day);assert.equal(s.reviews[36].context.source,'My answer.');assert.equal(s.reviews[36].context.review.summary,'OK');assert.equal(s.reviews[36].context.key,undefined);
});
