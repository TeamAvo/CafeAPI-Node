const { getDB } = require('../database/mongo')

const colName = 'Voting'


// TODO: Add parameters from range into this function
// TODO: Return all items found or return an empty vote template
async function getTimeRange(query) {
    const db = await getDB()
    let result = await db.collection(colName).find(
        { 'time.date': { $gte: new Date(query.date1), $lt: new Date(query.date2) } }
    ).toArray()

    // result.map(el => {
    //     const date = new Date(el.time.date)
    //     el.time = date
    // })

    return result
}

// { $range: [query.y1, query.y2, yearCounter(query.y1)] }
// { $range: [query.m1, query.m2, monthCounter(query.m1)] }
// { $range: [query.d1, query.d2, dayCounter(query.d1)] }
// { $range: [0, 2, 1] }

module.exports = {
    getTimeRange,
}