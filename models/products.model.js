const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"]
  },
  price: {
    type: Number,
    required: [true, 'product price must be provided']
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    required: true,
    default: 0.0,
    max: 5.0
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  company: {
      type: String,
      enum: {
          values: ['ikea', 'liddy', 'caressa','marcos'],
          message: 'company name must be one of the following: ikea, liddy, caressa, marcos'
      }
    // enum: ['ikea', 'liddy', 'caressa', 'marcos']
  }
})

module.exports = mongoose.model('Product', productSchema)