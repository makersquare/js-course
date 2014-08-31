// This function will remove all posts from the browser
window.clearPosts = function() {
  $(".posts").empty();
}

// This function will display HTML for a single post
// It will show the status, a button to like the post
// a field to add comments, and a div for comments to
// be placed in.
// It will have an id with the postId to help find it
window.displayPost = function(post) {
  var postDiv = $("<hr>" + "<div class='post' id='post" + post.id + "'>" +
  "<h3>" + post.status + "</h3>" +
  "<button class='like-button'>Click to like or unlike</button>" +
  "<p class='like-count'>This has " + post.likes + " likes</p>" + "</br>" +
  "<form><input type='text' class='commentField'>" +
  "<input class='submit-comment' type='submit' value='Add Comment'></form>"+
  "<div class='comments'></div>" +
  "</div>");

  // Handlers for the like and add comment buttons
  postDiv.children('button').click(function() {
    likePost(post.id)
  });

  postDiv.children('form').submit(function(e) {
    e.preventDefault();
    var comment = $(e.currentTarget).children('.commentField').val();
    addComment(post.id, comment);
  })

  $('.posts').append(postDiv);
}

// This function will display a comment under a given post.
// It finds the post using the postId
window.displayComment = function(postId, comment) {
  var post = $('#post' + postId);
  var commentHTML = "<p class='comment'>" + comment.comment + "</p>"
  post.children('.comments').append(commentHTML);
}

// When the page loads, automatically call onLoad
$(document).ready(function() { onLoad(); });

// Set handlers for the toggle button and the status submission
// button
$(document).ready(function(){
  $(".statusForm").submit(function(e){
    e.preventDefault();
    var statusText = $(".statusForm .statusText").val();
    createPost(statusText);
  });

  $('.toggleShortText').click(function(){
    toggleShortText();
  })
})