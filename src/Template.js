var render = function(temp, data){
for (var x in data) {
    var match = RegExp("{{" + x + "}}","g");
    temp = temp.replace(match, data[x]);
  }
  return temp;
};

