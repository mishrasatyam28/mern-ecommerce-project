const express = require('express')

const {getAllOrderOfAllUsers, getOrderDetailsForAdmin} = require('../../controllers/admin/order-controller')


const router = express.Router();

router.get('/get', getAllOrderOfAllUsers);
router.get('/details/:id', getOrderDetailsForAdmin);


module.exports = router;