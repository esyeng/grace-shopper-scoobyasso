const router = require('express').Router()
const {Address} = require('../db/models')
module.exports = router

// GET /products >>> all products
router.get('/', async (req, res, next) => {
  try {
    const addresses = await Address.findAll()
    res.json(addresses)
  } catch (err) {
    next(err)
  }
})

// GET /addresses >>> one by id
router.get('/:addressId', async (req, res, next) => {
  try {
    const address = await Address.findByPk(req.params.addressId)
    res.json(address)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
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
