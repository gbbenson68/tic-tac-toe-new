'use strict'

// NOTE: These link directly to the HTML!! If that value changes, this value
//       must be updated!!
const successFailMessageId = '#message'
const formId = '.form'
const messageDelay = 20000

let apiUrl
const apiUrls = {
  // NOTE: Don't forget to leave off any trailing forward slashes!!
  development: 'https://tic-tac-toe-wdi.herokuapp.com',
  production: 'https://tic-tac-toe-wdi-production.herokuapp.com'
}

let isNotProd
const prodFlag = {
  production: false,
  development: true
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
  isNotProd = prodFlag.development
} else {
  apiUrl = apiUrls.production
  isNotProd = prodFlag.production
}

module.exports = {
  successFailMessageId,
  messageDelay,
  formId,
  apiUrl,
  isNotProd
}
