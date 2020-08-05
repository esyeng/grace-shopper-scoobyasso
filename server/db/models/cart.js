const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  total: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  products: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  }
})

module.exports = Cart
