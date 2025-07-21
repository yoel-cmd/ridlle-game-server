//-------------------------------------------
import express from "express"
// import { readFile, writeFile } from "node:fs/promises"
import { connectToMongoDB } from "./DB/mongo_DB.js"
import { readRiddle, creatRiddle, deleteRiddle, updateRiddle } from "./DAL/riddle.DAL.js"

const server = express()

server.use(express.json())


//-------------create riddle-----------------------

server.post('/create-ridlle', async (req, res) => {
    try {
        const val = await creatRiddle(req.body);
        console.log(val);
        res.status(201).send(val);
    } catch (err) {
        console.log("error", err.message);
    }
})

//-------------delete riddle-----------------------

server.delete('/delete-riddle/:id', async (req, res) => {
    try {
        const val = await deleteRiddle(req.params.id);
        console.log(val);
        res.status(201).send(val);
    } catch (err) {
        console.log("error", err.message);
    }
})

//-------------read riddle-----------------------

server.get('/readRiddle', async (req, res) => {
    const data = await readRiddle()
    res.send(data)
})

//-------------update riddle-----------------------

server.put('/update-riddle/:id', async (req, res) => {
    try {
        const data = await updateRiddle(req.params.id, req.body)
        res.send(data)
    } catch (error) {
        console.log("error", error.message);
    }
})
//-------------------------------------------------
await connectToMongoDB()


server.post('/create-palyer', async (req, res) => {
    try {
       const data=await

       

        res.status(201).json({ id: req.body.id })

    } catch (err) {
        console.log("error", err.message);
    }

})

server.listen(3000, () => console.log('liste........'))