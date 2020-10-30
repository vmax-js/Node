// import * as obj from './a.mjs';

// node --experimental-modules index.mjs
// console.log(obj);

import('./a.mjs').then(obj=>{
    console.log(obj);//{ b: 2, default: 1 }
})