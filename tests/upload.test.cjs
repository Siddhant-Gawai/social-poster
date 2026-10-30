const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');

for(const mime of ['image/jpeg','image/png']) test(`a ${mime} upload preserves its format and original slide`,async()=>{
  const source=fs.readFileSync(path.join(__dirname,'../dist/app.js'),'utf8');
  const line=source.split('\n').find(line=>line.includes("$('#file').onchange="));
  const code=line.slice(line.indexOf("$('#file').onchange="));
  const input={},slides=[{image:'first'},{image:'second'}];
  let reader,outputMime;
  const context=vm.createContext({
    $:()=>input,design:{slides},current:0,
    FileReader:class {constructor(){reader=this;}readAsDataURL(){this.result='uploaded';}},
    loadImage:async()=>({width:800,height:600}),
    document:{createElement:()=>({getContext:()=>({drawImage(){}}),toDataURL:type=>{outputMime=type;return 'converted-photo'}})},
    draw(){},toast(){}
  });
  vm.runInContext(code,context);
  await input.onchange({target:{files:[{type:mime}]}});
  context.current=1;
  await reader.onload();
  assert.equal(outputMime,mime);
  assert.equal(slides[0].image,'converted-photo');
  assert.equal(slides[1].image,'second');
});
