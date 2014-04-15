var render = function(template, data){
  var rendered = "", propnames = [], rgex = /(\{{2})(\w*)(\}{2})/i;
  var rgexG = /(\{{2})(\w*)(\}{2})/gi;
  var result = [], propnames = [];
  var var_name = "";

  for (prop in data){
     propnames.push(prop);
  }

  while (rgex.test(template)){
    var check = false
    result = template.match(rgex);
    var_name = result[2];

    for(var i = 0; i < propnames.length; i++){
      if (var_name == propnames[i]){
        template = template.replace(rgex, data[propnames[i]])
        check = true;
      }
    }
    if (!check){
      template = template.replace(rgex, "Error");
    }
  }

  return template;
};

