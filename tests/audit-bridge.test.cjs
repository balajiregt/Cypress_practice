const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');const path=require('node:path');
const base=path.join(__dirname,'../cypress/e2e/Project6_Intercept_stubbing_fixtures_env/scripts/security/cypress-audit-safe');
const {compareWithThresholds}=require(path.join(base,'src/performances/helpers.js'));
test('zero scores fail a positive threshold; missing/nonfinite metrics fail',()=>{
 assert.equal(compareWithThresholds({performance:{score:0}},{performance:50}).errors.length,1);
 assert.equal(compareWithThresholds({timing:{numericValue:0}},{timing:10}).errors.length,0);
 assert.equal(compareWithThresholds({},{pwa:100}).errors.length,1);
 assert.equal(compareWithThresholds({timing:{numericValue:NaN}},{timing:10}).errors.length,1);
});
for(const kind of ['performances','a11y']) test(kind+' rejects unsupported browser instead of silently passing',()=>{
 const module={exports:{}};
 vm.runInNewContext(fs.readFileSync(path.join(base,'src',kind,'command-handler.js'),'utf8'),{module,Cypress:{browser:{displayName:'Firefox'}}});
 assert.throws(()=>module.exports(),/cannot run this audit/);
});
test('Lighthouse rejects a missing debugging port before loading or contacting a browser',async()=>{
 const {lighthouse}=require(path.join(base,'src/performances/task.js'));
 await assert.rejects(lighthouse()({url:'https://synthetic.invalid',thresholds:{performance:50}}),/debugging port/);
});
