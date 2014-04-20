(function () {

  var ListItem = function () {
    // This is where we store the list items
    this.items = [];

    // Add the .on and .trigger methods to the new object being created
    Robin.extend(this, Robin.Events);

    this.create = function (listItem) {
      // TODO
      // add the new listItem to the items array
      // trigger 'create'
    };

    this.destroy = function (index) {
      // TODO
    };

    this.update = function (index, name, priority) {
      // TODO EXTENSION
    };

  };

  // Create a global modal instance. Later we'll learn a better place to put this
  window.listItems = new ListItem();

})();
