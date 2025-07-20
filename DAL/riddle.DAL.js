import { mongoClient} from '../DB/mongo_DB.js'

export async function creatRiddle(riddle) {
    try {
        const result = await mongoClient.db('riddle_project').collection("riddles").insertOne(riddle);
        return (`Inserted document with _id: ${result.insertedId}`);
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














