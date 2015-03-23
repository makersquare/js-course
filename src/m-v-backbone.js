(function () {
  // // // // // //
  // M V Backbone
  // // // // // //


  // Component namespace
  window.People = {}

  // Presenter constructor
  People.Presenter = Backbone.View.extend({

    initialize: function () {
      // Model Listener
      // Here the Presenter listens to the Model.
      // When it hears an event, it updates the View accordingly.
      this.listenTo(this.collection, 'add remove', this.render)
    },

    // View Listeners
    // Here the Presenter listens to the View.
    // When it hears an event, it updates the Model accordingly.
    events: {
      'click .rotate': 'rotate',
      'click .remove': 'remove'
    },

    rotate: function (e) {
      // This is not very special (but it could be!)
      e.preventDefault()
      this.collection.rotate()
    },
    remove: function(e) {
      e.preventDefault()
      var personId = $(e.currentTarget).attr('data-id')
      this.collection.remove(personId)
    },

    // This is the function that puts the view on the page.
    render: function () {
      this.$el.empty().append(
        People.view(),
        // As shown here, the Presenter is the one responsible for
        // getting data from the model and sending it to the view.
        this.collection.map(personView)
      )
    }
  })

  People.view = function () {
    return $('<div class="people">').append(
      $('h3').text("All People:"),
      // Note how there is no click handler here
      $('<button class="rotate">').text('Rotate')
    )
  }

  // Helper view
  function personView (person) {
    return $('<div class="person">').append(
      $('<p>').append("Name: ", person.get('name')),
      $('<p>').append("Age: ", person.get('age')),
      $('<a href="#" class="remove">').text('Remove').attr('data-id', person.id)
    )
  }

  // The function actually puts the view on the page.
  People.mount = function (element, collection) {
    var presenter = new People.Presenter({ el: element, collection: collection })
    presenter.render()
  }

})()
