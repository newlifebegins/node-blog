const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cateSchema = new Schema({
    catename:  String,
    catedesc: String,
    addTime: {
        type: Date,
        default: new Date()
    }
});
module.exports = cateSchema;
