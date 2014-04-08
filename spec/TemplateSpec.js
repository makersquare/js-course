describe("Render Function for Templates", function() {

  var template, template2, person, person2;

  beforeEach(function() {

    template = "<div class='firstName'>{{firstName}}</div>";
    template2 = "<div class='firstName'>{{firstName}}{{firstName}}</div>";
    template3 = "<div class='firstName'>{{firstName}} {{lastName}}</div>";

    person = {
      firstName: "Gilbert",
      lastName: "JS"
    };

    person2 = {
      firstName: "Osei",
      lastName: "It's complicated"
    }

  });

  it("Should be a function", function() {
    expect(render instanceof Function).toBe(true);
  });

  it("Should return a string", function() {
    var result = render(template, person);
    expect(typeof result ).toBe("string");
  });

  it("Should interpolate values of template with object properties of the same name", function() {
    var result = render(template, person);
    expect(result).toBe("<div class='firstName'>Gilbert</div>");
  });

  it("Should interpolate multiple values of template with object properties of the same name", function() {
    var result = render(template2, person);
    expect(result).toBe("<div class='firstName'>GilbertGilbert</div>");
  });

  it("Should interpolate different values of template with object properties of the same name", function() {
    var result = render(template3, person);
    expect(result).toBe("<div class='firstName'>Gilbert JS</div>");
    var result2 = render(template3, person2);
    expect(result2).toBe("<div class='firstName'>Osei It's complicated</div>");
  });

});
