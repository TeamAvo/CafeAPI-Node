const { getDB } = require('./mongo')

const colName = 'Voting'

async function updateVote(time, vote){
    const db = await getDB()
    await db.collection(colName).updateOne(
        { time: time },
        { $inc: {vote: vote ? 1 : -1} },
        { upsert: true }
        )
}

module.exports = {
    updateVote,
}