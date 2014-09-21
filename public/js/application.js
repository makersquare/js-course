var jokesCollection = [];
var maxId = 0;
$(document).ready(function() {
  $('#joke-form').on('submit', function(e) {
    e.preventDefault();
    var question = $('.joke-form-question').val();
    var answer = $('.joke-form-answer').val();
    $(document).trigger('new-joke', [question, answer]);
  });
});

$(document).on('new-joke', function(e, question, answer){
  console.log(question, answer);
  var jokeObj = {
    question: question,
    answer: answer
  };

  $.post('/api/jokes', {joke: jokeObj}, function(data) {
    jokesCollection.push(data);
    showJoke(data);
  })
});

var showJoke = function(jokeObj) {
  var jokeDiv = $('<div>').addClass('joke').attr('data-joke-id', jokeObj.id);

  var jokeQuestion = $('<p>').addClass('joke-question').append(jokeObj.question);
  var jokeAnswer = $('<p>').addClass('joke-answer').append(jokeObj.answer);
  var deleteButton = $('<button>').addClass('delete').append('Delete this joke');

  jokeDiv.append(jokeQuestion);
  jokeDiv.append(jokeAnswer);
  jokeDiv.append(deleteButton);

  $('.jokes').append(jokeDiv);
  jokeDiv.find('button').on('click', function() {
    removeJoke(jokeObj, jokeDiv);
  });
};

var removeJoke = function(jokeObj, jokeDiv) {
  var index = jokesCollection.indexOf(jokeObj);
  jokesCollection.splice(index, 1);
  jokeDiv.remove();
  $.ajax({
    url: '/api/jokes/' + jokeObj.id,
    type: 'DELETE'
  })
}

$(document).ready(function() {
  $.get('/api/jokes', function(data) {
    jokesCollection = data;
    for (var i = 0; i < data.length; i++) {
      showJoke(data[i]);
    }
  });
});
