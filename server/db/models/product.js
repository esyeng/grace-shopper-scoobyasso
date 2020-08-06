const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://www.bandg.com/assets/img/default-product-img.png?w=400&h=225&scale=both&mode=max'
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: Infinity
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: Infinity
    },
    defaultValue: 5
  }
})

module.exports = Product
