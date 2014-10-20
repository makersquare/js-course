app.controller("CheckoutController", ["$scope", "Cart", "$location",
  function($scope, Cart, $location) {
    $scope.person = {};
    
    $scope.items = Cart.items;

    $scope.buyEverything = function() {
      Cart.buyAll($scope.person.name);
      $location.path("/items");
    };
  }
]);