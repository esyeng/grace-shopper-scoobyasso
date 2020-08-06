const User = require('./user')
const Product = require('./product')
const Address = require('./address')
const OrderList = require('./orderList')
const Order = require('./order')
const Cart = require('./cart')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
/**
 * ASSOCIATIONS
 */

// ADDRESS -->

User.hasOne(Address)
Address.belongsTo(User)

// ORDER --> Many to Many through OrderItems
User.hasMany(Order) // Users have many orders (orderId)
Order.belongsTo(User) // Order belongs to user (userId)

// PRODUCTS -->
Product.belongsToMany(Order, {through: 'OrderList'})
Order.hasMany(Order)

// ORDERLIST -->
// OrderList.hasMany(Product, {as: 'orderItem'}) // OrderList has many products (as orderItems)
// OrderList.hasOne(Cart)

module.exports = {
  User,
  Product,
  Address,
  Cart,
  OrderList,
  Order
}
