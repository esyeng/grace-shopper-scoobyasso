const router = require('express').Router()
const {Order, OrderList, Product} = require('../db/models')
const isUser = require('../auth/isUser')

function randomNum(min, max) {
  return Math.floor(min + (max - min) * Math.random())
}
//checkout from PLACEORDER THUNK
router.put('/checkout', isUser, async (req, res, next) => {
  try {
    const order = await Order.update(
      {isCart: false, trackingNumber: randomNum(1000, 10000000)},
      {
        returning: true,
        where: {
          userId: req.body.user.id,
          isCart: true
        }
      }
    )
    const [rowsUpdated, [updatedOrder]] = order
    console.log(updatedOrder)
    const newUserCart = await Order.create({
      userId: req.body.user.id
    })
    res.status(200).json({
      message: 'Checked out',
      updatedOrder
    })
  } catch (error) {
    next(error)
  }
})

// GET /Orders >>> all Orders
router.get('/:userId', isUser, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
        isCart: false
      },
      include: [OrderList]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// // GET /Orders >>> one by id
// router.get('/:orderId', async (req, res, next) => {
//   try {
//     const order = await Order.findByPk(req.params.orderId)
//     res.json(order)
//   } catch (err) {
//     next(err)
//   }
// })

// router.post('/:userId', async (req, res, next) => {
//   try {
//     //
//   } catch (err) {
//     //
//   }
// })

// router.put('/:orderId', async (req, res, next) => {
//   try {
//     //
//   } catch (err) {
//     //
//   }
// })

// router.delete('/:orderId', async (req, res, next) => {
//   try {
//     //
//   } catch (err) {
//     //
//   }
// })

module.exports = router
