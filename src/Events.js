var Events = {
  on: function(event, func) {
    this.events = this.events || {};
    this.events[event] = this.events[event] || [];
    this.events[event].push(func)
  },
  trigger: function(event){
    var events = this.events[event];
    for (var i = 0; i < events.length; i++) {
      events[i]();
    }
  },
};
