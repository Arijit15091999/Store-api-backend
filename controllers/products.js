const Product = require('../models/products.model')

const getAllProducts = async function (req, res) {
  const { featured, name, company, sort, select, numericFilters } = req.query
  const queryObject = {}
  if (featured) {
    queryObject.featured = featured
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  if (company) {
    queryObject.company = company
  }

  const operatorMap = {
    '>': '$gt',
    '>=': '$gte',
    '=': '$eq',
    '<': '$lt',
    '<=': '$lte'
  }

  // options and  regex is for numeric Filters
  const regExp = /\b(<|>|>=|=|<|<=)\b/g
  const options = ['price', 'rating']

  let filters = numericFilters.replace(regExp, function (match) {
    return `-${operatorMap[match]}-`
  })

  filters = filters.split(',').forEach(element => {
    const [feild, operator, value] = element.split('-')
    if (options.includes(feild)) {
      queryObject[feild] = { [operator]: Number(value) }
    }
  })

  console.log(queryObject, numericFilters)

  // find items
  let result = Product.find(queryObject)

  //sort
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }

  //select

  if (select) {
    const selectList = select.split(',').join(' ')
    result = result.select(selectList)
  }

  const limit = Number(req.query.limit) || 10
  const page = Number(req.query.page) || 1
  const skip = (page - 1) * limit

  //logic for skip
  //nbHits = 23 page = 4  limit = 7
  // 23 / 4 = 7 7 7 2

  const products = await result.limit(limit).skip(skip)
  res.json({ nbHits: products.length, products })
}

const getAllProductsStatic = async function (req, res) {
  const { name } = req.query
  const queryObject = {}
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  const products = await Product.find({ price: { $gt: 200 } })
    .select('name price')
    .sort('price')
  res.json({ nbHits: products.length, products })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic
}
