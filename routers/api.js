// TODO: 加载express模块
const express = require('express');
const router = express.Router();
/*
* 注册逻辑
**/
router.post('/user/register', function(req, res, next) {
    res.json({})
});
module.exports = router;
