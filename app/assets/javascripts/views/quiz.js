function QuizView(title, id, $container) {
	var me = this;
	this.questionViews = [];
	this.id = id;

	var template = [
		"<div class='quiz-view'>",
			"<h2><%= title %></h2>",
			"<div class='question-container'></div>",
		"</div>"
	].join('');

	var uncompiledTemplate = _.template(template);
	var compiledTemplate = uncompiledTemplate({
		title: title
	});
	this.$el = $(compiledTemplate);
	this.$questionContainer = this.$el.find('.question-container');
	$container.append(this.$el);

	this.createQuestionViews = function(questionModels) {
		for (var i in questionModels) {
			var questionType;
			switch (questionModels[i].questionType) {
				case 'blank':
					type = BlankQuestionView;
					break;
				case 'boolean':
					type = BooleanQuestionView;
					break;
				case 'multiple':
					type = MultipleQuestionView;
					break;
				default:
					throw new Error('you broke it what\'s wrong with you');
			}
			this.questionViews.push(new type(questionModels[i], this, this.$questionContainer));
		}
	};
	this.showFirstQuestion = function() {
		this.currentQuestionIndex = 0;
		this.currentQuestion = this.questionViews[0];
		this.questionViews[0].show();
	};
	this.nextQuestion = function() {
		this.currentQuestionIndex++;
		var nextQuestion = this.questionViews[this.currentQuestionIndex];
		if (nextQuestion) {
			this.currentQuestion.hide();
			this.currentQuestion = nextQuestion;
			this.currentQuestion.show();
		} else {
			this.currentQuestion.hide();
			this.showScore();
		}
	};
	this.showScore = function() {
		var scores = Application.presenter.getScore();
		var scoreTemplate = [
			"<h1>Your score: " + scores.percentage + "</h1>",
			"<h2>" + scores.correct + " out of " + scores.total + "</h2>"
		].join('');
		$container.html(scoreTemplate);
	};
	this.submitAnswer = function(questionId, answer) {
		Application.presenter.checkAnswer(this.id, questionId, answer, function(result) {
			me.currentQuestion.showCorrect(result);
			setTimeout(function() {
				me.nextQuestion();
			}, 1000);
		});
	}
}