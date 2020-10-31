# Node

## 文件io
 
- fs.readFile() 读取文件内容
```js
    const fs = require('fs');
    const path = require('path');

    const filename = path.resolve(__dirname, './text/a.txt');
    // fs.readFile(filename,(err,content)=>{
    //     console.log(content.toString('utf-8'));
    // })

    // fs.readFile(filename,'utf-8',(err,content)=>{
    //     console.log(content);
    // })

    // fs.readFile(filename, {
    //     encoding: 'utf-8'
    // }, (err,content)=>{
    //     console.log(content);
    // })

    // console.log(fs.readFileSync(filename,'utf-8')); //同步

    async function test(){
    const content = await fs.promises.readFile(filename,'utf-8');
    console.log(content);
    }
    test();
```
- fs.writeFile() 向文件写入内容
  - 复制粘贴图片
```js
const fs = require('fs');
const path = require('path');
async function copyJpg(){
    const fromFilename = path.resolve(__dirname,'./text/1.jpg');
    const contentBuffer = await fs.promises.readFile(fromFilename);
    const toFilename = path.resolve(__dirname,'./text/1.copy.jpg');
    await fs.promises.writeFile(toFilename,contentBuffer);
    console.log('copy success!');
}
copyJpg();
```
- fs.stat() 获取文件或目录信息,访问目录的话size为0，原因操作系统将目录当做空的文件，里面有个指针记录文件的地址。
  - isDirectory() 是不是目录
  - isFile() 是不是文件 
```js
const fs = require('fs');
const path = require('path');
const filename = path.resolve(__dirname,'./text/a.txt');
async function test(){
    const stat = await fs.promises.stat(filename);
    console.log(stat);
}
test();
/*
Stats {
  dev: 16777220,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 4321131726,
  size: 81, //文件大小字节数
  blocks: 8,
  atimeMs: 1604045246901.927,
  mtimeMs: 1604045245083.801,
  ctimeMs: 1604045245083.801,
  birthtimeMs: 1604045236285.8137,
  atime: 2020-10-30T08:07:26.902Z, //上次访问时间
  mtime: 2020-10-30T08:07:25.084Z, //上次文件内容被修改时间
  ctime: 2020-10-30T08:07:25.084Z, //上次文件状态被修改时间
  birthtime: 2020-10-30T08:07:16.286Z // 文件创建时间
}
*/
```
- fs.readdir() 返回目录下一级的文件或者目录
```js
const fs = require('fs');
const path = require('path');
const dirName = path.resolve(__dirname,'./text');
async function test(){
    const dir = await fs.promises.readdir(dirName);
    console.log(dir);
}
test();
```
- fs.mkdir() 创建目录,创建文件用writeFile写入空字符串
```js
const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname,'./text/1');
async function test(){
    await fs.promises.mkdir(dir);
    console.log('创建成功');
}
test();
```
- 读取一个目录中所有的目录和文件
```js
const fs = require('fs');
const path = require('path');
class File {
    constructor(filename, name, ext, isFile, size, createTime, updateTime) {
        this.filename = filename;
        this.name = name;
        this.ext = ext;
        this.isFile = isFile;
        this.size = size;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
    async getContent(isBuffer = false) {
        if (this.isFile) {
            // 文件
            if (isBuffer) {
                return await fs.promises.readFile(this.filename);
            }
            return await fs.promises.readFile(this.filename, 'utf-8');
        } else {
            //目录
            return null;
        }

    }
    async getChildren() {
        if(this.isFile){
            //不是文件
            return [];
        }
        let child = await fs.promises.readdir(this.filename);
        child = child.map(name => {
            const reslut = path.resolve(this.filename,name);
            return File.getFile(reslut);
        })
        // console.log(child);
        return Promise.all(child);
    }
    static async getFile(filename) {
        const stat = await fs.promises.stat(filename);
        const name = path.basename(filename);
        const ext = path.extname(filename);
        const isFile = stat.isFile();
        const size = stat.size;
        const createTime = stat.birthtime;
        const updateTime = stat.mtime;
        return new File(filename, name, ext, isFile, size, createTime, updateTime);
    }
}
// async function test() {
//     const filename = path.resolve(__dirname, './text');
//     const file = await File.getFile(filename);
//     // console.log(file);

//     // console.log(await file.getContent(true));
//     console.log(await file.getChildren());
// }
// test();


async function readDir(filename){
    const file = await File.getFile(filename);
    return await file.getChildren();
}
async function test(){
    const filename = path.resolve(__dirname,'./text');
    const res = await readDir(filename);
    console.log(await res[0].getChildren());
    // console.log(res);
}
test();
```

