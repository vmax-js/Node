const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname,'./text/1');
async function test(){
    await fs.promises.mkdir(dir);
    console.log('创建成功');
}
test();