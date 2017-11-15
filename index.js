/*
 * fis3-postprocessor-standard
 * fisker Cheung<lionkay@gmail.com>
 */

'use strict'

var standard = require('standard')
var log = (global.fis && fis.log) || console

module.exports = function(content, file, conf) {
  delete conf.filename

  content = content.replace(/\n\s+$/, '')

  try {
    content = standard.lintTextSync(content, {fix: true}).results[0].output
  } catch (err) {
    log.error(err)
    process.exit(1)
  }

  return content
}

module.exports.defaultOptions = {

}
