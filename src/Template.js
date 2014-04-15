var render = function(template, data){
  for (property in data) {
    template = template.replace(new RegExp("{{"+property+"}}","g"),data[property]);
  }
  return template;
};
