var Events = {
  on: function(property, func) {

    if (!this.events) {
      this.events = {};
    }

    if (!this.events[property]) {
      this.events[property] = [];
    }

    this.events[property].push(func);

  },
  trigger: function(action) {
    for (var property in this.events) {
      if (property == action) {
        for (var i = 0; i < this.events[property].length; i+=1) {
          this.events[property][i]();
        }
      }
    }
  }
};


$('div').on ('click', function() {
  consoloe.log('hi');
});

$('div').on ('click', function() {
  consoloe.log('bye');
});
