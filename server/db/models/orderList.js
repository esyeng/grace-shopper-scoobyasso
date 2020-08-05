const Sequelize = require('sequelize')
const db = require('../db')

const OrderList = db.define('orderList', {
  total: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderList
