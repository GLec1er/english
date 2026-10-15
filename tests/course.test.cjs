const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const file=path.join(__dirname,'../js/course.js');
const exists=fs.existsSync(file), C=exists?require(file):null;
const Study=require('../js/study.js');
test('daily course and ranks are available',()=>assert.ok(exists,'daily course is missing'));
const check=(name,fn)=>test(name,{skip:!exists},fn);
check('the new course starts from 36 and background units do not advance it',()=>{
  const c=C.normalize(null);
  assert.equal(C.next(c,'2026-10-12'),36);
  const backfill=C.close(c,'2026-10-12',1,true,1);
  assert.equal(C.next(backfill,'2026-10-12'),36);
});
check('only a complete selected unit can close and only once per weekday',()=>{
  const c=C.normalize(null);
  assert.deepEqual(C.close(c,'2026-10-12',36,false,36),c);
  assert.deepEqual(C.close(c,'2026-10-12',35,true,36),c);
  const closed=C.close(c,'2026-10-12',36,true,36);
  assert.equal(closed.closed['2026-10-12'],36);
  assert.equal(C.next(closed,'2026-10-12'),37);
  assert.deepEqual(C.close(closed,'2026-10-12',37,true,37),closed);
  assert.deepEqual(C.close(closed,'2026-10-13',36,true,36),closed);
});
check('weekends and days before the course start cannot close new units',()=>{
  const c=C.normalize(null);
  assert.deepEqual(C.close(c,'2026-10-11',36,true,36),c);
  assert.deepEqual(C.close(c,'2026-10-17',36,true,36),c);
});
check('ranks depend on unique closed units, never XP or book position',()=>{
  const c=C.normalize(null);
  assert.equal(C.rank(c,'2026-10-12').current.en,'Commoner');
  const next=C.close(c,'2026-10-12',36,true,36), r=C.rank(next,'2026-10-12');
  assert.equal(r.current.en,'Yeoman');assert.equal(r.done,1);assert.equal(r.next.en,'Esquire');assert.equal(r.remaining,9);
});
check('King requires all 145 units; after 145 the course offers missing early units',()=>{
  const closed={};let day='2026-10-12';
  for(let n=36;n<=145;n++){while(Study.isWeekend(day))day=Study.shift(day,1);closed[day]=n;day=Study.shift(day,1);}
  const c=C.normalize({closed});assert.equal(C.next(c,day),1);assert.notEqual(C.rank(c,day).current.en,'King');
  for(let n=1;n<36;n++){while(Study.isWeekend(day))day=Study.shift(day,1);closed[day]=n;day=Study.shift(day,1);}
  const full=C.normalize({closed});assert.equal(C.next(full,day),null);assert.equal(C.rank(full,day).current.en,'King');assert.equal(C.rank(full,day).done,145);
});
check('invalid and duplicate imported claims are removed; future claims do not grant a rank',()=>{
  const c=C.normalize({closed:{'2026-10-12':36,'2026-10-13':36,'2026-10-17':37,'bad':38,'2026-10-14':146,'2026-10-19':37}});
  assert.deepEqual(c.closed,{'2026-10-12':36,'2026-10-19':37});
  assert.equal(C.rank(c,'2026-10-12').done,1);
});
test('the next-day plan follows five study days and two review days without changing course claims',()=>{
 const course=C.normalize({closed:{'2026-10-12':36,'2026-10-13':37}});
 assert.deepEqual(C.planAfter(course,'2026-10-13'),{day:'2026-10-14',kind:'unit',unit:38});
 assert.deepEqual(C.planAfter(course,'2026-10-16'),{day:'2026-10-17',kind:'review',unit:null});
 assert.deepEqual(C.planAfter(course,'2026-10-17'),{day:'2026-10-18',kind:'review',unit:null});
 assert.deepEqual(C.planAfter(course,'2026-10-18'),{day:'2026-10-19',kind:'unit',unit:38});assert.equal(Object.keys(course.closed).length,2);
});
test('section completion includes earlier units when the course starts midway through a section',()=>{
 const course=C.normalize({closed:{'2026-10-12':36,'2026-10-13':37}});
 const modals=[26,27,28,29,30,31,32,33,34,35,36,37];
 assert.deepEqual(C.sectionProgress(course,'2026-10-14',modals),{done:2,total:12,remaining:10,pct:17});
 assert.deepEqual(C.sectionProgress(course,'2026-10-14',[1,2,3,4,5,6]),{done:0,total:6,remaining:6,pct:0});
 assert.deepEqual(course.closed,{'2026-10-12':36,'2026-10-13':37});
});
test('section completion excludes future claims and counts a fully closed section once per unit',()=>{
 const course=C.normalize({closed:{'2026-10-12':36,'2026-10-13':37,'2026-10-15':38}});
 assert.deepEqual(C.sectionProgress(course,'2026-10-14',[36,37]),{done:2,total:2,remaining:0,pct:100});
 assert.deepEqual(C.sectionProgress(course,'2026-10-14',[38,39]),{done:0,total:2,remaining:2,pct:0});
 assert.deepEqual(C.sectionProgress(course,'2026-10-15',[38,39]),{done:1,total:2,remaining:1,pct:50});
});
test('practice requires an explicit saved book confirmation for that unit',()=>{
 assert.equal(typeof C.bookReady,'function','book prerequisite is missing');
 assert.equal(C.bookReady({},36),false);
 assert.equal(C.bookReady({35:true},36),false);
 assert.equal(C.bookReady({36:true},36),true);
 assert.equal(C.bookReady({36:false},36),false);
 for(const value of ['true',1,{},[]])assert.equal(C.bookReady({36:value},36),false);
});
test('book confirmation accepts course boundaries and never grants access from malformed imports',()=>{
 assert.equal(typeof C.bookReady,'function','book prerequisite is missing');
 assert.equal(C.bookReady({1:true,145:true},1),true);
 assert.equal(C.bookReady({1:true,145:true},145),true);
 for(const n of [0,146,-1,36.5,'36',null])assert.equal(C.bookReady({[n]:true},n),false);
 for(const book of [null,undefined,true,[],Object.create({36:true})])assert.equal(C.bookReady(book,36),false);
});
test('withdrawing book confirmation locks practice without altering saved course completion',()=>{
 assert.equal(typeof C.bookReady,'function','book prerequisite is missing');
 const book={36:true},course=C.normalize({closed:{'2026-10-12':36}}),snapshot=JSON.stringify(course);
 assert.equal(C.bookReady(book,36),true);
 delete book[36];
 assert.equal(C.bookReady(book,36),false);
 assert.equal(C.rank(course,'2026-10-15').done,1);
 assert.equal(JSON.stringify(course),snapshot);
});
test('future units require the next course unit; earlier units and closed units stay open',()=>{
 assert.equal(typeof C.access,'function','sequential access is missing');
 const c=C.normalize({closed:{'2026-10-12':36,'2026-10-13':37}});
 assert.equal(C.access(c,'2026-10-15',38).allowed,true);
 assert.equal(C.access(c,'2026-10-15',36).reason,'review');
 for(const unit of [1,35])assert.equal(C.access(c,'2026-10-15',unit).reason,'background');
 for(const unit of [39,42,145]){
  const a=C.access(c,'2026-10-15',unit);assert.equal(a.allowed,false);assert.equal(a.reason,'sequence');assert.equal(a.required,38);
 }
});
test('the skipped beginning is available for background practice without closing another course unit',()=>{
 const c=C.normalize({closed:{'2026-10-12':36}}),snapshot=JSON.stringify(c);
 for(const day of ['2026-10-12','2026-10-15','2026-10-17']){
  assert.equal(C.access(c,day,1).allowed,true);
  assert.equal(C.access(c,day,35).reason,'background');
  assert.deepEqual(C.close(c,day,1,true,1),c);
 }
 assert.equal(JSON.stringify(c),snapshot);
});
test('a closed day and weekends admit revision but no new unit',()=>{
 assert.equal(typeof C.access,'function','sequential access is missing');
 const c=C.normalize({closed:{'2026-10-12':36,'2026-10-13':37}});
 assert.equal(C.access(c,'2026-10-13',38).reason,'day-complete');
 assert.equal(C.access(c,'2026-10-13',37).allowed,true);
 assert.equal(C.access(c,'2026-10-17',38).reason,'weekend');
 assert.equal(C.access(c,'2026-10-18',36).allowed,true);
 assert.equal(C.access(c,'2026-10-19',38).allowed,true);
});
test('an out-of-order goal cannot close a course day even with completed exercises and exam',()=>{
 const c=C.normalize(null);
 assert.deepEqual(C.close(c,'2026-10-15',41,true,41),c);
 assert.deepEqual(C.close(c,'2026-10-15',1,true,1),c);
 assert.equal(C.close(c,'2026-10-15',36,true,36).closed['2026-10-15'],36);
});
test('existing skipped-unit claims remain recorded but cannot unlock another future unit',()=>{
 assert.equal(typeof C.access,'function','sequential access is missing');
 const c=C.normalize({closed:{'2026-10-12':70}}),snapshot=JSON.stringify(c);
 assert.equal(C.access(c,'2026-10-15',70).reason,'review');
 assert.equal(C.access(c,'2026-10-15',71).allowed,false);
 assert.equal(C.access(c,'2026-10-15',71).required,36);
 assert.equal(JSON.stringify(c),snapshot);
});
test('invalid and future course records do not open new lessons',()=>{
 assert.equal(typeof C.access,'function','sequential access is missing');
 const c=C.normalize({closed:{'2026-10-19':36}});
 assert.equal(C.access(c,'2026-10-15',36).allowed,true);
 assert.equal(C.access(c,'2026-10-15',37).allowed,false);
 for(const unit of [0,146,'36',NaN])assert.equal(C.access(c,'2026-10-15',unit).allowed,false);
 assert.equal(C.access(c,'bad',36).allowed,false);
});
test('the next section stays locked until every unit in the current section is closed',()=>{
 let c=C.normalize(null),day='2026-10-12';
 for(let unit=36;unit<=41;unit++){
  while(Study.isWeekend(day))day=Study.shift(day,1);
  assert.equal(C.access(c,day,42).allowed,false);
  assert.equal(C.access(c,day,42).required,unit);
  c=C.close(c,day,unit,true,unit);
  if(unit===41)assert.equal(C.access(c,day,42).reason,'day-complete');
  day=Study.shift(day,1);
 }
 while(Study.isWeekend(day))day=Study.shift(day,1);
 assert.equal(C.sectionProgress(c,day,[38,39,40,41]).remaining,0);
 assert.equal(C.access(c,day,42).allowed,true);
 assert.equal(C.access(c,day,43).allowed,false);
});
test('returning to the skipped beginning keeps the same one-at-a-time order',()=>{
 let c=C.normalize(null),day='2026-10-12';
 for(let unit=36;unit<=145;unit++){
  while(Study.isWeekend(day))day=Study.shift(day,1);
  c=C.close(c,day,unit,true,unit);day=Study.shift(day,1);
 }
 while(Study.isWeekend(day))day=Study.shift(day,1);
 assert.equal(C.access(c,day,1).allowed,true);
 assert.equal(C.access(c,day,2).required,1);
 assert.equal(C.access(c,day,7).allowed,false);
 c=C.close(c,day,1,true,1);day=Study.shift(day,1);
 while(Study.isWeekend(day))day=Study.shift(day,1);
 assert.equal(C.access(c,day,2).allowed,true);
 assert.equal(C.access(c,day,36).reason,'review');
});
