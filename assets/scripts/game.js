'use strict'
const pkgName = 'game' // eslint-disable-line no-unused-vars

const api = require('./api')
const store = require('./store')
const ui = require('./ui')
const util = require('./util')

const newBoard = (event) => {
  util.logMessage(`${pkgName}.newBoard()`, event, '')
  store.user.currentGame = {}

  api.createBoard(event)
    .then(ui.onNewGameSuccess)
    .catch(ui.onNewGameFailure)

  if (store.user.currentGame) {
    initializeBoard()
  }
}

const initializeBoard = () => {
  util.logMessage(`${pkgName}.initializeBoard()`, '', '')
  $('.cell').toArray().forEach((element) => {
    util.logMessage(`${pkgName}.initializeBoard()`, 'Emptying contents of', $(element).attr('id'))
    $(element).text('')
  })
}

module.exports = {
  newBoard,
  initializeBoard
}
