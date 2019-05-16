'use strict'
const pkgName = 'util' // eslint-disable-line no-unused-vars

const config = require('./config')

/*
** getIntId()
**    param: cellIdStr - of form 'cell-id-<int>'
**    returns: integer value
*/
const getIntId = (cellIdStr) => {
  const idArr = cellIdStr.split('-')
  return idArr[idArr.length - 1]
}

/*
** logMessage() - logs a message to the console ONLY in development.
**    params: method name
**            message to be logged
**    returns: nothing
*/
const logMessage = (method, message, object) => {
  if (config.isNotProd) {
    console.log(`IN: ${method}: `, message, object)
  }
}

module.exports = {
  getIntId,
  logMessage
}
