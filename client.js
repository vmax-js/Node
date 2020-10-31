const net = require('net');

const socket = net.createConnection({
    host: 'duyi.ke.qq.com',
    port: 80
},()=>{
    console.log('连接成功');
});

function parseResponse(response){
    const num = response.indexOf('\r\n\r\n');
    const header = response.substring(0,num);
    const body = response.substring(num+2);
    const headerArr = header.split('\r\n');
    const headerParts = headerArr.slice(1);
    const headerPartsArr = headerParts.map((str)=>{
        return str.split(':').map(str=>str.trim());
    })
    const headerObj = headerPartsArr.reduce((res,ele)=>{
       res[ele[0]] = ele[1];
       return res;
    },{})
    // console.log(headerObj);
    return {
        header: headerObj,
        body
    }
    
}
let receive = null;
function isover(){
    // console.log(receive);
    const len = receive.header["Content-Length"];
    const curLen = Buffer.from(receive.body,'utf-8').byteLength;
    // console.log(len,curLen);
    return curLen > len;
}

socket.on('data',(chunk)=>{
    const response = chunk.toString('utf-8');
    if(!receive){
        // 第一次
        receive = parseResponse(response);
        if(isover()){
            socket.end();
        }
        return;
    }
    receive.body += chunk;
    if(isover()){
        socket.end();
        return;
    }    
    // socket.end();
})

socket.write(`GET / HTTP/1.1
Host: duyi.ke.qq.com

`);
socket.on('close',()=>{
    console.log(receive.body);
    console.log('结束了');
})
/*
HTTP/1.1 400 Bad Request
Server: stgw/1.3.12.4_1.13.5
Date: Sat, 31 Oct 2020 14:12:31 GMT
Content-Type: text/html
Content-Length: 181
Connection: close

<html>
<head><title>400 Bad Request</title></head>
<body bgcolor="white">
<center><h1>400 Bad Request</h1></center>
<hr><center>stgw/1.3.12.4_1.13.5</center>
</body>
</html>
*/

