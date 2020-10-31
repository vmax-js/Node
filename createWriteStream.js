const path = require('path');
const fs = require('fs');

const filename = path.resolve(__dirname, './1.txt');
const ws = fs.createWriteStream(filename, {
    encoding: 'utf-8',
    highWaterMark: 1024 * 16
})
let i = 0;

function write() {
    let flag = true;
    while (i < 1024 * 1024 * 10 && flag) {
        flag = ws.write('a');
        i++;
    }
}
write();
ws.on('drain', () => {
    write();
})