var render = function(template, obj){
  // var patt=/pattern/modifiers;
  // var patt=new RegExp(pattern,modifiers)
  var renderedTemplate = template;
  for (key in obj) {
    renderedTemplate = renderedTemplate.replace(new RegExp("{{" + key + "}}", "g"), obj[key])

  }
  return renderedTemplate;
};

// template = "<div class='firstName'>{{firstName}}</div>";
//  person = {
//       firstName: "Gilbert",
//       lastName: "JS"
//     };
// x = render(template, person)
// x "<div class='firstName'>Gilbert</div>";
