const cloudinary = require('cloudinary').v2;
const multer = require('multer')

// configration of cloudinary
cloudinary.config({
    cloud_name: 'mishra-satyam',
    api_key: '491122969114478',
    api_secret: 'qGnH09u0IamZUbfLgPMjipZU8bk'
})

// storage variable
const storage = new multer.memoryStorage();

// function will return result
async function ImageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type : 'auto'
    })
    return result;
} 

const upload = multer({ storage });

module.exports = {upload,ImageUploadUtil}