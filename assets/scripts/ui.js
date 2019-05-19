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

// Sign Up functions
const onSignUpSuccess = responseData => {
  displaySuccessFail(`${pkgName}.onSignUpSuccess()`, 'Signed up successfully! Please sign in to play.', true, responseData)
}

const onSignUpFailure = responseData => {
  displaySuccessFail(`${pkgName}.onSignUpFailure()`, 'Signed up failed.', false, responseData)
}

// Sign In functions
const onSignInSuccess = responseData => {
  displaySuccessFail(`${pkgName}.onSignInSuccess()`, 'Signed in successfully!', true, responseData)
  store.user = responseData.user
  store.user.cellValues = ['X', 'O'] // TODO: Replace this array with images that can be used
}

const onSignInFailure = responseData => {
  displaySuccessFail(`${pkgName}.onSignInFailure()`, 'Signed in failed.', false, responseData)
}

// Change PW functions
const onChangePasswordSuccess = responseData => {
  displaySuccessFail(`${pkgName}.onChangePasswordSuccess()`, 'Password changed successfully!', true, responseData)
}

const onChangePasswordFailure = responseData => {
  displaySuccessFail(`${pkgName}.onChangePasswordFailure()`, 'Change password failed.', false, responseData)
}

// Sign out functions
const onSignOutSuccess = responseData => {
  // TODO - Having this code here is ugly, as we're just doing the same thing as in game.initializeBoard().
  //        The common code should be moved to a common file.
  $('.cell').toArray().forEach((element) => {
    util.logMessage(`${pkgName}.onSignOutSuccess()`, 'Emptying contents of', $(element).attr('id'))
    $(element).text('')
  })

  displaySuccessFail(`${pkgName}.onSignOutSuccess()`, 'Goodbye!', true, responseData)
}

const onSignOutFailure = responseData => {
  displaySuccessFail(`${pkgName}.onSignOutFailure()`, 'Sign out failed.', false, responseData)
}

// New game functions
const onNewGameSuccess = responseData => {
  displaySuccessFail(`${pkgName}.onNewGameSuccess()`, 'Let\'s play!', true, responseData)
  store.user.currentGame = responseData
  store.user.currentGameTurns = 0
  store.user.currentGameUser = 0
}

const onNewGameFailure = responseData => {
  displaySuccessFail(`${pkgName}.onNewGameFailure()`, 'Oops! Please try again.', false, responseData)
}

// Update cell functions
const onUpdateCellSuccess = responseData => {
  displaySuccessFail(`${pkgName}.onUpdateCellSuccess()`, '', true, responseData)
  const currCell = store.user.currentGameActiveCell
  store.user.currentGame = responseData
  store.user.currentGameTurns += 1

  // NOTE: Update the cell div BEFORE we update the current game user!!
  const textVal = store.user.cellValues[store.user.currentGameUser]
  $('#' + currCell).text(textVal)
  store.user.currentGameUser = store.user.currentGameTurns % 2

  if (store.user.currentGame.game.over) { onGameWin() }
}

const onUpdateCellFailure = responseData => {
  displaySuccessFail(`${pkgName}.onUpdateCellFailure()`, 'Weird... Cell couldn\'t be updated. Try again.', false, '')
}

const onIndexSuccess = responseData => {
  displaySuccessFail(`${pkgName}.onIndexSuccess()`, 'Games retrieved - please see your results below.', true, responseData)

  // Append list items to unordered list
  responseData.games.forEach((element) => {
    util.logMessage(`${pkgName}.onIndexSuccess()`, `Game: ${element.id}`, '')
  })
}

const onIndexFailure = responseData => {
  displaySuccessFail(`${pkgName}.onIndexFailure()`, 'Oops! Games could not be retrieved. Please try again.', false, '')
}

const onShowSuccess = responseData => {
  displaySuccessFail(`${pkgName}.onShowSuccess()`, 'Games retrieved - your board has been repopulated.', true, responseData)
}

const onShowFailure = responseData => {
  displaySuccessFail(`${pkgName}.onShowFailure()`, 'Oops! Game could not be retrieved. Please try again.', false, '')
}

const onGameWin = () => {
  console.log('YOU HAVE WON THE GAME!!!')
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
  onShowFailure,
  onGameWin
}
