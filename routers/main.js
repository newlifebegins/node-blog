// TODO: 加载express模块
const express = require('express');
const router = express.Router();
const Category = require('../models/Categories');
router.get('/', (req, res, next) => {
    Category.find().then((cateInfo) => {
        res.render('main/index', {
            title: 'node-blog',
            userInfo: req.cookies.userInfo,
            cateInfo: cateInfo
        })
    })
});
module.exports = router;
