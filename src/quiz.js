// Model
(function (){

  // Public
  window.Quiz = {}

  var idCounter = 100
  Quiz.questions = []

  Quiz.addQuestion = function (question) {
    question.id = (idCounter += 1)
    Quiz.questions.push(question)
  }

  Quiz.findQuestion = function (id) {
    for (var i=0; i < Quiz.questions.length; i++) {
      if (Quiz.questions[i].id === id) return Quiz.questions[i]
    }
  }

  // Grades an entire quiz.
  // `answers` is an array of objects, where each object looks like { questionId: 234, index: 1 }
  Quiz.grade = function (answers) {
    var results = answers.map(answerQuestion)
    var score = results.filter(identity).length

    return { correct: score, total: Quiz.questions.length }
  }

  function answerQuestion (answer) {
    var question = Quiz.findQuestion(answer.questionId)
    if (question.answerIndex === answer.index) {
      // TODO: Update average score for this question
      return true
    }
    else {
      return false
    }
  }

})()
