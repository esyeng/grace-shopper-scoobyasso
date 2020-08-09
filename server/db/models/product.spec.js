const {expect} = require('chai')
const db = require('../index')
const {Sequelize} = require('sequelize')
const Product = db.model('product')
const faker = require('faker')

function randomNum(min, max) {
  return Math.floor(min + (max - min) * Math.random())
}

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('Valid fields', () => {
    let vanGogh
    beforeEach(async () => {
      vanGogh = await Product.create({
        name: 'Starry Night',
        description: 'You know what it is.',
        imageUrl:
          'https://imgc.artprintimages.com/img/print/starry-night-c-1889_u-l-f25nmn0.jpg?h=550&p=0&w=550&background=fbfbfb',
        price: 1000
      })
    })
    it('contains valid fields for a name, description, price, category, and image', () => {
      expect(vanGogh.name).to.be.equal('Starry Night')
      expect(vanGogh.description).to.be.equal('You know what it is.')
      expect(vanGogh.price).to.equal(1000)
      expect(vanGogh.imageUrl).to.be.equal(
        'https://imgc.artprintimages.com/img/print/starry-night-c-1889_u-l-f25nmn0.jpg?h=550&p=0&w=550&background=fbfbfb'
      )
    })
    it('seeds the database with products', () => {
      expect(vanGogh).to.be.instanceOf(Product)
    })
  })
}) // end describe("valid fields")
describe('seed file', () => {
  it('seeds with fake data', () => {
    const getRandomProducts = number => {
      let products = []
      for (let i = 0; i < number; i++) {
        let randomProduct = {
          name: faker.commerce.productName(),
          description: faker.lorem.paragraph(),
          imageUrl: faker.random.image(),
          price: randomNum(1, 2000),
          category: faker.commerce.product()
        }
        products.push(randomProduct)
      }
      return products
    }
    beforeEach(() => {
      const prods = getRandomProducts(20)
      prods.forEach(async prod => {
        await Product.create(prod)
      })
      expect(prods.length).to.be.equal(20)
    })
  }) // end describe("seed file")
}) // end describe("Product model")
