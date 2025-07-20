import { MongoClient } from 'mongodb';
import "dotenv/config"

const uri = process.env.MONGO_DB_URI;

export const mongoClient = new MongoClient(uri);

export async function connectToMongoDB() {
    try {
        await mongoClient.connect();
        console.log('Connected to MongoDB');
    } catch(error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
    }
}








