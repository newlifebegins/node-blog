// TODO: 加载express模块
const express = require('express');
const router = express.Router();
const User = require('../models/Users');
router.use((req, res, next) => {
    if(!req.cookies.userInfo.isAdmin) {
        res.send('对不起，只有管理员才能进入后台编辑');
    }
    next()
});
router.get('/', (req, res, next) => {
    res.render('admin/index', {
        userInfo: req.cookies.userInfo
    })
});
/*
* 数据库查询已经注册的用户
* 1.limit: 每次获取的条数
* 2.skip： 忽略的条数1 - 2 skip = 0           3-4   skip = 2
* 3.pages  总页数
* 4.page   当前页数
* 5.count  获取到的总条数
**/
router.get('/user', (req, res, next) => {
    User.countDocuments().then((count) => {
        let limit = 10;
        let pages = Math.ceil(count / limit);
        let page = parseInt(req.query.page || 1);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        let skip = (page - 1) * limit;
        User.find().limit(limit).skip(skip).then((userInfo) => {
            res.render('admin/user/index', {
                userInfo: userInfo,
                limit: limit,
                count: count,
                skip: skip,
                page: page,
                pages: pages
            });
        })
    })
});
/*
* 添加用户
**/
router.post('/user/add', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
})
module.exports = router;
