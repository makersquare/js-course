// var videoTemplate = $('#templates .video-list-item').html();
var genreTemplate = $('#templates .genre-stats-item').html();
var embedTemplate = $('#templates .video-embed').html();

var videos = [
  { title: 'Get Krazy', youtubeId: 'GyR2HJ9B7aM', genre: 'kid rap' },
  { title: 'Sadness', youtubeId: 'sIeJSSjTG3k', genre: 'piano' }
];

var stats = {};

var renderGenreStats = function() {
  for (var i = 0; i < videos.length; i += 1) {
    var genre = videos[i].genre;
    if (stats[genre] === undefined) {
      stats[genre] = 0;
    }
    stats[genre] += 1;
  }
  
  console.log('Stats for genre:', stats);
  for (var genre in stats) {
    var genreCount = stats[genre];
    newGenre = Robin.render(genreTemplate, { genre: genre, statsCount: stats[genre] });
    $('#genre-stats').append(newGenre);
  }
  // clear stats so it does not add everything over each time we run the function
  stats = {};
}

// loops the videos object and renders a template for each video.
// then it appends the template to the html. 
// finally the (); at the end automatically runs the function so the list is updated
var renderVideoList = function () {
  for (var video in videos) {
    // newItem = Robin.render(videoTemplate, videos[video])
    newVideo = Robin.render(embedTemplate, videos[video])
    // $('#video-list').append(newItem);
    $('#video-display').append(newVideo);
  }
};

renderVideoList();

// Grabs the user inputs and renders a template for the values added(new video)
// Then it appends the template to the html for display to user
$('#new-video').on('submit', function(e) {
  e.preventDefault();
  var video = {
    title: $('#video-title').val(),
    youtubeId: $('#youtube-id').val(),
    genre: $('#video-genre').val()
  }

  videos.push(video);

  // $('#video-list').empty();
  $('#genre-stats').empty();
  $('#video-display').empty();
  renderGenreStats();
  renderVideoList();
});

$('#video-list-item').on("click", function(e) {
  e.preventDefault();
  var youtubeId = $(e.currentTarget).data('youtube-id');
  console.log('Clicked on youtube video:', youtubeId);
});
