/*
 * fis3-postprocessor-html
 * fisker Cheung<lionkay@gmail.com>
 */

'use strict'

var prettier = require('prettier')
var log = (global.fis && fis.log) || console
var assign = Object.assign || require('object.assign')

var rcConfig = prettier.resolveConfig.sync('prettier')

module.exports = function(content, file, conf) {
  delete conf.filename
  content = prettier.format(content, assign({}, rcConfig, conf))

  // remove inline file final newline
  if (file.cache.isInline) {
    content.replace(/\s*$/, '')
  }
  return content
}

module.exports.defaultOptions = {}
