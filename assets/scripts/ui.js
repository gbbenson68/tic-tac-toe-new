'use strict'
const pkgName = 'ui' // eslint-disable-line no-unused-vars

const config = require('./config')
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
  setTimeout(() => $(config.successFailMessageId).text(''), 5000)
}

// Sign UP functions
/*
const onSignUpSuccess = (responseData) => {
  const whoAmI = `${pkgName}.onSignUpSuccess()`
  const message = 'Sign-up successful!'

  console.log(message)
  //util.logMessage(whoAmI, message, responseData)
  //displaySuccessFail(whoAmI, message, true)
}

const onSignUpFailure = (responseData) => {
  const whoAmI = `${pkgName}.onSignUpFailure()`
  const message = 'Sign-up failed. Please try again with a different email.'

  console.log(message)
  //util.logMessage(whoAmI, message, responseData)
  //displaySuccessFail(whoAmI, message, false)
}
*/
const onSignUpSuccess = responseData => {
  console.log('IN: ui.onSignUpSuccess()...')
  console.log('Signed up successfully', responseData)
  $('#message').text('Signed up successfully!')
  $('#message').removeClass()
  $('#message').addClass('success')
  setTimeout(() => $('#message').text(''), 5000)
}

const onSignUpFailure = responseData => {
  console.log('IN: ui.onSignUpFailure()...')
  console.log('Sign up failed', responseData)
  $('#message').text('Sign up failed.')
  $('#message').removeClass()
  $('#message').addClass('failure')
  setTimeout(() => $('#message').text(''), 5000)
}

module.exports = {
  displaySuccessFail,
  onSignUpSuccess,
  onSignUpFailure
}
