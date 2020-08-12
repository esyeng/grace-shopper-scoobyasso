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
        state: 'NY',
        country: 'United States',
        zipcode: 11111
      })
    })

    it('gets deny response without admin access', async () => {
      const res = await request(app)
        .get('/api/address')
        .expect(401)
      console.log(res)
      expect(res.text).to.equal('Denied.')
    })
  }) // end describe('/api/Addresss')
}) // end describe('User routes')
