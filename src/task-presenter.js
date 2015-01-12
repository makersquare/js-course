// Presenter
(function () {

	// TODO: REMOVE
	Task.add('my task')
	Task.add('another one')
	Task.add('do itt')
	// ^^^^^^^^^^^^

	// Task.forEach(function (task) {
	// 	var li = $('<li>').append(
	// 		$('<input type="checkbox">').prop('checked', task.completed),
	// 		$('<span>').addClass('name').text(task.name)
	// 	)

	// 	$('#task-list').append(li)
	// })
	renderTasks()

	$(document).on('new-task', renderTasks)

	function renderTasks () {
		$('#task-list').empty()
		Task.forEach(function (task) {
			var li = $('<li>').append(
				$('<input type="checkbox">')
					.attr('data-id', task.id)
					.prop('checked', task.completed),
				$('<span>').addClass('name').text(task.name)
			)

			$('#task-list').append(li)
		})	
	}

	// Listen to the view
	$('#task-list').on('click', 'input[type=checkbox]', function (e) {
		// On click, update model
		var taskId = $(this).attr('data-id')
		var isChecked = $(this).prop('checked')
		console.log("Checked?", isChecked, taskId)

		Task.markComplete(parseInt(taskId, 10), isChecked)
	})


})()