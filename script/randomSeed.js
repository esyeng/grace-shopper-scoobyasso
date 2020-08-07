const db = require('../server/db')
let faker = require('faker')
const {green, red} = require('chalk')
const {
  User,
  Product,
  Address,
  ArtCategory,
  Order,
  OrderList
} = require('../server/db/models')
// const Address = require('../server/db/models/address')

// function randomFloat(min, max) {
//   return Math.round(min + (max - min) * Math.random() * 100) / 100
// }
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

const createArtCategories = num => {
  let categories = [
    {name: 'Some Art'},
    {name: 'Sculpture'},
    {name: 'Painting'},
    {name: 'Pottery'}
  ]
  return categories
}

const getRandomProducts = num => {
  let products = []
  for (let i = 0; i < num; i++) {
    let randomIdNumber = i % 4 + 1 //for artcategory
    let randomProduct = {
      name: faker.commerce.productName(),
      description: faker.lorem.sentences(),
      imageUrl: faker.random.image(),
      price: randomNum(1, 2000),
      artCategoryId: randomIdNumber
    }
    products.push(randomProduct)
  }
  return products
}

const getRandomAddress = number => {
  let addresses = []
  for (let i = 0; i < number; i++) {
    let randomAddress = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
      zipcode: parseInt(faker.address.zipCode())
    }
    addresses.push(randomAddress)
  }
  return addresses
}

const createRandomOrders = number => {
  let orders = []
  for (let i = 1; i <= number; i++) {
    let randomOrder = {
      userId: i
    }
    orders.push(randomOrder)
  }
  return orders
}

const createRandomOrderItems = number => {
  let orderItems = []
  for (let i = 1; i <= number; i++) {
    let randomOrderItem = {
      orderId: i,
      productId: i
    }
    let randomOrderItem2 = {
      orderId: i,
      productId: i + 1
    }
    orderItems.push(randomOrderItem)
    orderItems.push(randomOrderItem2)
  }
  return orderItems
}

const seed = async () => {
  try {
    await db.sync({force: true})
    await Promise.all(
      getRandomUsers(20).map(user => {
        return User.create(user)
      })
    )
      .then(() =>
        Promise.all(
          createArtCategories().map(category => {
            return ArtCategory.create(category)
          })
        )
      )
      .then(() =>
        Promise.all(
          getRandomProducts(30).map(product => {
            return Product.create(product)
          })
        )
      )
      .then(() =>
        Promise.all(
          getRandomAddress(20).map(address => {
            return Address.create(address)
          })
        )
      )
      .then(() =>
        Promise.all(
          createRandomOrders(20).map(order => {
            return Order.create(order)
          })
        )
      )
      .then(() =>
        Promise.all(
          createRandomOrderItems(20).map(orderItem => {
            return OrderList.create(orderItem)
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
