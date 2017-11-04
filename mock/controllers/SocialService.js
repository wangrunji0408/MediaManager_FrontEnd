'use strict';

exports.deleteComment = function(args, res, next) {
  /**
   * Delete the comment
   *
   * id Long Comment id
   * no response value expected for this operation
   **/
  res.end();
}

exports.followUser = function(args, res, next) {
  /**
   * Follow another user
   *
   * id Integer 
   * othersID Integer 
   * no response value expected for this operation
   **/
  res.end();
}

exports.getFileComments = function(args, res, next) {
  /**
   * Get all comments about the file
   *
   * fileID String File id
   * type String Comment type (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "score" : 1,
  "star" : true,
  "comment" : "aeiou",
  "id" : 0,
  "type" : "star",
  "userID" : 6,
  "fileID" : "aeiou"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getUserEvents = function(args, res, next) {
  /**
   * Get all events of the user after a given time
   *
   * userID Integer 
   * afterTime Date Use last login time for default. (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "content" : "aeiou"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getUserFollower = function(args, res, next) {
  /**
   * Get all followers of the user
   *
   * id Integer 
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ 0 ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getUserFollowing = function(args, res, next) {
  /**
   * Get all followings of the user
   *
   * id Integer 
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ 0 ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.postComment = function(args, res, next) {
  /**
   * Post new comment about the file
   *
   * body Comment 
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "score" : 1,
  "star" : true,
  "comment" : "aeiou",
  "id" : 0,
  "type" : "star",
  "userID" : 6,
  "fileID" : "aeiou"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.unfollowUser = function(args, res, next) {
  /**
   * Unfollow another user
   *
   * id Integer 
   * othersID Integer 
   * no response value expected for this operation
   **/
  res.end();
}

