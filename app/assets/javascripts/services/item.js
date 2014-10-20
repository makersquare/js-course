app.factory("Item", ["$resource", function($resource) {
  return $resource(
    "/items/:id",
    {id: "@id"},
    {update: {method: "PATCH"}}
  );
}]);