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