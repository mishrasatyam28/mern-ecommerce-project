const Product = require('../../models/Product')


const getFilteredProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully for shopping-view', 
            data:products
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'Some error occured while fetching'
        })
    }
}

module.exports = {getFilteredProducts}