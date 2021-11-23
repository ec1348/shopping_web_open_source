let express = require('express');
let router = express.Router();
let OrderModifyMethod = require('../controllers/order/oder_modify_controller')

orderModifyMethod = new OrderModifyMethod()
router.post('/', orderModifyMethod.createOrder)

module.exports = router