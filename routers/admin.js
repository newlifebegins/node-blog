// TODO: 加载express模块
const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Category = require('../models/Categories');
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
* 分类管理
**/
router.get('/category', (req, res, next) => {
    res.render('admin/category/index')
})
/*
* 添加分类
**/
router.get('/category/add', (req, res, next) => {
    res.render('admin/category/add')
})
/*
* 保存新添加的分类
**/
router.post('/category/add', (req, res, next) => {
    console.log(req.body);
    let catename = req.body.catename;
    let catedesc = req.body.catedesc;
    if(!catename) {
        res.render('admin/error', {
            message: '分类名称不能为空'
        })
    }
    if(!catedesc) {
        res.render('admin/error', {
            message: '分类描述不能为空'
        })
    }
    res.render('admin/success', {
        message: '分类保存成功'
    })
})
module.exports = router;
