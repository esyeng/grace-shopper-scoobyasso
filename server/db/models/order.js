const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  trackingNumber: {
    type: Sequelize.STRING
  },
  orderTotal: {
    type: Sequelize.INTEGER
  },
  isComplete: {
    type: Sequelize.BOOLEAN
  },
  toBeCompleted: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Order
