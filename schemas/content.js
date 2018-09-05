const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,    // 类型
        ref: 'Content'   // 引用
    },
    contitle: String,
    condesc: String,
    content:  String
});
module.exports = conSchema;
