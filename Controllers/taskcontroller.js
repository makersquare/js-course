var TaskController = function() {
  this.taskDiv = '.task';
  this.taskListDiv = '.task-list';

  this.taskView = new TaskView(this.taskDiv);
  this.taskListView = new TaskListView(this.taskListDiv);

  $(document).on('taskSelected', function(e, taskId) {
    $('.task').show();
    $('.task-list').hide();
    TaskModel.get(taskId);
  });

  $(document).on('taskCompleted', function(e, task, completed) {
    completeTask(task, completed);
  });
};

TaskController.prototype.completeTask = function(task, completed) {
  if (completed) {
    task.completed();
  }
};

TaskController.prototype.start = function() {
  $(this.taskDiv).show();
  $(this.taskListDiv).hide();
  TaskModel.get(0);
};

var app;

$(function() {
  app = new TaskController();
  app.start();
});
