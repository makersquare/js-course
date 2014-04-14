var Events = {
	on: function(event, func) {
		// this will create an object "events" if its not already created
		if (!this.events) {
			this.events = {};
		};
		// this will create a property and set it to be an empty array 
		// for the events object if it doesn't exist already
		if (!this.events[event]) {
			this.events[event] = [];
		};
		// this will push a function into the empty array created for the events
		// property  specified
		this.events[event].push(func);
	},
	trigger: function(event) {
		// this will loop over the array of functions and call them one by one
    for(var i = 0; i < this.events[event].length; i++) {
      this.events[event][i]();
    }
	}
};