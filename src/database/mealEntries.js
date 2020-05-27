const { getDB } = require('./mongo')

const colName = 'Voting'

async function updateVote(time){
    const db = await getDB()
    await db.collection(colName).updateOne(
        { time: time },
        { $inc: {vote: 1} },
        { upsert: true }
        )
}

module.exports = {
    updateVote,
}