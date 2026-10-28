const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');

test('a slow earlier preview cannot overwrite the latest selected slide',async()=>{
  const source=fs.readFileSync(path.join(__dirname,'../dist/layers.js'),'utf8');
  const start=source.indexOf('let previewPaint=0;');
  const end=source.indexOf('previewButton.onclick=',start);
  assert.ok(start>=0&&end>start);
  const pending=[],painted=[],label={textContent:''};
  const canvas={getContext:()=>({drawImage:temp=>painted.push(temp.slide)})};
  const context=vm.createContext({
    previewIndex:0,
    design:{format:'story',slides:[{layers:[]},{layers:[]}]},
    document:{createElement:()=>({width:0,height:0})},
    postPreview:{querySelector:selector=>selector==='canvas'?canvas:label},
    renderLayerSlide:(temp,slide,format,index)=>new Promise(resolve=>{
      temp.width=1080;temp.height=1920;temp.slide=index;pending[index]=resolve;
    })
  });
  vm.runInContext(source.slice(start,end),context);
  const earlier=vm.runInContext('previewSlide()',context);
  context.previewIndex=1;
  const latest=vm.runInContext('previewSlide()',context);
  pending[1]();await latest;
  assert.deepEqual(painted,[1]);assert.equal(label.textContent,'2 / 2');
  pending[0]();await earlier;
  assert.deepEqual(painted,[1]);assert.equal(label.textContent,'2 / 2');
  assert.deepEqual([canvas.width,canvas.height],[1080,1920]);
});
