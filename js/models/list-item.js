(function () {

  var ListItem = function () {
    // The "private" data
    var items = [];

    // Add the .on and .trigger methods to the new object being created
    Robin.extend(this, Robin.Events);

    this.create = function (listItem) {
      // TODO
    };

    this.destroy = function (index) {
      // TODO
    };

    this.update = function (index, name, priority) {
      // TODO EXTENSION
      this.trigger('update', items[index], index);
    };

  };

  // Create a global modal instance. Later we'll learn a better place to put this
  window.listItems = new ListItem();

})();
