(function () {
  // // // // // //
  // M V Controller
  // // // // // //


  window.People = {}

  // Controller
  People.controller = {
    // Controller Action
    rotate: function (e) {
      // This is not very special (but it could be!)
      e.preventDefault()
      PersonList.rotate()
    }
  }

  // Views
  People.view = function () {
    return $('<div class="people">').append(
      $('<h3>').text("All People:"),

      // Example of the View connecting to a Controller action
      $('<button>').text('Rotate').on('click', People.controller.rotate),

      // Example of the View reading from the Model
      PersonList.map(personView)
    )
  }
  // Helper view
  function personView (person) {
    return $('<div class="person">').append(
      $('<p>').append("Name: ", person.name),
      $('<p>').append("Age: ", person.age),

      // Example of the View manipulating the Model
      $('<a href="#">').text('Remove').on('click', function(e) {
        e.preventDefault()
        PersonList.remove(person.id)
      })
    )
  }

  // ---------------------------------------------------------
  // EVERYTHING BELOW THIS LINE YOU WOULD NORMALLY NOT HAVE TO
  // DEAL WITH IF YOU WERE WORKING WITH A PROPER FRAMEWORK
  // ---------------------------------------------------------

  // This function inserts the view into a given DOM element.
  People.render = function (element) {
    var peopleDOM = People.view(People.controller)
    $(element).empty().append(peopleDOM)
  }

  // The function puts the view on the page,
  // then gets ready to update the view on model changes.
  People.mount = function (element) {
    People.render(element)
    App.pubsub.on('change:personList', function() {
      People.render(element)
    })
  }
})()
