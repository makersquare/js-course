var render = function(template, data){
 var replacedTemp = template;
 for (var property in data) {
   var prop = "{{" + property + "}}";
   var regex = new RegExp(prop, "g");
   replacedTemp = replacedTemp.replace(regex, data[property]);
 }
   return replacedTemp;
};
