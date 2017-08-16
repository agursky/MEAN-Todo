'use strict'

var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    sub: Array
});

var model = mongoose.model('Todo', todoSchema);

module.exports = model;