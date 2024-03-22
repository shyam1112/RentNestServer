const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {

        userid:{
            type:String,
            required:true
        },
        propertyid:{
            type:String,
            required:true
        },
        customer_name :{
            type:String,
            required:true
        },
        customer_mobilenumber :{
            type:String,
            required : true
        },
        customer_email: {
            type:String,
            required:true
        },
        number_of_months:{
            type:String,
            required:true
        },
        number_of_people :{
            type:String,
            required:true
        },
        student_family:{
            type:String,
            required:true
        }
    }
)

module.exports = mongoose.model('bookorder',orderSchema);