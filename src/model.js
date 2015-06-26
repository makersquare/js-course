(function () {

  // Model (Single global model for simplicity)
  // The Model is the same, regardless of MVC or MVP

  // Note that `peeps` is a private variable (Remember encapsulation?)
  var peeps = []

  window.Roster = {

    rotate: function () {
      // Variable for terseness
      var rotatingPerson = peeps.shift()
      peeps.push(rotatingPerson)
      App.pubsub.emit('change:roster')
    },

    add: function (person) {
      peeps.push(person)
      App.pubsub.emit('change:roster')
    },

    remove: function (personId) {
      for (var i=0; i < peeps.length; i++) {
        if (peeps[i].id == personId) {
          peeps.splice(i, 1)
          App.pubsub.emit('change:roster')
          return
        }
      }
    },

    map: function (callback) {
      return peeps.map(callback)
    }
  }

})()
