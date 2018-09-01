// TODO: 加载express模块
const express = require('express');
// TODO: 加载swig
const swig = require('swig');
// TODO: 创建app应用 => NodeJs中的Http.createServer()
const app = express();
// TODO: 设置访问端口
const port = process.env.PORT || 8080
// TODO: 设置页面不缓存
swig.setDefaults({cache: false});
app.set('view cache', false);
// TODO: 设置模板文件存放的目录
app.set('views', './views/');
// TODO: 注册所使用的模板引擎
app.set('view engine', 'html');
// TODO: 定义当前应用所使用的模板引擎
app.engine('html', swig.renderFile);
// TODO: 监听http请求
app.listen(port);
console.log('server is started at http://localhost:'+port);
// TODO: 设置静态文件托管
app.use('/public', express.static(__dirname + '/public'));
// TODO: index page
app.get('/', function(req, res, next) {
    res.render('index', {
        title: '首页',
        content: 'hello world'
    })
})
