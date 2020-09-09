const { getDB } = require('./mongo')
const { ObjectID } = require('mongodb')
const colName = 'Voting'

async function updateVote(date, meal, email, rate) {
    const db = await getDB()

    const check = await db.collection(colName).findOne(
        {
            date: date,
            meal: meal
        }
    )

    if (check === null) { // If this is the first vote for that meal
        await db.collection(colName).insertOne(
            {
                date: date,
                meal: meal,
                email: [email],
                rate: rate,
                total: 1
            }
        )
        return true
    } else { // If someone alredy voted
        const duplicated = await db.collection(colName).findOne(
            {
                _id: ObjectID(check._id),
                email: { $all: [email] } // Check all email from array
            }
        )
        if (duplicated === null) { // Update
            await db.collection(colName).updateOne(
                { _id: ObjectID(check._id) },
                {
                    $push: {
                        email: email
                    },
                    $inc: {
                        rate: rate,
                        total: 1
                    }
                }
            )
            return true
        } else {
            throw 403 // Already voted
        }
    }
}

async function getVote(date1, date2) {
    const db = await getDB()
    // [TODO] exclude _id and email array from the result
    let result = await db.collection(colName).find(
        {
            date: {
                $gte: new Date(date1),
                $lt: new Date(date2)
            }
        }
    ).toArray()
    return result
}

module.exports = {
    updateVote,
    getVote
}