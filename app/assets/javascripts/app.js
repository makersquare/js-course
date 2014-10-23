var app = angular.module('myApp', ['ngRoute', 'ngResource']);

app.controller('TodoController', ['$scope', '$location',
  function($scope, $location) {
    $scope.myAge = 30;
    $scope.incrementAge = function() {
      $scope.myAge += 2;
    };
  }
]);

app.controller('TaskController', ['$resource', '$scope',
  function( $resource, $scope) {
    var Item = $resource('/items/:id', {id: '@id'});
    $scope.items = Item.query();
  }
]);
