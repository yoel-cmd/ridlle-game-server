//-------------------------------------------
import express from "express"
// import { readFile, writeFile } from "node:fs/promises"
import { connectToMongoDB } from "./DB/mongo_DB.js"
import { readRiddle, creatRiddle, deleteRiddle, updateRiddle } from "./DAL/riddle.DAL.js"
import { addPlayer, loadAllPlayer, loadPlayerByNmae,updatePlayer,loadAllPlayersByRecord } from "./DAL/player.DAL.js"

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
//--------------------create player----------------
server.post('/create-palyer', async (req, res) => {
    try {
        const data = await addPlayer(req.body)
        console.log(data);
        res.status(201).json(data)
    } catch (err) {
        console.log("error", err.message);
    }

})
//---------------load all player----------------
server.get('/load-player', async (req, res) => {
    try {
        const data = await loadAllPlayer();
        res.status(201).json(data)
    } catch (error) {
        console.log("error", err.message);

    }
})
//---------------cherch player by name----------------
server.get('/check-player/:name', async (req, res) => {
    try {
        const data = await loadPlayerByNmae(req.params.name);
        console.log(data);
        res.status(201).json(data)
    } catch (error) {
        console.log("error", error.message);
    }
})
// //---------------cherch record ----------------
// server.get('/check-player/:name', async (req, res) => {
//     try {
//         const data = await loadPlayerByNmae(req.params.name);
//         console.log(data);
//         res.status(201).json(data)
//     } catch (error) {
//         console.log("error", err.message);
//     }
// })
//---------------update player----------------
server.post('/update-record', async (req, res) => {
    try {
        const { name, property, value } = req.body; 
        const data = await updatePlayer(name, property, value); 
        res.status(201).send(data);
    } catch (error) {
        console.log("error", error.message);
        res.status(500).send("error in server");
    }
});

//---------------lider bord----------------

server.get("/players-by-record", async (req, res) => {
    try {
        const players = await loadAllPlayersByRecord();
        res.status(200).json(players);
    } catch (error) {
        console.error("error in servis", error.message);
        res.status(500).send("error !! ");
    }
});



await connectToMongoDB()

server.listen(3000, () => console.log('liste........'))