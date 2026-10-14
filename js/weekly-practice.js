/* Related unit practice, using vocabulary not used in exams or reading. */
(function(root){
 'use strict';
 const node=typeof module!=='undefined'&&module.exports,Data=node?require('./weekly-data.js'):root.EGIUWeeklyData;
 const tokens=s=>String(s||'').toLowerCase().replace(/[^a-z']/g,' ').split(/\s+/).filter(Boolean);
 function parse(row){
  const m=row.raw.match(/^(.*?)\[([^\]]+)\](.*)$/);if(!m)return null;
  const opts=m[2].split('|'),answers=opts[0].split('/').map(x=>x==='-'?'':x),join=a=>(m[1]+a+m[3]).replace(/\s+/g,' ').replace(/\s+([.,!?;:])/g,'$1').trim().replace(/^[a-z]/,c=>c.toUpperCase());
  return {before:m[1],after:m[3],hint:row.hint,answers,expectedAnswers:answers,grammarAnswers:answers,correct:answers[0],wrong:opts.slice(1),full:join(answers[0]),orderAnswers:answers.map(join)};
 }
 function focus(source,pack){
  const r=source.ref;
  if(r.b==='transfer')return r.k==='gap'?Math.floor(r.i/2):r.k==='err'?r.i:r.i+2;
  const words=new Set(tokens(source.data.full||source.data.a?.[0]));
  const grammar=new Set(tokens((source.data.answers||source.data.a||[]).join(' ')));
  const scores=pack.cases.map(([row])=>{const d=parse(row);return tokens(d.full).reduce((n,w)=>n+(words.has(w)?1:0)+(grammar.has(w)?2:0),0);});
  return scores.indexOf(Math.max(...scores));
 }
 function drills(source){
  const r=source&&source.ref,pack=r&&Data.units[r.u];if(!pack||!source.data)return [];
  const i=focus(source,pack),pair=pack.cases[i];if(!pair)return [];
  const listening=['lgap','dict','speak'].includes(source.t);
  return pair.map((row,j)=>{
   const d=parse(row),note={translation:row.translation,explanation:pack.rule};
   if(listening||j===0)return {t:listening?j===0?'dict':'lgap':'fill',ref:{u:r.u,b:'weekly',v:j?'D':'C',k:'gap',i},data:d,note};
   const q=(d.before+d.wrong.at(-1)+d.after).replace(/\s+/g,' ').trim(),a=d.orderAnswers;
   return {t:'err',ref:{u:r.u,b:'weekly',v:'D',k:'err',i},data:{q,a,expectedAnswers:a,meaning:row.translation},note};
  });
 }
 const api={drills};if(node)module.exports=api;else root.EGIUWeeklyPractice=api;
})(typeof window==='undefined'?globalThis:window);
