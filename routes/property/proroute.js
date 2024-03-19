const express = require('express');
const router = express.Router();
const PropertyModal = require('../../models/prodatamodel');
const multer = require('multer');
const path = require('path');

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



module.exports = router;
