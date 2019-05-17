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
  const gameId = store.user.currentGame.game.id

  if (canCellBeClicked(cellId)) {
    const val = store.user.cellValues[store.user.currentGameTurns % 2]
    api.update(gameId, cellId, val)
      .then(ui.onUpdateCellSuccess)
      .catch(ui.onUpdateCellFailure)
  }
}

/*
**  checkCell() - checks to see if cell has already been clicked
*/
const canCellBeClicked = (cellId) => {
  util.logMessage(`${pkgName}.canCellBeClicked()`, 'ID = ' + cellId, '')

  // ******** THIS IS TEMPORARY TO CHECK CODE FUNCTIONALITY
  isGameWon()
  // ********

  // Spit error message if user tries to click an occupied cell.
  if (store.user.currentGame.game.cells[cellId] !== '') {
    ui.displaySuccessFail(`${pkgName}.canCellBeClicked()`, 'Cell clicked! Please choose another cell.', false, '')
    return false
  }

  // Spit error message if game is over.
  if (store.user.currentGame.game.over) {
    ui.displaySuccessFail(`${pkgName}.canCellBeClicked()`, 'Game completed! Please start a new game.', false, '')
    return false
  }

  return true
}

const isGameWon = (cellId) => {
  const gameCells = store.user.currentGame.game.cells
  const gameIsWon = false
  // Hard-code the dimension to 3, which is assumed in the problem itself.
  // Q: Will we ever have a Tic Tac Toe game with square size > 3 to a side?
  const dimension = 3

  /*
  ** NOTE: We don't have to check the ENTIRE array, every time. We ONLY need to
  **       check the given "row" for completion or "column" for completion, and
  **       if the value is on a "diagonal," check the diagonals (BOTH of them)!!
  */

  return gameIsWon
}

module.exports = {
  newBoard,
  initializeBoard,
  updateCell,
  canCellBeClicked
}
