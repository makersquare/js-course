var render = function(template,person){
  for(var prop in person) {
    //for(var i= 0;i<=template.length;i++) {
   // var replaceword = "{{"+prop+"}}" // {{firstName}}
    var findmarkup = new RegExp("{{"+prop+"}}","g");
    template = template.replace(findmarkup,person[prop]);
    //}
  }
  return template;
};

// var patt=new RegExp(pattern,modifiers);
// new RegExp











