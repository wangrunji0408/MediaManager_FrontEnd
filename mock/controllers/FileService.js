'use strict';

exports.createFile = function(args, res, next) {
  /**
   * Create file or directory
   * 新建空白文件或文件夹
   *
   * body Body_1
   * no response value expected for this operation
   **/
  res.end();
}

exports.deleteFile = function(args, res, next) {
  /**
   * Delete file or directory
   *
   *
   * id String File id
   * no response value expected for this operation
   **/
  console.log('delete file  ....');
  res.end();
}

exports.getFileById = function(args, res, next) {
  /**
   * Get file info by Id
   * Used for searching files
   *
   * id String File id
   * returns File
   **/
  var examples = {};
  examples['application/json'] = {
  "path" : "aeiou",
  "size" : 0,
  "modifyDate" : "2000-01-23T04:56:07.000+00:00",
  "name" : "aeiou",
  "id" : "aeiou",
  "thumbnails" : "aeiou",
  "url" : "aeiou",
  "isDir" : true,
  "md5" : "aeiou",
  "createDate" : "2000-01-23T04:56:07.000+00:00",
  "tags" : [ {
    "color" : "aeiou",
    "name" : "aeiou",
    "id" : 6
  } ]
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getFiles = function(args, res, next) {
  /**
   * Get file infos by query
   * Used for searching files
   *
   * path String File path. Regex. (optional)
   * name String File name. Regex. (optional)
   * tags List File tags (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "path" : "aeiou",
  "size" : 0,
  "modifyDate" : "2000-01-23T04:56:07.000+00:00",
  "name" : "aeiou",
  "id" : "aeiou",
  "thumbnails" : "aeiou",
  "url" : "aeiou",
  "isDir" : true,
  "md5" : "aeiou",
  "createDate" : "2000-01-23T04:56:07.000+00:00",
  "tags" : [ {
    "color" : "aeiou",
    "name" : "aeiou",
    "id" : 6
  } ]
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.updateFiles = function(args, res, next) {
  /**
   * Do some commands on files.
   * 这个接口用于对一些文件进行一些操作。  对每个文件， id 属性外   通过提供对应属性的新值来指示进行哪些操作：  * 重命名 name   * 移动位置 path   * 修改标签 tags    后端需逐条判断是否有值，是否变化，然后进行操作。对其它属性的修改均无效。  若全部操作成功，则返回200。否则返回400，描述每个失败操作。
   *
   * body List Updated file object
   * no response value expected for this operation
   **/
  res.end();
}

exports.uploadFile = function(args, res, next) {
  /**
   * Upload file
   * 上传文件
   *
   * file File The file to upload. (optional)
   * path String Base path (optional)
   * returns File
   **/
  var examples = {};
  examples['application/json'] = {
  "path" : "aeiou",
  "size" : 0,
  "modifyDate" : "2000-01-23T04:56:07.000+00:00",
  "name" : "aeiou",
  "id" : "aeiou",
  "thumbnails" : "aeiou",
  "url" : "aeiou",
  "isDir" : true,
  "md5" : "aeiou",
  "createDate" : "2000-01-23T04:56:07.000+00:00",
  "tags" : [ {
    "color" : "aeiou",
    "name" : "aeiou",
    "id" : 6
  } ]
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

