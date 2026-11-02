const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');

test('stored lists reject invalid JSON and non-array values while retaining valid lists',()=>{
  const source=fs.readFileSync(path.join(__dirname,'../dist/app.js'),'utf8');
  const code=source.slice(source.indexOf('function read('),source.indexOf('let favorites='));
  let stored;
  const context=vm.createContext({localStorage:{getItem:()=>stored}});
  vm.runInContext(code,context);
  for(const invalid of [null,'{broken','{}','true','42','"favorites"','null']){
    stored=invalid;
    const fallback=[];
    assert.equal(context.read('saved-list',fallback),fallback);
  }
  for(const valid of ['[]','[101,102]','[{"id":"project-1","slides":[]}]']){
    stored=valid;
    assert.equal(JSON.stringify(context.read('saved-list',[])),valid);
  }
  context.localStorage.getItem=()=>{throw new Error('Storage unavailable');};
  const fallback=[];
  assert.equal(context.read('saved-list',fallback),fallback);
});
