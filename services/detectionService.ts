export type Detection={class:string;score:number;bbox:[number,number,number,number]};
export async function loadDetector(){
 const [tf,coco]=await Promise.all([import('@tensorflow/tfjs'),import('@tensorflow-models/coco-ssd')]);
 try{await tf.setBackend('webgl');await tf.ready();}catch{await tf.setBackend('cpu');await tf.ready();}
 return coco.load({base:'lite_mobilenet_v2'});
}
export function filterDetections(items:Detection[],threshold:number){
 if(!Number.isFinite(threshold)||threshold<0||threshold>1)throw Error('Confiança inválida.');
 return items.filter(d=>typeof d.class==='string'&&Number.isFinite(d.score)&&d.score>=threshold&&d.score<=1&&d.bbox.length===4&&d.bbox.every(Number.isFinite)&&d.bbox[2]>0&&d.bbox[3]>0);
}
