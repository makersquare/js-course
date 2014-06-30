// You're defining a module called 'myJoke' and requiring
// The ngRoute and ngResource modules.
// The lines below are functions called on this module that
// help define this module
angular.module('myJoke', ['ngRoute', 'ngResource'])

// This method let's angular know which 'controller' to use
// for each route that you have. It also let's angular know
// which html template to use.
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

// This function defines the List Jokes Controller
// It defines a method on $scope (which is an object use often in angular)
// and then calls it immediately. It also defines a delete function
//
// It will create a property called $scope.jokes which
// the template list_jokes.html will use to populate
// all of the jokes
.controller('ListJokesCtrl', function($scope, $http) {
  $scope.getJokes = function() {
    $scope.jokes = $http.get('/api/jokes').success(function(data){
      $scope.jokes = data;
    });
  }

  $scope.getJokes();

  $scope.delete = function(joke_id) {
    $http({method: 'DELETE',
           url: '/api/joke/' + joke_id
    }).success(function(){
      $scope.getJokes();
    })
  }
})

// This defines the New Joke Controller. It creates a new
// joke with default values, and then creates a save method
// that is used in the template
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