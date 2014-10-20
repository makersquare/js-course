app.factory("Cart", ["$resource", function($resource) {
  var Order = $resource("/orders/:id", {id: "@id"});

  return {
    items: {},
    addItem: function(item) {
      if (this.items[item.name]) {
        this.items[item.name].count++;
      } else {
        this.items[item.name] = {
          item: item,
          count: 1
        };
      }
    },
    buyAll: function(name) {
      var cost = 0;
      for (itemName in this.items) {
        var itemBought = this.items[itemName];
        cost += itemBought.count * itemBought.item.price;
        itemBought.item.$update();
      };
      var order = new Order({person: name, cost: cost});
      order.$save();
      this.items = {};
    }
  }
}]);