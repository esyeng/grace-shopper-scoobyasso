const router = require('express').Router()
const {User} = require('../db/models')
const isAdminMiddleware = require('../auth/isAdmin')
module.exports = router

router.get('/', isAdminMiddleware, async (req, res, next) => {
  try {
    if (req.user) {
      if (isAdminMiddleware(req)) {
        res.send('No access')
      } else {
        const users = await User.findAll({
          attributes: ['id', 'email']
        })
        res.json(users)
      }
    }
    next()
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const thisUser = await User.findByOne({
      where: {
        id: req.params.userId
      },
      attributes: [firstName, lastName, email]
    })
    res.json(thisUser)
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

router.post('/', async (req, res, next) => {
  try {
    const {firstName, lastName, email} = req.body
    const newUser = await User.create({
      firstName,
      lastName,
      email
    })
    console.log(newUser)
    res.json(newUser)
  } catch (err) {
    console.log('sign up failed')
  }
})
