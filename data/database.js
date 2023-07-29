const mongodb = require('mongodb')

const mongoClient = mongodb.MongoClient

let database;

async function connect() {
    const client = await mongoClient.connect(process.env.MONGO_URI)
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