
const createOrder = async (req, res) => {
    try {
        // const{userId, cartItem,addressInfo,orderStatus}
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message:'Some Error Occured!'
       }) 
    }
}

const capturePayment = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message:'Some Error Occured!'
       }) 
    }
}

module.exports = { createOrder, capturePayment }


// 10:30