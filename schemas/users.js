const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:  String,
    password: String,
    isAdmin: false
});
module.exports = userSchema;
