export const dynamic = 'force-dynamic';
import {MongoClient} from 'mongodb'
export async function GET(req, res) {
        // Make a note we are on
        // the api. This goes to the console.

        console.log("in the api page")
        // =================================================

        const url = process.env.DB_ADDRESS;

        const client = new MongoClient('mongodb+srv://root:vwuWHyQVPo818AoG@rwa.31tjb.mongodb.net/?retryWrites=true&w=majority&appName=RWA');

        const dbName = 'RWA'; // database name

        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('orders'); // collection name

        const findResult = await collection.find({}).toArray();
        console.log('Found documents =>', findResult);
   //==========================================================
        // at the end of the process we need to send something back.
        return Response.json(findResult)
  }