const cloudinary = require('cloudinary').v2;

const folderOnCloud = 'shopProducts';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

exports.uploads = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file, {
            folder: folderOnCloud
        }, (err, result) => {
            if (err) {
                reject('Error uploading');
            } else resolve(result);
        })
    })
}