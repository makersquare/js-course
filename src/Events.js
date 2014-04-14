var Events = {
  on: function(eventName, functionToCall) {
    if (!this.events) {
      this.events = {};
    }
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(functionToCall);


  },
  trigger: function(eventName) {
    for (var i = 0; i < this.events[eventName].length ; i++) {
      this.events[eventName][i]();
    }
  }
};
