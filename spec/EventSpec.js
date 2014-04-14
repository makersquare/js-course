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

    var returnValue = extend(destination, source); // calls extend

    expect(source).not.toBe(destination); // test if different objects

    var sourceProps = []; // empty array
    var destProps = []; // empty array

    for (var prop in source){
      sourceProps.push(prop); // push propertes into array
    }

    for (var prop in destination){
      destProps.push(prop); // push properties into array
    }

    expect(destProps.length).toBe(2); // length to be 2
    expect(sourceProps.length).toBe(2);

  });

});

describe("Events", function() {
  var dog;

  beforeEach(function() {

    dog = extend({}, Events); // calling extend on dog,
                              // all properties of Events into empty object
  });                         // dog will now have props from Event

  it("Should have an object called Events", function() {

    expect(Events instanceof Object).toBe(true);

  });


  it("Should not be an Array", function() {

    expect(Events instanceof Array).toBe(false);

  });

  it("Should not have an internal events object until 'on' is called", function() {
             // on returns the function
    expect(Events.events).toBeUndefined();
    // bascially, Events should not have an object events, until
    // you run the on function, or when you call on
    // you will have events object, unless it is already created
  });


  it("Should be extendable", function() {
     // dog should be an object, because extend returns an object
     // dog should have an on function, dog is an object
    expect(dog instanceof Object).toBe(true);
    expect(dog.on instanceof Function).toBe(true);
    expect(dog.trigger instanceof Function).toBe(true);

  });

  it("Should have a property called 'on' which is a Function", function() {


    expect(dog.on instanceof Function).toBe(true);

  });

  it("Should add a property to the internal events object when on is called", function() {
    // should add a property to the internval events
    // add property to internal events object
    // so before you cann events to inernal events object
    // you need to make one!, on should
    // look at code below
    // on is called. then it creates an events prop name
    // from the test you can deduce that is an object
    // because bark is called on it
    //
    console.log(Events);
    dog.on("bark", function(){ // on is a function takes two parameters
      console.log("woof");     // events and a function
    });                        // console logs in block
             // where did events come from?
             // you can deduce that once you call on
             // dog now has events object
             // make on, create an events object, if the
             // object does not already have one
             // then add the event, or bark to the event object
             // read the rest of the test
             // and see that the events property should be an array
             // .bark is = to ['bark'] . is string
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
      bark = true;   // this is done for you in the test
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
