var QuizListView = function(quizzes, container) {
	var template = $('.quiz-list-template').html();

	var uncompiledTemplate = _.template(template);

	var compiledTemplate = uncompiledTemplate({
		quizzes: quizzes
	});

	this.$el = $(compiledTemplate);

	this.$el.find('li').on('click', function() {
		Application.presenter.showQuiz($(this).data('id'));
	})

	$(container).append(this.$el);

	return this;
};

window.QuizListView.prototype.hide = function() {
	this.$el.hide();
};

window.QuizListView.prototype.show = function() {
	this.$el.show();
};
