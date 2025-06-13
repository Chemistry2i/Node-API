//we are using mongoose to create a model for our products
const mongoose = require('mongoose');
const productSchema = mongoose.Schema({

    name:{
        type:String,
        required:[true, 'Product name is required']
    },

    quantity:{
        type:Number,
        required:true,
        default:0
    },

    price:{
        type:Number,
        required:true,
        default:0
    },

    image:{
        type:String,
        required:false
    }
},
    {
        timestamps:true
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product; 
// This code defines a Mongoose schema for a product with fields for
//  name, quantity, price, and image. It also includes timestamps 
// for creation and updates. The model is then exported for use in other parts of the application.