'use strict'
const pkgName = 'ui' // eslint-disable-line no-unused-vars

const config = require('./config')
const store = require('./store')
const util = require('./util')

/*
** displaySuccessFail() - calls logMessage and updates the HTML (based on id)
**                    with a message.
**    params: message
**            isSuccessful - flag indicating success or failure
**    returns: nothing
*/
const displaySuccessFail = (method, message, isSuccessful, object) => {
  let displayClass
  if (isSuccessful) {
    displayClass = 'success'
  } else {
    displayClass = 'failure'
  }

  util.logMessage(method, message, object)
  $(config.successFailMessageId).removeClass()
  $(config.successFailMessageId).text(message)
  $(config.successFailMessageId).addClass(displayClass)
  $(config.formId).trigger('reset')
  setTimeout(() => $(config.successFailMessageId).text(''), config.messageDelay)
}

/*
** ***** Sign Up functions *****
*/
const onSignUpSuccess = responseData => {
  displaySuccessFail(`${pkgName}.onSignUpSuccess()`, 'Signed up successfully! Please sign in to play.', true, responseData)

  // Hide sign-in forms
  $('#sign-up').addClass('hidden')
  $('#sign-in').children('h3').text('Please sign in to play!')
}

const onSignUpFailure = responseData => {
  displaySuccessFail(`${pkgName}.onSignUpFailure()`, 'Signed up failed.', false, responseData)
}

/*
** ***** Sign In functions *****
*/
const onSignInSuccess = responseData => {
  displaySuccessFail(`${pkgName}.onSignInSuccess()`, 'Signed in successfully!', true, responseData)
  store.user = responseData.user
  store.user.cellValues = ['X', 'O'] // TODO: Replace this array with images that can be used

  // Hide sign-up/sign-in forms
  $('#sign-up').addClass('hidden')
  $('#sign-in').addClass('hidden')

  // Expose board and other elements
  $('#update').removeClass('hidden')
  $('#scoreboard').removeClass('hidden')
  $('#actions').removeClass('hidden')
  $('#show').removeClass('hidden')
  $('#change-pw').removeClass('hidden')
  $('#sign-out').removeClass('hidden')
}

const onSignInFailure = responseData => {
  displaySuccessFail(`${pkgName}.onSignInFailure()`, 'Signed in failed. Have you signed up yet?', false, responseData)
}

/*
** ***** Change PW functions *****
*/
const onChangePasswordSuccess = responseData => {
  displaySuccessFail(`${pkgName}.onChangePasswordSuccess()`, 'Password changed successfully!', true, responseData)
}

const onChangePasswordFailure = responseData => {
  displaySuccessFail(`${pkgName}.onChangePasswordFailure()`, 'Change password failed.', false, responseData)
}

/*
** ***** Sign out functions *****
*/
const onSignOutSuccess = responseData => {
  // TODO - Having this code here is ugly, as we're just doing the same thing as in game.initializeBoard().
  //        The common code should be moved to a common file.
  $('.cell').toArray().forEach((element) => {
    util.logMessage(`${pkgName}.onSignOutSuccess()`, 'Emptying contents of', $(element).attr('id'))
    $(element).text('')
  })

  displaySuccessFail(`${pkgName}.onSignOutSuccess()`, 'Goodbye!', true, responseData)

  // Hide board and other elements
  $('#update').addClass('hidden')
  $('#scoreboard').addClass('hidden')
  $('#actions').addClass('hidden')
  $('#show').addClass('hidden')
  $('#change-pw').addClass('hidden')
  $('#sign-out').addClass('hidden')
  $('form.results').html('')
  $('#games-played').text('')
  $('#games-over').text('')

  // Show sign-up/sign-in forms
  $('#sign-up').removeClass('hidden')
  $('#sign-in').removeClass('hidden')
}

const onSignOutFailure = responseData => {
  displaySuccessFail(`${pkgName}.onSignOutFailure()`, 'Sign out failed.', false, responseData)
}

/*
** ***** New game functions *****
*/
const onNewGameSuccess = responseData => {
  displaySuccessFail(`${pkgName}.onNewGameSuccess()`, 'Let\'s play!', true, responseData)
  store.user.currentGame = responseData
  store.user.currentGameTurns = 0
  store.user.currentGameUser = 0
  store.user.isClickable = true
  store.user.currentGameisDraw = false
}

const onNewGameFailure = responseData => {
  displaySuccessFail(`${pkgName}.onNewGameFailure()`, 'Oops! Please try again.', false, responseData)
}

