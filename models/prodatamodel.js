const mongoose = require('mongoose');

const prodata = mongoose.Schema(
    {
        proname:{
            type:String
        },
        propertyType:{
            type:String,
            required:true
        },
        rentpermonth:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        mobilenumber:{
            type:String,
            required:true
        },
        selectbhk:{
            type:String,
            required:true
        },
        area : {
            type:String,
        },
        furnished:{
            type:String,
            required:true    
        },
        bath:{
            type:String,
            required:true
        },
        otherthing:{
            type:String
        }
    }
)

module.exports = mongoose.model('prodata',prodata);

    