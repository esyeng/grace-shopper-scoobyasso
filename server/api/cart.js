const router = require('express').Router()
const {Order, OrderList, Product} = require('../db/models')
const isUser = require('../auth/isUser')

module.exports = router

// SCOOBYASSO CART EXPRESS API ==>
/**********************************/
/**
 * -- First, we check to see if a user is logged in with a valid account --
 *
 *
 * -- If the user is logged in, we find their order through the user's id association we pull in the list of products.
 *
 * -- Same thing for the update route, with the exception that we find or create a new order instance in case the logged in user has not stored any items in their current empty cart. We then eager load the dependent models to alter their contents as per authorized request
 *
 * -- in order to delete the products in the cart, we use the product id to fetch the correct order. Since we don't want to eliminate the product entirely, all this route does is sever the tie between the product's id and the connection to the user's orderlist instance of the product. Work in progress, might need some tweaks
 *
 *
 */

router.get('/guest', async (req, res, next) => {
  try {
    if (!req.session.cart) {
      req.session.cart = []
    }
    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})

router.put('/guest', async (req, res, next) => {
  try {
    const product = req.body.product
    const modification = req.body.operation
    if (!req.session.cart) {
      req.session.cart = []
    }

    if (modification === 'addToCart') {
      let existed = false
      req.session.cart.map(item => {
        if (item.id === product.id) {
          item.quantity += 1
          existed = true
        }
        return item
      })
      if (!existed) {
        req.session.cart.push(product)
      }
      res.json(req.session.cart)
    }

    if (modification === 'removeFromCart') {
      let index
      req.session.cart.map((item, idx) => {
        if (item.id === product.id) {
          index = idx
        }
        return item
      })
      req.session.cart.splice(index, 1)
      res.json(req.session.cart)
    }

    if (modification === 'decrease') {
      req.session.cart.map(item => {
        if (item.id === product.id && item.quantity > 1) {
          item.quantity -= 1
        }
        return item
      })
      res.json(req.session.cart)
    }

    if (modification === 'increase') {
      req.session.cart.map(item => {
        if (item.id === product.id) {
          item.quantity += 1
        }
        return item
      })
      res.json(req.session.cart)
    }
  } catch (error) {
    next(error)
  }
})

// GET /api/cart/userId >>> guest/user cart
router.get('/:userId', isUser, async (req, res, next) => {
  try {
    const cartId = await Order.findOne({
      where: {
        userId: req.params.userId
      },
      attributes: ['id']
    })
    const dbCart = await OrderList.findAll({
      where: {
        orderId: cartId.id
      },
      include: Product
    })
    let userCart = []
    dbCart.map(item => {
      userCart.push({
        artCategoryId: item.product.artCategoryId,
        description: item.product.description,
        id: item.product.id,
        imageUrl: item.product.imageUrl,
        inventory: item.product.inventory,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      })
    })
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})

// PUT /api/cart/userId >>> edit the order instance if the user is associated. Update the quantity and total

router.put('/:userId', isUser, async (req, res, next) => {
  try {
    let operation = req.body.operation
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        isCart: true
      },
      attributes: ['id']
    })
    const cartItem = await OrderList.findOne({
      where: {
        orderId: order.id,
        productId: req.body.product.id
      }
    })
    if (!cartItem) {
      const newCartItem = await OrderList.create({
        orderId: order.id,
        productId: req.body.product.id,
        quantity: req.body.product.quantity,
        unitPrice: req.body.product.price,
        totalPrice: req.body.product.price
      })
    } else {
      if (operation === 'increase') {
        await cartItem.update({
          quantity: cartItem.quantity + 1,
          totalPrice: cartItem.totalPrice + cartItem.unitPrice
        })
      }
      if (operation === 'decrease') {
        await cartItem.update({
          quantity: cartItem.quantity - 1,
          totalPrice: cartItem.totalPrice - cartItem.unitPrice
        })
      }
      if (operation === 'removeFromCart') {
        await cartItem.destroy()
      }
    }

    const updatedCart = await OrderList.findAll({
      where: {
        orderId: order.id
      },
      include: Product
    })

    let updatedUserCart = []
    updatedCart.map(item => {
      updatedUserCart.push({
        artCategoryId: item.product.artCategoryId,
        description: item.product.description,
        id: item.product.id,
        imageUrl: item.product.imageUrl,
        inventory: item.product.inventory,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      })
    })
    res.json(updatedUserCart)

    // if (!cart || req.params.userId !== cart.userId) {
    //   res.status(404).json('NOT FOUND')
  } catch (err) {
    next(err)
  }
})

// DELETE /api/cart/productId >>> delete instance of Product in Order

router.delete('/:productId', isUser, async (req, res, next) => {
  try {
    if (isUser(req.user)) {
      const listToEdit = await OrderList.findOne({
        where: {
          userId: req.params.userId
        },
        include: {
          model: Order,
          include: Product
        }
      })
      const productToRemove = await Product.findByPk(req.params.productId)
      if (listToEdit.productId === req.params.productId) {
        await listToEdit.destroy(productToRemove)
        res.status(202).send('item removed')
      }
    }
  } catch (err) {
    next(err)
  }
})
