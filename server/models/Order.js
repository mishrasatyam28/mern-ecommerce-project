const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: String,
    cartItems: [
        {
            productId: String,
            title: String,
            image: String,
            price: String,
            salePrice: String,
            quantity: Number,
        }
    ],
    addressInfo: {
        addressId: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String,    
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpadteDate: Date,
    paymentId: String,
    payerId: String
})

module.exports = mongoose.model('Order', OrderSchema)