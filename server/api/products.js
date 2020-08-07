const router = require('express').Router()
const {Product} = require('../db/models')
const isUser = require('../auth/isUser')
module.exports = router

// GET /products >>> all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET /products >>> one by id
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
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
