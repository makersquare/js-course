var Events = {
  on: function(x, func){
    if (!this.events){
      this.events = {};
    }
    if (!this.events[x]){
      this.events[x] = [];
    }
    this.events[x].push(func);
  },
  trigger: function(y){
    for (var n = 0; n < this.events[y].length; n++){
    this.events[y][n]();
  }
  }
};
