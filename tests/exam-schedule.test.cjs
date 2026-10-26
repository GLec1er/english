const test=require('node:test'),assert=require('node:assert/strict');
const E=require('../js/exam.js'),C=require('../js/course.js'),S=require('../js/study.js');
let Q={};try{Q=require('../js/exam-schedule.js');}catch(e){if(e.code!=='MODULE_NOT_FOUND')throw e;}
const items=Array.from({length:8},(_,i)=>({t:'fill',ref:{u:36,k:'gap',i}})).concat(Array.from({length:3},(_,i)=>({t:'err',ref:{u:36,k:'err',i}})),Array.from({length:2},(_,i)=>({t:'tr',ref:{u:36,k:'tr',i}})));
function exams(manual=false){let s=E.start({},36,items,'exam-'+new Date('2026-10-23T12:00:00+03:00').getTime()+'-qa','2026-10-23');items.forEach((it,i)=>s=E.answer(s,36,E.key(it),{ok:manual?i<10:true,user:'saved '+i}));s=E.finish(s,36,'2026-10-26');return manual?E.credit(s,36,E.status(s,36).last.id,'2026-10-26'):s;}
const context=(manual=false)=>({course:C.normalize({since:'2026-10-23'}),exams:exams(manual),club:{goals:{'2026-10-23':{unit:36},'2026-10-26':{unit:36}}},dailyPlan:{'2026-10-23':36,'2026-10-26':36},activity:[{day:'2026-10-23',kind:'step',units:[36]}]});
test('a delayed exam closes Friday and leaves Monday available for the next unit',()=>{
 assert.equal(typeof Q.close,'function');const state=context(),out=Q.close(state,36,'2026-10-26',true);
 assert.deepEqual(out.closed,{'2026-10-23':36});assert.equal(C.next(out,'2026-10-26'),37);assert.equal(C.access(out,'2026-10-26',37).allowed,true);
 assert.equal(E.status(state.exams,36).last.day,'2026-10-26');assert.equal(Object.values(E.status(state.exams,36).last.answers).length,13);
 assert.deepEqual(Q.close({...state,course:out},36,'2026-10-26',true),out);
});
test('manual credit uses the same study day without changing the actual score',()=>{
 assert.equal(typeof Q.close,'function');const state=context(true),out=Q.close(state,36,'2026-10-26',true);
 assert.deepEqual(out.closed,{'2026-10-23':36});assert.equal(E.status(state.exams,36).best,77);
});
test('the lesson day follows real study evidence rather than an idle stale plan',()=>{
 assert.equal(typeof Q.resolve,'function');const state=context();state.club.goals['2026-10-22']={unit:36};state.dailyPlan['2026-10-22']=36;
 assert.equal(Q.resolve(state,36,'2026-10-26',E.status(state.exams,36).last),'2026-10-23');
 state.course.since='2026-10-26';assert.equal(Q.resolve(state,36,'2026-10-26',E.status(state.exams,36).last),'2026-10-26');
});
test('today repair moves only a confirmed delayed exam and keeps answers and activity intact',()=>{
 assert.equal(typeof Q.repairToday,'function');const state=context();state.course.closed['2026-10-26']=36;
 const out=Q.repairToday(state,'2026-10-26');assert.deepEqual(out.course.closed,{'2026-10-23':36});assert.equal(out.exams,state.exams);assert.equal(out.activity,state.activity);
 assert.equal(out.changes.length,1);assert.equal(Q.repairToday(out,'2026-10-26').changes.length,0);
 const reloaded={...out,course:C.normalize(JSON.parse(JSON.stringify(out.course))),exams:E.normalize(JSON.parse(JSON.stringify(out.exams)))};
 assert.deepEqual(Q.close(reloaded,36,'2026-10-26',true).closed,{'2026-10-23':36});
});
test('repair refuses occupied days, ambiguous evidence and older valid claims',()=>{
 assert.equal(typeof Q.repairToday,'function');let state=context();state.course.closed={'2026-10-23':35,'2026-10-26':36};
 assert.deepEqual(Q.repairToday(state,'2026-10-26').course,state.course);
 state=context();state.exams.units[36].history[0].id='legacy';delete state.exams.units[36].history[0].startedDay;delete state.exams.units[36].history[0].lessonDay;state.activity=[];state.course.closed['2026-10-26']=36;
 assert.equal(Q.repairToday(state,'2026-10-26').changes.length,0);
 state=context();state.course.closed={'2026-10-22':36};assert.equal(Q.repairToday(state,'2026-10-26').changes.length,0);
});
test('study credit cannot skip prerequisites, sequence or grant a second current-day unit',()=>{
 assert.equal(typeof Q.close,'function');const state=context();assert.equal(Q.close(state,36,'2026-10-26',false),state.course);assert.equal(Q.close(state,37,'2026-10-26',true),state.course);
 const todayOnly={...state,club:{goals:{}},dailyPlan:{},activity:[],exams:exams()};const a=todayOnly.exams.units[36].history[0];a.id='legacy';delete a.startedDay;delete a.lessonDay;
 const out=Q.close(todayOnly,36,'2026-10-26',true);assert.deepEqual(out.closed,{'2026-10-26':36});assert.equal(C.access(out,'2026-10-26',37).allowed,false);
});
test('retention starts after the real pass date even when the course credit is backdated',()=>{
 assert.equal(typeof Q.reviewDays,'function');const L=require('../js/learning.js'),state=context(),closed={'2026-10-23':36};
 const out=L.seedTopics(L.normalize({},'2026-10-26'),closed,'2026-10-26',Q.reviewDays(state.exams));
 assert.equal(out.topics[36].due,'2026-10-27');
});
test('a catch-up pass and the new Monday unit can close distinct days without extra Monday credit',()=>{
 const Club=require('../js/club.js'),state=context();state.course=Q.close(state,36,'2026-10-26',true);
 const newer=items.map(it=>({...it,ref:{...it.ref,u:37}}));state.exams=E.start(state.exams,37,newer,'monday','2026-10-26');
 for(const it of newer)state.exams=E.answer(state.exams,37,E.key(it),{ok:true,user:'new lesson'});
 state.exams=E.finish(state.exams,37,'2026-10-26');state.club.goals['2026-10-26']={unit:37};
 state.course=Q.close(state,37,'2026-10-26',true);assert.deepEqual(state.course.closed,{'2026-10-23':36,'2026-10-26':37});
 assert.equal(C.access(state.course,'2026-10-26',38).allowed,false);
 const club=Club.normalize({since:'2026-10-23'},'2026-10-26');assert.equal(Club.completion([],club,state.course,'2026-10-26').xp,20);
});
test('invalid imported date bindings cannot credit a weekend or future study day',()=>{
 const s=exams(),a=s.units[36].history[0];a.lessonDay='2026-10-25';a.startedDay='2026-10-27';
 const restored=E.normalize(s);assert.equal(restored.units[36].history[0].lessonDay,undefined);assert.equal(restored.units[36].history[0].startedDay,undefined);
 a.lessonDay='2026-10-27';assert.equal(E.normalize(s).units[36].history[0].lessonDay,undefined);
});
test('legacy Unit 45 studied Friday and submitted Monday is moved to Friday, unlocking Unit 46',()=>{
 const dates=['2026-10-12','2026-10-13','2026-10-14','2026-10-15','2026-10-16','2026-10-19','2026-10-20','2026-10-21','2026-10-22'];
 const course=C.normalize({since:dates[0],closed:{...Object.fromEntries(dates.map((d,i)=>[d,36+i])),'2026-10-26':45}});
 const descriptors=items.map(it=>({...it,ref:{...it.ref,u:45}})),answers=Object.fromEntries(descriptors.map(it=>[E.key(it),{ok:true,user:'retained original'}]));
 const history={id:'exam-'+new Date('2026-10-25T12:00:00+03:00').getTime()+'-old',day:'2026-10-26',items:descriptors,answers};
 const state={course,exams:E.normalize({units:{45:{history:[history],draft:null}}}),club:{goals:{'2026-10-23':{unit:45},'2026-10-26':{unit:45}}},dailyPlan:{},activity:[{day:'2026-10-23',kind:'unit',units:[45]}]};
 const out=Q.repairToday(state,'2026-10-26');assert.equal(out.course.closed['2026-10-23'],45);assert.equal(out.course.closed['2026-10-26'],undefined);
 assert.equal(C.next(out.course,'2026-10-26'),46);assert.equal(C.access(out.course,'2026-10-26',46).allowed,true);
 assert.deepEqual(out.exams,state.exams);assert.equal(C.rank(out.course,'2026-10-26').done,10);
});
test('a failed exam cannot create a past closure or authorize a migration',()=>{
 const state=context(true);delete state.exams.units[36].history[0].manualPass;
 assert.equal(Q.close(state,36,'2026-10-26',true),state.course);
 state.course.closed['2026-10-26']=36;assert.equal(Q.repairToday(state,'2026-10-26').changes.length,0);
});
