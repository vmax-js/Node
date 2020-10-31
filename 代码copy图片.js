const fs = require('fs');
const path = require('path');
async function copyJpg(){
    const fromFilename = path.resolve(__dirname,'./text/1.jpg');
    const contentBuffer = await fs.promises.readFile(fromFilename);
    const toFilename = path.resolve(__dirname,'./text/1.copy.jpg');
    await fs.promises.writeFile(toFilename,contentBuffer);
    console.log('copy success!');
}
copyJpg();