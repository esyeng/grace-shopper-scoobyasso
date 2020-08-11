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
  },
  shipAddress: {
    type: Sequelize.INTEGER
  },
  billAddress: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order
