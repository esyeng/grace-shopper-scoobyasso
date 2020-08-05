const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  trackingNumber: {
    type: Sequelize.STRING
  },
  total: {
    type: Sequelize.INTEGER
  },
  orderStatus: {
    type: Sequelize.STRING
  },
  orderItems: {
    type: Sequelize.JSON
  }
})

module.exports = Order
