const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors');
require("dotenv").config();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bmrzloc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    console.log("DB connected?")
    try {

        await client.connect();


        const taskCollection = client.db("allTasks").collection("Tasks")




        // to get all task data
        app.get("/tasks", async (req, res) => {
            const result = await taskCollection.find({}).toArray();
            res.send(result)
        })






        // to update a task











        // to save a task on database

        // app.post('/newTask', async (req, res) => {
        //     const data = req.body;
        //     const result = await taskCollection.insertOne(data);
        //     res.send(result);
        // })



        // to delete a task from database



        // app.delete('/tasks/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await taskCollection.deleteOne(query);
        //     res.send(result)
        // })















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