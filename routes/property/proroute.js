const express = require('express');
const router = express.Router();
const PropertyModal = require('../../models/prodatamodel');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get('/', async (req, res) => {
    try {
        let result = await PropertyModal.find();
        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json({ message: "No data found." });
        }
    } catch (error) {
        console.error('Error retrieving property data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/adddata', upload.array('images', 5), async (req, res) => {
    try {
        const images = req.files.map(file => file.path);
        
        const newProperty = new PropertyModal({
            ...req.body,
            image: images
        });

        const result = await newProperty.save();
        res.status(201).json(result);
    } catch (error) {
        console.error('Error adding property data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
