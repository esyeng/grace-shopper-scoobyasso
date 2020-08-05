/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Address = db.model('address')

describe('Address routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/address/', () => {
    let randomPlace
    beforeEach(async () => {
      randomPlace = await Address.create({
        firstName: 'Bob',
        lastName: 'Ross',
        streetAddress: '75 Happy Accident Blvd',
        city: 'Paradise Villa',
        country: 'United States',
        zipcode: 11111
      })
    })

    it('gets all Addresses in an array', async () => {
      const res = await request(app)
        .get('/api/address')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].firstName).to.be.equal('Bob')
    })
    it('returns Address by id', async () => {
      const res = await request(app)
        .get('/api/address/1')
        .expect(200)
      const data = randomPlace.dataValues.city
      expect(res.body.city).to.be.equal(data)
    })
  }) // end describe('/api/Addresss')
}) // end describe('User routes')
