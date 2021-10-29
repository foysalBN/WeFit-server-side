const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors())
app.use(express.json())

//Default GET API
app.get('/', (req, res) => {
    res.send('Adventure love server is running')
})




// Connetc with mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q3v5j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('connected')

        const database = client.db('adventure-lover')
        const serviceCollec = database.collection('services')


        // GET API - all services
        app.get('/services', async (req, res) => {
            const cursor = serviceCollec.find({})
            const services = await cursor.toArray()
            res.json(services);
        })






    }
    finally {

    }

}
run().catch(console.dir)



app.listen(port, () => console.log("Server is running on port ", port))