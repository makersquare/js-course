// var template = "<p>{{text}}</p>";
// var data = {text: "something"}

var render = function(template, data){
  var rendered_template = template;
  for (var property in data) {
    // rendered_template = template.replace("{{" + property + "}}", data[property])
    var re = new RegExp("{{"+property+"}}", "g");
    rendered_template = rendered_template.replace(re, data[property]);
    // return rendered_template;
  }
  return rendered_template;
};
