var Events = {
  on: function(event, func) {

    if ( !this.events ) {

      this.events = {};

      this.events = {};


    }
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(func)




  },
  trigger: function(event) {


    for(var i = 0; i < this.events[event].length;i++) {
      this.events[event][i]();
    }
  }

};





  },
  trigger: function(event) {


    for(var i = 0; i < this.events[event].length;i++) {
     this.events[event][i]();
    }
  }

};


