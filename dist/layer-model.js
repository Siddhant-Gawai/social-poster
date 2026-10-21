(function (root) {
  const id = () => globalThis.crypto.randomUUID();
  const layer = (type, props = {}) => ({id:id(),type,x:500,y:500,w:500,h:300,rotation:0,...props});
  const text = (value,x,y,w,size,color='#292326',font='Georgia') => layer('text',{text:value,x,y,w,h:size*1.5,size,color,font});
  const image = (x,y,w,h,props={}) => layer('photo',{x,y,w,h,src:'',frame:'plain',...props});
  const sticker = (symbol,x,y,size=140,rotation=0) => layer('sticker',{symbol,x,y,w:size,h:size*0.5625,rotation});
  function slide(layout) {
    let bg='#f8f5ef', texture='paper', layers=[];
    if(layout==='portrait') layers=[image(500,510,700,610),text('Happy Halloween',500,860,800,47,'#64514a'),sticker('moon',205,140,110),sticker('bat',790,205,190,-12),sticker('pumpkin',795,790,180),sticker('pumpkin',665,815,95)];
    if(layout==='scrapbook') {bg='#171619';texture='grain';layers=[image(270,270,490,460,{rotation:-9,frame:'polaroid'}),image(735,295,430,420,{rotation:7,frame:'polaroid',monochrome:true}),image(535,730,780,450,{rotation:-4,frame:'white'}),text('HAPPY\nHALLOWEEN',565,510,820,92,'#ff7626','Impact'),sticker('star',140,550,95,-15),sticker('ghost',870,800,140,12),sticker('bat',815,110,160,-12)];}
    if(layout==='invitation') {bg='#f78024';layers=[layer('border',{x:500,y:500,w:870,h:850,color:'#292322',pattern:'lace'}),text('You are invited to our',500,225,730,45,'#33261d'),text('HALLOWEEN\nPARTY',500,355,760,107,'#282321','Impact'),sticker('pumpkin',500,595,345),sticker('ghost',258,565,135,-13),text('31 OCTOBER · 9 PM',500,815,680,42,'#282321','Arial'),text('19 LAKE STREET DRIVE',500,868,680,28,'#282321','Arial')];}
    if(layout==='photostrip') {bg='#2a171e';texture='grain';layers=[layer('border',{x:550,y:510,w:620,h:880,color:'#b4a48a',pattern:'metal'}),layer('shape',{x:550,y:510,w:520,h:790,color:'#f8f5ec'}),...Array.from({length:4},(_,i)=>image(550,215+i*195,455,170,{monochrome:true})),text('NIGHTS TO REMEMBER',550,900,500,21,'#292326','Arial'),sticker('moon',130,165,90),sticker('star',140,760,95,18)];}
    if(layout==='stacked') {bg='#101a17';texture='none';layers=[image(500,167,1000,334),image(500,500,1000,334),image(500,833,1000,334),text('trick',500,228,650,58,'#ffffff'),text('or',500,545,650,58,'#ffffff'),text('treat',500,875,650,58,'#ffffff')];}
    return {title:'',caption:'',bg,color:'#292326',image:'',layout,texture,layers};
  }
  function contains(l,x,y) {
    const angle=-(l.rotation||0)*Math.PI/180,dx=x-l.x,dy=y-l.y;
    const a=dx*Math.cos(angle)-dy*Math.sin(angle),b=dx*Math.sin(angle)+dy*Math.cos(angle);
    return Math.abs(a)<=l.w/2 && Math.abs(b)<=l.h/2;
  }
  function hitTest(layers,x,y) {return [...layers].reverse().find(l=>contains(l,x,y))||null;}
  function move(l,x,y) {l.x=Math.max(0,Math.min(1000,x));l.y=Math.max(0,Math.min(1000,y));return l;}
  function reorder(layers,selected,delta) {const i=layers.findIndex(l=>l.id===selected),j=i+delta;if(i<0||j<0||j>=layers.length)return layers;[layers[i],layers[j]]=[layers[j],layers[i]];return layers;}
  const api={layer,text,image,sticker,slide,contains,hitTest,move,reorder};
  if(typeof module!=='undefined'&&module.exports) module.exports=api;
  else root.PosterLayers=api;
})(globalThis);
