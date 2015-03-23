(function () {

  // Model (Single global model for simplicity)
  // The Model is the same, regardless of MVC or MVP

  window.PersonModel = Backbone.Model.extend({})

  window.PersonCollection = Backbone.Collection.extend({

    model: PersonModel,

    rotate: function () {
      var rotatingPerson = this.shift()
      this.push(rotatingPerson)
    },

    // This is included in Backbone.Collection
    // add: function (person) {
    // },

    // This is included in Backbone.Collection
    // remove: function (personId) {
    // },

    // This is included in Backbone.Collection
    // map: function (callback) {
    // }
  })

})()
