const net = require('net');
const path = require('path');

//服务器
const server = net.createServer();

server.listen(10000); //服务器监听9527端口

server.on('listening',()=>{
    console.log('server listening 9527');
})

server.on('connection',socket=>{
    console.log('有客服端连接');

    socket.on('data',(chunk)=>{
        console.log(chunk.toString('utf-8'));
        socket.write(`HTTP/1.1 200 ok

<!DOCTYPE html>        
<html lang="en">
<head>
        <meta charset="UTF-8"/>
</head>
<body>
<h1>好的</h1>
</body>
</html>`);
        socket.end();
    })
    socket.on('close',()=>{
        console.log('连接关闭了');
    })
})
