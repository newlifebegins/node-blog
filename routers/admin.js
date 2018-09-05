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
    Category.countDocuments().then((count) => {
        let limit = 10;
        let pages = Math.ceil(count / limit);
        let page = parseInt(req.query.page || 1);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        let skip = (page - 1) * limit;
        Category.find().sort({_id:-1}).limit(limit).skip(skip).then((cateInfo) => {
            res.render('admin/category/index', {
                cateInfo: cateInfo,
                limit: limit,
                count: count,
                skip: skip,
                page: page,
                pages: pages
            });
        })
    })
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
    let catename = req.body.catename;
    let catedesc = req.body.catedesc;
    if(!catename) {
        res.render('admin/error', {
            message: '分类名称不能为空'
        })
        return;
    }
    if(!catedesc) {
        res.render('admin/error', {
            message: '分类描述不能为空'
        })
        return;
    }
    Category.findOne({
        catename: catename
    }).then((cateInfo) => {
        if(cateInfo) {
            res.render('admin/error', {
                message: '分类名称已经存在'
            })
            return;
        } else {
            new Category({
                catename: catename,
                catedesc: catedesc
            }).save((err, newCategory) => {
                if(err) {
                    res.render('admin/error', {
                        message: '分类保存失败'
                    })
                    return;
                } else {
                    res.render('admin/success', {
                        message: '分类保存成功'
                    })
                }
            })
        }
    })
})
/*
* 分类修改
**/
router.get('/category/edit', (req, res, next) => {
    let id = req.query.id || '';
    Category.findOne({
        _id: id
    }).then((cateInfo) => {
        if(cateInfo) {
            res.render('admin/category/edit', {
                cateInfo: cateInfo
            })
            return;
        } else {
            res.render('admin/error', {
                message: '分类信息不存在'
            })
            return;
        }
    });
})
/*
* 分类修改保存
**/
router.post('/category/edit', (req, res, next) => {
    let id = req.query.id || '';
    let catename = req.body.catename;
    let catedesc = req.body.catedesc;
    if(!catename) {
        res.render('admin/error', {
            message: '分类名称不能为空'
        })
        return;
    }
    if(!catedesc) {
        res.render('admin/error', {
            message: '分类描述不能为空'
        })
        return;
    }
    Category.findOne({
        _id: id
    }).then((cateInfo) => {
        if(cateInfo) {
            if(catename == cateInfo.catename) {
                res.render('admin/success', {
                    message: '分类修改成功'
                })
                return;
            } else {
                return Category.findOne({
                    _id: {$ne: id},
                    catename: catename
                })
            }
        } else {
            res.render('admin/error', {
                message: '分类信息不存在'
            })
            return;
        }
    }).then((sameCategory) => {
        if(sameCategory) {
            res.render('admin/error', {
                message: '已经存在同名分类'
            })
            return;
        } else {
            Category.update({
                _id: id
            }, {
                catename: catename
            }).then((editCategory) => {
                if(editCategory) {
                    res.render('admin/success', {
                        message: '分类修改成功'
                    })
                    return;
                }
            })
        }
    })
})
/*
* 删除分类
**/
router.get('/category/delete', (req, res, next) => {
    let id = req.query.id || '';
    Category.deleteOne({
        _id: id
    }).then((err) => {
        if(err.ok) {
            res.render('admin/success', {
                message: '删除成功'
            })
            return;
        }
    });
})
module.exports = router;
