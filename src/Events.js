var Events = {
on: function(event, func){
    this.events = this.events || {};
  if (this.events[event]){
      this.events[event].push(func);
    } else {
      this.events[event] = [func];
    }
  },
  trigger: function(event){
    this.events[event].forEach(function(ev){ev();});
  }
};
