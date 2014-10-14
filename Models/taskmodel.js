// Since we have no backend, the code below will represent our data for this example.

var testData = [
  {
    name: 'Task 0',
    desc: "do this",
    id: 0,
    complete: false
  },
  {
    name: 'Task 1',
    desc: "do that",
    id: 1,
    complete: true
  },
  {
    name: 'Task 2',
    desc: "do those",
    id: 2,
    complete: false
  }
];


// Create Model:
var TaskModel = function(data) {
  this.name = data.name;
  this.desc = data.desc;
  this.id = data.id;
  this.complete = data.complete;
};

// Retrieve a single Task Model:
TaskModel.get = function(taskID) {

// This is how you would typically retrieve the data.
// However, since there is no backend built for this example, this won't work.
// ------------------------------------------------------------------------ //
  // $.ajax({
  //   url: '/tasks/' + taskID,
  //   type: 'GET',
  //   success: function(data){
  //     //convert data to taskModel
  //     var task = new TaskModel(data);
  //     $(document).trigger('taskFetched', task);
  //   }
  // });
// ------------------------------------------------------------------------ //

  for (var i = 0; i < testData.length; i ++) {
    if (testData[i].id === taskID) {
      var task = new TaskModel(testData[i]);
      $(document).trigger('taskFetched', task);
    }
  }
};

// Retrieve all Task Models:
TaskModel.fetch = function() {

// This is how you would typically retrieve the data.
// However, since there is no backend built for this example, this won't work.
// ------------------------------------------------------------------------ //
  // $.ajax({
  //   url: '/tasks',
  //   type: 'GET',
  //   success: function(data) {
  //     $(document).trigger('allTasksFetched', data);
  //   }
  // });
// ------------------------------------------------------------------------ //

  var results = [];
  for (var i = 0; i < testData.length; i++) {
    results.push(new TaskModel(testData[i]));
  }
  $(document).trigger('allTasksFetched', results);
};


TaskModel.prototype.completed = function() {
  this.complete = true;

// This is how you would typically retrieve the data.
// However, since there is no backend built for this example, this won't work.
// ------------------------------------------------------------------------ //
  // $.ajax({
  //   url: '/tasks/' + this.id,
  //   type: 'PATCH',
  //   data: this,
  //   success: function(data) {
  //     var task = new TaskModel(data);
  //     $(document).trigger('taskCompleted', task);
  //   }
  // });

  testData[this.id].completed = true;
  $(document).trigger('taskCompleted', task);
};








