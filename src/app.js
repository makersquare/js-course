(function(){

  $.get('/friendface/getUserDetails',function(data){
    var userDetails = { id : data.id};
    var requestParams = {
      id : data.id
    };

    $.get('/friendface/getUserCredentials',requestParams,function(data){
      userDetails.token = data.token;
      var requestParams = {
        id : userDetails.id,
        token : userDetails.token
      };
      $.get('/friendface/getFriendList',requestParams,function(data){
        var friendsLimit = data.list.length;
        var friendsCounter = 0;
        var photoContainer = [];
        for(var i in data.list){
          var requestParamsPhotos = {
            id : userDetails.id,
            token : userDetails.token,
            friendId : data.list[i]
          }
          $.get('/friendface/getFriendPhotos',requestParamsPhotos,function(data){
            friendsCounter++;
            for(var i in data.pictures){
              photoContainer.push(data.pictures[i]);
            };

            if(friendsLimit == friendsCounter) {
              var mostLiked = 0;
              var photoLimit = photoContainer.length
              var photoCounter = 0;
              var photoFSContainer = [];
              for(var i in photoContainer) {
                var requestParamsPhotoFS = {
                  id : userDetails.id,
                  token : userDetails.token,
                  photo : photoContainer[i]
                }

                $.get('/friendface/getPhotoFullSize',requestParamsPhotoFS,function(data){
                  photoFSContainer.push(data);
                  photoCounter++
                  if(photoCounter == photoLimit) {
                    for(var i in photoFSContainer) {
                      if(photoFSContainer[i].likes > photoFSContainer[mostLiked].likes){
                        mostLiked = i;
                      }
                    };
                    console.log(photoFSContainer[mostLiked]);
                    $('body').css('background-image','url(' + photoFSContainer[mostLiked].url + ')');
                  }
                },'json');
              };
            }
          },'json');
        };
      },'json');
    },'json');
  },'json');
})();

















