import { mongoClient } from '../DB/mongo_DB.js'
import { ObjectId } from 'mongodb';

//-------------create riddle-----------------------

export async function creatRiddle(riddle) {
    try {
        await mongoClient.db('riddle_project').collection("riddles").insertOne(riddle);
        return ({ "message": "adding" });
    } catch (error) {
        return error;
    }
};

//-------------readR riddle-----------------------

export async function readRiddle() {
    try {
        const allDocs = await mongoClient.db('riddle_project').collection("riddles").find().toArray();
        return allDocs;
    } catch (error) {
        return error;
    }
};

//-------------delete riddle-----------------------

export async function deleteRiddle(id) {
    try {
        await mongoClient.db('riddle_project').collection("riddles").deleteOne({ _id: new ObjectId(id) })
        return "delete"
    } catch (error) {
        return error;
    }
};

//-------------update riddle-----------------------

export async function updateRiddle(id, riddle) {
    try {
        await mongoClient.db('riddle_project').collection("riddles").updateOne(
            { _id: new ObjectId(id) },
            { $set: riddle }
        );
        return "update"
    } catch (error) {
        return error;
    }
};













