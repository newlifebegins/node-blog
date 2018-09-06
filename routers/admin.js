// TODO: 加载express模块
const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Category = require('../models/Categories');
const Content = require('../models/Content');
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
                pages: pages,
                param: 'user'
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
                pages: pages,
                param: 'category'
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
/*
* 内容管理
* populate  关联另外一张表结构
**/
router.get('/content', (req, res, next) => {
    Content.countDocuments().then((count) => {
        let limit = 10;
        let pages = Math.ceil(count / limit);
        let page = parseInt(req.query.page || 1);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        let skip = (page - 1) * limit;
        Content.find().sort({_id:-1}).limit(limit).skip(skip).populate('category').populate('user').then((conInfo) => {
            console.log(conInfo);
            res.render('admin/content/index', {
                conInfo: conInfo,
                limit: limit,
                count: count,
                skip: skip,
                page: page,
                pages: pages,
                param: 'content'
            });
        })
    })
})
/*
* 添加内容
**/
router.get('/content/add', (req, res, next) => {
    Category.find().sort({_id:-1}).then((cateInfo) => {
        if(cateInfo) {
            res.render('admin/content/add', {
                cateInfo: cateInfo
            });
        }
    })
})
/*
* 保存新添加的内容
**/
router.post('/content/add', (req, res, next) => {
    let category = req.body.category;
    let contitle = req.body.contitle;
    let condesc = req.body.condesc;
    let content = req.body.content;
    if(!category) {
        res.render('admin/error', {
            message: '内容分类不能为空'
        })
        return;
    }
    if(!contitle) {
        res.render('admin/error', {
            message: '内容标题不能为空'
        })
        return;
    }
    if(!condesc) {
        res.render('admin/error', {
            message: '内容简介不能为空'
        })
        return;
    }
    if(!content) {
        res.render('admin/error', {
            message: '内容不能为空'
        })
        return;
    }
    new Content({
        category: category,
        contitle: contitle,
        condesc: condesc,
        content: content
    }).save((err, newContent) => {
        if(err) {
            res.render('admin/error', {
                message: '内容保存失败'
            })
            return;
        } else {
            res.render('admin/success', {
                message: '内容保存成功'
            })
            return;
        }
    })
})
/*
* 内容修改
**/
router.get('/content/edit', (req, res, next) => {
    let id = req.query.id || '';
    Content.findOne({
        _id: id
    }).populate('category').then((conInfo) => {
        if(conInfo) {
            res.render('admin/content/edit', {
                conInfo: conInfo
            })
            return;
        } else {
            res.render('admin/error', {
                message: '内容信息不存在'
            })
            return;
        }
    });
})
/*
* 内容修改保存
**/
router.post('/content/edit', (req, res, next) => {
    let category = req.body.category;
    let id = req.query.id || '';
    let contitle = req.body.contitle;
    let condesc = req.body.condesc;
    let content = req.body.content;
    if(!category) {
        res.render('admin/error', {
            message: '内容分类不能为空'
        })
        return;
    }
    if(!contitle) {
        res.render('admin/error', {
            message: '内容标题不能为空'
        })
        return;
    }
    if(!condesc) {
        res.render('admin/error', {
            message: '内容简介不能为空'
        })
        return;
    }
    if(!content) {
        res.render('admin/error', {
            message: '内容不能为空'
        })
        return;
    }
    Content.findOne({
        _id: id
    }).then((conInfo) => {
        if(conInfo) {
            Content.update({
                _id: id
            }, {
                contitle: contitle,
                condesc: condesc,
                content: content
            }).then((editContent) => {
                if(editContent) {
                    res.render('admin/success', {
                        message: '内容修改成功'
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
router.get('/content/delete', (req, res, next) => {
    let id = req.query.id || '';
    Content.deleteOne({
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
