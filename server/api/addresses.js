const router = require('express').Router()
const {Address} = require('../db/models')
const isAdmin = require('../auth/isAdmin')
const isUser = require('../auth/isUser')
// const isVednor = require('./auth')
module.exports = router

// GET /products >>> all products
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const addresses = await Address.findAll()
    res.json(addresses)
  } catch (err) {
    next(err)
  }
})

// GET /addresses >>> one by id
router.get('/:addressId', isUser, async (req, res, next) => {
  try {
    const address = await Address.findByPk(req.params.addressId)
    res.json(address)
  } catch (err) {
    next(err)
  }
})

router.post('/', isUser, async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      streetAddress,
      city,
      country,
      zipcode
    } = req.body
    const newAddress = await Address.create({
      firstName,
      lastName,
      streetAddress,
      city,
      country,
      zipcode
    })
    res.json(newAddress)
  } catch (err) {
    next(err)
  }
})
