'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mean-todo', function(err) {
    if(err) {
        console.log('Failed connecting to mongodb!');
    } else {
        console.log('Successfully connected to mongodb!');
    }
});

//this file connects the app to mongodb using mongoose and tells it where the connection is