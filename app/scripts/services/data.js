'use strict';

var angular = require('angular');

angular.module('todoListApp')
.service('dataService', function($http, $q) {
    
  this.getTodos = function(cb) {
    $http.get('/api/todos').then(cb);
  };
  
this.deleteTodo = function(todo) {
    if (!todo._id) {
        console.log('no id');
        return $q.resolve();
    }
    return $http.delete('/api/todos/' + todo._id).then(function() {
        console.log("I deleted the " + todo.name + " todo!"); 
    }, function(req, res) {console.log(todo);});
};
  
  this.saveTodos = function(todos) {
    var queue = [];
      todos.forEach(function(todo) {
          var request;
          if(!todo._id) {
              request = $http.post('/api/todos', todo);
          } else {
              request = $http.put('/api/todos/' + todo._id, todo).then(function(result) {
                  console.log(todo);
                  todo = result.data.todo;
              });
          };
          queue.push(request);//it wouldn't have an id bc it wasn't in the database yet.
      });
      return $q.all(queue).then(function(results) {
          console.log("I saved " + todos.length + " todos!");//the q service will run all of the requests in parallel. all method iterates and runs each request and returns a promise
      })
  };
  
});
