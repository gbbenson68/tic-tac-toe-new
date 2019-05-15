'use strict'
const pkgName = 'config' // eslint-disable-line no-unused-vars

let apiUrl
const apiUrls = {
  development: 'https://tic-tac-toe-wdi.herokuapp.com/',
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
  apiUrl,
  isNotProd
}
