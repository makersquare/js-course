var videoTemplate = $('#templates .video-list-item').html();

var videos = [
  { title: 'Get Krazy', youtubeId: 'GyR2HJ9B7aM' },
  { title: 'Sadness', youtubeId: 'sIeJSSjTG3k' }
];

// loops the videos object and renders a template for each video.
// then it appends the template to the html. 
// finally the (); at the end automatically runs the function so the list is updated
var renderVideoList = function () {
	for (var video in videos) {
		newItem = Robin.render(videoTemplate, videos[video])
		$('#video-list').append(newItem);
	}
}();

// Grabs the user inputs and renders a template for the values added(new video)
// Then it appends the template to the html for display to user
$('#new-video').on('submit', function(e) {
  e.preventDefault();
  var video = {
    title: $('#video-title').val(),
    youtubeId: $('#youtube-id').val()
  }

  var newVideo = Robin.render(videoTemplate, video);
  $('#video-list').append(newVideo);
});
