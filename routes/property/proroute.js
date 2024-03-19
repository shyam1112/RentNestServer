const express = require('express');
const router = express.Router();
const PropertyModal = require('../../models/prodatamodel');

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

router.post('/adddata', async (req, res) => {
    try {
     
        const newProperty = new PropertyModal(req.body);
        const result = await newProperty.save();
        res.status(201).json(result);
    } catch (error) {
        console.error('Error adding property data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
