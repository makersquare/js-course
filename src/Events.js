var Events = {
  on : function (name, func) {

    if (!this.events) {
      this.events = {};
    }
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(func);
  },
  trigger: function(event) {
    for( var i = 0; i < this.events[event].length; i++) {
      this.events[event][i]();
    }
  }
};
