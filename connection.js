const { MongoClient } = require('mongodb');

//MongoDB config
const uri = require("./config/keys.js").mongoURI;

//connect to database (returns a promise)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    try {
        await client.connect();
        console.log("Connected");
    } catch(err) {
        console.error(err);
    }
};

module.exports = main;