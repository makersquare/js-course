var posts = [
  {
    status: "This is a status",
    likes: 5,
    likedByMe: false,
    id: 0,
    comments: [{
      comment: "hello world",
      id: 0
    }]
  },
  {
    status: "This is another status",
    likes: 8,
    likedByMe: true,
    id: 1,
    comments: []
  }
];

var onLoad = function() {
  clearPosts();
  for (var i = 0; i < posts.length; i++) {
    var post = posts[posts.length - i - 1];
    if (post.status.length > 50 && shortText) {
      post = shortenPost(post);
    }
    displayPost(post);
    for(var j = 0; j < post.comments.length; j++) {
      displayComment(post.id, post.comments[j]);
    }
  }
};

var shortenPost = function(post) {
  var shortenedPost = {};
  for (var property in post) {
    shortenedPost[property] = post[property];
  }
  shortenedPost.status = post.status.substr(0, 47) + "...";
  return shortenedPost;
};

var createPost = function(post) {
  posts.push({
    status: post,
    likes: 0,
    likedByMe: false,
    id: posts.length,
    comments: []
  });
  onLoad();
};

var addComment = function(postId, comment) {
  posts[postId].comments.push({
    comment: comment,
    id: posts[postId].comments.length
  });
  onLoad();
};

var likePost = function(postId) {
  var post = posts[postId];
  if (post.likedByMe) {
    post.likedByMe = false;
    post.likes -= 1;
  } else {
    post.likedByMe = true;
    post.likes += 1;
  }
  onLoad();
};

var shortText = false;

var toggleShortText = function() {
  shortText = !shortText;
  onLoad();
};
