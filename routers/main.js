// TODO: 加载express模块
const express = require('express');
const router = express.Router();
const Category = require('../models/Categories');
const Content = require('../models/Content');
router.get('/', (req, res, next) => {
    Category.find().then((cateInfo) => {
        Content.countDocuments().then((count) => {
            let limit = 10;
            let pages = Math.ceil(count / limit);
            let page = parseInt(req.query.page || 1);
            page = Math.min(page, pages);
            page = Math.max(page, 1);
            let skip = (page - 1) * limit;
            Content.find().sort({_id:-1}).limit(limit).skip(skip).then((conInfo) => {
                res.render('main/index', {
                    title: 'node-blog',
                    userInfo: req.cookies.userInfo,
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
module.exports = router;
