# Facebook clone project

Today we'll be implementing a clone of Facebook. The purpose of this is to understand core JavaScript fundamentals rather than to understand how JS interacts with the browser directly.

## What you will learn

You will apply the following concepts through this project:

* JavaScript Syntax
* Arrays
* Loops
* Conditionals
* Objects
* Creating/Using JS Functions

## What's given to you

To start you off, we've given you everything you need in terms of presenting information to the browser.

* A form to submit a new status
* A form to toggle between short and long text displays (explained later)
* A JS function called `displayPost` that will display HTML pertaining to a Facebook status
* A JS function called `displayComment` that will display HTML pertaining to a comment on a post
* An array called `posts`. This array will contain all of the posts that the user has put up. It also has additional data including the comments on this post
* `clearPosts`, a function that will clear all posts from the screen.

### Reactionary functions

We're leaving a few functions for you to implement. These functions will automatically be called as soon as certain events occur. They are cause/effect or (officially) `callback` functions that we've set up for you.

* `createPost` - This function is called when someone submits a new status. The input will be a string with the given text.
* `likePost` - This function is called when someone presses the like/unlike button for a post. The post's id will be passed in.
* `addComment` - This function is called when someone submits a comment for a post. The post's id and the text for the comment will be passed in.
* `toggleShortText` - This function is called when someone clicks on the button short/long text button.
* `onLoad` - This function is executed when the page loads up.

## Your tasks

You will only be looking at `facebook.js`. The other 2 JS files have code that sets up the ecosystem for you to display your actions on the page. Just remember that the focus for this project is to understand JS, not how to display content.

Remember to attack this project 1 step at a time. Implement the step and then commit.

To start, clone the repository and set things up:

```console
$ cd to/some/folder
$ git clone https://github.com/makersquare/js-course fb-clone
$ cd fb-clone
$ git checkout -b fb-clone-start
# This updates your remote pointer to point to your own fork
$ git remote rm origin
$ git remote add origin https://github.com/YOUR_GITHUB_USERNAME/js-course
```

---

Implement the `onLoad` function. This function should display all posts and comments that are part of the posts array. The posts should be in reverse chronological order, but the comments should be in chronological order.

---

Implement the `createPost` function. This function should add a new post to the `posts` array and display it immediately. Note that the posts `id` should be it's position in the posts array.

---

Implement the `addComment` function. This function should add a new comment to the proper comments array and display it immediately.

---

Implement the `likePost` function. This function should look at whether or not you've already liked the post. If you've liked it, this function will unlike it and decrement the like count. If you haven't like it, you will like it and the like count will increment. This should reflect on the page immediately.

---

Implement `toggleShortText` - This button should toggle whether the `shortText` variable is true or false. If true, it should display all posts that are longer than 50 characters as their first 47 characters followed by "...".

Be sure to take a look at the `substr` function for Strings.

---

Same at above, except the same rule applies to comments. After completing this step, make sure you've separated concerns and kept your code DRY. (create more functions if necessary)