
//....................................
//read this content is cheating >.< !!
//....................................

(function(){




  var validateFriend = function(friendId) {
    if(friendId == 'qwe123' || friendId == 'asd123'
      || friendId == 'zxc123' || friendId == 'bnm123'){
      return friendId + '.json';
    }
    return false;
  };

  var validatePhoto = function(photoId){
    if(photoId == "picture1" || photoId == "picture2" || photoId == "picture3" ||
      photoId == "picture4" || photoId == "picture5" || photoId == "picture6" ||
      photoId == "picture7" || photoId == "picture8"){
      return photoId + '.json';
    }
    return false;
  }

  $.mockjax(function(settings){

    switch(settings.url){

      case '/friendface/getUserDetails' :
        if(settings.type === 'GET' || settings.type === 'get') {
          return {
            responseTime : 1000,
            proxy: "/mocks/userDetails.json"
          };
        }
        return {
          responseTime : 500,
          responseText : "We can not find a user",
          status : 401
        };

      case "/friendface/getUserCredentials" :
        if(settings.data && (settings.type === 'get' || settings.type === 'GET')){
          if(settings.data.id == 'abc123456xyz'){
            return {
              responseTime : 1500,
              proxy : '/mocks/credentials.json'
            };
          }
        }
        return {
          responseTime : 500,
          responseText : "Invalid credentials request",
          status : 401
        };

      case "/friendface/getFriendPhotos" :
        if(settings.data && (settings.type === 'GET' || settings.type === 'get')){
          if(settings.data.id == 'abc123456xyz'
          && settings.data.token == 'abcdfg1234567tokentokenkeykey'
          && validateFriend(settings.data.friendId)){
            console.log('nice');
            return {
              responseTime : 1500,
              proxy : '/mocks/' + validateFriend(settings.data.friendId)
            };
          }
        }
        return {
          responseTime : 500,
          responseText : "Invalid friend's photos request.",
          status : 401
        };

      case "/friendface/getFriendList" :
        if(settings.data && (settings.type === 'GET' || settings.type === 'get')){
          if(settings.data.id == 'abc123456xyz'
          && settings.data.token == 'abcdfg1234567tokentokenkeykey' ){
            return {
              responseTime : 1500,
              proxy : '/mocks/FriendList.json'
            };
          }
        }
        return {
          responseTime : 500,
          responseText : "Invalid request, friend list not found",
          status : 401
        };

      case "/friendface/getPhotoFullSize" :
        if(settings.data && (settings.type === 'GET' || settings.type === 'get')){
          if(settings.data.id == 'abc123456xyz'
          && settings.data.token == 'abcdfg1234567tokentokenkeykey'
          && validatePhoto(settings.data.photo)){
            return {
              responseTime : 2000,
              proxy : '/mocks/' + validatePhoto(settings.data.photo)
            };
          }
        }
        return {
          responseTime : 500,
          responseText : "Invalid request, photo not found",
          status : 401
        };
    };
    return {
      responseTime : 500,
      responseText : "Invalid request",
      status : 401
    };
  })

})();