const { getDB } = require('../database/mongo')

const colName = 'Voting'


// TODO: Add parameters from range into this function
// TODO: Return all items found or return an empty vote template
async function getTimeRange(){
    const db = await getDB()
    const result = await db.collection(colName).find(
        {
            time: {
                year: { }
            }
        }
    )
}

module.exports = {
    getTimeRange,
}