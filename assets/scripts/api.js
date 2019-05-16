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
  util.logMessage(`${pkgName}.signUp()`, formData, '')

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
  util.logMessage(`${pkgName}.signIn()`, formData, '')

  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data: formData
  })
}

/*
** changePassword()
**    parameter: formData
**    returns:  response from AJAX request
*/
const changePassword = (formData) => {
  util.logMessage(`${pkgName}.changePassword()`, formData, '')

  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    data: formData,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

/*
** signOut()
**    parameter: none
**    returns: response from AJAX request
*/
const signOut = () => {
  util.logMessage(`${pkgName}.signOut()`, '', '')

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
  signOut,
  changePassword
}
