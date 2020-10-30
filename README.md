# Node

## 1-3.模块化细节

### 模块的查找 面试题
- 绝对路径

- 相对路径./或者../

- 相对路径 

  - 检查是否是内置模块，如：fs、path

  - 检查当前目录中的node_modules

  - 检查上级目录的node_modules

  - 转换为绝对路径

  - 加载模块

- 关于后缀名：如果不提供后缀名，自动补全。先后顺序js、json、node、mjs

- 关于文件名
如果仅提供目录，不提供文件名('node ./'),则自动寻找改目录中的index.js
package.json中的main字段，表示包的默认入口，导入或执行时若仅提供目录，则使用main补全入口，默认值为index.js

### module对象
记录当前模块的信息
- console.log(module)
```js
Module {
  id: '.', //入口模块为点，其他为绝对路径
  path: '/Users/biaofeng/Desktop/Node', 
  exports: {},
  parent: null,
  filename: '/Users/biaofeng/Desktop/Node/index.js',
  loaded: false,
  children: [],
  paths: [
    '/Users/biaofeng/Desktop/Node/node_modules',
    '/Users/biaofeng/Desktop/node_modules',
    '/Users/biaofeng/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ]
}
```
### require函数

```js
[Function: require] {
  resolve: [Function: resolve] { paths: [Function: paths] }, //转化为绝对路径的
  main: Module {
    id: '.',
    path: '/Users/biaofeng/Desktop/Node',
    exports: {},
    parent: null,
    filename: '/Users/biaofeng/Desktop/Node/index.js',
    loaded: false,
    children: [],
    paths: [
      '/Users/biaofeng/Desktop/Node/node_modules',
      '/Users/biaofeng/Desktop/node_modules',
      '/Users/biaofeng/node_modules',
      '/Users/node_modules',
      '/node_modules'
    ]
  },
  extensions: [Object: null prototype] {
    '.js': [Function],
    '.json': [Function],
    '.node': [Function]
  },
  cache: [Object: null prototype] {
    '/Users/biaofeng/Desktop/Node/index.js': Module {
      id: '.',
      path: '/Users/biaofeng/Desktop/Node',
      exports: {},
      parent: null,
      filename: '/Users/biaofeng/Desktop/Node/index.js',
      loaded: false,
      children: [],
      paths: [Array]
    }
  }
}
```
```js
// 面试题
exports.c = 3;
module.exports = {
    a: 1,
    b: 2
};
this.m = 5;
// this,exports ->{c:3,m:5} module.exports->{a:1,b:2}
console.log(this === module.exports) // false
// 导出的是{a:1,b:2}

//原理
module.exports = {};
const exports = module.exports;
__temp.call(module.exports,...arguments);
return module.exports;
```
