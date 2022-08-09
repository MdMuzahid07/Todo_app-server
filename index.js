const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors');
require("dotenv").config();
const port = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId;


// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bmrzloc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    console.log("DB connected?")
    try {

        await client.connect();

        const taskCollection = client.db("allTasks").collection("Todo")


        // to get all task data
        app.get("/todo", async (req, res) => {
            const result = await taskCollection.find({}).toArray();
            res.send(result)
        })



        // to get a particular todo task

        app.get("/todo/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await taskCollection.findOne(query);
            res.send(result);
        })



        // to update a task
        app.put('/todo/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    title: data.title, todo: data.todo
                },
            };
            const result = await taskCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })



        // to get data from client side and save a newTask on database(MondoDB)
        app.post('/todo', async (req, res) => {
            const newTask = req.body;
            const result = await taskCollection.insertOne(newTask);
            res.send(result);
        })



        // to delete a task from database
        app.delete('/todo/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await taskCollection.deleteOne(query);
            res.send(result)
        })


    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', async (req, res) => {
    res.send("server running?")
});


app.listen(port, () => {
    console.log(`server running port port: ${port}`);
})