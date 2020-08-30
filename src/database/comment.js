const { getDB } = require('./mongo')

const colName = 'Comment'

async function addComment(date, name, email, pw, meal_type, like, comment) {
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
                like: like,
                comment: comment
            }
        )
    } else {
        throw 403
    }
}

async function deleteComment(_id, pw) {
    const db = await getDB()
    await db.collection(colName).deleteOne(
        {
            _id: _id,
            pw: pw,
        }
    )
}

module.exports = {
    addComment,
    deleteComment
}