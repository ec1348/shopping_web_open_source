let express = require('express');
let router = express.Router();
let OrderModifyMethod = require('../controllers/order/oder_modify_controller')

orderModifyMethod = new OrderModifyMethod()
router.post('/', orderModifyMethod.createOrder)
router.get('/', orderModifyMethod.getMemberOrder)
router.put('/', orderModifyMethod.updateOrder)
router.delete('/', orderModifyMethod.deleteOrder)

module.exports = router