'use strict'
const pkgName = 'events' // eslint-disable-line no-unused-vars

const api = require('./api')
const ui = require('./api')
const util = require('./util')
const getFormFields = require('../../lib/get-form-fields')

/*
** onSignUp()
**    parameter: event
**    returns: nothing
*/
const onSignUp = (event) => {
  const whoAmI = `${pkgName}.onSignUp()`
  event.preventDefault()

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
    .then(() => console.log('Success!'))
    .catch(() => console.log('Failed!'))
}

/*
** onChangePassword()
**    parameter: event
**    returns: nothing
*/
const onChangePassword = (event) => {
  const whoAmI = `${pkgName}.onChangePassword()`
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)
  util.logMessage(whoAmI, formData, '')
}

/*
** onSignOut()
**    parameter: event
**    returns: nothing
*/
const onSignOut = (event) => {
  const whoAmI = `${pkgName}.onSignOut()`
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)
  util.logMessage(whoAmI, formData, '')

  api.signOut(formData)
    .then(() => console.log('Success!'))
    .catch(() => console.log('Failed!'))
}

/*
** onCellClick()
**    parameter: event
**    returns: nothing
*/
const onCellClick = (event) => {
  const whoAmI = `${pkgName}.onCellClick()`
  event.preventDefault()

  const cell = event.target
  const id = util.getIntId(cell.id)

  util.logMessage(whoAmI, 'ID = ' + id, '')
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onCellClick
}
