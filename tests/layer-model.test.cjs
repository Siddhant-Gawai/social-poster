const {test}=require('node:test');
const assert=require('node:assert/strict');
global.crypto=require('node:crypto').webcrypto;
const L=require('../dist/layer-model.js');
test('pointer selection accounts for rotation and chooses the topmost layer',()=>{
  const bottom=L.layer('photo',{x:500,y:500,w:300,h:100,rotation:90});
  const top=L.layer('sticker',{x:500,y:500,w:50,h:50});
  assert.equal(L.hitTest([bottom,top],500,500),top);
  assert.equal(L.hitTest([bottom,top],500,620),bottom);
  assert.equal(L.hitTest([bottom,top],620,500),null);
});
test('dragging constrains layer center to the canvas and preserves dimensions',()=>{
  const l=L.image(200,200,400,300);L.move(l,-500,2000);
  assert.deepEqual([l.x,l.y,l.w,l.h],[0,1000,400,300]);
});
test('reordering changes hit priority without removing layers at boundaries',()=>{
  const a=L.layer('photo'),b=L.layer('sticker'),layers=[a,b];
  L.reorder(layers,a.id,1);assert.equal(L.hitTest(layers,500,500),a);
  L.reorder(layers,a.id,1);assert.deepEqual(layers,[b,a]);
});
test('independent template instances do not share layers or IDs',()=>{
  const a=L.slide('photostrip'),b=L.slide('photostrip');
  a.layers[0].color='#000000';assert.notEqual(a.layers[0].color,b.layers[0].color);
  const ids=[...a.layers,...b.layers].map(l=>l.id);assert.equal(new Set(ids).size,ids.length);
  assert.equal(a.layers.filter(l=>l.type==='photo').length,4);
});
