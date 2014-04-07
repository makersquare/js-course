describe("Extend Function", function() {

  var destination, source;

  beforeEach(function() {

    destination = {};

    source = {
      test: "test value",
      test2: "test value 2"
    };

  });

  it("Should add properties from one object to another object", function() {

    extend(destination, source);

    expect(destination.test).toBe("test value");
    expect(destination.test2).toBe("test value 2");

  });

  it("Should return the destination object", function() {

    var returnValue = extend(destination, source);

    expect(returnValue).toBe(destination);

  });

  it("Should not set the source and destination object to equal each other", function() {

    extend(destination, source);
    expect(source).not.toBe(destination);

  });

  it("Not add any additional properties to the source or destination", function() {

    var returnValue = extend(destination, source);

    expect(source).not.toBe(destination);

    var sourceProps = [];
    var destProps = [];

    for (var prop in source){
      sourceProps.push(prop);
    }

    for (var prop in destination){
      destProps.push(prop);
    }

    expect(destProps.length).toBe(2);
    expect(sourceProps.length).toBe(2);

  })

});
