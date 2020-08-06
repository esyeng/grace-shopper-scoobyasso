const Sequelize = require('sequelize')
const db = require('../db')

const ArtCategory = db.define('artCategory', {
  name: {
    type: Sequelize.STRING,
    defaultValue: 'Some Art'
  }
})

module.exports = ArtCategory
