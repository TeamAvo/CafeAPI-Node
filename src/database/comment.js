const { getDB } = require('./mongo')
const colName = 'Comment'

async function addComment(date, name, email, pw, meal_type, menu, like, comment) {
    const db = await getDB()

    let item = await db.collection(colName).findOne(
        {
            date: date,
            email: email,
            meal_type: meal_type
        }
    )

    if (item === null) {
        await db.collection(colName).insertOne(
            {
                date: date,
                name: name,
                email: email,
                pw: pw,
                meal_type: meal_type,
                menu: menu,
                like: like,
                comment: comment
            }
        )
        return true
    } else {
        throw 403
    }
}

async function deleteComment(id, pw) {
    const db = await getDB()
    let item = await db.collection(colName).findOne(
        {
            _id: id,
            pw: pw,
        }
    )
    if (item === null) {
        throw 403
    }
    await db.collection(colName).deleteOne(item)
    return true
}

async function getComment(date1, date2) {
    const db = await getDB()
    // [TODO] exclude pw
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
    addComment,
    deleteComment,
    getComment
}