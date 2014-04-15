// var template = "<p>{{text}}</p>"
// var data = {text: "something"}
// template.replace("{{text}}", data["text"])

var render = function(template, data){
  var rendered_template = template;
  for (var prop in data){
    rendered_template = rendered_template.replace(new RegExp("{{"+prop+"}}", "g"), data[prop])
  }
  return rendered_template

};
