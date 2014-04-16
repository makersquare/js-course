var render = function(template,object){
  
  for(var prop in object) {
    template = template.replace( new RegExp ( "{{" + prop + "}}",'g'),object[prop])
    }
  return template;
};

