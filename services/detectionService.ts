export type Detection={class:string;score:number;bbox:[number,number,number,number]};
export async function loadDetector(){
 const [tf,coco]=await Promise.all([import('@tensorflow/tfjs'),import('@tensorflow-models/coco-ssd')]);
 try{if(!await tf.setBackend('webgl'))throw Error('WebGL indisponível.');await tf.ready();return await coco.load({base:'lite_mobilenet_v2'});}catch{if(!await tf.setBackend('cpu'))throw Error('Nenhum backend de inferência disponível.');await tf.ready();return coco.load({base:'lite_mobilenet_v2'});}
}
export function filterDetections(items:Detection[],threshold:number){
 if(!Number.isFinite(threshold)||threshold<0||threshold>1)throw Error('Confiança inválida.');
 return items.filter(d=>d&&typeof d.class==='string'&&d.class.trim()&&Number.isFinite(d.score)&&d.score>=threshold&&d.score<=1&&Array.isArray(d.bbox)&&d.bbox.length===4&&d.bbox.every(Number.isFinite)&&d.bbox[2]>0&&d.bbox[3]>0);
}
