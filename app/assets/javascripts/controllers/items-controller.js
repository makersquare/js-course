app.controller("ItemsController", ["$scope", "Item", "Cart", "$location",
  function($scope, Item, Cart, $location) {
    $scope.items = Item.query();

    $scope.buyItem = function(item) {
      if (item.quantity > 0) {
        Cart.addItem(item);
        item.quantity--;
      }
    };

    $scope.goToCheckout = function() {
      $location.path("/checkout");
    };
  }
]);