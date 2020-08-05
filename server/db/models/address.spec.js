const {expect} = require('chai')
const db = require('../index')
const {Sequelize} = require('sequelize')
const Address = db.model('address')
const faker = require('faker')
const {address} = require('faker')
const {before} = require('mocha')
const User = require('./user')

function randomNum(min, max) {
  return Math.floor(min + (max - min) * Math.random())
}

describe('Address model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('Valid fields', () => {
    let randomPlace
    beforeEach(async () => {
      try {
        randomPlace = await Address.create({
          firstName: 'Bob',
          lastName: 'Ross',
          streetAddress: '75 Happy Accident Blvd',
          city: 'Paradise Villa',
          country: 'United States',
          zipcode: 11111
        })
      } catch (error) {
        console.error(error)
      }
    })
    it('contains valid fields for first and last name, city, street address, country, and zip code', () => {
      expect(randomPlace.firstName).to.be.equal('Bob')
      expect(randomPlace.lastName).to.be.equal('Ross')
      expect(randomPlace.streetAddress).to.equal('75 Happy Accident Blvd')
      expect(randomPlace.city).to.be.equal('Paradise Villa')
      expect(randomPlace.country).to.be.equal('United States')
      expect(randomPlace.zipcode).to.be.equal(11111)
    })
  })
}) // end describe("valid fields")
describe('seed file', () => {
  it('seeds with fake data', () => {
    const getRandomAddress = number => {
      let addresses = []
      for (let i = 0; i < number; i++) {
        let randomAddress = {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          streetAddress: faker.address.streetAddress(),

          city: faker.address.city(),
          country: faker.address.country(),
          zipcode: parseInt(faker.address.zipCode())
        }
        addresses.push(randomAddress)
      }
      return addresses
    }
    beforeEach(() => {
      const addresses = getRandomAddress(40)
      addresses.forEach(async address => {
        await Address.create(address)
      })
      expect(addresses.length).to.be.equal(40)
    })
  })
  // end describe("seed file")
}) // end describe("Product model")
