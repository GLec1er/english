/* One selected complete unit per weekday; thematic ranks count unique units. */
(function(root){
  'use strict';
  const Study=typeof module!=='undefined'&&module.exports?require('./study.js'):root.EGIUStudy;
  const RANKS=[
    {en:'Commoner',ru:'Простолюдин',at:0},{en:'Yeoman',ru:'Йомен',at:1},
    {en:'Esquire',ru:'Эсквайр',at:10},{en:'Knight',ru:'Рыцарь',at:25},
    {en:'Baron',ru:'Барон',at:45},{en:'Viscount',ru:'Виконт',at:65},
    {en:'Earl',ru:'Граф',at:85},{en:'Marquess',ru:'Маркиз',at:105},
    {en:'Duke',ru:'Герцог',at:125},{en:'King',ru:'Король',at:145}
  ];
  function normalize(raw){
    raw=raw&&typeof raw==='object'?raw:{};
    const course={version:1,since:Study.date(raw.since)?raw.since:'2026-10-12',startUnit:Number.isInteger(raw.startUnit)&&raw.startUnit>=1&&raw.startUnit<=145?raw.startUnit:36,closed:{}};
    const used=new Set();
    if(raw.closed&&typeof raw.closed==='object') Object.entries(raw.closed).sort(([a],[b])=>a.localeCompare(b)).forEach(([day,unit])=>{
      if(!Study.date(day)||Study.isWeekend(day)||day<course.since||!Number.isInteger(unit)||unit<1||unit>145||used.has(unit)) return;
      used.add(unit);course.closed[day]=unit;
    });
    return course;
  }
  const closedUnits=(course,day)=>new Set(Object.entries(course.closed).filter(([d])=>d<=day).map(([,u])=>u));
  function close(course,day,unit,complete,target){
    if(!Study.date(day)||day<course.since||Study.isWeekend(day)||complete!==true||unit!==target||!Number.isInteger(unit)||unit<1||unit>145||course.closed[day]||closedUnits(course,day).has(unit)) return course;
    return {...course,closed:{...course.closed,[day]:unit}};
  }
  function next(course,day){
    const done=closedUnits(course,day);
    for(let u=course.startUnit;u<=145;u++) if(!done.has(u)) return u;
    for(let u=1;u<course.startUnit;u++) if(!done.has(u)) return u;
    return null;
  }
  function rank(course,day){
    const done=closedUnits(course,day).size;
    const current=RANKS.slice().reverse().find(r=>done>=r.at),nextRank=RANKS.find(r=>r.at>done)||null;
    return {done,total:145,current,next:nextRank,remaining:nextRank?nextRank.at-done:0,pct:Math.round(done/145*100)};
  }
  function planAfter(course,day){if(!Study.date(day))return null;const tomorrow=Study.shift(day,1),unit=next(course,tomorrow);return {day:tomorrow,kind:Study.isWeekend(tomorrow)?'review':unit?'unit':'free',unit:Study.isWeekend(tomorrow)?null:unit};}
  function sectionProgress(course,day,units){
    const closed=closedUnits(course,day),total=units.length,done=units.filter(unit=>closed.has(unit)).length;
    return {done,total,remaining:total-done,pct:total?Math.round(done/total*100):0};
  }
  const api={RANKS,normalize,close,next,rank,closedUnits,planAfter,sectionProgress};
  if(typeof module!=='undefined'&&module.exports) module.exports=api;else root.EGIUCourse=api;
})(typeof window==='undefined'?globalThis:window);
