const express = require('express')
const passport = require('passport')

const isUser = (req, res, next) => {
  const currentUser = req.user
  if (currentUser && !currentUser.isAdmin) {
    return next()
  } else {
    const error = new Error('No account found, sign up today!')
    error.status = 401
    next(error)
  }
}
module.exports = isUser
