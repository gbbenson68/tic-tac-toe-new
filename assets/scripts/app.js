'use strict'
const pkgName = 'app' // eslint-disable-line no-unused-vars

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const events = require('./events')

$(() => {
  // On submit of sign up
  $('#sign-up').children('form').on('submit', events.onSignUp)

  // On submit of sign in
  $('#sign-in').children('form').on('submit', events.onSignIn)

  // On change of password
  $('#change-pw').children('form').on('submit', events.onChangePassword)

  // On sign out
  $('#sign-out').children('form').on('submit', events.onSignOut)

  // On creation of a new game
  $('#new-game').children('form').on('submit', events.onNewGame)

  // Get all games
  $('#index').children('form').on('submit', events.onIndexAll)

  // Get all open games
  $('#index-open').children('form').on('submit', events.onIndexOpen)

  // Get one game
  $('#show').children('form').on('submit', events.onShow)

  // For each cell, handle a click.
  $('.cell').on('click', events.onCellClick)

  // For any listed game
  $('.game').on('click', events.onGameButtonClick)
})
