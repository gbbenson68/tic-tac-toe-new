'use strict'
const pkgName = 'ui' // eslint-disable-line no-unused-vars

const config = require('./config')
const util = require('./util')
const store = require('./store')

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
  setTimeout(() => $(config.successFailMessageId).text(''), 5000)
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
  displaySuccessFail(`${pkgName}.onSignOutSuccess()`, 'Goodbye!', true, responseData)
}

const onSignOutFailure = responseData => {
  displaySuccessFail(`${pkgName}.onSignOutFailure()`, 'Sign out failed.', false, responseData)
}

// New game functions
const onNewGameSuccess = responseData => {
  displaySuccessFail(`${pkgName}.onNewGameSuccess()`, 'Let\'s play!', true, responseData)
  store.user.currentGame = responseData
  store.user.currentGameState = 0
  store.user.currentGameTurns = 0
  store.user.currentGameUser = 0
}

const onNewGameFailure = responseData => {
  displaySuccessFail(`${pkgName}.onNewGameFailure()`, 'Oops! Please try again.', false, responseData)
}

// UPdate cell functions
const onUpdateCellSuccess = responseData => {
  displaySuccessFail(`${pkgName}.onUpdateCellSuccess()`, '', true, responseData)
  const valArr = ['X', 'O']
  const currCell = store.user.currentGameActiveCell
  store.user.currentGame = responseData
  store.user.currentGameTurns += 1
  $('#' + currCell).text(valArr[store.user.currentGameUser])
  store.user.currentGameUser = store.user.currentGameTurns % 2
}

const onUpdateCellFailure = responseData => {
  displaySuccessFail(`${pkgName}.onUpdateCellFailure()`, 'Weird... Cell couldn\'t be updated. Try again.', false, '')
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
  onUpdateCellFailure
}
