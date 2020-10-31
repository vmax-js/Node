const fs = require('fs');
const path = require('path');

const filename = path.resolve(__dirname,'./a.txt');

const rs = fs.createReadStream(filename,{
    encoding:'utf-8',//默认buffer
    //  start: 开始字节
    //  end: 结束字节
    highWaterMark: 1,    // 默认一次读64*1024字节，还要看encoding
    autoClose: true, //默认true 读完自动关闭
}) // 返回readable的子类ReadStream


// 事件 rs.on(事件名，处理函数)

// 文件打开事件，文件被打开后触发
rs.on('open',()=>{
    console.log('文件打开了');
})

//文件打开出错
rs.on('error',()=>{
    console.log('出错了');
})

//文件关闭 可以手动关闭 rs.close() 可以自动关闭，文件读完后
rs.on('close',()=>{
    console.log('文件关闭')
})

// 读文件内容 要注册这个事件才会读
rs.on('data',(chunk)=>{
    console.log('读到了一部分数据',chunk);
    rs.pause(); //暂停读取，会触发pause事件
})
rs.on('pause',()=>{
    console.log('暂停了');
    setTimeout(()=>{
        rs.resume(); // 恢复读取，会触发resume事件
    },1000)
})

rs.on('resume',()=>{
    console.log('恢复了');
})

rs.on('end',()=>{
    console.log('文件读取完毕');
})