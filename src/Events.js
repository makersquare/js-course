var Events = {
  on: function(action, f) {
    if(!this.events) {
      this.events = {};
    }
    if (!this.events[action]) {
      this.events[action] = [];
    }
    this.events[action].push(f);

  },

  trigger: function(action) {
    for (var i = 0; i < this.events[action].length; i++) {
      this.events[action][i]();
    }
  }
};
