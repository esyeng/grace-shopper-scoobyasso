const router = require('express').Router()
const {Product} = require('../db/models')
const isUser = require('../auth/isUser')
module.exports = router

// SCOOBYASSO PRODUCT EXPRESS API ==>
/**********************************/
/**
 * -- Get all products
 * -- Get single product
 *
 * -- Same thing for the update route, with the exception that we find or create a new order instance in case the logged in user has not stored any items in their current empty cart. We then eager load the dependent models to alter their contents as per authorized request
 *
 * -- in order to delete the products in the cart, we use the product id to fetch the correct order. Since we don't want to eliminate the product entirely, all this route does is sever the tie between the product's id and the connection to the user's orderlist instance of the product. Work in progress, might need some tweaks
 *
 *
 */

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

/*
router.post("/") >>> create product as a vendor or admin
*/

/* this will be for editing as a vendor or admin

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
*/

// delete product as vendor or admin

// router.delete('/:productId', isUser, async (req, res, next) => {
//   try {
//     if (isUser(req.user)) {
//       const order = await OrderList.findOne(req.params.productId)
//       if (order.productId === req.params.productId) {
//         this.productId = null
//       }
//       res.json(order)
//     }
//   } catch (err) {
//     next(err)
//   }
// })
