var Events = {
  on: function(eve, func) {
    this.events = this.events || {};
    this.events[eve] = this.events[eve] || [];
    this.events[eve].push(func)
  },
  trigger: function(eve){
    var events = this.events[eve];
    for (var i in events) {
      events[i]();
    }
  },
};
