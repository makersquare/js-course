var QuestionView = function(data, parent, $container) {
	this.data   = data;
	this.parent = parent; // Store reference to parent QuizView
	this.$container = $container;
	return this;
};

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

var BlankQuestionView = function() {
	// arguments: [data, $container] ----> function(data, $container) {
	// }
	QuestionView.apply(this, arguments);
	this.template = $('blank-question-template');
	this.render();

	// not the DRYest way to do this
	var me = this;
	this.$el.find('input[type=submit]').on('click', function() {
		var answer = me.$el.find('input[type=text]').val();
		me.parent.submitAnswer(me.data.id, answer);
	});
}
BlankQuestionView.prototype = questionViewInstance;

var BooleanQuestionView = function(data, $container) {
	QuestionView.apply(this, arguments);
	this.template = $('.boolean-question-template').html();
	this.render();

	// not the DRYest way to do this
	var me = this;
	this.$el.find('input[type=submit]').on('click', function() {
		var answer = me.$el.find('input[type=radio]:checked').val();
		me.parent.submitAnswer(me.data.id, answer);
	});
}
BooleanQuestionView.prototype = questionViewInstance;

var MultipleQuestionView = function(data, $container) {
	data.choices = data.choices.split(';');
	QuestionView.apply(this, arguments);
	this.template = $('.multiple-question-template').html();
	this.render();

	// not the DRYest way to do this
	var me = this;
	this.$el.find('input[type=submit]').on('click', function() {
		var answer = me.$el.find('input[type=radio]:checked').val();
		me.parent.submitAnswer(me.data.id, answer);
	});
}
MultipleQuestionView.prototype = questionViewInstance;