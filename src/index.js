// Importing Environmental Variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Importing external libraries
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

// Importing local script functions
const { startDB, } = require('./database/mongo')
const { updateVote, } = require('./database/mealEntries')
const { isValidTime, isValidVote, isValidString, isValidMeal, isValidBool, isValidEmail, isValidComment, isValidQuery } = require('./parsing/parameters')
const { checkAddEmail } = require('./database/emails')
const { getTimeRange } = require('./time/time')


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
    let time = new Date(req.body.time)
    let meal = req.body.meal
    let email = req.body.email
    let vote = req.body.vote

    // Debug
    // console.log(time)
    // console.log(meal)
    // console.log(email)
    // console.log(vote)

    if (!isValidTime(time)) {
        res.status(400)
        res.json({ message: 'POST Error: Invalid `time` json data' })
        return
    }

    time = { date: new Date(time.toDateString()), meal: meal }

    if (!isValidVote(vote)) {
        res.status(400)
        res.send({ message: 'POST Error: Invalid `vote` json data' })
        return
    }

    if (!isValidEmail(email)) {
        res.status(400)
        res.send({ message: 'POST Error: Invalid `email` format' })
        return
    }

    if (!(await checkAddEmail(email, time).catch(error => {
        res.status(500)
        res.send({ message: 'POST Error: MongoDB connection error - Collection: Emails' })
        console.error(error)
    }))) {
        res.status(403)
        res.send({ message: 'POST Error: Vote has already been registered with this email' })
        return
    }

    await updateVote(time, req.body.vote).catch(error => {
        res.status(500)
        res.send({ message: 'POST Error: MongoDB connection error - Collection: Voting' })
        console.error(error)
    })
    console.log("POST Request: Vote Added/Updated")
    res.status(200).send({ message: 'POST Success: Vote Added/Updated' })
})

app.get('/vote', async (req, res) => {
    const query = req.query
    const keys = Object.keys(query)

    if (isValidQuery(keys)) {
        res.status(400)
        res.send({ message: "GET Error: Invalid parameters" })
        return
    }

    const data = await getTimeRange(query).catch(error => {
        res.status(500)
        res.send({ message: 'GET Error: MongoDB connection error - Collection: Voting' })
        console.error(error)
    })
    res.send(data)
})

app.post('/comment', async (req, res) => {
    let date = new Date(new Date(req.body.date).toDateString())
    let name = req.body.name
    let email = req.body.email
    let pw = req.body.pw
    let meal_type = req.body.meal_type
    let like = req.body.like
    let comment = req.body.comment

    if (!isValidTime(date)) {
        res.status(400)
        res.send({ message: "GET Error: Invalid date format" })
        return
    }

    if (!isValidString(name)) {
        res.status(400)
        res.send({ message: "GET Error: Invalid name" })
        return
    }

    if (!(await checkAddEmail(email, date).catch(error => {
        res.status(500)
        res.send({ message: 'POST Error: MongoDB connection error - Collection: Emails' })
        console.error(error)
    }))) {
        res.status(403)
        res.send({ message: 'POST Error: Vote has already been registered with this email' })
        return
    }

    if (!isValidString(pw)) {
        res.status(400)
        res.send({ message: "GET Error: Invalid password" })
        return
    }

    if (!isValidMeal(meal_type)) {
        res.status(400)
        res.send({ message: "GET Error: Invalid meal type" })
        return
    }

    if (!isValidBool(like)) {
        res.status(400)
        res.send({ message: "GET Error: Invalid bool type" })
        return
    }

    if (!isValidComment(comment)) {
        res.status(400)
        res.send({ message: "GET Error: Invalid comment text" })
        return
    }
})

app.post('/delete_comment', async (req, res) => {
    let _id = req.body._id
    let pw = req.body.pw

    if (!isValidString(_id)) {
        res.status(400)
        res.send({ message: "GET Error: Invalid comment id" })
        return
    }

    if (!isValidString(pw)) {
        res.status(400)
        res.send({ message: "GET Error: Invalid password" })
        return
    }
})

app.get('/comment', async (req, res) => {
    let date = req.body.date

    if (!isValidTime(date)) {
        res.status(400)
        res.send({ message: "GET Error: Invalid date format" })
        return
    }
})

startDB().then(
    async () => {
        app.listen(process.env.PORT || port, () => {
            console.log(`Listening to port https://localhost:${process.env.PORT || port}/`)
        })
    }
)