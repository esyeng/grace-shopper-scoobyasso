const router = require('express').Router()
const {Order, OrderList, Product} = require('../db/models')
module.exports = router

// GET /Cart >>> guest cart

// router.get('/:sessionId', async (req, res, next) => {
//   try {
//     const cart = await Cart.findByPk(req.params.sessionId)
//     res.json(cart)
//   } catch (err) {
//     next(err)
//   }
// })

// GET /Carts >>> user cart

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId
      },
      include: [OrderList]
    })
    if (!cart) res.status(404).json('NOT FOUND')
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
