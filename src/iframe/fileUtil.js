var express = require('express');
var app = express();
 
var bodyParser = require('body-parser');
app.use('/', express.static('./'));

 
var server = app.listen(8800, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})