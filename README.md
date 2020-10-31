# Node

## 文件流
 
### 什么是流
流是指数据的流动，数据从一个地方缓缓的流动到另一个地方

- 可读流：readable
数据从源头流向内存

- 可写流：writeable
数据从内存流向源头

- 双工流：duplex
数据即可以从源头流向内存，也可以从内存中流向源头

### 为什么需要流
- 其他介质和内存数据规模不一样，如磁盘中的数据和内存中的数据大小不一样

- 其他介质和内存数据处理能力不一样，内存是快速的数据，磁盘是缓慢的

### 文件流
- 什么是文件流
内存数据和磁盘数据之间的流动
- 文件流的创建
  - fs.createReadStream(path[,options])，可读流
    - 含义：创建一个文件可读流，用于读取文件内容，读到内存的
```js
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
```

- 可读流
- fs.createWriteStreanm(path[,options])  创建一个写入流
  - path：写入文件路径
  - options
    - flags：操作文件的方式
    - encoding：编码方式
    - start：起始字节
    - highWaterMark：每次最多写入的字节数，与encoding无关
  - 返回：writeable的子类WriteStream
    - ws.on(事件名，处理函数)
    - ws.write(data) 
      - 写入一组数据
      - data可以是字符串或者Buffer
      - 返回一个boolean值，true表示写入的通道没有被填满，接下来的数据可以直接写入，不用排队，false表示写入的通道已经被填满，接下来的数据将进入写入队列
      - 当写入队列清空时，会触发drain事件
    - ws.end([data]) 
      - 结束写入，将自动关闭文件
        - 是否自动关闭取决于autoClose配置
        - 默认为true
      - data可选，表示关闭前最后一次写入