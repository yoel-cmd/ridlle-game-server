import express from "express"
import bcrypt from 'bcrypt'
import { connectToMongoDB } from "./DB/mongo_DB.js"
import { readRiddle, creatRiddle, deleteRiddle, updateRiddle } from "./DAL/riddle.DAL.js"
import { addPlayer, loadAllPlayer, loadPlayerByNmae, updatePlayer, loadAllPlayersByRecord, loadPassByName } from "./DAL/player.DAL.js"
import jwt from 'jsonwebtoken'
const server = express()



const allowedOrigins = [
  "http://localhost:5173",                  // פיתוח מקומי
  "http://localhost:4173",                  // לפעמים Vite יושב על פורט הזה
  "https://riddles-clinte.netlify.app",     // הקליינט ב-Netlify
];
server.use(express.json());

function authMiddleware(allowedRoles = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send("No token provided");
    }

    const token = authHeader.split(" ")[1];
    try {
      const payload = jwt.verify(token, process.env.SECRETE_KEY);
      req.user = payload;

      // אם אין דרישה ספציפית ל-role, כל מי שמחובר עובר
      if (allowedRoles.length && !allowedRoles.includes(payload.role)) {
        return res.status(403).send("Forbidden");
      }

      next();
    } catch (err) {
      return res.status(401).send("Invalid token");
    }
  };
}


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



server.post('/create-ridlle', authMiddleware(["user", "admin"]), async (req, res) => {
  const val = await creatRiddle(req.body);
  res.status(201).send(val);
});

//-------------delete riddle-----------------------



server.delete('/delete-riddle/:id', authMiddleware(["admin"]), async (req, res) => {
  const val = await deleteRiddle(req.params.id);
  res.status(201).send(val);
});

//-------------read riddle-----------------------

server.get('/readRiddle', authMiddleware(["user", "admin"]), async (req, res) => {
  const data = await readRiddle();
  res.send(data);
});

//-------------update riddle-----------------------



server.put('/update-riddle/:id', authMiddleware(["admin"]), async (req, res) => {
  const data = await updateRiddle(req.params.id, req.body);
  res.send(data);
});

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
        name: passDB.name,
        role: passDB.role, 
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