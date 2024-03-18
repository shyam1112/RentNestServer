const express = require('express');
const router = express.Router();
const PropertyModal = require('../../models/prodatamodel');

router.get('/',(req,res) => {
    res.send("This is property data.")
})

router.post('/adddata',async(req,res) => {
    try{
        if(req.body){
            let prodata = new PropertyModal(req.body);
            let result = await prodata.save();
            res.send(result);
        }else{
            res.send("Given data is Empty!");
        }
    }catch(error){
        res.send(error);
    }
})

module.exports = router;