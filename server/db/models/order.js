const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  trackingNumber: {
    type: Sequelize.STRING
  },
  orderTotal: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  isComplete: {
    type: Sequelize.BOOLEAN
  },
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Order
