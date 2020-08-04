/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    let randomItem
    beforeEach(async () => {
      randomItem = await Product.create({
        name: 'Licensed Metal Cheese',
        description:
          'Sit ut amet earum aut ad aut quo. Alias et fugit molestiae ut est vel quasi. Ullam ad laboriosam. Quaerat expedita pariatur possimus voluptatem. Autem dolores sint animi iste enim aut sit corporis ullam.',
        imageUrl: 'http://lorempixel.com/640/480/city',
        price: 952.57,
        category: 'Computer'
      })
    })

    it('gets all products in an array', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Licensed Metal Cheese')
    })
    it('returns product by id', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)
      const data = randomItem.dataValues.name
      expect(res.body.name).to.be.equal(data)
    })
  }) // end describe('/api/products')
}) // end describe('User routes')
