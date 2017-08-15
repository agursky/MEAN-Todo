'use strict';

var express = require('express');//imports express

var app = express();//create instance of the express server. THis sets up middleware, creates routes and starts the server.

app.use('/', express.static('public'));//configure express to serve static files in public directory. Static means default to the root.

var router = express.Router(); //creates a router which can be configured to serve all routes from the api namespace.

app.use('/api', router);//attaches router to api namespace

router.get('/todos', function(req, res) {
    res.json({todos: []});
})//use router.get to set individual routes.


// TODO: Add POST route to create new entries. YOU ROCK! (using todo in this comment makes for easy search later.)

// TODO: Add PUT route to update entries. 

// TODO: Add DELETE route to delete entries. 


app.listen(3000, function() {
    console.log("The server is running on port 3000!");
})