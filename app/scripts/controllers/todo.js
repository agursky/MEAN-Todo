'use strict';

var angular = require('angular');

angular.module('todoListApp')
.controller('todoCtrl', function($scope, dataService) {
    
  $scope.deleteTodo = function(todo, index) {
    $scope.todos.splice(index, 1);
    dataService.deleteTodo(todo);
  };
    
  $scope.addSub = function(todo) {
      if(!todo.sub) {
          todo.sub = [];
      }
      todo.sub.push('get food ' + todo.sub.length);
  } 
  
  $scope.saveSub = function(item, parent, ind) {
      this.editmode = false;
      parent.edited = true;
      parent.sub[ind] = item;
      console.log(parent.sub);
      dataService.saveTodos([parent]);
  }
  
  $scope.saveTodos = function() {
    var filteredTodos = $scope.todos.filter(function(todo){
      if(todo.edited) {
        return todo;
      };
    })
    console.log('hello');
    dataService.saveTodos(filteredTodos).finally($scope.resetTodoState());
  }; 
    
    $scope.resetTodoState = function() {
        $scope.todos.forEach(function(todo) {
            todo.edited = false;
        });
    }; //this will let the service know that all of the edited todos have been saved in the db.
});