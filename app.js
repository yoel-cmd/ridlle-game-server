import express from "express"
import bcrypt from 'bcrypt'
import { connectToMongoDB } from "./DB/mongo_DB.js"
import { readRiddle, creatRiddle, deleteRiddle, updateRiddle } from "./DAL/riddle.DAL.js"
import { addPlayer, loadAllPlayer, loadPlayerByNmae, updatePlayer, loadAllPlayersByRecord, loadPassByName } from "./DAL/player.DAL.js"
import jwt from 'jsonwebtoken'
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
//---------------Singig ----------------

server.post('/siging', async (req, res) => {
    try {
        const passhash = await bcrypt.hash(req.body.password, 10)
        const data = await addPlayer({
            name: req.body.name,
            avg: req.body.avg,
            record: req.body.record,
            password: passhash,
            rol: 'user'
        });
        const token = jwt.sign({
            nam: req.body.name,
            rol: req.body.rol,
        },
            process.env.SECRETE_KEY,
            { expiresIn: '7h' }
        )
        console.log(token);

        res.status(201).json(token)
    } catch (error) {
        res.send(error)
    }
})

//---------------Login ----------------

server.post('/login', async (req, res) => {
    try {
        console.log(req.body);

        const passDB = await loadPassByName(req.body.name)
        // console.log(passDB);

        const ifPassword = await bcrypt.compare(req.body.password, passDB.password)
        console.log(ifPassword);
        if (ifPassword) {
            const token = jwt.sign({
                nam: req.body.name,
                rol: req.body.rol,
            },
                process.env.SECRETE_KEY,
                { expiresIn: '7h' }
            )
            
            res.json({ nsg: 'User found' })
        }
    } catch (error) {
        res.send(error, 'User not found')
    }

})



await connectToMongoDB()

server.listen(3000, () => console.log('liste........'))