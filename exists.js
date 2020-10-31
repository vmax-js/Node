const fs = require('fs');
const path = require('path');
const filename = path.resolve(__dirname, './text/2');

async function exist(filename) { 
    try {
        await fs.promises.stat(filename);
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            //文件不存在
            return false;
        }
    }
    throw err;
}

async function test() {
    const res = await exist(filename);
    if (res) {
        console.log('目录已经存在');
    } else {
        await fs.promises.mkdir(filename);
        console.log('目录创建成功');
    }

}
test();