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
