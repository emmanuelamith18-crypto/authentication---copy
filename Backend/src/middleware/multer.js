const multer = require('multer');
const cloudinary = require('../config/cloudinaryconfig');
const {CloudinaryStorage} = require('multer-storage-cloudinary');

const upload = multer({
    storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'myapp',
            allowed_formats: ['jpg', 'jpeg', 'png']
        }
    }),
    limits: {fileSize: 5 * 1024 * 1024}
});

module.exports = upload;
    