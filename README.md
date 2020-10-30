# Node

## 1-4.Node中的ES6模块化
- 目前es模块化还处于试验阶段
- 模块要么是commonjs，要么是ES
  -  默认是commonjs
  -  ES模块
     - 文件后缀名为.mjs
     - 最近的package.json中type的值是module  
     - 运行 node --experimental-modules index.mjs

```js
import('./a.mjs').then(obj=>{
    console.log(obj);//{ b: 2, default: 1 }
})
```