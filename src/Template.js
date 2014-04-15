var render = function(template,object){
  // newray = []
  for(var prop in object) {
    // newray.push(object[prop])
    // template = "<p>{{firstName}}</p>"
    // data = { firstName: "Chris",
    //         lastName: "Palmer" }

    // var replace = new RegExp ( "{{" + prop + "}}",'g')
    template = template.replace( new RegExp ( "{{" + prop + "}}",'g'),object[prop])
    }
  return template;
};