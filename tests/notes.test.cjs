const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const ready=fs.existsSync(__dirname+'/../js/notes.js');
const N=ready?require('../js/notes.js'):null;
test('checked exercises provide translations and explanations',()=>assert.ok(N,'exercise notes are missing'));
const check=(name,fn)=>test(name,{skip:!ready},fn);
const imaginary={t:'mc',ref:{u:36,k:'gap',i:0},data:{full:'It would be nice to live by the sea.'}};
check('the explanation is hidden before an answer and the same example survives mode changes',()=>{
  assert.equal(N.forResult(imaginary,null),null);
  const note=N.forResult(imaginary,{ok:false});
  assert.match(note.translation,/мор/);assert.match(note.explanation,/воображ|гипотет|реальн/);
  for(const t of ['fill','order','dict','lgap','speak'])assert.deepEqual(N.forResult({...imaginary,t},{ok:true}),note);
});
check('different would contexts have distinct explanations',()=>{
  const past=N.forResult({ref:{u:36,k:'gap',i:2},data:{full:'When I was a child, my grandfather would tell me stories every night.'}},{ok:true});
  const refusal=N.forResult({ref:{u:36,k:'gap',i:3},data:{full:"I tried to start the car, but it wouldn't start."}},{ok:false});
  assert.match(past.explanation,/повтор|привыч/);assert.match(refusal.explanation,/отказ|завест/);
  assert.notEqual(past.explanation,N.forResult(imaginary,{ok:true}).explanation);
});
check('an invalid or changed example never gets an unrelated translation',()=>{
  assert.equal(N.forResult({...imaginary,data:{full:'A different sentence.'}},{ok:true}),null);
  assert.equal(N.forResult({...imaginary,ref:{u:146,k:'gap',i:0}},{ok:true}),null);
});
check('equivalent choices are accepted only for the matched example',()=>{
  const item={t:'mc',ref:{u:91,k:'gap',i:0},data:{full:'Each side of a square is the same length.'}};
  assert.ok(N.accepted,'alternative recognition is missing');
  assert.deepEqual(N.accepted(item),['Every']);
  assert.deepEqual(N.accepted({...item,data:{full:'A different sentence.'}}),[]);
  assert.deepEqual(N.accepted(imaginary),[]);
});
check('grammatical alternatives do not count as words heard in a listening exercise',()=>{
  const item={t:'mc',ref:{u:91,k:'gap',i:0},data:{full:'Each side of a square is the same length.'}};
  assert.deepEqual(N.accepted({...item,t:'fill'}),['Every']);
  for(const t of ['lgap','dict','speak','order'])assert.deepEqual(N.accepted({...item,t}),[]);
});
check('listening checks the spoken form even when the original gap lists alternatives',()=>{
  const item={t:'lgap',ref:{u:138,k:'gap',i:2},data:{full:'Please fill in this form.',correct:'in',answers:['in','out']}};
  assert.ok(N.answers,'mode-specific answer policy is missing');
  assert.deepEqual(N.answers(item),['in']);
  assert.deepEqual(N.answers({...item,t:'fill'}),['in','out']);
});
check('word order permits a valid reordering but never adds words absent from the bank',()=>{
  const full='We arrived in Rome on Monday.';
  const item={t:'order',ref:{u:109,k:'gap',i:7},data:{full,before:'',after:'',correct:full,answers:[full]}};
  assert.ok(N.orderAnswers,'word-order alternatives are missing');
  assert.deepEqual(N.orderAnswers(item),[full,'We arrived on Monday in Rome.']);
  const sides={t:'order',ref:{u:91,k:'gap',i:0},data:{full:'Each side of a square is the same length.',before:'',correct:'Each',after:' side of a square is the same length.',answers:['Each']}};
  assert.deepEqual(N.orderAnswers(sides),['Each side of a square is the same length.']);
});
check('note rendering escapes content rather than executing imported HTML',()=>{
  const html=N.render({translation:'<img src=x onerror=alert(1)>',explanation:'<script>alert(1)</script>'});
  assert.ok(!html.includes('<img'));assert.ok(!html.includes('<script>'));assert.match(html,/&lt;img/);
});
check('a listening pair translates both alternatives and follows the actually spoken sentence',()=>{
  const item={t:'pair',data:{a:"I'll go to work.",b:'I go to work.'},noteRef:{lab:'contr'}};
  const future=N.forResult(item,{ok:false,say:"I'll go to work."}),habit=N.forResult(item,{ok:true,say:'I go to work.'});
  assert.notEqual(future.translation,habit.translation);assert.equal(future.alternatives.length,2);
  assert.match(future.explanation,/будущ|will/);assert.match(habit.explanation,/обыч|регуляр/);
});
check('all existing unit examples and writing models have a matching Russian note',()=>{
  const ctx={};ctx.window=ctx;vm.createContext(ctx);vm.runInContext(fs.readFileSync(__dirname+'/../js/registry.js','utf8'),ctx);
  for(const f of fs.readdirSync(__dirname+'/../js/data').sort())vm.runInContext(fs.readFileSync(__dirname+'/../js/data/'+f,'utf8'),ctx);
  let count=0;
  for(const u of ctx.EGIU.list)for(const [kind,rows] of [['gap',u.g],['err',u.e],['tr',u.t],['write',[u.w[1]]]])rows.forEach((s,i)=>{
    let data;
    if(kind==='gap'){const m=s.match(/^(.*?)\[([^\]]+)\](?:\(([^)]*)\))?(.*)$/),a=m[2].split('|')[0].split('/')[0];data={full:(m[1]+(a==='-'?'':a)+m[4]).replace(/\s+/g,' ').replace(/\s+([.,!?;:])/g,'$1').trim().replace(/^([^A-Za-z]*)([a-z])/,(_,p,c)=>p+c.toUpperCase())};}
    else data=kind==='write'?{full:s}:{a:s.split('=>')[1].split('||').map(v=>v.trim())};
    const note=N.forResult({ref:{u:u.n,k:kind,i},data},{ok:true});assert.ok(note,'missing or mismatched '+u.n+':'+kind+':'+i);
    assert.match(note.translation,/[А-Яа-яЁё]/);assert.match(note.explanation,/[А-Яа-яЁё]/);count++;
  });
  assert.equal(count,2030);
  for(const [lab,L] of Object.entries(ctx.EGIU.lab))for(const row of L.items){
    const item=L.kind==='snd'?{data:{word:row[0]}}:L.kind==='pair'?{t:'pair',data:{a:row[0],b:row[1]}}:{data:{full:row}};
    item.noteRef={lab};for(const say of L.kind==='pair'?row:[undefined])assert.ok(N.forResult(item,{ok:true,say}),'missing lab '+lab+':'+JSON.stringify(row));
  }
});
