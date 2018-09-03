// TODO: 加载express模块
const express = require('express');
// TODO: 加载swig
const swig = require('swig');
// TODO: 加载数据库模块
const mongoose = require('mongoose');
// TODO: 加载body-parser中间件用于处理post请求
const bodyParser = require('body-parser');
// TODO: 加载cookies中间件用于存储cookies
const cookieParser = require('cookie-parser');
// TODO: 创建app应用 => NodeJs中的Http.createServer()
const app = express();
// TODO: 设置访问端口
const port = process.env.PORT || 8080;
// TODO: 设置body-parser
app.use(bodyParser.urlencoded({ extended: true }));
// TODO: 设置cookies
app.use(cookieParser());
app.use((req, res, next) => {
    cookieParser();
    next();
});
// TODO: 设置静态文件托管
app.use('/public', express.static(`${__dirname}/public`));
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));
// TODO: 设置页面不缓存
swig.setDefaults({cache: false});
app.set('view cache', false);
// TODO: 设置模板文件存放的目录
app.set('views', './views/');
// TODO: 注册所使用的模板引擎
app.set('view engine', 'html');
// TODO: 定义当前应用所使用的模板引擎
app.engine('html', swig.renderFile);
// TODO: 数据库连接
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser:true});
// TODO: 得到数据库连接句柄
const db = mongoose.connection;
// TODO: 通过句柄监听mongoose数据库成功事件
db.on('open', err => {
    if(err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        // TODO: 监听http请求
        app.listen(port);
        console.log(`server is started at http://localhost:${port}`);
    }
})
