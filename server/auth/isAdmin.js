const express = require('express')
const passport = require('passport')

const isAdmin = (req, res, next) => {
  const currentUser = req.user
  if (currentUser && currentUser.isAdmin) {
    return true
  } else {
    const error = new Error('Access denied.')
    error.status = 401
    next(error)
  }
}
module.exports = isAdmin
