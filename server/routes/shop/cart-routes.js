const express = require('express');

const { addToCart, updateCartItems, deleteCartItems, fetchCartItems } = require('../../controllers/shop/cart-controller')

const router = express.Router()

router.post('/add', addToCart);
router.get('/get/:userId', fetchCartItems)
router.put('/update-cart', updateCartItems)
router.delete('/:userId/:productId', deleteCartItems)

module.exports = router;