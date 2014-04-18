
var videos = [
  { title: 'Get Krazy', youtubeId: 'GyR2HJ9B7aM' },
  { title: 'Sadness', youtubeId: 'sIeJSSjTG3k' }
];

var renderVideoList = function () {
  // TODO
  var videoTemplate = $('#templates .video-list-item').html();
  for(var i=0;i<videos.length;i++) {
    // var regexp = new RegExp("{{"+videos[i][title]"}}")
    // var newHTML = videoTemplate.replace(regexp,object)
    // videos[i].title

    // var data = {title: videos[i].title, youtubeId: videos[i].youtubeId}
    var newtitle = Robin.render(videoTemplate,videos[i]);

    // Robin.render('h3 class="video-list-item">{{title}}</h3>', {title: 'Get Krazy'});
    $('#video-list').append(newtitle)
  }

};

// renderVideoList();
// have trouble accesing objects in array

$("form").on("submit",function(e) {
  e.preventDefault();
  // need to save values on submit
  // var items = {};
  var foodname = $(".food").val();
  // items['name'] = foodname
  var priceamount = $(".price").val();
  // items['price'] = priceamount
  console.log(foodname);

  var items = { "name": foodname, "price": priceamount};
  alert(items);
  var itemTemplate = $('#templates .item').html();
  var newHTML = Robin.render(itemTemplate,items)
  $('#store').append(newHTML)
});

// have two submits buttons that display, all videos
// another display that video and pushes the video
$("#new-video").on("submit",function(e) {
  e.preventDefault();
  var videoTemplate = $('#templates .video-list-item').html();

  var videotitle = $(".title").val();
  var youtube_id = $(".youtubeId").val();

  var obj = {"title": videotitle,"youtubeId": youtube_id};
  var newVideo = Robin.render(videoTemplate,obj)
  $("#video-list").append(newVideo)
  // for (var i = 0; i<videos.length;i++) {
  //   var newVideo = Robin.render(videoTemplate,videos[i])
  //   $("#video-list").append(newVideo);
  // };

  videos.push(obj);
//  change the order, render append, and then push afterwards!!!
 });

