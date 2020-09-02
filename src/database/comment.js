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

    console.log(item)

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
    } else {
        throw 403
    }
}

async function deleteComment(_id, pw) {
    const db = await getDB()
    let item = await db.collection(colName).findOne(
        {
            _id: _id,
            pw: pw,
        }
    )
    if (item === null) {
        throw 403
    }
    await db.collection(colName).deleteOne(item)
}

async function getComment(d) {
    var date = new Date(new Date(d).toDateString())

    const db = await getDB()
    let data = await db.collection(colName).find(
        { date: date }
    ).toArray()

    return data
}

module.exports = {
    addComment,
    deleteComment,
    getComment
}