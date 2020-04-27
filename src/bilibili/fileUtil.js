var express = require('express');
var app = express();
var http = require('http');
var proxyMiddleware = require('http-proxy-middleware');
var request = require('request');
var WebSocket = require('ws');

 
var bodyParser = require('body-parser');
app.use('/', express.static('./'));
app.use(proxyMiddleware.createProxyMiddleware('/getRoomId',{target: "https://api.live.bilibili.com/room/v1/Room/room_init",changeOrigin:true}));
app.use(proxyMiddleware.createProxyMiddleware('/getHostToken',{target: "https://api.live.bilibili.com/room/v1/Danmu/getConf",changeOrigin:true}));
app.use(proxyMiddleware.createProxyMiddleware('/getDM',{target: "wss://broadcastlv.chat.bilibili.com/sub",changeOrigin:true,ws:true}));
//request('https://api.live.bilibili.com/room/v1/Room/room_init', {json:true}, (err, res, body) => {if(err) {returnconsole.log(err); }console.log(body);console.log(body.explanation);})

var server = http.createServer(app);
var wss = new WebSocket.Server({server}), sock;

wss.on('connection', function connection(ws) {
    console.log('开始连接！');
    // sock = new WebSocket("wss://ks-live-dmcmt-sh2-pm-01.chat.bilibili.com/sub");
    // sock.on("open", function(){
    // 	//
    // })
    // sock.on("message", function(data){
    // 	//
    // 	ws.send(data);
    // })

    ws.on('message', function incoming(data) {
	     console.log('接收到了消息！');
	    /**
	     * 把消息发送到所有的客户端
	     * wss.clients获取所有链接的客户端
	     */
	    wss.clients.forEach(function each(client) {
	        client.send(data);
	    });
	});
});

 
server.listen(8800, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})