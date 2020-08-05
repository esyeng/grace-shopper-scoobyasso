const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

// GET /Cart >>> guest cart

router.get('/:sessionId', async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.sessionId)
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// GET /Carts >>> user cart

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.userId)
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
