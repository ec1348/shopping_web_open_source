var express = require('express');
var router = express.Router();
const MemberModifyMethod = require('../controllers/member/member_modify_controller')


memberModifyMethod = new MemberModifyMethod()
router.post('/', memberModifyMethod.register);
router.post('/login',memberModifyMethod.login)
router.put('/update',memberModifyMethod.update)

module.exports = router;
