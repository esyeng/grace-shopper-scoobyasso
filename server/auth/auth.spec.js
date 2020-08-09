const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {getMaxListeners} = require('../index')
const User = db.model('user')

describe('Signup/Login routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  let res
  describe('/auth/', () => {
    beforeEach(async () => {
      res = await request(app)
        .post('/auth/signup')
        .send({
          firstName: 'Peter',
          lastName: 'Petersky',
          email: 'petekonchalsky@gmail.com',
          password: '12345'
        })
    })
    it('/auth/signup', async () => {
      expect(res.body.firstName).to.equal('Peter')
      expect(res.body.isAdmin).to.equal(false)
      expect(typeof res.body.id).to.equal('number')
    })
    it('/auth/login', async () => {
      res = await request(app)
        .post('/auth/login')
        .send({
          email: 'chelseathebest@gmail.com',
          password: 'chelsethebestsalt'
        })
      expect(res.text).to.equal('Wrong username and/or password')
    })
  })
})
