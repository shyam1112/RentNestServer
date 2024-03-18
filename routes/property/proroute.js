const express = require('express');
const router = express.Router();
const PropertyModal = require('../../models/prodatamodel');
const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

router.get('/getdata', async (req, res) => {
    try {
        let result = await PropertyModal.find();
        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: "No data found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/adddata', upload.array('image', 5), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send("No files were uploaded.");
        }

        const images = req.files.map(file => file.path); 
        console.log(images);

        const { proname, propertyType, rentpermonth, location, mobilenumber, selectbhk, area, furnished, bath, otherthing } = req.body;

        if (!proname || !propertyType || !location || !mobilenumber || !selectbhk || !area || !furnished || !bath) {
            return res.status(400).send("Missing required fields.");
        }

        const prodata = new PropertyModal({ 
            proname, 
            propertyType, 
            rentpermonth, 
            location, 
            mobilenumber, 
            selectbhk, 
            area, 
            furnished, 
            bath, 
            otherthing, 
            image: images 
        });

        let result = await prodata.save();
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
