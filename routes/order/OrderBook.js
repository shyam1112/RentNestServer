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

        if (validationResult && validationResult.errors) {
            const errors = Object.values(validationResult.errors).map(error => error.message);
            return res.status(400).send({ errors });
        } else {
            try {
                const saved = await adddata.save();
                res.send(saved);
            } catch (error) {
                console.error("Save error:", error);
                res.status(500).send({ error: "Error saving data." });
            }
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error("Unexpected error:", error);
        res.status(500).send({ error: "An unexpected error occurred." });
    }
});


router.get('/:useridd',async(req,res) => {
    try{
        const { useridd } = req.params;
        console.log(useridd);
        let result = await orderModal.find({userid:useridd});
        res.send(result);
    }catch(error){
        console.error("Unexpected error:", error);
        res.status(500).send({ error: "An unexpected error occurred when get order by id." });
    }
})

module.exports = router;