function QuizModel(data) {
	this.id    = data.id;
	this.title = data.title;
	this.questionModels = [];

	this.generateQuestionModels = function(questionData) {
		for (var i in questionData) {
			this.questionModels.push(new QuestionModel(questionData[i]));
		}
	};

	this.getTitle = function() {
		return this.title;
	};

	this.getQuestions = function() {
		return this.questionModels;
	};
};