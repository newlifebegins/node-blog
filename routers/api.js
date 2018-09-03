// TODO: 加载express模块
const express = require('express');
const router = express.Router();
// TODO: 引入数据库模型
const User = require('../models/Users');
// TODO: 定义统一返回格式
var responseData;
router.use((req, res, next) => {
    responseData = {
        code: 0,
        message: ''
    }
    next()
});
/*
* 注册逻辑
* 1.code=0 注册成功
* 2.用户名不能为空  code=1 用户名为空
* 3.密码不能为空  code=2 密码为空
* 4.两次输入密码必须一致  code=3 两次输入密码不一致
**/
router.post('/user/register', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    if(!username) {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    if(!password) {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    if(password !== repassword) {
        responseData.code = 3;
        responseData.message = '两次输入密码不一致';
        res.json(responseData);
        return;
    }
    var user = new User({
        username: username,
        password: password
    });
    User.findOne({
        username: username,
        password: password
    }).then((userInfo) => {
        if(!userInfo) {
            user.save((err, newUserInfo) => {
                console.log(newUserInfo);
                console.log('save status:', err ? 'failed' : 'success');
                if(!err) {
                    responseData.message = '注册成功';
                    responseData.userInfo = newUserInfo;
                    res.json(responseData);
                    return;
                } else {
                    responseData.code = 5;
                    responseData.message = '保存数据失败';
                    res.json(responseData);
                    return;
                }
            })
        } else {
            responseData.code = 4;
            responseData.message = '该用户已经注册，请直接登录';
            res.json(responseData);
            return;
        }
    })
});
module.exports = router;
