const fs = require('fs');
const path = require('path');

const filename = path.resolve(__dirname,'./1.txt');
const toFilename = path.resolve(__dirname,'1.copy.txt');
async function copy1(){
    const content = await fs.promises.readFile(filename);
    await fs.promises.writeFile(toFilename,content);
    console.log('copy that');
}
copy1();

async function copy2(){
    const rs = fs.createReadStream(filename);
    const ws = fs.createWriteStream(toFilename);
    // 简单方式
    rs.pipe(ws);

    // rs.on('data',(chunk)=>{
    //     let flag = ws.write(chunk);
    //     if(!flag){
    //         rs.pause(); // 暂停读
    //     }
    // })
    // ws.on('drain',()=>{
    //     rs.resume(); // 恢复读
    // })
    // rs.on('end',()=>{
    //     ws.end(); // 关闭写入流
    //     console.log('写完了');
    // })
}
copy2();
