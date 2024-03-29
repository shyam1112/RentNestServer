require('./db/Connect');
require('dotenv').config();
const PropertyModal = require('./models/prodatamodel');
const multer = require('multer');
const path = require('path');
const express = require('express');
const User=require('./models/user');
const cors=require('cors');
const propertydata = require('./routes/property/proroute');
const OrderBook = require('./routes/order/OrderBook');
const app=express();
app.use(express.json());
app.use(cors());
app.use('/Images', express.static('Images'));


app.use('/order',OrderBook)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './Images');
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  });
const upload = multer({ storage: storage });


app.get('/propost/getdata',async(req,res) => {
  try{
    let prodata = await PropertyModal.find();
    res.send(prodata);
  }catch(error){
    console.error('Error adding property data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/propost/search/:key',async (req,res) => {
  try{
    let searchData = await PropertyModal.find(
      {
        "$or":[
          {location:{$regex:req.params.key}}
        ]
      }
    )
    if(searchData){
      res.send(searchData);
    }else{
      res.send("No Data Found.")
    }
  }catch(error){
    console.error('Error while search property by location.');
    res.status(500).json({error:'Error while searcg property by location.'})
  }
})

app.get('/propost/:getuserid',async (req,res) => {
  try{
    // console.log(req.params.id);
    let result = await PropertyModal.find({userid:req.params.getuserid});
    res.send(result);
  }catch(error){
    console.error('Error getting property data by userid:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/propost/getproperty/:getproid',async (req,res) => {
  try{
    let result = await PropertyModal.findOne({_id:req.params.getproid});
    res.send(result);
  }catch(error){
    console.error('Error getting property data by proid:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
  
app.post('/propost/adddata', upload.array('files'), async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }
  
      const {userid, proname, propertyType, rentpermonth, location, mobilenumber, selectbhk, area, furnished, bath, otherthing } = req.body;
  
      const imageFilenames = req.files.map(file => file.filename);
  
      const newProdata = new PropertyModal({
        userid,
        image: imageFilenames, 
        proname,
        propertyType,
        rentpermonth,
        location,
        mobilenumber,
        selectbhk,
        area,
        furnished,
        bath,
        otherthing
      });
  
      const result = await newProdata.save();
      res.status(201).json(result);
    } catch (error) { 
      console.error('Error adding property data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
app.post('/reg', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    res.send(result);
});


app.get('/',(req,res) => {
    res.send("Hello ")
})

app.post("/login", async (req, res) => {
    if (req.body.email && req.body.pass) {
        let user = await User.findOne(req.body).select("-pass");
        if (user) {
            res.send(user)
        } else {
            res.send({ result: "No user found." });
        }
    } else {
        res.send({ result: "No user found." });
    }
});


app.put('/updatepass/:email',async(req,res)=>{
    try {
    const result = await User.updateOne(
        {email:req.params.email},
        {
            $set: { pass: req.body.pass }
        }
        );
        res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
})

app.post('/checkEmail', async (req, res) => {
    const { email } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.json({ exists: true });
      } else {
        return res.json({ exists: false });
      }
    } catch (error) {
      console.error('Error checking email:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  let port = process.env.PORT || 4000
//   console.log(port)
app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`);
})

