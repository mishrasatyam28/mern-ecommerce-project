const { ImageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");



const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await ImageUploadUtil(url);
        res.json({
            success: true,
            result,
          });
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message:'Error occured while file uploading'
        })
    }
}

// add a new product
const addProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
        
        const newlyCreatedProduct = new Product({
            image, title, description, category, brand, price, salePrice, totalStock
        })

        await newlyCreatedProduct.save();
        res.status(201).json({
            success: true,
            message:'Product added successfully!',
            data:newlyCreatedProduct
        })
    } catch (error) {
        console.log()
        res.status(500).json({
            success: true,
            message:"Error Occured while adding new product"
        })
    }
    
}

// fetch all products

const fetchAllProduct = async (req, res) => {
    try {
        const listOfProducts = await Product.find({})
        res.status(200).json({
            success: true,
           data:listOfProducts, 
        })
    } catch (error) {
        console.log()
        res.status(500).json({
            success: true,
            message:"Error Occured while fetching products"
        })
    }
}

// edit a product

const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

        let findProduct = await Product.findById(id);
        if (!findProduct) {
            return res.send(404).json({
                success: false,
                message:'Product not found'
            })
        }

        findProduct.image = image || findProduct.image
        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.price = price==='' ? 0: price || findProduct.price
        findProduct.salePrice = salePrice==='' ? 0: salePrice || findProduct.salePrice
        findProduct.totalStock = totalStock || findProduct.totalStock;

        await findProduct.save();
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data:findProduct
        })

    } catch (error) {
        console.log()
        res.status(500).json({
            success: true,
            message:"Error Occured while editing product"
        })
    }
}


// delete a product

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message:"Product not found",
           }) 
        }
        res.status(200).json({
            success: true,
            message:'Product delete successfully'
        })

    } catch (error) {
        console.log()
        res.status(500).json({
            success: true,
            message:"Error Occured while deleting product"
        })
    }
}

module.exports = { handleImageUpload, addProduct, fetchAllProduct, editProduct, deleteProduct }

