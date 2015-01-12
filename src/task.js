// Model
(function (){
  // Code!
  
  // Private
  var tasks = []
  var idCounter = 100

  // Public
  window.Task = {}

  // Transaction Script
  Task.add = function (name) {
    if (! name) {
      return { error: 'name_required' }
    }
    if (name.length < 3) {
      return { error: 'name_too_short' }
    }

    var task = {
      id: idCounter,
      name: name,
      completed: false
    }
    tasks.push(task)
    idCounter += 1

    // 1. Publish / Subscribe pattern (pubsub)
    // 2. Observer pattern

    // Publish event
    // Open-closed principle (sOlid)
    $(document).trigger('new-task')

    return { success: true }
  }

  Task.find = function (id) {
    for (var i=0; i < tasks.length; i++) {
      if (tasks[i].id === id) return tasks[i]
    }
  }

  Task.markComplete = function (taskId, isComplete) {
    var task = Task.find(taskId)
    if (task) {
      task.completed = !!isComplete
    }
  }

  Task.forEach = function (callback) {
    for (var i=0; i < tasks.length; i++) {
      callback( extend({}, tasks[i]) )
      // callback( tasks[i] )
    }
  }

  // Meanwhile, somewhere else...
  // Task.forEach(function (task) {
  //   task.completed = "hello gilbert"
  //   task.x = 99
  //   console.log("I have a task:", task.name)
  //   $('<div class="task">').text(task.name)
  // })


})()
