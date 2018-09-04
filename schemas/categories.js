const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cateSchema = new Schema({
    catename:  String
});
module.exports = cateSchema;
