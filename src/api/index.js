'use strict';

var express = require('express');
var Todo = require('../models/todo');
//var todos = require('../../mock/todos.json');
var router = express.Router(); //creates a router which can be configured to serve all routes from the api namespace.

router.get('/todos', function(req, res) {
    Todo.find({}, function(err, todos) {
        if(err) {
            return res.status(500).json({message: err.message});
        }
        
        res.json({todos: todos});
    });
    
})//use router.get to set individual routes.

router.post('/todos', function(req, res) {
    var todo = req.body;
    Todo.create(todo, function(err, todo) {
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.json({'todo': todo, message: 'Todo Created'});
    })
});

router.put('/todos/:id', function(req, res) {
    var id = req.params.id;
    var todo = req.body;
    if(todo && todo._id !== id) {
        return res.status(500).json({err: "Id's don't match!"});
    }
    Todo.findByIdAndUpdate(id, todo, {new: true}, function(err, todo) {//new true is what makes the db return the new data rather than the original data.
        if(err) {
            return res.status(500).json({err: err.message});
        }
        console.log(todo);
        res.json({'todo': todo, message: 'Todo Updated!'});
    })
});

router.delete('/todos/:id', function(req, res) {
    var id = req.params.id;
    var todo = req.body;
//    if(todo && todo._id !== id) {
//        return res.status(500).json({err: "Id's don't match!"});
//    }
    Todo.findByIdAndRemove(id, function(err, todo) {//new true is what makes the db return the new data rather than the original data.
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.json({'todo': todo, message: 'Todo Updated!'});
    });
})


module.exports = router;