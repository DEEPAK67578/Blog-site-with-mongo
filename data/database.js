const mongodb = require('mongodb')

const mongoClient = mongodb.MongoClient

let database;

async function connect() {
    const client = await mongoClient.connect('mongodb://127.0.0.1:27017')
    database = client.db('newblog')
}

function getDb() {
    if(!database) {
        throw {message:"Database isnt connected"}
    }
    return database
}

module.exports = {
    getDb:getDb,
    connectToDatabase:connect
}