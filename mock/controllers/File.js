'use strict';

var url = require('url');

var File = require('./FileService');

module.exports.createFile = function createFile (req, res, next) {
  File.createFile(req.swagger.params, res, next);
};

module.exports.deleteFile = function deleteFile (req, res, next) {
  File.deleteFile(req.swagger.params, res, next);
};

module.exports.downloadFile = function downloadFile (req, res, next) {
  File.downloadFile(req.swagger.params, res, next);
};

module.exports.getFileById = function getFileById (req, res, next) {
  File.getFileById(req.swagger.params, res, next);
};

module.exports.getFiles = function getFiles (req, res, next) {
  File.getFiles(req.swagger.params, res, next);
};

module.exports.updateFiles = function updateFiles (req, res, next) {
  File.updateFiles(req.swagger.params, res, next);
};

module.exports.uploadFile = function uploadFile (req, res, next) {
  File.uploadFile(req.swagger.params, res, next);
};
