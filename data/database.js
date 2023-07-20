const mongodb = require('mongodb')

const mongoClient = mongodb.MongoClient

let database;

function getDb() {
    const client = mongoClient.connect('mongodb://localhost:27017')
    database = client.db('newblog')
}

function connectToDatabase() {
    if(!database) {
        throw {message:"Database isnt connected"}
    }
    return database
}

module.exports({
    getDb:getDb,
    connectToDatabase:connectToDatabase
})