var TaskView = function(el, taskID) {
  this.taskID = taskID;
  this.el = el;
  this.projectsSelected = [];

  var view = this;
  $(document).on('taskFetched', function(e, task) {
    view.render(task);
  });
  // $(document).on('taskUpdated', function(task) {
  //   view.render(task);
  // });
};


TaskView.prototype.render = function(task) {
  console.log(task);
    var template = $('.task-template').html();
    this.templateFunc = _.template(template);
    var html = this.templateFunc({task: task});
    $(this.el).empty();
    $(this.el).append(html);
    this.setCallbacks();
};

TaskView.prototype.setCallbacks = function() {
  $(this.el).find('.complete-form').on('submit', function(e) {
    e.preventDefault();
    var completed = $(this).find('input').val();
    $(this).find('input').addClass('whatever');
    $(document).trigger('taskCompleted', task, completed);
    // controller.completeTask(task, completed);
  });
};
// var taskListView = new TaskView('.task-list');
// TaskModel.get(1);
// TaskModel.fetch();
