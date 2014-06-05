// Our view
var updateBox = {
	data: {
		name: 'Bob',
		age: 50,
		description: 'This is my description'
	},
	template : '<div class="box"><p>{{name}}</p><p>{{age}}</p><p>{{description}}</p></div>',
	init : function() {
		var me = this;
		// Put block into the DOM
		var renderedTemplate = Robin.render(this.template, this.data);
		this.$element = $(renderedTemplate);
		$('#container').append(this.$element);

		// Give this object Events functionality -- .on() and .trigger()
		Robin.extend(this, Robin.Events);

		// We now have access to changes
		this.on('change', function() {
			me.render();
		});
	},
	render : function() {
		// Re-render block
		var renderedTemplate = Robin.render(this.template, this.data);
		var $template = $(renderedTemplate);
		this.$element.replaceWith($template);
		this.$element = $template;
	},
	updateDataProperty : function(property, value) {
		// Update our dat a property and trigger a change
		this.data[property] = value;
		this.trigger('change');
	}
};

updateBox.init();