(function() {

  window.Robin = {}

  Robin.extend = function(destination, source){
    for(var property in source){
      destination[property] = source[property];
    }
    return destination;
  };

  Robin.Events = {
    on: function(eventName, callbackFunction) {
      if (!this.events) {
        this.events = {};
      }
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callbackFunction);
    },
    trigger: function(eventName){
      for(var i = 0, l = this.events[eventName].length; i < l; i++){
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        this.events[eventName][i].apply(null, args);
      }
    }
  }

  Robin.render = function(template, data){
    var renderedTemplate = template;
    for(var property in data){
      var regex = new RegExp("{{"+property+"}}", "g");
      renderedTemplate = renderedTemplate.replace(regex, data[property]);
    }
    return renderedTemplate;
  }

})()