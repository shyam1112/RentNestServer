const express = require('express');
const router = express.Router();
const PropertyModal = require('../../models/prodatamodel');
const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // File name will be original name with timestamp
    }
});

const upload = multer({ storage: storage });

router.get('/getdata', async (req, res) => {
    let result = await PropertyModal.find();
    if (result) {
        res.send(result);
    } else {
        res.send({ message: "No data found." });
    }
})

// Modify the route to use multer middleware for handling file upload
router.post('/', upload.array('image', 5), async (req, res) => {
    try {
        if (req.body) {
            const images = req.files.map(file => file.path); // Getting paths of uploaded files
            const prodata = new PropertyModal({ ...req.body, image: images });
            let result = await prodata.save();
            res.send(result);
        } else {
            res.send("Given data is Empty!");
        }
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;
