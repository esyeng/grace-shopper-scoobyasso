//api/orders
const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

// GET /Orders >>> all Orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// GET /Orders >>> one by id
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    //
  } catch (err) {
    //
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    //
  } catch (err) {
    //
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    //
  } catch (err) {
    //
  }
})
