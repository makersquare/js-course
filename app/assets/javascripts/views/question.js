function QuestionView(data, parent, $container) {
	this.data   = data;
	this.parent = parent; // Store reference to parent QuizView
	this.$container = $container;
}
QuestionView.prototype.render = function() {
	var uncompiledTemplate = _.template(this.template);
	var compiledTemplate   = uncompiledTemplate(this.data);
	this.$el = $(compiledTemplate);
	this.$container.append(this.$el);
	this.hide();
};
QuestionView.prototype.hide = function() {
	this.$el.hide();
};
QuestionView.prototype.show = function() {
	this.$el.show();
};
QuestionView.prototype.showCorrect = function(correct) {
	var $notification;
	if (correct) {
		$notification = $('<p>CORRECT!</p>');
		this.$el.append($notification);
	} else {
		$notification = $('<p>WRONG!</p>');
		this.$el.append($notification);
	}
	// if this feels sloppy, that's because it is
	setTimeout(function() {
		$notification.remove();
	}, 1000);
};
var questionViewInstance = new QuestionView();

function BlankQuestionView() {
	// arguments: [data, $container] ----> function(data, $container) {
	// }
	QuestionView.apply(this, arguments);
	this.template = [
		"<div class='question-view'>",
			"<h5><%= question %></h5>",
			"<input type='text'>",
			"<input type='submit'>",
		"</div>"
	].join('');
	this.render();

	// not the DRYest way to do this
	var me = this;
	this.$el.find('input[type=submit]').on('click', function() {
		var answer = me.$el.find('input[type=text]').val();
		me.parent.submitAnswer(me.data.id, answer);
	});
}
BlankQuestionView.prototype = questionViewInstance;

function BooleanQuestionView(data, $container) {
	QuestionView.apply(this, arguments);
	this.template = [
		"<div class='question-view'>",
			"<h5><%= question %></h5>",
			"<input id='boolean-true' type='radio' value='false' name='boolean'>",
			"<label for='boolean-true'>true</label>",
			"<input id='boolean-false' type='radio' value='true' name='boolean'>",
			"<label for='boolean-false'>false</label>",
			"<input type='submit'>",
		"</div>"
	].join('');
	this.render();
	var me = this;

	// not the DRYest way to do this
	var me = this;
	this.$el.find('input[type=submit]').on('click', function() {
		var answer = me.$el.find('input[type=radio]:checked').val();
		me.parent.submitAnswer(me.data.id, answer);
	});
}
BooleanQuestionView.prototype = questionViewInstance;

function MultipleQuestionView(data, $container) {
	data.choices = data.choices.split(';');
	QuestionView.apply(this, arguments);
	this.template = [
		"<div class='question-view'>",
			"<h5><%= question %></h5>",
			"<% for (var i in choices) { %>",
				"<input id='choice-<%= choices[i] %>' type='radio' value='<%= choices[i] %>' name='multiple'>",
				"<label for='choice-<%= choices[i] %>'>",
			"<% } %>",
			"<input type='submit'>",
		"</div>"
	].join('');
	this.render();
	var me = this;

	// not the DRYest way to do this
	var me = this;
	this.$el.find('input[type=submit]').on('click', function() {
		var answer = me.$el.find('input[type=radio]:checked').val();
		me.parent.submitAnswer(me.data.id, answer);
	});
}
MultipleQuestionView.prototype = questionViewInstance;