/* Compile reviewed, local content recipes. Run: node scripts/build-learning-content.cjs */
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'..'),c={window:{}};vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(root,'js/registry.js'),'utf8'),c);c.EGIU=c.window.EGIU;
for(const f of fs.readdirSync(path.join(root,'js/data')))vm.runInContext(fs.readFileSync(path.join(root,'js/data',f),'utf8'),c);
const domains={
 doc:[['the timetable','the route map','the safety checklist','the invoice','the project summary','the booking confirmation','the equipment list','the volunteer rota','the visitor guide'],['расписание','схему маршрута','инструкцию по безопасности','счёт','описание проекта','подтверждение бронирования','список оборудования','график волонтёров','путеводитель для посетителей']],
 item:[['the portable heater','the water container','the tool box','the folding chair','the first-aid kit','the camera','the notice board','the projector','the folding table'],['переносной обогреватель','ёмкость с водой','ящик с инструментами','складной стул','аптечку','камеру','доску объявлений','проектор','складной стол']],
 event:[['the repair workshop','the film evening','the charity sale','the craft exhibition','the book exchange','the music evening','the garden tour','the photography workshop','the neighbourhood meeting'],['мастерскую по ремонту','кинопоказ','благотворительную распродажу','выставку ремёсел','обмен книгами','музыкальный вечер','экскурсию по саду','занятие по фотографии','встречу соседей']],
 site:[['the reading room','the greenhouse','the workshop','the gallery','the visitor centre','the rehearsal room','the exhibition hall','the storage room','the community centre'],['читальный зал','теплицу','мастерскую','галерею','центр для посетителей','комнату для репетиций','выставочный зал','кладовую','общественный центр']],
 loc:[['in the reading room','in the greenhouse','in the workshop','in the gallery','in the visitor centre','in the rehearsal room','in the exhibition hall','in the storage room','in the community centre'],['в читальном зале','в теплице','в мастерской','в галерее','в центре для посетителей','в комнате для репетиций','в выставочном зале','в кладовой','в общественном центре']],
 destination:[['at the reading room','at the greenhouse','at the workshop','at the gallery','at the visitor centre','at the rehearsal room','at the exhibition hall','at the storage room','at the community centre'],['к читальному залу','к теплице','к мастерской','к галерее','к центру для посетителей','к комнате для репетиций','к выставочному залу','к кладовой','к общественному центру']],
 task:[['the repairs','the cleaning','the painting','the inventory','the preparations','the decorations','the renovation','the packing','the preparations for the meeting'],['ремонт','уборку','покраску','учёт вещей','подготовку','оформление','реконструкцию','упаковку','подготовку к встрече']],
 vehicle:[['the bus','the tram','a taxi','the train','a bicycle','the coach','the underground','a shared car','the bus to the community centre'],['автобус','трамвай','такси','поезд','велосипед','междугородний автобус','метро','общую машину','автобус до общественного центра']]
};
domains.travel=[domains.destination[0].map(x=>x.replace(/^at /,'to ')),domains.destination[1]];
const nominative={doc:['расписание','схема маршрута','инструкция по безопасности','счёт','описание проекта','подтверждение бронирования','список оборудования','график волонтёров','путеводитель для посетителей'],item:['переносной обогреватель','ёмкость с водой','ящик с инструментами','складной стул','аптечка','камера','доска объявлений','проектор','складной стол'],event:['мастерская по ремонту','кинопоказ','благотворительная распродажа','выставка ремёсел','обмен книгами','музыкальный вечер','экскурсия по саду','занятие по фотографии','встреча соседей'],site:['читальный зал','теплица','мастерская','галерея','центр для посетителей','комната для репетиций','выставочный зал','кладовая','общественный центр'],task:['ремонт','уборка','покраска','учёт вещей','подготовка','оформление','реконструкция','упаковка','подготовка к встрече']};
// Natural distractors; editing prompts also specify the intended Russian meaning.
const corrections={'ons':'in','offs':'up','outs':'down','ups':'off','downs':'up','backs':'out','aways':'back','ins':'at','ats':'in','tos':'for','ofs':'to','fors':'about','abouts':'of','withs':'to','intos':'to','froms':'of','durings':'for','whiles':'during','bys':'until','untils':'by','so a':'such a','so many':'such a lot of','quitely':'quite an','ratherly':'rather a','stilly':'already','yetly':'already','alreadys':'still','everly':'already','evenly':'also','enoughly':'too','fastness':'quick','fairliness':'rather','muchly':'far','a bitly':'very','heavierer':'heavy','more popularer':'most popular','easierer':'easy','quieterrer':'quiet','morer and more':'most and most','as than':'then','than as':'then','the heavierest':'the heaviest of','the more enjoyablest':'the more enjoyable','the clearerest':'the clearer','the quieterest':'the quieter','in times':'by time','on times':'at time','In the ends':'On the end','at the ends':'in the ends','hardly hard':'hardly','hardly to':'hard','in cases':'in case of','unless to':'unless of','As to':'As of','as to':'as of','like as':'as like','as if to':'as if of','in case of that':'in case of','provided if that':'provided of','provided to':'providing to','during of':'during for','until of':'by','by of':'until','with mistake':'with a mistake','by mistakes a':'on mistake','by a bus the':'on bus','any mores':'no more','no more not':'no longer','on feet by':'by feet'};
const recipes={};let numbers=[];
for(const raw of fs.readFileSync(path.join(root,'content/learning-recipes.txt'),'utf8').split('\n')){
 const line=raw.trim();if(!line||line.startsWith('#'))continue;
 if(/^\[\d+(?:,\d+)*\]$/.test(line)){numbers=line.slice(1,-1).split(',').map(Number);for(const n of numbers){if(recipes[n])throw Error('duplicate '+n);recipes[n]=[];}continue;}
 const parts=line.split(' § ');if(parts.length!==3||!domains[parts[2]])throw Error('bad recipe '+line);
 const m=parts[0].match(/\[([^\]]+)\]/);if(!m)throw Error('no cloze '+line);
 const opts=[...new Set(m[1].split('|').map((x,i)=>i===0?x:corrections[x]||x))];
 if(opts.length<2)throw Error('duplicate option '+line);
 const row={raw:parts[0].replace(m[0],'['+opts.join('|')+']'),ru:parts[1],domain:parts[2]};for(const n of numbers)recipes[n].push(row);
}
const clean=o=>o==='-'?'':o;
const full=s=>s.replace(/\[([^\]]+)\]/,(_,o)=>clean(o.split('|')[0].split('/')[0])).replace(/\s+/g,' ').replace(/\s+([.,!?;:])/g,'$1').trim().replace(/^[a-z]/,x=>x.toUpperCase());
const forms=s=>{const m=s.match(/\[([^\]]+)\]/);return m[1].split('|')[0].split('/').map(a=>full(s.replace(m[0],'['+a+']')));};
const baseWords={am:'be',is:'be',are:'be',was:'be',were:'be',has:'have',had:'have',checked:'check',checking:'check',carrying:'carry',carried:'carry',brought:'bring',organised:'organise',organising:'organise',working:'work',worked:'work',visited:'visit',visiting:'visit',finished:'finish',finishing:'finish',lost:'lose',arrived:'arrive',meeting:'meet',met:'meet',knew:'know',known:'know',told:'tell',given:'give',sent:'send',shown:'show',built:'build',left:'leave',took:'take',bought:'buy',starts:'start',meets:'meet',keeps:'keep',belongs:'belong',needs:'need',cleaning:'clean',thinking:'think',preparing:'prepare',prepared:'prepare',understands:'understand',bringed:'bring',injured:'injure',invited:'invite',planning:'plan',holding:'hold',feeling:'feel'};
Object.assign(baseWords,{heavier:'heavy',heaviest:'heavy',easier:'easy',clearest:'clear',quietest:'quiet',quieter:'quiet',better:'good',enjoyable:'enjoyable',confused:'confuse',exciting:'excite',exhausted:'exhaust',tiring:'tire'});
const hint=s=>{const answer=s.match(/\[([^\]]+)\]/)[1].split('|')[0].split('/')[0];
 const closed=['home','a','an','the','-','in','on','at','to','into','of','for','from','about','with','as','than','by','until','during','while','since','away','back','up','down','out','off','so','some','any','no','none','much','many','both','each','every','all','even','still','yet','already','though','although','despite','unless','who','that','which','whose','whom','where'];
 if(closed.includes(answer.toLowerCase()))return 'выбери слово по смыслу';
 const words=answer.split(' ').filter(w=>!['to','been','being','would','will','can','could','must','may','might','should','the','a','an','more','most'].includes(w)).map(w=>baseWords[w]||w).sort((a,b)=>a.localeCompare(b));
 return words.join(' ');
};
const substitute=(row,idx)=>({raw:row.raw.replaceAll('@',domains[row.domain][0][idx]),ru:row.ru.replaceAll('@',(row.ru.includes(': @')&&nominative[row.domain]?nominative[row.domain]:domains[row.domain][1])[idx])});
const scenarios=[['поездку на выходные','маршрут, договорённости и запасной план'],['встречу друзей','место, подготовку и просьбу о помощи'],['рабочий проект','задачи, срок и возможные трудности'],['новую привычку','первый шаг, расписание и препятствие'],['визит в незнакомый город','дорогу, жильё и вопрос местному жителю'],['занятие в группе','цель, материалы и распределение работы']];
const units={};for(let n=1;n<=145;n++){
 const rows=recipes[n];if(!rows||rows.length!==4)throw Error('need four rows '+n);const u=c.EGIU.units[n],banks={};
 for(const v of ['A','B']){
  const offset=v==='A'?0:4,b={g:[],e:[],t:[],notes:{gap:[],err:[],tr:[]}};
  const note=x=>({translation:x.ru,why:'Форма выбирается по смыслу заданной ситуации; остальные слова сохраняются.'});
  rows.forEach(row=>{for(let i=0;i<2;i++){const x=substitute(row,offset+i);b.g.push(x.raw.replace(/\[([^\]]+)\]/,m=>m+'('+hint(x.raw)+')'));b.notes.gap.push(note(x));}});
  rows.slice(0,3).forEach(row=>{const x=substitute(row,offset+2),m=x.raw.match(/\[([^\]]+)\]/),wrong=m[1].split('|').at(-1);b.e.push(`${x.raw.replace(m[0],wrong)} => ${forms(x.raw).join(' || ')}`);b.notes.err.push(note(x));});
  rows.slice(2).forEach(row=>{const x=substitute(row,offset+3);b.t.push(`Передай смысл: ${x.ru}\nЗаверши фразу и запиши её целиком; остальные слова сохрани:\n${x.raw.replace(/\[[^\]]+\]/,'…')}\nСлова для нужной формы: ${hint(x.raw)} => ${forms(x.raw).join(' || ')}`);b.notes.tr.push(note(x));});
  banks[v]=b;
 }
 const storyRows=rows.map(r=>substitute(r,8));const story=`Four moments at the community centre.\n${storyRows.map((x,i)=>`${['Alex','Bea','Alex','Bea'][i]}: ${full(x.raw)}`).join('\n')}`;
 const questions=storyRows.slice(0,3).map((x,i)=>({q:`Что означает реплика ${i+1}?`,options:[x.ru,storyRows[(i+1)%4].ru,storyRows[(i+2)%4].ru],answer:0,why:`Реплика: ${full(x.raw)}\n${x.ru}`}));
 const [scenario,details]=scenarios[(n-1)%scenarios.length];const focus=rows.map(r=>{const s=r.raw.match(/\[([^\]]+)\]/)[1].split('|')[0].split('/')[0];return {label:s.replaceAll('@','…'),pattern:s.split('@').map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('.{1,80}')};});
 units[n]={rule:u.tip,story,translation:'Четыре момента в общественном центре.\n'+storyRows.map((x,i)=>`${['Алекс','Беа','Алекс','Беа'][i]}: ${x.ru}`).join('\n'),questions,writePrompt:`Представь ${scenario}. Напиши 4–6 связанных предложений: ${details}. Используй грамматику «${u.title}» минимум в двух местах. Добавь одну фразу о своей жизни.`,spokenPrompt:`Расскажи собеседнику про ${scenario} за 30–60 секунд. Используй тему «${u.title}» и ответь на вопросы ниже.`,followups:['What is the main idea of your plan?','What could change, and how would you respond?','Can you explain one choice using a different sentence?'],criteria:['Смысл: понятна ситуация и есть ответ на задачу; сравни с русским смыслом, который хотел передать.',`Форма: найди в своём тексте две конструкции темы «${u.title}» и сверь их с правилом.`,`Самокоррекция: перечитай подсказки, исправь нужное и объясни себе хотя бы один выбор формы.`],focus,phrases:storyRows.slice(0,3).map(x=>({phrase:full(x.raw),meaning:x.ru,example:full(x.raw)})),banks};
}
const output='/* Generated from content/learning-recipes.txt by scripts/build-learning-content.cjs. */\n(function(root){const data='+JSON.stringify({version:1,units})+';if(typeof module!=="undefined"&&module.exports)module.exports=data;else root.EGIULearningData=data;})(typeof window==="undefined"?globalThis:window);\n';
const dest=path.join(root,'js/learning-data.js');if(process.argv.includes('--check')){if(fs.readFileSync(dest,'utf8')!==output)throw Error('learning-data.js is stale');}else fs.writeFileSync(dest,output);
console.log('145 context packs; 290 forms; 3770 assessment questions.');
// Additional revision vocabulary leaves the existing assessment banks byte-for-byte unchanged.
const extra={
 doc:[['the maintenance report','the attendance list'],['отчёт об обслуживании','список присутствующих']],
 item:[['the desk lamp','the storage box'],['настольную лампу','коробку для хранения']],
 event:[['the language workshop','the science evening'],['языковое занятие','научный вечер']],
 site:[['the lecture room','the music room'],['лекционный зал','музыкальную комнату']],
 loc:[['in the lecture room','in the music room'],['в лекционном зале','в музыкальной комнате']],
 destination:[['at the lecture room','at the music room'],['к лекционному залу','к музыкальной комнате']],
 travel:[['to the lecture room','to the music room'],['к лекционному залу','к музыкальной комнате']],
 task:[['the sorting','the delivery'],['сортировку','доставку']],
 vehicle:[['the ferry','a minibus'],['паром','микроавтобус']]
};
const extraNominative={doc:['отчёт об обслуживании','список присутствующих'],item:['настольная лампа','коробка для хранения'],event:['языковое занятие','научный вечер'],site:['лекционный зал','музыкальная комната'],task:['сортировка','доставка']};
for(const [name,pair]of Object.entries(extra)){domains[name][0].push(...pair[0]);domains[name][1].push(...pair[1]);if(nominative[name])nominative[name].push(...extraNominative[name]);}
const weekly={};
for(let n=1;n<=145;n++)weekly[n]={rule:c.EGIU.units[n].tip,cases:recipes[n].map(row=>[9,10].map(i=>{const x=substitute(row,i);return {raw:x.raw,translation:x.ru,hint:hint(x.raw)};}))};
const weeklyOutput='/* Generated weekly practice from reviewed unit recipes. */\n(function(root){const data='+JSON.stringify({version:1,units:weekly})+';if(typeof module!=="undefined"&&module.exports)module.exports=data;else root.EGIUWeeklyData=data;})(typeof window==="undefined"?globalThis:window);\n';
const weeklyDest=path.join(root,'js/weekly-data.js');
if(process.argv.includes('--check')){if(fs.readFileSync(weeklyDest,'utf8')!==weeklyOutput)throw Error('weekly-data.js is stale');}else fs.writeFileSync(weeklyDest,weeklyOutput);
console.log('1160 additional weekly practice examples.');
