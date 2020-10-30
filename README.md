# Node

## 基本内置模块
- os

  - os.EOL  end-of-line marker 换行符 linux:\n window:\r\n

  - os.arch() cpu的架构名

  - os.cpus() cpu信息,返回一个数组，os.cpus().length:几核

  - os.freemem() 剩余内存

  - os.homedir() 用户目录

  - os.hostname() 主机名
  
  - os.tmpdir() 操作系统临时目录

- path
filename 文件的绝对路径
basename 文件名
path url中

  - path.basename('sdfsd/sdfdsf/sdf/a.js') ->a.js
    
    - 第二个参数为文件扩展名，匹配上了就返回文件名，否则加上后缀名
    
    - path.basename('sdfsd/sdfdsf/sdf/a.js','.js') ->a
    
    - path.basename('sdfsd/sdfdsf/sdf/a.js','.html') ->a.js
  
  - path.sep 分隔符 /
  
  - path.delimiter 一块一块的分割符
  
  - path.dirname('a/b/c/s.js') -> a/b/c
  
  - path.extname('adfs/sdfs/a.py') -> .py
  
  - path.join('a','b','c','d.js') -> a/b/c/d.js
  
  - path.normalize('a/b/c/../a.js') -> a/b/a.js 规范化路径
  
  - path.relative('/data/oran/test/aaa','/data/oran/ima/bbb') -> ../../ima/bbb
  
  - path.resolve(__dirname,'./a.js') -> /Users/biaofeng/Desktop/Node/a.js

- url 
```js
const URL = require('url');
const url = new URL.URL('http://tan.com:80/a/?t=3&c=5#abc');
console.log(url);
console.log(url.searchParams.has('t')); // true
console.log(url.searchParams.get('t')); // 3
/*
  URL {
    href: 'http://tan.com/a/?t=3&c=5#abc',
    origin: 'http://tan.com',
    protocol: 'http:',
    username: '',
    password: '',
    host: 'tan.com',
    hostname: 'tan.com',
    port: '',
    pathname: '/a/',
    search: '?t=3&c=5',
    searchParams: URLSearchParams { 't' => '3', 'c' => '5' },
    hash: '#abc'
  }
 */
```

- util
  - util.callbackify() 将异步转化为回调函数
  ```js
    async function delay(deration = 1000) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(deration);
        }, deration)
    })
    }
    const callbackDelay = util.callbackify(delay);

    callbackDelay(2000,(err,deration)=>{
        console.log(deration); 
    })


    delay().then(res=>{
        console.log(res);
    })
  ```
  - util.promisify() 将回调->异步
  ```js
    function delayCallback(duration, callback) {
    setTimeout(() => {
        callback(null, duration);
    }, duration)
    }
    var proDelay = util.promisify(delayCallback);
    (async()=>{
        const r = await proDelay(1000);
        console.log(r);
    })()

    proDelay(500).then(res => {
        console.log(res);
    })
  ```
   - util.inherits(子类，夫类) 继承

   - util.isDeepStrictEqual(obj1,obj2) 深度严格比较