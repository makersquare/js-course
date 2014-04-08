describe("Render Function for Templates", function() {

  var template, person, person2;

  beforeEach(function() {

    template = "<div class='firstName'>{{firstName}}</div>";

    person = {
      firstName: "Gilbert",
      lastName: "JS"
    };

    person2 = {
      firstName: "Osei",
      lastName: "It's complicated"
    }

  });

  it("Should replace the interpolate values of template with object properties of the same name", function() {
    var result = render(template, person);
  });

});
