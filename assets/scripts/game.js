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
  const whoAmI = `${pkgName}.updateCell()`
  util.logMessage(whoAmI, 'ID = ' + cellId, '')

  if (canCellBeClicked(cellId)) {
    let isOver = false
    const gameId = store.user.currentGame.game.id
    const val = store.user.cellValues[store.user.currentGameTurns % 2]

    // Check to see if we would have a draw on the next update
    isOver = isGameDraw(cellId)
    util.logMessage(whoAmI, 'IS GAME A DRAW = ' + isOver, '', '')

    // If the game isn't a draw, check to see if it would be won with the next update.
    if (!isOver) {
      isOver = isGameWon(cellId)
    }
    util.logMessage(whoAmI, 'IS GAME OVER = ' + isOver, '', '')

    store.user.isClickable = false
    api.update(gameId, cellId, val, isOver)
      .then(ui.onUpdateCellSuccess)
      .catch(ui.onUpdateCellFailure)
  }
}

/*
**  checkCell() - checks to see if cell has already been clicked
*/
const canCellBeClicked = (cellId) => {
  util.logMessage(`${pkgName}.canCellBeClicked()`, 'ID = ' + cellId, '')

  // Spit an error if user clicking way too fast for AJAX call.
  if (store.user.isClickable !== undefined && !store.user.isClickable) {
    ui.displaySuccessFail(`${pkgName}.canCellBeClicked()`, 'Please wait...', false, '')
    return false
  }

  if (store.user.currentGame === undefined) {
    // Spit error if no game has been started
    ui.displaySuccessFail(`${pkgName}.canCellBeClicked()`, 'Please start a new game or open an old game!', false, '')
    return false
  } else {
    // Spit error message if game is over.
    if (store.user.currentGame.game.over) {
      ui.displaySuccessFail(`${pkgName}.canCellBeClicked()`, 'Game completed! Please start a new game.', false, '')
      return false
    }
  }

  // Spit error message if user tries to click an occupied cell.
  if (store.user.currentGame.game.cells[cellId] !== '') {
    ui.displaySuccessFail(`${pkgName}.canCellBeClicked()`, 'Cell clicked! Please choose another cell.', false, '')
    return false
  }

  return true
}

/*
** isGameDraw() - check to see if the game would end in a draw
*/
const isGameDraw = (cellId) => {
  const whoAmI = `${pkgName}.isGameWon()`
  const gameCells = store.user.currentGame.game.cells
  const cellVal = store.user.cellValues[store.user.currentGameUser]
  const newGameCells = []
  let retVal = false
  let cnt = 0

  // Here, we populate the new temporary game cells to check.
  // If the proceeding update is successful, this will be the new array.
  gameCells.forEach((elem) => newGameCells.push(elem))
  util.logMessage(whoAmI, 'Game cells before = ' + newGameCells, '', '')
  newGameCells[cellId] = cellVal
  util.logMessage(whoAmI, 'Game cells after = ' + newGameCells, '', '')

  newGameCells.forEach((element) => {
    if (element === '') {
      cnt++
    }
    util.logMessage(whoAmI, 'Element = ' + element + ', Count = ' + cnt, '', '')
  })

  if (cnt === 0) {
    store.user.currentGameisDraw = true
    retVal = true
  }

  return retVal
}

/*
** isGameWon() - check to see if the game has been won with most recent click
*/
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

  // Comment these out - a little too much info
  // util.logMessage(whoAmI, 'Row arr = ' + rowArr, '', '')
  // util.logMessage(whoAmI, 'Col arr = ' + colArr, '', '')
  // util.logMessage(whoAmI, 'Diag1 = ' + diagArr1, '', '')
  // util.logMessage(whoAmI, 'Diag2 = ' + diagArr2, '', '')

  // If any one of the array contains all of the current cell value,
  // the user has won the game
  const checkVal = (element) => {
    return cellVal === element
  }

  if (rowArr.every(checkVal)) { return true }
  if (colArr.every(checkVal)) { return true }
  if (useDiag1 && diagArr1.every(checkVal)) { return true }
  if (useDiag2 && diagArr2.every(checkVal)) { return true }

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
