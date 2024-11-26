export default async function handler(req, res) {
    const { email, password, accountType } = req.body;

    if (!email || !password || !accountType) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    const { MongoClient } = require('mongodb');
    const url = 'mongodb+srv://root:vwuWHyQVPo818AoG@rwa.31tjb.mongodb.net/?retryWrites=true&w=majority&appName=RWA';
    const client = new MongoClient(url);
    const dbName = 'RWA'; // database name


    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('login');

    await collection.insertOne({ email, password, accountType });

    res.status(200).json({ message: "Data inserted successfully" });

}
