// TODO: 加载express模块
const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Category = require('../models/Categories');
const Content = require('../models/Content');
router.get('/', (req, res, next) => {
    let category = req.query.category || '';
    let where = category ? {category:category} : '';
    Category.find().then((cateInfo) => {
        Content.where(where).countDocuments().then((count) => {
            let limit = 10;
            let pages = Math.ceil(count / limit);
            let page = parseInt(req.query.page || 1);
            page = Math.min(page, pages);
            page = Math.max(page, 1);
            let skip = (page - 1) * limit;
            Content.where(where).find().sort({_id:-1}).limit(limit).skip(skip).then((conInfo) => {
                res.render('main/index', {
                    title: 'node-blog',
                    userInfo: req.cookies.userInfo,
                    category: category,
                    cateInfo: cateInfo,
                    conInfo: conInfo,
                    limit: limit,
                    count: count,
                    skip: skip,
                    page: page,
                    pages: pages
                });
            })
        })
    })
});
/*
* 内容详情
**/
router.get('/show', (req, res, next) => {
    let id = req.query.id || '';
    Content.findOne({_id:id}).populate('user').then((conInfo) => {
        conInfo.views ++;
        conInfo.save();
        res.render('main/show', {
            conInfo: conInfo,
            userInfo: req.cookies.userInfo
        })
    })
})
module.exports = router;
