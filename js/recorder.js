/* Temporary audio only. Always release streams, including late permission replies. */
(function(root){
 'use strict';
 function create(env){
  let rec=null,stream=null,url=null,pending=false,disposed=false;
  const release=()=>{if(stream){stream.getTracks().forEach(t=>t.stop());stream=null;}};
  const revoke=()=>{if(url){env.revokeURL(url);url=null;}};
  async function toggle(){
   if(disposed||pending)return;
   if(rec&&rec.state!=='inactive'){rec.stop();return;}
   pending=true;env.onState('pending');
   try{
    stream=await env.getStream();if(disposed){release();return;}
    const chunks=[];rec=new env.Recorder(stream);rec.ondataavailable=e=>{if(e.data)chunks.push(e.data)};
    rec.onstop=()=>{const mime=rec.mimeType;release();rec=null;if(disposed)return;revoke();url=env.makeURL(env.makeBlob(chunks,mime));env.onRecord({url,mime});env.onState('idle');};
    rec.start();env.onState('recording');
   }catch(e){release();rec=null;if(!disposed){env.onError(e);env.onState('idle');}}
   finally{pending=false;}
  }
  function dispose(){disposed=true;if(rec&&rec.state!=='inactive')rec.stop();release();revoke();}
  return {toggle,dispose};
 }
 const api={create};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.EGIURecorder=api;
})(typeof window==='undefined'?globalThis:window);
