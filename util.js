const util = require('util');

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