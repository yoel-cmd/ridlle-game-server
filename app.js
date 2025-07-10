import express from "express"
import { readFile } from "node:fs/promises"
const pathRiddle = process.cwd() + '/DB/RiddlesDB.txt';
const pathPlayer = './DB/PlayersDB.txt';

const server = express()


server.use(express.json())

server.get('/', (req, res) => {
    console.log('hi from server get');
    res.send('hi from client get')

})
server.get('/readRiddle', async (req, res) => {
    const data = await readFile(pathRiddle, 'utf8')
    res.send(data)

})

server.get('/ridlle', (req, res) => {
    console.log('hi from server riddle');

})


server.listen(3000, () => console.log('liste........'))