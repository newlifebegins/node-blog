const mongoose = require('mongoose');
const conSchema = require('../schemas/content');
const Content = mongoose.model('Content', conSchema);

module.exports = Content;
