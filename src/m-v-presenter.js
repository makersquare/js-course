(function () {
  // // // // // //
  // M V Presenter
  // // // // // //


  window.People = {}

  // Presenter constructor
  People.Presenter = function (element) {

    // The view itself
    var $view = $(element)

    // View Listeners
    // Here the Presenter listens to the View.
    // When it hears an event, it updates the Model accordingly.
    $view.on('click', '.rotate', function(e) {
      // This is not very special (but it could be!)
      e.preventDefault()
      Roster.rotate()
    })
    $view.on('click', '.remove', function(e) {
      e.preventDefault()
      var personId = $(e.currentTarget).attr('data-id')
      Roster.remove(personId)
    })

    // This is the function that puts the view on the page.
    this.render = function () {
      $view.empty().append(
        People.view(),
        // As shown here, the Presenter is the one responsible for
        // getting data from the model and sending it to the view.
        Roster.map(personView)
      )
    }

    // Model Listener
    // Here the Presenter listens to the Model.
    // When it hears an event, it updates the View accordingly.
    App.pubsub.on('change:roster', this.render)
  }

  People.view = function () {
    return $('<div class="people">').append(
      $('<h3>').text("All People:"),
      // Note how there is no click handler here
      $('<button class="rotate">').text('Rotate')
    )
  }

  // Helper view
  function personView (person) {
    return $('<div class="person">').append(
      $('<p>').append("Name: ", person.name),
      $('<p>').append("Age: ", person.age),
      $('<a href="#" class="remove">').text('Remove').attr('data-id', person.id)
    )
  }

  // The function actually puts the view on the page.
  People.mount = function (element) {
    var presenter = new People.Presenter(element)
    presenter.render()
  }

})()
