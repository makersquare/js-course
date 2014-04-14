var Events = {
  on: function(str, func){

    // console.log("woof");
    if (!this.events){
      this.events = {};
    }
    if(!this.events[str]){
      this.events[str] = [];
    }
    this.events[str].push(func);
  },
  trigger: function(event){
    for(var i=0; i< this.events[event].length; i++){
      this.events[event][i]();
    }

  }

};
