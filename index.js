const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes and DB connect here...


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.leope.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const cartcollection=client.db('testserver').collection('cart')
    app.post('/cart',async(req,res)=>{
      const cartItem=req.body;
      const result=await cartcollection.insertOne(cartItem);
      res.send(result)
    })
        app.get('/cart', async (req, res) => {
      const result = await cartcollection.find().toArray();
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
