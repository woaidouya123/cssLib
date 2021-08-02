var express = require('express');
var app = express();
var fs = require("fs");
 
var bodyParser = require('body-parser');
var multer  = require('multer');
 
app.use('/public', express.static('public'));
app.use('/save', express.static('save'));
app.use('/static', express.static('static'));
app.use('/images', express.static('../images'));
app.use('/markdown', express.static('../markdown'));
app.use('/cssdemo', express.static('../cssDemo'));
app.use('/iframe', express.static('../iframe'));
app.use('/mobile', express.static('../mobile'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: './tmp/'}).array('file'));
app.use('/video', express.static('../images/video.mp4'));

app.get('/test', function (req, res) {
  console.log(3);
   var st = setTimeout(()=>{
     res.end()
   },90000)
   
})

app.get('/test.do', function (req, res) {
   res.header('Access-Control-Allow-Origin', '*');
   console.log(1);
   res.end();
   
})
 
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
 
app.post('/file_upload', function (req, res) {
 
   console.log(req.files[0]);  // 上传的文件信息
 
   var des_file = __dirname + "/public/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully', 
                   filename:"/public/"+req.files[0].originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });
})

app.post('/file_save', function (req, res) {
 
   console.log(req.files[0]);  // 上传的文件信息
 
   var des_file = __dirname + "/save/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully', 
                   filename:"/save/"+req.files[0].originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });
})
 
var server = app.listen(8088, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})