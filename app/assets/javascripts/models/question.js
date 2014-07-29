function QuestionModel(data) {
	this.question       = data.question;
	this.questionType   = data.question_type;
	this.timesAnswered  = data.times_answered;
	this.correctAnswers = data.correct_answers;
	this.id             = data.id;
	this.choices        = data.choices;
}