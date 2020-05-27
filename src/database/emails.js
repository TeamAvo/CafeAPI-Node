const { getDB } = require('./mongo')
const _ = require('lodash')

const colName = 'Emails'

async function checkAddEmail(email, time){
    const db = await getDB()
    let entry = await db.collection(colName).findOne(
        {
            email: email,
        }
    )

    if(entry !== null && inArray(entry.times, time)){
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

function inArray(arr, target){
    for(let i = 0; i < arr.length; i++){
        if(_.isEqual(arr[i], target)){
            return true
        }
    }
    return false
}

module.exports = {
    checkAddEmail,
}