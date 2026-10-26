/* Course credit follows the studied lesson; exam activity keeps its real date. */
(function(root){
 'use strict';
 const node=typeof module!=='undefined'&&module.exports;
 const S=node?require('./study.js'):root.EGIUStudy,C=node?require('./course.js'):root.EGIUCourse,E=node?require('./exam.js'):root.EGIUExam;
 function started(attempt){
  if(S.date(attempt?.startedDay))return attempt.startedDay;
  const match=attempt?.id?.match(/^exam-(\d{13})-/);if(!match)return null;
  const day=S.dateKey(new Date(+match[1]));return S.date(day)&&day<=attempt.day?day:null;
 }
 function resolve(state,unit,today,attempt){
  const {course,club={},dailyPlan={},activity=[]}=state;
  const closed=Object.entries(course.closed).find(([d,n])=>n===unit&&d<=today);if(closed)return closed[0];
  const previous=Object.keys(course.closed).filter(d=>d<=today).sort().at(-1);
  const valid=d=>!!S.date(d)&&!S.isWeekend(d)&&d>=course.since&&d<=today&&(!previous||d>previous)&&!course.closed[d];
  if(valid(attempt?.lessonDay))return attempt.lessonDay;
  const begin=started(attempt),study=new Set(activity.filter(e=>e.units?.includes(unit)&&['step','unit','writing'].includes(e.kind)&&valid(e.day)).map(e=>e.day));
  const assigned=Object.keys(club.goals||{}).filter(d=>club.goals[d]?.unit===unit);
  for(const [d,n]of Object.entries(dailyPlan))if(n===unit&&(!club.goals?.[d]||club.goals[d].unit===unit))assigned.push(d);
  const candidates=assigned.filter(d=>valid(d)&&(study.has(d)||d===begin));
  if(valid(begin))candidates.push(begin);
  return candidates.sort()[0]||(valid(today)?today:null);
 }
 function passing(exams,unit){return exams.units[unit]?.history.find(E.passed)||null;}
 function close(state,unit,today,complete){
  const {course,exams}=state,attempt=passing(exams,unit);
  if(complete!==true||!attempt||C.next(course,today)!==unit||C.closedUnits(course,today).has(unit))return course;
  const day=resolve(state,unit,today,attempt);return day?C.close(course,day,unit,true,unit):course;
 }
 function repairToday(state,today){
  const unit=state.course.closed[today];if(!unit)return {...state,changes:[]};
  const attempt=state.exams.units[unit]?.history.find(a=>E.passed(a)&&(a.day===today||a.manualPass?.day===today));
  if(!attempt)return {...state,changes:[]};
  const closed={...state.course.closed};delete closed[today];const course={...state.course,closed},context={...state,course};
  const day=resolve(context,unit,today,attempt);
  if(!day||day>=today||C.next(course,today)!==unit)return {...state,changes:[]};
  const repaired=C.close(course,day,unit,true,unit);
  return repaired===course?{...state,changes:[]}:{...state,course:repaired,changes:[{unit,from:today,to:day}]};
 }
 function reviewDays(exams){const days={};for(const [n,row]of Object.entries(exams.units)){
  const passed=row.history.filter(E.passed).map(a=>a.manualPass?.day||a.day).sort();if(passed.length)days[n]=passed[0];
 }return days;}
 const api={resolve,close,repairToday,reviewDays};if(node)module.exports=api;else root.EGIUExamSchedule=api;
})(typeof window==='undefined'?globalThis:window);
