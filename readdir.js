const fs = require('fs');
const path = require('path');
const dirName = path.resolve(__dirname,'./text');
async function test(){
    const dir = await fs.promises.readdir(dirName);
    console.log(dir);
}
test();