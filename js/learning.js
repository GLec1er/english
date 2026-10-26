/* Context practice, local feedback, retention and personal phrases. No network. */
(function(root){
  'use strict';
  const node=typeof module!=='undefined'&&module.exports;
  const Study=node?require('./study.js'):root.EGIUStudy;
  const Tutor=node?require('./ai-tutor.js'):root.EGIUAITutor;
  let Data=root.EGIULearningData||{units:{}};
  if(node){try{Data=require('./learning-data.js');}catch(e){if(e.code!=='MODULE_NOT_FOUND')throw e;}}
  const unit=n=>Number.isInteger(n)&&n>=1&&n<=145;
  const object=x=>x&&typeof x==='object'&&!Array.isArray(x)?x:{};
  const str=(x,max=10000)=>typeof x==='string'?x.slice(0,max):'';
  const key=r=>r.b?`${r.u}:${r.b}:${r.v}:${r.k}:${r.i}`:`${r.u}:${r.k}:${r.i}`;
  const validRef=r=>r&&unit(r.u)&&['gap','err','tr'].includes(r.k)&&Number.isInteger(r.i)&&r.i>=0&&r.i<({gap:8,err:3,tr:2}[r.k])&&(!r.b||(r.b==='transfer'&&['A','B'].includes(r.v)));
  function scheduled(raw,day){raw=object(raw);return {stage:Number.isInteger(raw.stage)&&raw.stage>=0&&raw.stage<=3?raw.stage:0,due:Study.date(raw.due)?raw.due:day,lastDay:Study.date(raw.lastDay)?raw.lastDay:null,lastEvent:str(raw.lastEvent,100)};}
  function normalize(raw,day){
    raw=object(raw);const s={version:1,topics:{},drafts:{},phrases:{},evidence:{},seen:[],sessions:{},forms:{},reviews:{}};
    Object.entries(object(raw.topics)).forEach(([n,r])=>{if(unit(+n))s.topics[n]={unit:+n,...scheduled(r,day)};});
    Object.entries(object(raw.drafts)).forEach(([n,r])=>{if(!unit(+n))return;r=object(r);const answers={};Object.entries(object(r.answers)).forEach(([i,a])=>{if(/^[0-2]$/.test(i)&&Number.isInteger(a)&&a>=0&&a<8)answers[i]=a;});const checks={};['meaning','form','reviewed','spoken'].forEach(k=>checks[k]=r.checks&&r.checks[k]===true);s.drafts[n]={text:str(r.text),revision:str(r.revision),spoken:str(r.spoken),revealed:r.revealed===true,listened:r.listened===true,answers,checks,quizChecked:r.quizChecked===true,updated:Study.date(r.updated)?r.updated:day};});
    Object.entries(object(raw.phrases)).forEach(([id,r])=>{r=object(r);if(!/^[\w:.-]{1,100}$/.test(id)||!str(r.phrase,300).trim()||!str(r.meaning,500).trim())return;s.phrases[id]={id,unit:unit(r.unit)?r.unit:null,phrase:str(r.phrase,300),meaning:str(r.meaning,500),example:str(r.example,1000),...scheduled(r,day)};});
    Object.entries(object(raw.evidence)).forEach(([n,r])=>{if(!unit(+n))return;r=object(r);const e={};['reading','listening','writing','speaking','retention'].forEach(k=>e[k]=r[k]===true);['application','recognition'].forEach(k=>{const a=r[k];if(a&&Number.isInteger(a.total)&&Number.isInteger(a.correct)&&a.total>=0&&a.correct>=0&&a.correct<=a.total)e[k]={correct:a.correct,total:a.total};});s.evidence[n]=e;});
    Object.entries(object(raw.forms)).forEach(([n,rows])=>{if(!unit(+n)||!Array.isArray(rows))return;const ids=new Set();s.forms[n]=rows.filter(r=>{if(!r||!['A','B'].includes(r.v)||typeof r.event!=='string'||!r.event||ids.has(r.event))return false;ids.add(r.event);return true;}).slice(-500).map(r=>({v:r.v,event:str(r.event,100)}));});
    Object.entries(object(raw.reviews)).forEach(([n,rows])=>{if(!unit(+n))return;const out={};Object.entries(object(rows)).forEach(([kind,r])=>{if(!['context','spoken','write'].includes(kind)||!r||!Tutor.models[r.model]||typeof r.source!=='string'||r.source.length>4000)return;try{out[kind]={source:r.source,task:str(r.task,1500),model:r.model,day:Study.date(r.day)?r.day:day,review:Tutor.parse(JSON.stringify(r.review)),cost:Number.isFinite(r.cost)&&r.cost>=0?r.cost:null};}catch(e){}});if(Object.keys(out).length)s.reviews[n]=out;});
    s.seen=[...new Set((Array.isArray(raw.seen)?raw.seen:[]).filter(k=>typeof k==='string'&&k.length<100))];
    Object.entries(object(raw.sessions)).forEach(([id,r])=>{if(!/^[\w:.-]{1,100}$/.test(id)||!r||typeof r.id!=='string'||!Study.date(r.day)||!Array.isArray(r.items))return;const items=r.items.filter(it=>it&&validRef(it.ref)&&(it.ref.k==='gap'?['mc','fill','order','lgap','dict'].includes(it.t):it.t===it.ref.k)).map(it=>({t:it.t,ref:{...it.ref}}));if(!items.length||items.length!==r.items.length||new Set(items.map(it=>key(it.ref))).size!==items.length)return;const answers={};items.forEach(it=>{const a=r.answers&&r.answers[key(it.ref)];if(a&&typeof a.ok==='boolean')answers[key(it.ref)]={ok:a.ok,score:a.ok?1:0,user:str(a.user)};});s.sessions[id]={id:str(r.id,100),day:r.day,items,answers};});
    return s;
  }
  function saveReview(s,n,kind,r,day){if(!unit(n))return s;return normalize({...s,reviews:{...s.reviews,[n]:{...s.reviews[n],[kind]:{...r,day}}}},day);}
  function saveDraft(s,n,patch,day){if(!unit(n))return s;return normalize({...s,drafts:{...s.drafts,[n]:{...s.drafts[n],...patch,updated:day}}},day);}
  function seedTopics(s,closed,day,completedOn={}){const topics={...s.topics};Object.entries(object(closed)).forEach(([d,n])=>{if(unit(n)&&Study.date(d)&&d<=day&&!topics[n])topics[n]={unit:n,stage:0,due:Study.shift(Study.date(completedOn[n])&&completedOn[n]<=day?completedOn[n]:d,1),lastDay:null,lastEvent:''};});return {...s,topics};}
  const dueTopics=(s,day)=>Object.values(s.topics).filter(r=>r.due<=day).sort((a,b)=>a.due.localeCompare(b.due)||a.unit-b.unit);
  function reviewed(row,ok,day,event){
    if(!row||!Study.date(day)||row.lastDay===day||(event&&row.lastEvent===event))return row;
    if(!ok)return {...row,stage:0,due:Study.shift(day,1),lastDay:day,lastEvent:event||''};
    if(row.due>day)return row;
    const stage=Math.min(3,row.stage+1);return {...row,stage,due:Study.shift(day,stage===1?7:30),lastDay:day,lastEvent:event||''};
  }
  function reviewTopic(s,n,ok,day,event){const old=s.topics[n],next=reviewed(old,ok,day,event);if(next===old)return s;let out={...s,topics:{...s.topics,[n]:next}};if(ok&&next.stage>old.stage)out=recordSkill(out,n,'retention');return out;}
  function addPhrase(s,p,day){if(!p||!p.id||s.phrases[p.id])return s;return normalize({...s,phrases:{...s.phrases,[p.id]:{...p,stage:0,due:day,lastDay:null}}},day);}
  const duePhrases=(s,day)=>Object.values(s.phrases).filter(p=>p.due<=day).sort((a,b)=>a.due.localeCompare(b.due)||a.phrase.localeCompare(b.phrase));
  function reviewPhrase(s,id,ok,day){const old=s.phrases[id],next=reviewed(old,ok,day);return old===next?s:{...s,phrases:{...s.phrases,[id]:next}};}
  function recordSkill(s,n,kind){if(!unit(n)||!['reading','listening','writing','speaking','retention'].includes(kind))return s;return {...s,evidence:{...s.evidence,[n]:{...s.evidence[n],[kind]:true}}};}
  function recordEvidence(s,n,rows,kind){if(!unit(n))return s;const used=new Set(s.seen);const unseen=rows.filter(r=>{if(!r||typeof r.key!=='string'||used.has(r.key))return false;used.add(r.key);return true;});const old=s.evidence[n]||{},counts=old[kind]||{correct:0,total:0};return {...s,seen:[...new Set(s.seen.concat(unseen.map(r=>r.key)))],evidence:{...s.evidence,[n]:{...old,[kind]:{correct:counts.correct+unseen.filter(r=>r.ok).length,total:counts.total+unseen.length}}}};}
  const recordApplication=(s,n,rows)=>recordEvidence(s,n,rows,'application');
  const recordRecognition=(s,n,rows)=>recordEvidence(s,n,rows,'recognition');
  function skills(s,n){const e=s.evidence[n]||{};return {recognition:!!(e.recognition&&e.recognition.total>=5&&e.recognition.correct/e.recognition.total>=0.8),application:!!(e.application&&e.application.total>=6&&e.application.correct/e.application.total>=0.8),reading:!!e.reading,listening:!!e.listening,writing:!!e.writing,speaking:!!e.speaking,retention:!!e.retention};}
  function useForm(s,n,v,event){if(!unit(n)||!['A','B'].includes(v)||!event||(s.forms[n]||[]).some(r=>r.event===event))return s;return {...s,forms:{...s.forms,[n]:(s.forms[n]||[]).concat({v,event}).slice(-500)}};}
  function nextForm(used){return !used.includes('A')?{form:'A',fresh:true}:!used.includes('B')?{form:'B',fresh:true}:{form:used.at(-1)==='A'?'B':'A',fresh:false};}
  function startSession(s,id,items,attempt,day){if(s.sessions[id])return s;return normalize({...s,sessions:{...s.sessions,[id]:{id:attempt,day,items,answers:{}}}},day);}
  function answerSession(s,id,itemKey,result){const d=s.sessions[id];if(!d||d.answers[itemKey]||!d.items.some(it=>key(it.ref)===itemKey))return s;return {...s,sessions:{...s.sessions,[id]:{...d,answers:{...d.answers,[itemKey]:{ok:!!result.ok,score:result.ok?1:0,user:str(result.user)}}}}};}
  function acceptSessionAnswer(s,id,k){const d=s.sessions[id],a=d&&d.answers[k];return !a?s:{...s,sessions:{...s.sessions,[id]:{...d,answers:{...d.answers,[k]:{...a,ok:true,score:1}}}}};}
  function finishSession(s,id){const sessions={...s.sessions};delete sessions[id];return {...s,sessions};}
  function feedback(text,pack){
    text=str(text);const normalized=text.replace(/[’‘]/g,"'").replace(/didn't\b/gi,'did not').replace(/wouldn't\b/gi,'would not');const suggestions=[];
    const rules=[['modal-to',/\b(?:can|could|should|must|might|may|would|will)\s+to\s+[a-z]+\b/gi,'grammar','После can/could/should/must/might/may/would/will основной глагол обычно идёт без to. Проверь выделенное место.'],['would-past',/\bwould\s+(?:not\s+)?(?:went|came|saw|took|made|was|were|had)\b/gi,'grammar','После would нужен основной глагол: would go, would see; для прошлого возможна конструкция would have + причастие.'],['did-past',/\bdid\s+(?:not\s+)?(?:went|came|saw|took|made|was|were|had|worked|wanted)\b/gi,'grammar','Did уже обозначает прошлое: основной глагол обычно в начальной форме.'],['subject-is',/\b(?:I|we|they|you)\s+is\b/gi,'grammar','Сверь форму be с подлежащим: I am, we/they/you are.'],['subject-are',/\b(?:he|she|it)\s+are\b/gi,'grammar','Для he/she/it обычно нужна форма is.'],['i-has',/\bI\s+has\b/gi,'grammar','В present simple с I обычно используется have.'],['mind-to',/\bmind\s+to\s+[a-z]+\b/gi,'grammar','После mind обычно используется форма -ing: mind opening.'],['like-ing',/\bwould\s+(?:you\s+)?like\s+to\s+[a-z]+ing\b/gi,'grammar','В would like to + глагол нужна начальная форма: to come, to join.'],['capital-i',/\bi\b/g,'spelling','Местоимение I пишется с большой буквы.'],['aroud',/\baroud\b/g,'spelling','Проверь написание around.'],['tryed',/\btryed\b/g,'spelling','Прошедшая форма try — tried.']];
    rules.forEach(([code,pattern,kind,why])=>{const hits=[...normalized.matchAll(pattern)];if(hits.length)suggestions.push({code,kind,fragment:hits[0][0],why});});
    const focus=(pack&&pack.focus||[]).map(f=>{let found=false,count=0;try{const matches=normalized.match(new RegExp(f.pattern,'gi'));count=matches?matches.length:0;found=count>0;}catch(e){}return {label:f.label,found,count};});
    return {words:(text.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g)||[]).length,sentences:text.split(/[.!?]+/).filter(x=>x.trim()).length,focus,suggestions,status:'local-review'};
  }
  function question(ref){
    if(!validRef(ref)||ref.b!=='transfer')return null;
    const p=Data.units[ref.u],b=p&&p.banks[ref.v],group={gap:'g',err:'e',tr:'t'}[ref.k],raw=b&&b[group][ref.i];
    if(!raw)return null;let data;
    if(ref.k==='gap'){
      const m=raw.match(/^(.*?)\[([^\]]+)\](?:\(([^)]*)\))?(.*)$/);if(!m)return null;
      const opts=m[2].split('|'),answers=opts[0].split('/').map(a=>a==='-'?'':a);
      const join=a=>(m[1]+a+m[4]).replace(/\s+/g,' ').replace(/\s+([.,!?;:])/g,'$1').trim().replace(/^[a-z]/,c=>c.toUpperCase());
      data={before:m[1],after:m[4],hint:m[3]||'',answers,expectedAnswers:answers,grammarAnswers:answers,correct:answers[0],wrong:opts.slice(1),full:join(answers[0]),orderAnswers:answers.map(join)};
    }else{const [q,a]=raw.split('=>');if(!a)return null;data={q:q.trim(),a:a.split('||').map(x=>x.trim())};data.expectedAnswers=data.a;}
    return {data,note:{...b.notes[ref.k][ref.i],why:b.notes[ref.k][ref.i].why+' '+p.rule}};
  }
  const api={question,normalize,key,validRef,saveReview,saveDraft,seedTopics,dueTopics,reviewTopic,addPhrase,duePhrases,reviewPhrase,recordSkill,recordApplication,recordRecognition,skills,useForm,nextForm,startSession,answerSession,acceptSessionAnswer,finishSession,feedback,content:n=>Data.units[n]||null};
  if(node)module.exports=api;else root.EGIULearning=api;
})(typeof window==='undefined'?globalThis:window);
