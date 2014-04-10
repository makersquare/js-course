describe("myQuery", function () {

  beforeEach(function () {
    // `setFixtures` comes from the jasmine-jquery plugin.
    // Although *you* are not using jQuery, we use this plugin to
    // help us create HTML elements for testing.
    //
    // Key point: The HTML elements we create here are available
    // for our tests to select. They also get destroyed after each test.
    setFixtures(
      '<div id="profile" class="noice">' +
        '<div class="button first"></div>' +
        '<img class="avatar" />' +
        '<a class="button second"></a>' +
        '<a class="straggler"><label>Click meh</label></a>' +
      '</div>'
    );
  });

  it("has a version of value 'beta'", function() {
    expect($.version).toEqual('beta');
  });

  describe("General each function", function () {
    xit("iterates through an array", function () {
      var testResult = [];
      var someArray = [10, 20, 30];
      $.each(someArray, function (number) {
        testResult.push(number * number);
      });

      expect(testResult.length).toEqual(3);
      expect(testResult[0]).toEqual(100);
      expect(testResult[1]).toEqual(400);
      expect(testResult[2]).toEqual(900);
    });
  });

  describe("Selectors", function () {

    xit("selects an element by id", function() {
      var elem = $('#profile').get(0);
      expect(elem.className).toEqual('noice');
    });

    xit("selects elements by class name", function() {
      var buttons = $('.button');
      expect(buttons.get(0).className).toMatch(/first/);
      expect(buttons.get(1).className).toMatch(/second/);
    });

    xit("selects elements by tag name", function() {
      var anchors = $('a');
      expect(anchors.length).toEqual(2)
      expect(anchors.get(0).className).toEqual("button second");
      expect(anchors.get(1).className).toEqual("straggler");

      var images = $('img');
      expect(images.length).toEqual(1)
      expect(images.get(0).className).toEqual("avatar");
    });
  });

  describe("Selected elements each function", function () {
    xit("iterates through all selected elements", function() {
      var testResult = [];
      $('.button').each(function (elem, i) {
        testResult.push(elem.className + ' ' + i);
      });

      expect(testResult.length).toEqual(2);
      expect(testResult[0]).toEqual("button first 0");
      expect(testResult[1]).toEqual("button second 1");
    });
  })

  describe("Show and Hide", function () {
    // TODO: Write tests for .show() and .hide()
  });

  describe("addClass", function () {
    // TODO: Write tests for addClass
    // HINT: Test using .toMatch() like the selector test
  });

  describe("Modifying CSS", function () {

    xit("can set a single property", function() {
      // Ensure they're not already hidden
      expect( $('.button').get(0).style.display ).toEqual('');
      expect( $('.button').get(1).style.display ).toEqual('');

      // Now make sure displays have updated
      $('.button').css('display', 'none');
      expect( $('.button').get(0).style.display ).toEqual('none');
      expect( $('.button').get(1).style.display ).toEqual('none');
    });

    // TODO: (`it` without a function are pending tests)
    it("can set multiple properties in one call");
  });

});
