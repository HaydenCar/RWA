import {MongoClient} from 'mongodb'
export async function GET(req, res) {
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page")
  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const pass = searchParams.get('pass')

  console.log(email);
  console.log(pass);
 // =================================================

  const { MongoClient } = require('mongodb');
  const url = process.env.DB_ADDRESS;

  const client = new MongoClient(url);

  const dbName = 'RWA'; // database name
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('login'); // collection name

  const findResult = await collection.find({"username": email}).toArray();

  console.log('Found documents =>', findResult);

  let valid = false
  let acc_type = "";

  if(findResult.length >0 ){
          valid = true;
          console.log("login valid")
          const user = findResult[0];
          acc_type = user.acc_type;
  } else {
        valid = false;
        console.log("login invalid")
  }

 //==========================================================
  // at the end of the process we need to send something back.
  return Response.json({ "data": valid,
                         "acc_type": acc_type})
}