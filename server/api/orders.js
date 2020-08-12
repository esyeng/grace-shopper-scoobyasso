const router = require('express').Router()
const {Order, OrderList, Product, Address} = require('../db/models')
const isUser = require('../auth/isUser')

function randomNum(min, max) {
  return Math.floor(min + (max - min) * Math.random())
}
//checkout from PLACEORDER THUNK
router.put('/checkout', isUser, async (req, res, next) => {
  try {
    const {city, zip, state, street, country} = req.body.address
    const {id, firstName, lastName} = req.body.user

    const newAddress = await Address.create({
      firstName: firstName,
      lastName: lastName,
      streetAddress: street,
      city: city,
      state: state,
      country: country,
      zipcode: zip,
      userId: id
    })

    const addressId = newAddress.id

    const order = await Order.update(
      {
        isCart: false,
        trackingNumber: randomNum(1000, 10000000),
        addressId: addressId,
        isComplete: true
      },

      {
        returning: true,
        where: {
          userId: id,
          isCart: true
        }
      }
    )
    const [rowsUpdated, [completedOrder]] = order
    // console.log(updatedOrder)
    await Order.create({
      userId: id
    })
    res.status(200).json({
      message: 'Checked out',
      completedOrder
    })
  } catch (error) {
    next(error)
  }
})

// GET /Orders >>> all Orders
router.get('/:userId', isUser, async (req, res, next) => {
  try {
    console.log('running get ORDERS ROUTE')
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
        isCart: false
      }
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
