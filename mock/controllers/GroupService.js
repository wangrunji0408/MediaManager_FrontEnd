'use strict';

exports.createUserGroup = function(args, res, next) {
  /**
   * Create group
   * 管理员用户创建新用户组
   *
   * body UserGroup Created user group
   * no response value expected for this operation
   **/
  res.end();
}

exports.deleteUserGroup = function(args, res, next) {
  /**
   * Delete user group
   * 删除用户组，同时删除组内用户的标记
   *
   * id Long 
   * no response value expected for this operation
   **/
  res.end();
}

exports.getUserGroupById = function(args, res, next) {
  /**
   * Get group by id
   * 
   *
   * id Long 
   * returns UserGroup
   **/
  var examples = {};
  examples['application/json'] = {
  "name" : "aeiou",
  "id" : 0
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getUserGroups = function(args, res, next) {
  /**
   * Get all user groups
   * 
   *
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "name" : "aeiou",
  "id" : 0
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.updateUserGroup = function(args, res, next) {
  /**
   * Updated group
   *
   * id Long 
   * body UserGroup Updated group object
   * no response value expected for this operation
   **/
  res.end();
}

