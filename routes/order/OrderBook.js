const express = require('express');
const orderModal = require('../../models/orderbookmodel');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Order Booked.");
})

router.post('/addorder', async (req, res) => {
    try {

        const adddata = new orderModal(req.body);
        const validationResult = adddata.validateSync(); 

        if (validationResult.error) {
            const errors = validationResult.error.errors;
            const errorMessages = Object.keys(errors).map(key => errors[key].message);
            return res.status(400).send({ errors: errorMessages });
        } else {
            try {
                const saved = await adddata.save();
                res.send(saved);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        }
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;