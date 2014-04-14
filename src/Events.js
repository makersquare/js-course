var Events = {
  on: function(eventname, func) {
    if (!this.events) {
      this.events = {}
    }
    if (!this.events[eventname]) {
      this.events[eventname] = []
    }
    this.events[eventname].push(func)
  }, 
  trigger: function(event) {
    for( var i = 0; i < this.events[event].length; i++) {
      this.events[event][i]();
    }
  }
};