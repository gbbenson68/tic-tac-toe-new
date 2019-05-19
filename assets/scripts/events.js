'use strict'
const pkgName = 'events' // eslint-disable-line no-unused-vars

const api = require('./api')
const game = require('./game')
const getFormFields = require('../../lib/get-form-fields')
const store = require('./store')
const ui = require('./ui')
const util = require('./util')

/*
** onSignUp()
**    parameter: event
**    returns: nothing
*/
const onSignUp = (event) => {
  const whoAmI = `${pkgName}.onSignUp()`
  event.preventDefault()
  util.logMessage(whoAmI, '', '')

  const form = event.target
  const formData = getFormFields(form)
  util.logMessage(whoAmI, formData, '')

  api.signUp(formData)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

/*
** onSignIn()
**    parameter: event
**    returns: nothing
*/
const onSignIn = (event) => {
  const whoAmI = `${pkgName}.onSignIn()`
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)
  util.logMessage(whoAmI, formData, '')

  api.signIn(formData)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

/*
** onChangePassword()
**    parameter: event
**    returns: nothing
*/
const onChangePassword = (event) => {
  const whoAmI = `${pkgName}.onChangePassword()`
  event.preventDefault()

  if (store.user === undefined) {
    ui.displaySuccessFail(whoAmI, 'Oops! Please sign in to change password.', false, '')
  } else {
    const form = event.target
    const formData = getFormFields(form)
    util.logMessage(whoAmI, store, formData)

    api.changePassword(formData)
      .then(ui.onChangePasswordSuccess)
      .catch(ui.onChangePasswordFailure)
  }
}

/*
** onSignOut()
**    parameter: event
**    returns: nothing
*/
const onSignOut = (event) => {
  const whoAmI = `${pkgName}.onSignOut()`
  event.preventDefault()

  if (store.user === undefined) {
    ui.displaySuccessFail(whoAmI, 'Oops! You must be signed in to sign out.', false, '')
  } else {
    const form = event.target
    const formData = getFormFields(form)
    util.logMessage(whoAmI, store, formData)

    api.signOut(formData)
      .then(ui.onSignOutSuccess)
      .catch(ui.onSignOutFailure)
  }
}

/*
** onNewGame()
*/
const onNewGame = (event) => {
  const whoAmI = `${pkgName}.onNewGame()`
  event.preventDefault()

  if (store.user === undefined) {
    ui.displaySuccessFail(whoAmI, 'Oops! You must be signed in to play.', false, '')
  } else {
    game.newBoard(event)
  }
}

/*
** onIndexAll() - this just wraps onIndex() but passes no argument
*/
const onIndexAll = () => {
  event.preventDefault()
  onIndex()
}

/*
** onIndexOpen() - this just wraps onIndex() but passes an argument
*/
const onIndexOpen = () => {
  event.preventDefault()
  onIndex(false)
}

/*
** onIndex()
*/
const onIndex = (queryVal) => {
  const whoAmI = `${pkgName}.onIndex()`
  util.logMessage(whoAmI, '', '')

  if (store.user === undefined) {
    ui.displaySuccessFail(whoAmI, 'Oops! You must be signed in to get a list of your games.', false, '')
  } else {
    api.index(queryVal)
      .then(ui.onIndexSuccess)
      .catch(ui.onIndexFailure)
  }
}

/*
** onShow()
*/
const onShow = (event) => {
  const whoAmI = `${pkgName}.onShow()`
  event.preventDefault()
  util.logMessage(whoAmI, '', '')

  if (store.user === undefined) {
    ui.displaySuccessFail(whoAmI, 'Oops! You must be signed in to retrieve a game.', false, '')
  } else {
    const form = event.target
    const formData = getFormFields(form)
    util.logMessage(whoAmI, formData, '')

    api.show(formData.game.id)
      .then(ui.onShowSuccess)
      .catch(ui.onShowFailure)
  }
}

/*
** onCellClick()
**    parameter: event
**    returns: nothing
*/
const onCellClick = (event) => {
  util.logMessage(`${pkgName}.onCellClick()`, 'ID = ' + event.target.id, '')
  event.preventDefault()
  store.user.currentGameActiveCell = event.target.id
  const cellId = util.getIntId(event.target.id)
  game.updateCell(cellId)
}

const onGameButtonClick = (event) => {
  event.preventDefault()
  util.logMessage(`${pkgName}.onGameButtonClick()`, event.target, '')
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onNewGame,
  onIndexAll,
  onIndexOpen,
  onShow,
  onCellClick,
  onGameButtonClick
}
