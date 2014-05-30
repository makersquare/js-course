var render = function(template, data){
  for (var i in data) {
    var match = RegExp("{{" + i + "}}", "g");
    template = template.replace(match, data[i]);
  }
  return template;
};
