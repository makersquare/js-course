var Events = {
  on : function(prop, funct){

    if(this.events === undefined){
      this.events = {};
    }

    if(this.events[prop] === undefined){
      this.events[prop] = [];
    }

    this.events[prop].push(funct);

  },
  trigger : function(prop){
    if ( this.events[prop] != undefined ) {
    for(var i = 0; i < this.events[prop].length; i +=1){
      this.events[prop][i]();
    }
  }
  }
};
