const mongoose = require('mongoose');
const cateSchema = require('../schemas/categories');
const Category = mongoose.model('Category', cateSchema);

module.exports = Category;
