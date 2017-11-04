'use strict';

var url = require('url');

var User = require('./UserService');

module.exports.changeUserPassword = function changeUserPassword (req, res, next) {
  User.changeUserPassword(req.swagger.params, res, next);
};

module.exports.createUser = function createUser (req, res, next) {
  User.createUser(req.swagger.params, res, next);
};

module.exports.deleteUser = function deleteUser (req, res, next) {
  User.deleteUser(req.swagger.params, res, next);
};

module.exports.getUser = function getUser (req, res, next) {
  User.getUser(req.swagger.params, res, next);
};

module.exports.getUserAvatar = function getUserAvatar (req, res, next) {
  User.getUserAvatar(req.swagger.params, res, next);
};

module.exports.getUserByName = function getUserByName (req, res, next) {
  User.getUserByName(req.swagger.params, res, next);
};

module.exports.loginUser = function loginUser (req, res, next) {
  User.loginUser(req.swagger.params, res, next);
};

module.exports.logoutUser = function logoutUser (req, res, next) {
  User.logoutUser(req.swagger.params, res, next);
};

module.exports.signupUser = function signupUser (req, res, next) {
  User.signupUser(req.swagger.params, res, next);
};

module.exports.updateUser = function updateUser (req, res, next) {
  User.updateUser(req.swagger.params, res, next);
};

module.exports.uploadUserAvatar = function uploadUserAvatar (req, res, next) {
  User.uploadUserAvatar(req.swagger.params, res, next);
};
