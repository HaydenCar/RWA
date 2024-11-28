import { MongoClient } from 'mongodb';

export async function GET(req, res) {
  console.log("In the register API");

  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const pass = searchParams.get('pass');

  if (!email || !pass) {
    return Response.json({ success: "false", error: "Missing email or password" });
  }

  console.log("Registering user with email:", email);

  const url = 'mongodb+srv://root:vwuWHyQVPo818AoG@rwa.31tjb.mongodb.net/?retryWrites=true&w=majority&appName=RWA';
  const client = new MongoClient(url);
  const dbName = 'RWA';
  await client.connect();
  console.log("Connected successfully to the database");
  const db = client.db(dbName);
  const collection = db.collection('login');

  // Check if the email already exists
  const existingUser = await collection.findOne({ username: email });
  if (existingUser) {
    console.log("User already exists");
    return Response.json({ success: "false", error: "Email already registered" });
  }

  // Insert the new user
  await collection.insertOne({ username: email, pass: pass, acc_type: 'customer' });
  console.log("User registered successfully");
  return Response.json({ success: "true" });

  await client.close();

}
