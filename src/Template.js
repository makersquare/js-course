var render = function(template, data) {
  var renderedTemplate = template;
  for (var property in data) {
    var regex = new RegExp("{{"+property+"}}", "g");
    renderedTemplate = renderedTemplate.replace(regex, data[property]);
  }
  return renderedTemplate;
};
