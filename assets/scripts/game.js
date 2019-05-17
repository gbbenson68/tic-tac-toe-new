'use strict'
const pkgName = 'game' // eslint-disable-line no-unused-vars

const api = require('./api')
const store = require('./store')
const ui = require('./ui')
const util = require('./util')

/*
** newBoard() - attempts to create a new board
*/
const newBoard = (event) => {
  util.logMessage(`${pkgName}.newBoard()`, event, '')
  store.user.currentGame = {}

  api.create(event)
    .then(ui.onNewGameSuccess)
    .catch(ui.onNewGameFailure)

  if (store.user.currentGame) {
    initializeBoard()
  }
}

/*
** initializeBoard() - Initializes board with blank text
*/
const initializeBoard = () => {
  util.logMessage(`${pkgName}.initializeBoard()`, '', '')
  $('.cell').toArray().forEach((element) => {
    util.logMessage(`${pkgName}.initializeBoard()`, 'Emptying contents of', $(element).attr('id'))
    $(element).text('')
  })
}

/*
** updateCell() - updates the cell of a board
*/
const updateCell = (cellId) => {
  util.logMessage(`${pkgName}.updateCell()`, 'ID = ' + cellId, '')
  let val
  const gameId = store.user.currentGame.game.id

  if (!canCellBeClicked(cellId)) { return }

  if (store.user.currentGameState < 2) {
    if (store.user.currentGameTurns % 2 === 0) {
      val = 'x'
    } else {
      val = 'o'
    }
    api.update(gameId, cellId, val)
      .then(ui.onUpdateCellSuccess)
      .catch(ui.onUpdateCellFailure)
  } else {
    ui.displaySuccessFail(`${pkgName}.updateCell()`, 'Game completed! Please start a new game.', false, '')
  }
}

/*
**  checkCell() - checks to see if cell has already been clicked
*/
const canCellBeClicked = (cellId) => {
  util.logMessage(`${pkgName}.canCellBeClicked()`, 'ID = ' + cellId, '')
  if (store.user.currentGame.game.cells[cellId] !== '') {
    ui.displaySuccessFail(`${pkgName}.canCellBeClicked()`, 'Cell clicked! Please choose another cell.', false, '')
    return false
  }

  return true
}

module.exports = {
  newBoard,
  initializeBoard,
  updateCell,
  canCellBeClicked
}
