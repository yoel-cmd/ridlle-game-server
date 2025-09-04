import express from "express"
import bcrypt from 'bcrypt'
import { connectToMongoDB } from "./DB/mongo_DB.js"
import { readRiddle, creatRiddle, deleteRiddle, updateRiddle } from "./DAL/riddle.DAL.js"
import { addPlayer, loadAllPlayer, loadPlayerByNmae, updatePlayer, loadAllPlayersByRecord, loadPassByName } from "./DAL/player.DAL.js"
import jwt from 'jsonwebtoken'
const server = express()

server.use(express.json())
const allowedOrigins = [
  "http://localhost:5173",
  "https://riddles-clinte.netlify.app"
];

server.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


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
            role: 'user'
        });
        console.log("📦 addPlayer result:", data)
        
        
        const token = jwt.sign({
            name: data.name,
            role: data.role,
        },
            process.env.SECRETE_KEY,
            { expiresIn: '7h' }
        )
        res.status(201).json(token)

    } catch (error) {
       return res.status(404).send("Error in signing" + error.message);
    }
})

//---------------Login ----------------

server.post('/login', async (req, res) => {
  try {
    const passDB = await loadPassByName(req.body.name);
    const ifPassword = await bcrypt.compare(req.body.password, passDB.password);

    if (ifPassword) {
      const payload = {
        name: req.body.name,
        role: req.body.role, 
      };

      const token = jwt.sign(
        payload,
        process.env.SECRETE_KEY,
        { expiresIn: '7h' }
      );
      return res.status(201).json(token);
    } else {
      console.log(" Password mismatch for user:", req.body.name);
      return res.status(401).send("User or Password incorrect");
    }
  } catch (error) {
    console.error(" Error in /login:", error);
    return res.status(404).send("User not found");
  }
});
//---------------connect to DB and listen ----------------



await connectToMongoDB()

server.listen(3000, () => console.log('liste........'))