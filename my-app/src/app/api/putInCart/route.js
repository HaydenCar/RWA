//
// function for putting items into the shopping cart.
//
import {MongoClient} from 'mongodb'
function putInCart(pname) {
    console.log("putting in cart: " + pname)

    fetch("/api/putInCart?pname=" + pname);
}

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page")
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)
    const pname = searchParams.get('pname')
    console.log(pname);
    // =================================================
    const url = process.env.DB_ADDRESS;
    const client = new MongoClient('mongodb+srv://root:vwuWHyQVPo818AoG@rwa.31tjb.mongodb.net/?retryWrites=true&w=majority&appName=RWA');
    const dbName = 'RWA'; // database name

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('shopping_cart'); // collection name

    var myobj = { pname: pname, username: "sample@test.com" };
    const insertResult = await collection.insertOne(myobj);
    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json({ "data": "" + "inserted" + "" })
}