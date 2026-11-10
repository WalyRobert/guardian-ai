import React,{useEffect,useRef} from 'react';import {loadDetector,filterDetections,type Detection} from '../services/detectionService';
export default function VideoFeed({threshold,onDetections,onError}:{threshold:number;onDetections:(d:Detection[])=>void;onError:(message:string)=>void}){
 const video=useRef<HTMLVideoElement>(null),canvas=useRef<HTMLCanvasElement>(null),latest=useRef({threshold,onDetections,onError});latest.current={threshold,onDetections,onError};
 useEffect(()=>{let active=true,stream:MediaStream|undefined,model:Awaited<ReturnType<typeof loadDetector>>|undefined,timer:ReturnType<typeof setTimeout>|undefined,inFlight:Promise<unknown>=Promise.resolve(),disposed=false;
 const dispose=()=>{if(!disposed&&model){disposed=true;model.dispose();}};
 const stop=()=>{active=false;if(timer)clearTimeout(timer);stream?.getTracks().forEach(t=>t.stop());if(video.current)video.current.srcObject=null;void inFlight.then(dispose,dispose);};
 const run=async()=>{try{
  model=await loadDetector();if(!active){dispose();return;}
  if(!navigator.mediaDevices?.getUserMedia)throw Error('A câmera requer HTTPS ou localhost e um navegador compatível.');
  stream=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:960},height:{ideal:540},facingMode:'environment'},audio:false});if(!active){stream.getTracks().forEach(t=>t.stop());dispose();return;}
  const v=video.current;if(!v)throw Error('Vídeo indisponível.');v.srcObject=stream;await v.play();if(!active)return;
  const detect=async()=>{if(!active||!model||!canvas.current)return;try{
   if(v.readyState>=2&&v.videoWidth>0){const task=model.detect(v,20,latest.current.threshold);inFlight=task;const raw=await task;if(!active)return;const items=filterDetections(raw,latest.current.threshold);latest.current.onDetections(items);const c=canvas.current;c.width=v.videoWidth;c.height=v.videoHeight;const ctx=c.getContext('2d');if(ctx){ctx.clearRect(0,0,c.width,c.height);ctx.strokeStyle='#34d399';ctx.fillStyle='#34d399';ctx.lineWidth=3;ctx.font='18px sans-serif';for(const d of items){ctx.strokeRect(...d.bbox);ctx.fillText(`${d.class} ${(d.score*100).toFixed(0)}%`,Math.max(0,d.bbox[0]),Math.max(20,d.bbox[1]-5));}}}
   if(active)timer=setTimeout(()=>{void detect();},333);
  }catch{if(active){latest.current.onError('Falha na detecção. A câmera foi encerrada.');stop();}}};void detect();
 }catch(err){if(active){latest.current.onError(err instanceof Error?err.message:'Não foi possível iniciar a câmera/modelo.');stop();}}};void run();return stop;
 },[]);
 return <div className="relative max-w-4xl bg-slate-900 rounded-xl overflow-hidden"><video ref={video} aria-label="Câmera local" muted playsInline className="w-full h-auto block"/><canvas ref={canvas} aria-label="Caixas de detecção" className="absolute inset-0 w-full h-full pointer-events-none"/></div>;
}

