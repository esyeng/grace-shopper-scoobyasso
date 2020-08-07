const router = require('express').Router()
const {Order, OrderList, Product} = require('../db/models')

const User = require('../db/models/user')
const isUser = require('../auth/isUser')

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

router.post('/addToCart', async (req, res, next) => {
  try {
    console.log(req.body)

    res.send()
  } catch (error) {
    next(error)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId
      },
      include: {
        model: OrderList,
        include: Product
      }
    })
    if (!cart) res.status(404).json('NOT FOUND')
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', isUser, async (req, res, next) => {
  try {
    if (isUser(req.user)) {
      const cart = await Order.findOrCreate({
        where: {
          userId: req.params.userId
        },
        include: {
          model: OrderList,
          include: Product
        }
      })
      if (!cart) res.status(404).json('NOT FOUND')
      res.json(cart)
    } else next()
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', isUser, async (req, res, next) => {
  try {
    if (isUser(req.user)) {
      const order = await OrderList.findOne(req.params.productId)
      if (order.productId === req.params.productId) {
        this.productId = null
      }
      res.json(order)
    }
  } catch (err) {
    next(err)
  }
})
