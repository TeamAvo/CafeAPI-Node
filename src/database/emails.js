const { getDB } = require('./mongo')

const colName = 'Emails'

async function checkAddEmail(email, time){
    const db = await getDB()
    const entry = await db.collections(colName).findOne(
        {
            email: email,
            time: time
        }
    )

    if(!entry){
        return false
    }
    
    
}

module.exports = {
    checkAddEmail,
}