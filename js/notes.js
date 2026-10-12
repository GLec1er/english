/* Notes follow the source example across modes, shuffling and review. */
(function(root){
  'use strict';
  const Data=typeof module!=='undefined'&&module.exports?require('./notes-data.js'):root.EGIUNotesData;
  const kinds={gap:'g',err:'e',tr:'t',write:'w'};
  const canonical=s=>String(s||'').replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim().toLowerCase();
  function unpack(row,source){
    return row&&canonical(row[0])===canonical(source)?{translation:row[1],explanation:row[2]}:null;
  }
  function unitRow(item){
    const ref=item&&item.ref,d=item&&item.data;
    if(!ref||!d)return null;
    const unit=Data.units[ref.u],rows=unit&&unit[kinds[ref.k]],row=rows&&rows[ref.i];
    return row&&canonical(row[0])===canonical(d.full||(d.a&&d.a[0]))?row:null;
  }
  function accepted(item){
    if(!item||!['mc','fill'].includes(item.t))return [];
    const row=unitRow(item);
    return row&&Array.isArray(row[3])?row[3].slice():[];
  }
  function answers(item){
    if(item.t==='lgap')return [item.data.correct];
    return (item.data.answers||[]).concat(accepted(item));
  }
  function orderAnswers(item){
    const d=item.data;
    const bag=s=>canonical(s).replace(/[.,!?;:]/g,'').split(' ').sort().join('|');
    const alternatives=accepted({...item,t:'fill'}).map(a=>((d.before||'')+a+(d.after||'')).replace(/\s+/g,' ').replace(/\s+([.,!?;:])/g,'$1').trim().replace(/^([^A-Za-z]*)([a-z])/,(_,p,c)=>p+c.toUpperCase()));
    return [d.full,...alternatives.filter(s=>bag(s)===bag(d.full))];
  }
  function forResult(item,result){
    if(!result||!item||!item.data)return null;
    const ref=item.ref,d=item.data;
    if(ref){
      const row=unitRow(item);
      return row?{translation:row[1],explanation:row[2]}:null;
    }
    if(!item.noteRef)return null;
    const lab=Data.lab[item.noteRef.lab];
    if(!lab)return null;
    const source=result.say||d.full||d.word;
    const note=unpack(lab[source],source);
    if(note&&item.t==='pair')note.alternatives=[d.a,d.b].map(en=>({en,translation:lab[en]&&lab[en][1]}));
    return note;
  }
  const escape=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render(note){
    if(!note)return '';
    return `<section class="answer-notes" aria-label="Перевод и объяснение"><div class="note-translation"><h3>Перевод</h3><p>${escape(note.translation)}</p></div><div class="note-reason"><h3>Почему так</h3><p>${escape(note.explanation)}</p></div>${note.alternatives?`<ul class="note-alternatives">${note.alternatives.map(a=>`<li><span lang="en">${escape(a.en)}</span><span>${escape(a.translation)}</span></li>`).join('')}</ul>`:''}</section>`;
  }
  const api={forResult,render,accepted,answers,orderAnswers};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.EGIUNotes=api;
})(typeof window==='undefined'?globalThis:window);
