
const express = require('express');
const app = express();
const Product = require('./Models/ProductModel.js');
const mongoose = require('mongoose');

app.use(express.json()); // Middleware to parse JSON bodies


app.get('/', (req,res) =>{
    res.send("Hello from Node API");
})


// create a new product to the Database (CREATE API)
app.post('/api/products', async (req,res) =>{
   try{
    const product = await Product.create(req.body);
    res.status(200).json(product);
   }

   catch(error){
    res.status(500).json({message:error.message})
   }
})

// Get all products from the database (READ API)
app.get('/api/products', async (req,res) =>{
    try{
        const products = await Product.find({}); // Fetch all products
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

// Get a single product using an ID(READ API)
app.get('/api/product/:id', async (req,res) =>{
    try{
        const {id} = req.params; // Extract the ID from the request parameters
        const product = await Product.findById(id); // Find the product by ID
        res.status(200).json(product); // Return the product
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

// Update a product using an ID (UPDATE API)
app.put('/api/product/:id', async (req,res) =>{
    try{
        const {id} = req.params; // Extract the ID from the request parameters
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product){
            return res.status(404).json({messgae:"Product not found"});
        }

        const updatedProduct = await Product.findById(id); // Fetch the updated product
        res.status(200).json(updatedProduct); // Return the updated product
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

// Delete a product using an ID (DELETE API)
app.delete('/api/product/:id', async (req,res) =>{
    try{
        const {id} = req.params; // Extract the ID from the request parameters
        const product = await Product.finByIdAndDelete(id); // Find and delete the product by ID

        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json({message:"Product deleted successfully"}); // Return success message
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})


// Connect to MongoDB
mongoose.connect("mongodb+srv://conceptcrashers:concept@backenddb.dfn4wyg.mongodb.net/NODE_API?retryWrites=true&w=majority&appName=BackendDB")
.then(() =>{
    console.log("Connected to the Database!");
    app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})
})
.catch(() =>{
    console.log("Connection failed!");
})
