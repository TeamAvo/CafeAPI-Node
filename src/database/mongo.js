const { MongoClient } = require('mongodb')

let database = null
let client = null

async function startDB(){
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster-l5rg0.mongodb.net/test?w=majority`
    client = new MongoClient(uri, {useUnifiedTopology: true, useNewUrlParser: true})
    await client.connect()
    database = client.db('AvoMain')
}

async function getDB(){
    if(!database) await startDB()
    return database
}

/* TODO: Add closing to use less runtime when one heroku server */
// async function closeDB(){
//     if(!client){
//         await client.close()
//     }
// }

module.exports = {
    startDB,
    getDB,
}