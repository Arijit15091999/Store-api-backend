require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 3000
const notFoundMiddleware = require('./middlewares/404.js')
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware.js')
const app = express()
const connectionString = process.env.MONGO_URL + process.env.DATABASE_NAME
const connectDB = require('./db/connect.js')
const productsRoute = require('./routes/products.js')
//middleware
app.use(express.json())
//async error
require('express-async-errors')
//routes
app.get('/', (req, res) => {
  res.send(`<h1>Store Api</h1><a href = "/api/v1/products"/>get all products`)
})

//product routes
app.use('/api/v1/products', productsRoute)

const start = async () => {
  try {
    //connst db
    await connectDB(connectionString)
    console.log('db is connected')
    app.listen(PORT, () => {
      console.log(`server is listening on port: ${PORT}....`)
    })
  } catch (error) {
    console.error(error)
  }
}
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
start()
