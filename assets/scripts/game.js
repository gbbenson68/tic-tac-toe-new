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
  isGameWon(cellId) ? console.log('YOU\'VE WON!') : console.log('Continue...')
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
  const whoAmI = `${pkgName}.isGameWon()`
  const gameCells = store.user.currentGame.game.cells
  const cellVal = store.user.cellValues[store.user.currentGameUser]
  const newGameCells = []

  // Here, we populate the new temporary game cells to check.
  // If the proceeding update is successful, this will be the new array.
  gameCells.forEach((elem) => newGameCells.push(elem))
  util.logMessage(whoAmI, 'Game cells before = ' + newGameCells, '', '')
  newGameCells[cellId] = cellVal
  util.logMessage(whoAmI, 'Game cells after = ' + newGameCells, '', '')

  // Hard-code the dimension to 3, which is assumed in the problem itself.
  // Q: Will we ever have a Tic Tac Toe game with square size > 3 to a side?
  const dimension = 3

  /*
  ** NOTE: We don't have to check the ENTIRE array, every time. We ONLY need to
  **       check the given "row" for completion or "column" for completion, and
  **       if the value is on a "diagonal," check the diagonals (BOTH of them)!!
  */

  const rowArr = []
  const colArr = []
  const diagArr1 = []
  const diagArr2 = []
  let useDiag1 = false
  let useDiag2 = false

  const i = cellId % dimension // This is the COLUMN index
  const j = Math.floor(cellId / dimension) // This is the ROW index

  // Do we use diagonals?
  if (cellId % 4 === 0) {
    useDiag1 = true
  }
  if (cellId % 2 === 0 && cellId !== 0 && cellId !== 8) {
    useDiag2 = true
  }

  newGameCells.forEach((element, index) => {
    const m = index % dimension
    const n = Math.floor(index / dimension)

    // Populate affected column
    if (m === i) {
      colArr.push(element)
    }

    // Populate affected row
    if (n === j) {
      rowArr.push(element)
    }

    // Here, we're using the fact that we know we have nine elements, meaning
    // that the diagonals only have EVEN indices.
    if (useDiag1) {
      if (index % 4 === 0) {
        diagArr1.push(element)
      }
    }

    if (useDiag2) {
      if (index % 2 === 0 && index !== 0 && index !== 8) {
        diagArr2.push(element)
      }
    }
  })

  util.logMessage(whoAmI, 'Row arr = ' + rowArr, '', '')
  util.logMessage(whoAmI, 'Col arr = ' + colArr, '', '')
  util.logMessage(whoAmI, 'Diag1 = ' + diagArr1, '', '')
  util.logMessage(whoAmI, 'Diag2 = ' + diagArr2, '', '')

  // If any one of the array contains all of the current cell value,
  // the user has won the game
  if (rowArr.every(elem => elem === cellVal)) { return true }
  if (colArr.every(elem => elem === cellVal)) { return true }
  if (diagArr1.every(elem => elem === cellVal)) { return true }
  if (diagArr2.every(elem => elem === cellVal)) { return true }

  // If we've done eveything right, we should never get here.
  // If we haven't return false
  return false
}

module.exports = {
  newBoard,
  initializeBoard,
  updateCell,
  canCellBeClicked
}
