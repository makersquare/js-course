app.controller("ItemsController", ["$scope", "Item", function($scope, Item) {
  $scope.items = Item.query();
}])