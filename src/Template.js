var render = function(template, data){
	for (prop in data) {
		template = template.replace(new RegExp("{{"+prop+"}}", "g"), data[prop]);
	}
	return template;
};