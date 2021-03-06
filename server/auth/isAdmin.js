const express = require('express')
const passport = require('passport')

const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const error = new Error('Denied.')
    error.status = 401
    next(error)
  }
}
module.exports = isAdminMiddleware
