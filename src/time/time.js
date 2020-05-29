const { getDB } = require('../database/mongo')

const colName = 'Voting'


// TODO: Add parameters from range into this function
// TODO: Return all items found or return an empty vote template
async function getTimeRange(query){
    const db = await getDB()
    let result = await db.collection(colName).find(
        { 'time.date': { $gte: new Date(query.y1, query.m1, query.d1), $lt: new Date(query.y2, query.m2, query.d2)} }
    ).toArray()

    result.map(el => {
        const date = new Date(el.time.date)
        el.time = {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
            meal: el.time.meal
        }
    })

    return result
}

// { $range: [query.y1, query.y2, yearCounter(query.y1)] }
// { $range: [query.m1, query.m2, monthCounter(query.m1)] }
// { $range: [query.d1, query.d2, dayCounter(query.d1)] }
// { $range: [0, 2, 1] }

module.exports = {
    getTimeRange,
}