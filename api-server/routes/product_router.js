let express = require('express')
let router = express.Router()
const GetProduct = require('../controllers/product/product_get_controller')
getProduct = new GetProduct()

router.get('/', getProduct.getAllProduct)

module.exports = router