/*
** ***** Update cell functions *****
*/
const onUpdateCellSuccess = responseData => {
  displaySuccessFail(`${pkgName}.onUpdateCellSuccess()`, '', true, responseData)
  const currCell = store.user.currentGameActiveCell
  store.user.currentGame = responseData
  store.user.currentGameTurns += 1

  // Allow clicks on cells now.
  store.user.isClickable = true

  // NOTE: Update the cell div BEFORE we update the current game user!!
  const textVal = store.user.cellValues[store.user.currentGameUser]
  $('#' + currCell).text(textVal)
  store.user.currentGameUser = store.user.currentGameTurns % 2

  // Perform some actions if the game is a draw or is won.
  if (store.user.currentGame.game.over) {
    if (store.user.currentGameisDraw) {
      onGameDraw()
    } else {
      onGameWin()
    }
  }
}

const onUpdateCellFailure = responseData => {
  displaySuccessFail(`${pkgName}.onUpdateCellFailure()`, 'Weird... Cell couldn\'t be updated. Try again.', false, '')

  // Allow clicks on cells now.
  store.user.isClickable = true
}

/*
** ***** Index functions *****
*/
const onIndexSuccess = responseData => {
  displaySuccessFail(`${pkgName}.onIndexSuccess()`, 'Games retrieved - please see your results below.', true, responseData)

  // Append list items to unordered list
  const gamesArr = responseData.games
  const gamesPlayed = gamesArr.length
  let gamesOpen = 0
  $('form.results').html('')
  let addClass = ''
  for (let i = 0; i < gamesArr.length; i++) {
    const id = gamesArr[i].id
    const isOver = gamesArr[i].over
    util.logMessage(`${pkgName}.onIndexSuccess()`, `Game: ${id}, over: ${isOver}`, '')
    if (isOver) {
      addClass = ' class=\'game\''
    } else {
      addClass = ' class=\'game notover\''
      gamesOpen++
    }

    const resultHTML = `<div${addClass}>Game ${id}</div>`
    $('form.results').append(resultHTML)
  }

  $('#games-played').text(`Games Played: ${gamesPlayed}`)
  $('#games-over').text(`Games Open: ${gamesOpen}`)
}

const onIndexFailure = responseData => {
  displaySuccessFail(`${pkgName}.onIndexFailure()`, 'Oops! Games could not be retrieved. Please try again.', false, '')
}

/*
** ***** Show functions *****
*/
const onShowSuccess = responseData => {
  displaySuccessFail(`${pkgName}.onShowSuccess()`, 'Game retrieved - your board has been repopulated.', true, responseData)
  store.user.currentGame = responseData
  store.user.isClickable = true

  // This is a bit of a kluge, but I couldn't think of any other way.
  const thisGame = store.user.currentGame.game
  store.user.currentGameisDraw = false
  let oCnt = 0
  let xCnt = 0

  thisGame.cells.forEach((element) => {
    if (element === 'O') {
      oCnt++
    } else if (element === 'X') {
      xCnt++
    }
  })

  // Set some state variables (this is also kind of a kluge)
  if (xCnt - oCnt === 0) {
    store.user.currentGameTurns = 0
    store.user.currentGameUser = 0
  } else {
    store.user.currentGameTurns = 1
    store.user.currentGameUser = 1
  }

  thisGame.cells.forEach((element, idx) => {
    $('#cell-id-' + idx).text(element)
  })

  util.logMessage(`${pkgName}.onShowSuccess()`, 'currentGameisDraw = ', store.user.currentGameisDraw)
}

const onShowFailure = responseData => {
  displaySuccessFail(`${pkgName}.onShowFailure()`, 'Oops! Game could not be retrieved. Please try again.', false, '')
}

/*
** ***** Game finished functions *****
*/
const onGameWin = () => {
  displaySuccessFail(`${pkgName}.onGameWin()`, 'CONGRATULATIONS! You won the game!', true, '')
}

const onGameDraw = () => {
  displaySuccessFail(`${pkgName}.onGameDraw()`, 'Oh, well, the game is a draw. Please play again!', true, '')
}

module.exports = {
  displaySuccessFail,
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onNewGameSuccess,
  onNewGameFailure,
  onUpdateCellSuccess,
  onUpdateCellFailure,
  onIndexSuccess,
  onIndexFailure,
  onShowSuccess,
  onShowFailure
}
