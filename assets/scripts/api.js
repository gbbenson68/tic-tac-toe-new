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

/*
** create()
**    parameter: event
**    returns: response from AJAX request
*/
const create = (event) => {
  util.logMessage(`${pkgName}.create()`, event, '')

  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    data: {},
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

/*
** update()
**    parameter: cell id
**    returns: response from AJAX request
*/
const update = (gameId, cellId, val, isOver) => {
  util.logMessage(`${pkgName}.update()`, `Game ID = ${gameId}, Cell ID = ${cellId}, value = ${val}`, '')
  util.logMessage(`${pkgName}.update()`, 'Token = ' + store.user.token)

  return $.ajax({
    url: config.apiUrl + '/games' + `/${gameId}`,
    method: 'PATCH',
    data: {
      game: {
        cell: {
          index: cellId,
          value: val
        },
        over: isOver
      }
    },
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

/*
** index() - gets list of games
*/
const index = (isOver) => {
  let urlToUse
  if (isOver === true) {
    urlToUse = config.apiUrl + '/games?over=true'
  } else if (isOver === false) {
    urlToUse = config.apiUrl + '/games?over=false'
  } else {
    urlToUse = config.apiUrl + '/games'
  }
  util.logMessage(`${pkgName}.index()`, `URL: ${urlToUse}`, '')

  return $.ajax({
    url: urlToUse,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

/*
** show() - retrieves information for game
*/
const show = (id) => {
  util.logMessage(`${pkgName}.show()`, `ID = ${id}`, '')
  return $.ajax({
    url: config.apiUrl + `/examples/${id}`,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  create,
  update,
  index,
  show
}
