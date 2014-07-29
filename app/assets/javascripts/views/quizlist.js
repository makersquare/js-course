function QuizListView(quizzes, container) {
	var template = [
		"<ul>",
			"<% for (var i in quizzes) { %>",
				"<li data-id='<%= quizzes[i].id %>'><%= quizzes[i].title %></li>",
			"<% } %>",
		"</ul>"
	].join('')

	var uncompiledTemplate = _.template(template);
	var compiledTemplate = uncompiledTemplate({
		quizzes: quizzes
	});
	this.$el = $(compiledTemplate);

	// Thin event binding
	this.$el.find('li').on('click', function() {
		Application.presenter.showQuiz($(this).attr('data-id'));
	});

	$(container).append(this.$el);

	this.hide = function() {
		this.$el.hide();
	};
	this.show = function() {
		this.$el.show();
	}
}