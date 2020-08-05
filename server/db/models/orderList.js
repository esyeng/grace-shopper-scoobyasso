const Sequelize = require('sequelize')
const db = require('../db')

const OrderList = db.define('orderList', {
  quantity: {
    type: Sequelize.INTEGER
  }
  // unitPrice: {
  //   // etc
  // }
})

module.exports = OrderList

/**
* ex {
  orderId: 3,
  products: [],
  quantity: {
    item1: 3
  }
}
*/
