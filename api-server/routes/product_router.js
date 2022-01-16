let express = require('express')
let router = express.Router()
const GetProduct = require('../controllers/product/product_get_controller')
const ProductModifyMethod = require('../controllers/product/product_modify_controller')
getProduct = new GetProduct()
productModifyMethod = new ProductModifyMethod()

router.get('/', getProduct.getAllProduct)
router.post('/', productModifyMethod.addNewProduct)

module.exports = router