'use strict';

var url = require('url');

var Group = require('./GroupService');

module.exports.createUserGroup = function createUserGroup (req, res, next) {
  Group.createUserGroup(req.swagger.params, res, next);
};

module.exports.deleteUserGroup = function deleteUserGroup (req, res, next) {
  Group.deleteUserGroup(req.swagger.params, res, next);
};

module.exports.getUserGroupById = function getUserGroupById (req, res, next) {
  Group.getUserGroupById(req.swagger.params, res, next);
};

module.exports.getUserGroups = function getUserGroups (req, res, next) {
  Group.getUserGroups(req.swagger.params, res, next);
};

module.exports.updateUserGroup = function updateUserGroup (req, res, next) {
  Group.updateUserGroup(req.swagger.params, res, next);
};
