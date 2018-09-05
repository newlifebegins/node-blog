const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cateSchema = new Schema({
    catename:  String,
    catedesc: String
});
module.exports = cateSchema;
