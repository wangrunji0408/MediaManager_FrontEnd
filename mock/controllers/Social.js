'use strict';

var url = require('url');

var Social = require('./SocialService');

module.exports.deleteComment = function deleteComment (req, res, next) {
  Social.deleteComment(req.swagger.params, res, next);
};

module.exports.followUser = function followUser (req, res, next) {
  Social.followUser(req.swagger.params, res, next);
};

module.exports.getFileComments = function getFileComments (req, res, next) {
  Social.getFileComments(req.swagger.params, res, next);
};

module.exports.getUserEvents = function getUserEvents (req, res, next) {
  Social.getUserEvents(req.swagger.params, res, next);
};

module.exports.getUserFollower = function getUserFollower (req, res, next) {
  Social.getUserFollower(req.swagger.params, res, next);
};

module.exports.getUserFollowing = function getUserFollowing (req, res, next) {
  Social.getUserFollowing(req.swagger.params, res, next);
};

module.exports.postComment = function postComment (req, res, next) {
  Social.postComment(req.swagger.params, res, next);
};

module.exports.unfollowUser = function unfollowUser (req, res, next) {
  Social.unfollowUser(req.swagger.params, res, next);
};
