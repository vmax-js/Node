const fs = require('fs');
const path = require('path');
const filename = path.resolve(__dirname,'./text/a.txt');
async function test(){
    const stat = await fs.promises.stat(filename);
    console.log(stat);
    console.log('文件？',stat.isFile());
    console.log('目录？',stat.isDirectory());
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