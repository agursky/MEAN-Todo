'use strict';

var Todo = require('./models/todo.js');

//var todos = [
//    'Feed dog', 
//    'Walk the kids',
//    'Water the trees'
//];

//todos.forEach(function(todo, index) {
//    Todo.find({'name': todo}, function(err, todos) {
//        if(!err && !todos.length) {
//            Todo.create({completed: false, name: todo});
//        };
//    });
//});//I guess create is a models method?