angular.module('myJoke', ['ngRoute', 'ngResource'])

.config(function($routeProvider){
  $routeProvider
    .when('/', {
      controller: 'ListJokesCtrl',
      templateUrl: 'templates/list_jokes.html'
    })
    .when('/joke/new', {
      controller: 'NewJokeCtrl',
      templateUrl: 'templates/new_joke.html'
    })
    .otherwise({
      redirectTo: '/'
    })
})

.controller('ListJokesCtrl', function($scope, $http) {
  $scope.jokes = $http.get('/api/jokes').success(function(data){
    $scope.jokes = data;
  });
})

.controller('NewJokeCtrl', function($scope, $location, $timeout, $http) {
  $scope.joke = {question: "Default", answer: "Values"};

  $scope.save = function() {
    $http.post('/api/joke',
               {joke: $scope.joke},
               {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    ).success(function(){
      $timeout(function(){ $location.path('/');});
    })
  };
})