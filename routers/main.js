// TODO: 加载express模块
const express = require('express');
const router = express.Router();
router.get('/', function(req, res, next) {
    res.render('main/index', {
        title: 'node-blog',
        userInfo: req.cookies.userInfo
    })
});
module.exports = router;
