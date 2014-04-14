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

  it("Should not add any additional properties to the source or destination", function() {

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

  });

});

describe("Events", function() {
  var dog;

  beforeEach(function() {

    dog = extend({}, Events);

  });

  it("Should have an object called Events", function() {

    expect(Events instanceof Object).toBe(true);

  });


  it("Should not be an Array", function() {

    expect(Events instanceof Array).toBe(false);

  });

  it("Should not have an internal events object until on is called", function() {

    expect(Events.events).toBeUndefined();

  });


  it("Should be extendable", function() {

    expect(dog instanceof Object).toBe(true);
    expect(dog.on instanceof Function).toBe(true);
    expect(dog.trigger instanceof Function).toBe(true);

  });

  it("Should have a property called 'on' which is a Function", function() {

    expect(dog.on instanceof Function).toBe(true);

  });

  it("Should add a property to the internal events object when on is called", function() {

    console.log(Events);
    dog.on("bark", function(){
      console.log("woof");
    });

    expect(dog.events.bark).toBeDefined();

  });


  it("The added internal events property should be an array", function() {

    dog.on("bark", function(){
      console.log("woof");
    });

    expect(dog.events.bark instanceof Array ).toBe(true);

  });

  it("The length of the array should be 1 when 'on' is called once", function() {

    dog.on("bark", function(){
      console.log("woof");
    });

    expect(dog.events.bark.length).toBe(1);

  });

  it("The array for the event should contain one function when on is called once", function() {

    dog.on("bark", function(){
      console.log("woof");
    });

    expect(dog.events.bark[0] instanceof Function).toBe(true);

  });

  it("The length of the array should be 3 when on is called thrice for the same event", function() {

    dog.on("bark", function(){
      console.log("woof");
    });

    dog.on("bark", function(){
      console.log("The cat ran away!");
    });

    dog.on("bark", function(){
      console.log("The dog ran away!");
    });

    expect(dog.events.bark.length).toBe(3);

  });

  it("Should allow for multiple events to be created", function() {

    dog.on("bark", function(){
      console.log("woof");
    });

    dog.on("scratch", function(){
      console.log("The fleas begin to stir.")
    })
    
    expect(dog.events.bark.length).toBe(1);
    expect(dog.events.scratch.length).toBe(1);

  });

  it("Should have a property called 'trigger' which is a Function", function() {

    expect(dog.trigger instanceof Function).toBe(true);

  });

  it("Calling trigger should call the functions for an event", function(){

    var bark = false;

    dog.on("bark", function(){
      bark = true;
      console.log("woof");
    });

    dog.trigger("bark");

    expect(bark).toBe(true);

  })

  it("Calling trigger should call all the functions of an event", function(){

    var bark = false;
    var bark2 = false;
    dog.on("bark", function(){
      bark = true;
      console.log("woof");
    });

    dog.on("bark", function(){
      bark2 = true;
      console.log("woof2");
    });


    dog.trigger("bark");

    expect(bark).toBe(true);
    expect(bark2).toBe(true);

  })

  it("Calling trigger should call only the functions of an event", function(){

    var bark = false;
    var bark2 = false;
    dog.on("bark", function(){
      bark = true;
      console.log("woof");
    });

    dog.on("scratch", function(){
      bark2 = false;
      console.log("woof2");
    });

    dog.on("bark", function(){
      bark2 = true;
      console.log("woof2");
    });

    dog.on("scratch", function(){
      bark = false;
      console.log("woof");
    });

    dog.trigger("bark");

    expect(bark).toBe(true);
    expect(bark2).toBe(true);

  })


});
