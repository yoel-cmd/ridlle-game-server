import { mongoClient } from '../DB/mongo_DB.js'
import { ObjectId } from 'mongodb';

export async function creatRiddle(riddle) {
    try {
        await mongoClient.db('riddle_project').collection("riddles").insertOne(riddle);
        return ({ "message": "adding" });
    } catch (error) {
        return error;
    }
};


export async function readRiddle() {
    try {
        const allDocs = await mongoClient.db('riddle_project').collection("riddles").find().toArray();
        return allDocs;
    } catch (error) {
        return error;
    }
};

export async function deleteRiddle(id) {
    try {
        await mongoClient.db('riddle_project').collection("riddles").deleteOne({ _id: new ObjectId(id)})
        return "delete"
    } catch (error) {
        return error;
    }
};














