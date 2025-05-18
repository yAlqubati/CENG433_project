const sharp = require('sharp');
const multer = require('multer');
const expressAsyncHandler = require('express-async-handler');
const fs = require('fs');
const path = require('path');

const storage = multer.memoryStorage();
// this is the filter that will only allow images to be uploaded
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(null,false);
    }
}

// here we specify our filter and storage
const uploadImage = multer({ storage: storage, fileFilter: multerFilter });

const saveImage = (directory) => expressAsyncHandler(async (req, res, next) => {
    if (req.file) {
        try {
            // Ensure the directory exists
            const dirPath = path.join(__dirname, directory); // Ensure correct path resolution
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true }); // Create the directory if it doesn't exist
            }

            // Save the image
            await sharp(req.file.buffer)
                .resize(600, 600)
                .toFile(`${dirPath}/${req.file.originalname}`);
            return next();
        } catch (err) {
            console.log('Error saving image', err);
            return res.status(500).send('Error saving image');
        }
    } else {
        console.log('No file uploaded');
        return res.status(400).send('No image uploaded');
    }
});


module.exports = {
    uploadImage,
    saveImage
};