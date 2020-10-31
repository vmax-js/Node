const fs = require('fs');
const path = require('path');
const filename = path.resolve(__dirname,'./text/b.txt');
async function test(){
    // await fs.promises.writeFile(filename,'tan');
    const buffer = Buffer.from('biao','utf-8');
    await fs.promises.writeFile(filename,buffer,{
        encoding:'utf-8',
        flag:'a'
    });
    console.log('写入成功');
}
test();