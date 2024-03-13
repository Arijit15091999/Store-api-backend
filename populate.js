require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('./db/connect')
const connectionString = process.env.MONGO_URL + process.env.DATABASE_NAME
const Product = require('./models/products.model')
const jsonData = require('./products.json')
console.log(typeof jsonData)

const populate = async () => {
  jsonData.forEach(async (product, index) => {
    try {
      await Product.create(product)
      console.log('created', product)
      if (index == jsonData.length - 1) {
        process.exit(0)
      }
    } catch (error) {
      console.error({ msg: 'error creating product' })
      process.exit(1)
    }
  })
}

const start = async () => {
  try {
    //connst db
    await connectDB(connectionString)
    console.log('db is connected')
    console.log(
      'populating data................................................................'
    )
    populate()
  } catch (error) {
    console.error(error)
  }
}

start()
