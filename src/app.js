'use strict';

var express = require('express');//imports express
var router = require('./api');//defined in index.js
var parser = require('body-parser');


var app = express();//create instance of the express server. THis sets up middleware, creates routes and starts the server.

require('./database');//refers to database.js where the mongoose connect is housed.
require('./seed');//seed data

app.use('/', express.static('public'));//configure express to serve static files in public directory. Static means default to the root.
app.use(parser.json());//this is to parse post requests.

app.use('/api', router);//attaches router to api namespace

app.listen(3000, function() {
    console.log("The server is running on port 3000!");
})