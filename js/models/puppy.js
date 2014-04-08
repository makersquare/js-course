(function () {

  var idCounter = 0;
  var generateId = function () {
    idCounter += 1;
    return 'puppy_' + idCounter;
  };

  var getIdIndexOf = function (array, id) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i].id === id) {
        return i;
      }
    }
    return -1;
  };

  var Puppy = function () {
    // The "private" variable
    var puppies = [];
    var index = 0;

    Robin.extend(this, Robin.Events);

    // CRUD type functions
    this.create = function (pup) {
      pup.id = generateId();
      puppies.push(pup);
      this.trigger("create", pup);
    };

    // Data manipulation type functions
    this.castVote = function (id) {
      var index = getIdIndexOf(puppies, id);
      var puppy = puppies[index];
      puppy.votes += 1;
      // this tells the presenter - Hey! This add thing just happened in the model
      this.trigger("vote-cast", puppy);
    };

    this.getSortedArray = function () {
      // TODO EXTENSION
    };

  };

  window.puppies = new Puppy();

})();
