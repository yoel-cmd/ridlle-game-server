import express from "express"
import { readFile, writeFile } from "node:fs/promises"

const pathRiddle = process.cwd() + '/DB/RiddlesDB.txt';
const pathPlayer = process.cwd() + '/DB/PlayersDB.txt';

const server = express()

server.use(express.json())

server.post('/creat-ridlle', async (req, res) => {
    try {
        const data = await readFile(pathRiddle, 'utf8')
        const jsData = JSON.parse(data)

        req.body.id = jsData.length === 0 ? 1 : jsData[jsData.length - 1].id + 1;
        jsData.push(req.body)

        await writeFile(pathRiddle, JSON.stringify(jsData, null, 2))

        res.status(201).json({ id: req.body.id })

    } catch (err) {
        console.log("error", err.message);
    }
})

server.post('/creat-palyer', async (req, res) => {
    try {
        const data = await readFile(pathPlayer, 'utf8')
        const jsData = JSON.parse(data)

        req.body.id = jsData.length === 0 ? 1 : jsData[jsData.length - 1].id + 1;
        jsData.push(req.body)

        await writeFile(pathPlayer, JSON.stringify(jsData, null, 2))

        res.status(201).json({ id: req.body.id })

    } catch (err) {
        console.log("error", err.message);
    }

})
server.get('/readRiddle', async (req, res) => {
    const data = await readFile(pathRiddle, 'utf8')
    res.send(data)
})

server.get('/ridlle', (req, res) => {
    console.log('hi from server riddle');
})

server.listen(3000, () => console.log('liste........'))