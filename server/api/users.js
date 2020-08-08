const router = require('express').Router()
const {User} = require('../db/models')
const isAdmin = require('../auth/isAdmin')
const isUser = require('../auth/isUser')
const {session} = require('passport')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    if (req.user) {
      if (!isAdmin(req)) {
        res.send('Access denied.')
      } else {
        res.json(users)
      }
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', isUser, async (req, res, next) => {
  try {
    const thisUser = await User.findByPk(req.params.userId)
    const {firstName, lastName, email, id} = thisUser
    if (req.params.userId === thisUser.id || isAdmin(req.user)) {
      res.json({
        firstName: firstName,
        lastName: lastName,
        email: email
      })
    } else {
      res.json({
        email: email,
        id: id
      })
    }
  } catch (err) {
    next(err)
  }
})

/**
 * goals for Users router :
 * -- Check admin at route level? => who is sending the request? what should the response be? √
 * -- Post route √
 * -- Delete route
 * -- Update route (put)
 */

// PUT /users/id >>> update user info
router.put('/:userId', isUser, async (req, res, next) => {
  try {
    if (req.params.userId === thisUser.id || isAdmin(req.user)) {
      const user = await User.findByPk(req.params.userId)
      await user.update({
        where: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email
        }
      })
      res.status(204).json(user)
    }
  } catch (err) {
    next(err)
  }
})

// DELETE /users/id >>> delete user from db
router.delete('/:userId', isUser, async (req, res, next) => {
  try {
    if (req.params.userId === thisUser.id || isAdmin(req.user)) {
      const user = await User.findByPk(req.params.userId)
      await User.destroy(user)
      res.send('Account successfully erased')
    }
  } catch (err) {
    next(err)
  }
})
