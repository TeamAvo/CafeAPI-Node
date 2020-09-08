const { getDB } = require('./mongo')

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
        await db.collection(colName).updateOne(
            {
                date: date,
                meal: meal,
                email: {
                    email
                },
                rate: rate,
                total: 1
            }
        )
        return true
    } else { // If someone alredy voted
        const duplicated = check.findOne(
            { email: email }
        )

        console.log(check)
        console.log(duplicated)

        if (duplicated === null) { // Update
            await db.collection(colName).updateOne(
                { date: date },
                { meal: meal },
                {
                    $inc: {
                        vote: rate,
                        total: 1
                    }
                },
                {
                    $push: {
                        email: email
                    }
                },
                { upsert: true }
            )
            return true
        } else {
            throw 403 // Already voted
        }
    }
}

async function getVote(query) {
    const db = await getDB()
    let result = await db.collection(colName).find(
        { 'date': { $gte: new Date(query.date1), $lt: new Date(query.date2) } }
    ).toArray()
    return result
}

module.exports = {
    updateVote,
    getVote
}