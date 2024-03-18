require('./db/Connect');
require('dotenv').config();

const express = require('express');
const User=require('./models/user');
const cors=require('cors');
const propertydata = require('./routes/property/proroute')
const app=express();
app.use(express.json());
app.use(cors());


app.use('/propost',propertydata);

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
  console.log(port)
app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`);
})

