// Importing Environmental Variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Importing external libraries
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const moment = require('moment-timezone')

// importing DB related scripts
const { startDB } = require('./database/mongo')
const { updateVote, getVote } = require('./database/vote')
const { addComment, deleteComment, getComment } = require('./database/comment')
const { ObjectID } = require('mongodb')

// Importing vaild checker
const { isBool,
    isString,
    isDate,
    isRate,
    isMD5,
    isEmail,
    isMealType,
    isComment,
    isQuery
} = require('./modules/valid')
const e = require('express')

const debug = true

// Initializing App
const app = express()

// Defining port
// God im so mature
const port = 6969

// Setting up app to use external libraries
app.use(helmet())
app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* POST */
app.post('/vote', async (req, res) => {
    // Getting parameters from API
    let date = moment(req.body.date).format('YYYY-MM-DD')
    let meal = req.body.meal
    let email = req.body.email
    let rate = req.body.rate

    if (debug) {
        console.log(date)
        console.log(meal)
        console.log(email)
        console.log(rate)
    }

    if (!isDate(date)) {
        callback(res, 400, 'POST Error: Invalid `date` json data.')
        return
    }

    if (!isMealType(meal)) {
        callback(res, 400, 'POST Error: Invalid `meal` json data.')
        return
    }

    if (!isEmail(email)) {
        callback(res, 400, 'POST Error: Invalid `email` json data.')
        return
    }

    if (!isRate(rate)) {
        callback(res, 400, 'POST Error: Invalid `rate` json data.')
        return
    }

    await updateVote(time, req.body.vote).catch(error => {
        console.error(error)
        if (error == 403) {
            callback(res, 403, 'POST Error: Vote has already been registered with this email.')
        } else {
            callback(res, 500, 'POST Error: MongoDB connection error - Collection: Voting.')
        }
    })
    callback(res, 200, 'POST Success: User rate has been successfully reflected.')
})

app.get('/vote', async (req, res) => {
    const query = req.query
    const keys = Object.keys(query)

    if (isQuery(keys)) {
        callback(res, 400, 'GET Error: Invalid parameters.')
        return
    }

    const data = await getVote(query).catch(error => {
        res.status(500)
        res.send({ message: 'GET Error: MongoDB connection error - Collection: Voting.' })
        console.error(error)
    })
    console.log('GET Success: Vote data has been successfully returned.')
    res.status(200).send(data)
})

// ================ todo

app.post('/comment', async (req, res) => {
    let date = new Date(new Date(req.body.date).toDateString())
    let name = req.body.name
    let email = req.body.email
    let pw = req.body.pw
    let meal_type = req.body.meal_type
    let menu = req.body.menu
    let like = req.body.like
    let comment = req.body.comment

    console.log(date)
    // console.log(name)
    // console.log(email)
    // console.log(pw)
    // console.log(meal_type)
    // console.log(like)
    // console.log(comment)

    if (!isValidTime(date)) {
        res.status(400)
        console.log("GET Error: Invalid date format")
        res.send({ message: "GET Error: Invalid date format" })
        return
    }

    if (!isValidString(name)) {
        res.status(400)
        console.log("GET Error: Invalid name")
        res.send({ message: "GET Error: Invalid name" })
        return
    }

    if (!isValidString(pw)) {
        res.status(400)
        console.log("GET Error: Invalid password")
        res.send({ message: "GET Error: Invalid password" })
        return
    }

    if (!isValidMeal(meal_type)) {
        res.status(400)
        console.log("GET Error: Invalid meal type")
        res.send({ message: "GET Error: Invalid meal type" })
        return
    }

    if (!isValidString(menu)) {
        res.status(400)
        console.log("GET Error: Invalid menu")
        res.send({ message: "GET Error: Invalid menu" })
        return
    }

    if (!isValidBool(like)) {
        res.status(400)
        console.log("GET Error: Invalid bool type")
        res.send({ message: "GET Error: Invalid bool type" })
        return
    }

    if (!isValidComment(comment)) {
        res.status(400)
        console.log("GET Error: Invalid comment text")
        res.send({ message: "GET Error: Invalid comment text" })
        return
    }

    await addComment(date, name, email, pw, meal_type, menu, like, comment).catch(error => {
        if (error === 403) {
            res.status(403)
            res.send({ message: 'POST Error: Vote has already been registered with this email' })
            return
        } else {
            res.status(500)
            res.send({ message: 'POST Error: MongoDB connection error - Collection: Comment' })
            console.error(error)
            return
        }
    })
    console.log("POST Request: Comment Added")
    res.status(200).send({ message: 'POST Success: Comment Added' })
})

app.post('/delete_comment', async (req, res) => {
    let _id = ObjectID(req.body._id)
    let pw = req.body.pw

    // if (!isValidString(_id)) {
    //     res.status(400)
    //     res.send({ message: "GET Error: Invalid comment id" })
    //     return
    // }

    if (!isValidString(pw)) {
        res.status(400)
        res.send({ message: "GET Error: Invalid password" })
        return
    }

    await deleteComment(_id, pw).catch(error => {
        if (error === 403) {
            res.status(403)
            res.send({ message: 'POST Error: Vote has already been registered with this email' })
            return
        } else {
            res.status(500)
            res.send({ message: 'POST Error: MongoDB connection error - Collection: Comment' })
            console.error(error)
            return
        }
    })
    console.log("POST Request: Comment Removed")
    res.status(200).send({ message: 'POST Success: Comment Removed' })
})

app.get('/comment', async (req, res) => {
    const query = req.query
    let date = new Date(query.date)

    if (!isValidTime(date)) {
        res.status(400)
        res.send({ message: "GET Error: Invalid date format" })
        return
    }

    let data = await getComment(date).catch(error => {
        res.status(500)
        res.send({ message: 'POST Error: MongoDB connection error - Collection: Comment' })
        console.error(error)
    })
    console.log("GET Request")
    res.status(200).send(data)
})

function callback(res, code, text) {
    if (debug) {
        console.log(text)
    }
    res.status(code).send({ message: text })
}

startDB().then(
    async () => {
        app.listen(process.env.PORT || port, () => {
            console.log(`Listening to port https://localhost:${process.env.PORT || port}/`)
        })
    }
)