const { MongoClient } = require('mongodb')


let database = null

async function startDB(){
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster-l5rg0.mongodb.net/test?w=majority`
    const connection = new MongoClient.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true});
    database = connection.db('AvoMain')
}

async function getDB(){
    if(!database) await startDB()
    return database
}

module.exports = {
    startDB,
    getDB
}