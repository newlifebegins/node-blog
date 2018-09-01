// TODO: 加载express模块
const express = require('express');
const router = express.Router();
router.get('/user', function(req, res, next) {
    res.send('admin-user')
});
module.exports = router;
