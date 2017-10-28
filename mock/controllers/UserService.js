'use strict';

exports.createUser = function(args, res, next) {
  /**
   * Create user
   * 管理员用户创建新用户
   *
   * body User Created user object (Ignore id)
   * no response value expected for this operation
   **/
  res.end();
}

exports.deleteUser = function(args, res, next) {
  /**
   * Delete user
   * This can only be done by the admin user.
   *
   * id Integer
   * no response value expected for this operation
   **/
  res.end();
}

exports.getUser = function(args, res, next) {
  /**
   * Get user by query
   * 搜索用户
   *
   * name String User name regex (optional)
   * group Long User group id (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = require('../data/users.json');
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getUserByName = function(args, res, next) {
  /**
   * Get user by user name
   *
   *
   * id Integer
   * returns User
   **/
  var examples = {};
  examples['application/json'] = {
  "firstName" : "aeiou",
  "lastName" : "aeiou",
  "image" : "aeiou",
  "password" : "aeiou",
  "phone" : "aeiou",
  "groups" : [ {
    "name" : "aeiou",
    "id" : 6
  } ],
  "id" : 0,
  "email" : "aeiou",
  "username" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.loginUser = function(args, res, next) {
  /**
   * Logs user into the system
   *
   *
   * username String The user name for login
   * password String The password for login in clear text
   * returns String
   **/
  var examples = {};
  examples['application/json'] = "aeiou";
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.logoutUser = function(args, res, next) {
  /**
   * Logs out current logged in user session
   *
   *
   * no response value expected for this operation
   **/
  res.end();
}

exports.signupUser = function(args, res, next) {
  /**
   * Signup user
   * 游客自助注册用户
   *
   * body Body
   * no response value expected for this operation
   **/
  res.end();
}

exports.updateUser = function(args, res, next) {
  /**
   * Updated user
   * This can only be done by the logged in user.
   *
   * id Integer
   * body User Updated user object
   * no response value expected for this operation
   **/
  res.end();
}

