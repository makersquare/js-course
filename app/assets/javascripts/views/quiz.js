var QuizView = function(title, id, $container) {
	this.questionViews = [];

	this.id = id;

	this.$container = $container;

	var template = $('.quiz-template').html();

	var uncompiledTemplate = _.template(template);

	var compiledTemplate = uncompiledTemplate({
		title: title
	});

	this.$el = $(compiledTemplate);

	this.$questionContainer = this.$el.find('.question-container');
	
	$container.append(this.$el);

	return this;
};

QuizView.prototype.createQuestionViews = function(questionModels) {
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

QuizView.prototype.showFirstQuestion = function() {
	this.currentQuestionIndex = 0;
	this.currentQuestion = this.questionViews[0];
	this.questionViews[0].show();
};

QuizView.prototype.nextQuestion = function() {
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

QuizView.prototype.showScore = function() {
	var scores = Application.presenter.getScore();
	var scoreTemplate = [
		"<h1>Your score: " + scores.percentage + "</h1>",
		"<h2>" + scores.correct + " out of " + scores.total + "</h2>"
	].join('');
	this.$container.html(scoreTemplate);
};

QuizView.prototype.submitAnswer = function(questionId, answer) {
	var me = this;

	Application.presenter.checkAnswer(this.id, questionId, answer, function(result) {
		me.currentQuestion.showCorrect(result);
		setTimeout(function() {
			me.nextQuestion();
		}, 1000);
	});
};