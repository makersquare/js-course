describe("myQuery", function () {

  beforeEach(function () {
    // `setFixtures` comes from the jasmine-jquery plugin.
    // Although *you* are not using jQuery, we use this plugin to
    // help us create HTML elements for testing
    setFixtures(
      '<div id="profile" class="noice">' +
        '<div class="avatar"></div>' +
        '<div class="button"></div>' +
        '<div class="button"></div>' +
      '</div>'
    );
  });

  it("has a version of value 'beta'", function() {
    expect($.version).toEqual('beta');
  });

  describe("Selectors", function () {

    it("selects an element by id", function() {
      var elem = $('#profile').get(0);
      expect(elem.className).toEqual('noice');
    });
  });

});
