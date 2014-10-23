var app = angular.module('myApp', ['ngRoute', 'ngResource']);

app.controller('TodoController', ['$scope', '$location',
  function($scope, $location) {
    $scope.myAge = 30;
    $scope.incrementAge = function() {
      $scope.myAge += 2;
    };
  }
]);

app.controller('TaskController', ['$scope', '$resource',
    function($scope, $resource) {
      var task = $resource('/tasks/:id', {id: '@id'});
      task.query();
      console.log(task);
    }
]);
