// TODO: 加载express模块
const express = require('express');
const router = express.Router();
// TODO: 引入数据库模型
const User = require('../models/Users');
const Content = require('../models/Content');
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
/*
* 登录逻辑
* 1.code=0 登录成功
* 2.用户名不能为空  code=1 用户名为空
* 3.密码不能为空  code=2 密码为空
* 4.code=3 登录失败
**/
router.post('/user/login', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
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
    User.findOne({
        username: username,
        password: password
    }).then((userInfo) => {
        if(!userInfo) {
            responseData.code = 3;
            responseData.message = '登录失败';
            res.json(responseData);
            return;
        } else {
            responseData.userInfo = userInfo;
            responseData.message = '登录成功';
            res.cookie('userInfo', userInfo);
            res.json(responseData);
            return;
        }
    })
});
/*
* 退出登录逻辑
* 1.清空cookie
**/
router.get('/user/logout', (req, res, next) => {
    responseData.code = 0;
    responseData.message = '退出成功';
    res.cookie('userInfo', null);
    res.json(responseData);
    return;
});
/*
* 评论接口
**/
router.post('/content/comment', (req, res, next) => {
    let id = req.body.id;
    let username = req.cookies.userInfo.username;
    let comment = req.body.comment;
    if(!username) {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    if(!comment) {
        responseData.code = 2;
        responseData.message = '内容不能为空';
        res.json(responseData);
        return;
    }
    Content.findOne({
        _id: id
    }).then((conInfo) => {
        conInfo.comment.push({
            id: id,
            username: username,
            comment: comment
        })
        conInfo.save((err) => {
            if(!err) {
                responseData.data = conInfo;
                res.json(responseData);
                return;
            }
        });
    })
})
/*
* 初始化评论
**/
router.get('/show', (req, res, next) => {
    let id = req.query.id;
    Content.findOne({
        _id: id
    }).then((conInfo) => {
        responseData.data = conInfo;
        res.json(responseData);
        return;
    })
})
module.exports = router;
