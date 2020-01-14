var express = require('express');
var app = express();
var fs = require("fs");
 
var bodyParser = require('body-parser');
var multer  = require('multer');

app.use('/lib', express.static('lib'));
app.use('/images', express.static('images'));
app.get('/demo1', function (req, res) {
   res.sendFile( __dirname + "/" + "demo1.html" );
})
 
var server = app.listen(8888, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})