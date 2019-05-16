'use strict'
const pkgName = 'api' // eslint-disable-line no-unused-vars

const config = require('./config')
const store = require('./store')
const util = require('./util')

/*
** signUp()
**    parameter: formData
**    returns: response from AJAX request
*/
const signUp = (formData) => {
  const whoAmI = `${pkgName}.signUp()`
  util.logMessage(whoAmI, formData, '')

  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: formData
  })
}

/*
** signIn()
**    parameter: formData
**    returns: response from AJAX request
*/
const signIn = (formData) => {
  const whoAmI = `${pkgName}.signIn()`
  util.logMessage(whoAmI, formData, '')

  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data: formData
  })
}

const signOut = () => {
  const whoAmI = `${pkgName}.signOut()`
  util.logMessage(whoAmI, '', '')

  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  signOut
}
