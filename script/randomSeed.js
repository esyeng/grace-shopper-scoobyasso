const db = require('../server/db')
let faker = require('faker')
const {green, red} = require('chalk')
const {User, Product} = require('../server/db/models')

function randomFloat(min, max) {
  return Math.round(min + (max - min) * Math.random() * 100) / 100
}
function randomNum(min, max) {
  return Math.floor(min + (max - min) * Math.random())
}

const getRandomUsers = num => {
  let users = []
  for (let i = 0; i < num; i++) {
    let randomUser = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password()
    }
    users.push(randomUser)
  }
  return users
}

const getRandomProducts = num => {
  let products = []
  for (let i = 0; i < num; i++) {
    let randomProduct = {
      name: faker.commerce.productName(),
      description: faker.lorem.sentences(),
      imageUrl: faker.random.image(),
      price: randomNum(1, 2000),
      category: faker.commerce.product()
    }
    products.push(randomProduct)
  }
  return products
}

const seed = async () => {
  try {
    await db.sync({force: true})
    await Promise.all(
      getRandomUsers(100).map(user => {
        return User.create(user)
      })
    ).then(() =>
      Promise.all(
        getRandomProducts(100).map(product => {
          return Product.create(product)
        })
      )
    )
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = seed

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Something went wrong'))
      console.error(err)
      db.close()
    })
}
