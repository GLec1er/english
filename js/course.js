/* One sequential complete unit per weekday; thematic ranks count unique units. */
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
    if(complete!==true||unit!==target||unit!==next(course,day)||!access(course,day,unit).allowed||closedUnits(course,day).has(unit)) return course;
    return {...course,closed:{...course.closed,[day]:unit}};
  }
  function next(course,day){
    const done=closedUnits(course,day);
    for(let u=course.startUnit;u<=145;u++) if(!done.has(u)) return u;
    for(let u=1;u<course.startUnit;u++) if(!done.has(u)) return u;
    return null;
  }
  function access(course,day,unit){
    if(!Study.date(day)||!Number.isInteger(unit)||unit<1||unit>145)return {allowed:false,reason:'unavailable',required:null};
    if(closedUnits(course,day).has(unit))return {allowed:true,reason:'review',required:null};
    const required=next(course,day);
    // The personal start skips earlier book units once, while keeping their practice open.
    if(unit<course.startUnit&&required>=course.startUnit)return {allowed:true,reason:'background',required};
    if(unit!==required)return {allowed:false,reason:'sequence',required};
    if(day<course.since)return {allowed:false,reason:'not-started',required};
    if(Study.isWeekend(day))return {allowed:false,reason:'weekend',required};
    if(course.closed[day])return {allowed:false,reason:'day-complete',required};
    return {allowed:true,reason:'lesson',required};
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
  const bookReady=(book,unit)=>Number.isInteger(unit)&&unit>=1&&unit<=145&&!!book&&typeof book==='object'&&!Array.isArray(book)&&Object.prototype.hasOwnProperty.call(book,unit)&&book[unit]===true;
  const api={RANKS,normalize,close,next,access,rank,closedUnits,planAfter,sectionProgress,bookReady};
  if(typeof module!=='undefined'&&module.exports) module.exports=api;else root.EGIUCourse=api;
})(typeof window==='undefined'?globalThis:window);
