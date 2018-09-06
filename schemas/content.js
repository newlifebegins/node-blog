const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,    // 类型
        ref: 'Category'   // 引用
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    addTime: {
        type: Date,
        default: new Date()
    },
    views: {
        type: Number,
        default: 0
    },
    contitle: String,
    condesc: String,
    content:  String
});
module.exports = conSchema;
