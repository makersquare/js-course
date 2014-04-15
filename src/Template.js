var render = function(template, data){
  // var re = new RegExp(template)
  var rtemp = template;
  for(var prop in data){
    var re = new RegExp("{{"+prop+"}}","g")
    rtemp = rtemp.replace(re, data[prop])
  }
  return rtemp
};
