var Events = {
  on: function(event, func) {
    // on is a function that takes two parameters
    // on adds object to inertnal events object
    // test if that object is already in that object
    if ( !this.events ) { // object being called does not have event
      // add event to events object
      // if you don't do this you will set events to be empty object
      // everytime on is called
      this.events = {};  // so makes an object on whaterver
      //this.events[event] = [func]; //
    }
    if (!this.events[event]) { // check if events object has event
      this.events[event] = []; // if it doesn't create event to empty array
       // then, push in func
    }
    this.events[event].push(func)



  },
  trigger: function(event) {
    // events = {}
    // events[event] = []
    // always be aware of what you are passing through

    for(var i = 0; i < this.events[event].length;i++) {
      this.events[event][i]();
    }
  }

};


// 1. dog = extend({}, Events);

// 2. dog = {
//   on: func,
//   trigger: func
// }

// 3. dog.on("bark", func)

// 4. dog = {
//   events: {
//     bark: []
//   },
//   on: func,
//   trigger: func
// }
