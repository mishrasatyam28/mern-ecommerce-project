const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')


// register

const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await  newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
    } catch (error) {
        console.log(error)
        res
         .status(500)
         .json({
            success: false,
            message: 'Some error occured'
            })
    }
}






// login

const login = async (req, res) => {
    const { email, password } = req.body;
    try {

    } catch (error) {
        console.log(error)
        req
         .status(500)
         .json({
                sucess: false,
                message: 'Some error occured'
            })
    }
}





// logout








// auth controller


module.exports = {registerUser}