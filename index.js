/*
 * fis3-postprocessor-html
 * fisker Cheung<lionkay@gmail.com>
 */

'use strict';

var prettier = require('prettier');
var syncPromise = require('promise-synchronizer');
var log = (global.fis && fis.log) || console;
var assign = Object.assign ||require('object.assign');

var rcConfig = (function getConfigFromFile() {
  var config;
  syncPromise(prettier.resolveConfig('prettier').then(function(data) {
    config = data;
  }));
  return config;
})();

module.exports = function(content, file, conf){
  delete conf.filename;
  content = prettier.format(content, assign({}, rcConfig, conf));

  // remove inline file final newline
  if (file.cache.isInline) {
    content.replace(/\s*$/, '');
  }
  return content;
};


module.exports.defaultOptions = {};

