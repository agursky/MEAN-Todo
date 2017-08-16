webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('todoListApp', []);

__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('todoListApp')
.controller('mainCtrl', function($scope, dataService){
  
  dataService.getTodos(function(response){
    var todos = response.data.todos;  
    $scope.todos =  todos;
    });
  
  $scope.addTodo = function() {
    $scope.todos.unshift({name: "This is a new todo.",
                      completed: false});
  };
  
})

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('todoListApp')
.directive('todo', function(){
  return {
    templateUrl: 'templates/todo.html',
    replace: true,
    controller: 'todoCtrl'
  }
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

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


/***/ })
],[1]);