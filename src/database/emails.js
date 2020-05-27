const { getDB } = require('./mongo')

const colName = 'Emails'

async function checkAddEmail(email, time){
    const db = await getDB()
    let entry = await db.collection(colName).findOne(
        {
            email: email,
            time: [time]
        }
    )

    if(entry){
        return false
    }

    entry = await db.collection(colName).findOne(
        {
            email: email,
        }
    )

    if(!entry){
        await db.collection(colName).insertOne(
            {
                email: email,
                times: [time]
            }
        )
        return true
    }
    
    await db.collection(colName).updateOne(
        { email: email },
        { $push: {times: time}}
    )
    return true
}

module.exports = {
    checkAddEmail,
}