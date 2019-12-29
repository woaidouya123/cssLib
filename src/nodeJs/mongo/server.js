// server.js

// 基础设置
// =============================================================================

// 引用需要的package
var express    = require('express');        // 引用 express
var app        = express();                 // 定义我们的app
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Label = require("./note.js")

// 添加bodyParse配置
// 这个设置方便我们在处理Post请求时获取body里面的内容
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // 设置端口

// api中需要的Route
// =============================================================================
var router = express.Router();             

// 测试服务是否正常运行
router.get('/', function(req, res) {
    res.json({ message: 'nice，服务器来了!' });   
});
router.post('/addNote', function(req, res) {
	var label = new Label();
	console.log(req.body);
    label.content = req.body.content;
    label.save(function(err) {
    	console.log(err)
        if (err)
            res.send(err);
        else
        	res.json({ message: 'Note created!' });
    });  
});

// 这里将会创建更多的路由

// 注册路由 -------------------------------
// 我们所有的接口将以 /api 开头
app.use('/api', router);

// 启动服务
// =============================================================================
mongoose.connect('mongodb://localhost:27017/mmolable', function (err) {
    if (err) {
        console.log(err, "数据库连接失败");
        return;
    }
    console.log('数据库连接成功');

    app.listen(port, function (err) {
        if (err) {
            console.error('err:', err);
        } else {
            console.info(`===> api server is running at localhost:27017`)
        }
    });
});