if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const { startDB, } = require('./database/mongo')
const { updateVote, } = require('./database/mealEntries')
const { isValidTime, isValidBool, isValidEmail, isValidQuery } = require('./parsing/parameters')
const { checkAddEmail } = require('./database/emails')
const { getTimeRange } = require('./time/time')

const app = express()

// God im so mature
const port = 6969

app.use(helmet())
app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/', async (req, res) => {
    let time = req.body.time
    let vote = req.body.vote
    let email = req.body.email

    if(!isValidTime(time)){
        res.status(400)
        res.json({message: 'POST Error: Invalid `time` json data'})
        return
    }

    time = {date: new Date(time.year, time.month, time.day), meal: time.meal}

    if(!isValidBool(vote)){
        res.status(400)
        res.send({message: 'POST Error: Invalid `vote` json data'})
        return
    }

    if(!isValidEmail(email)){
        res.status(400)
        res.send({message: 'POST Error: Invalid `email` format'})
        return
    }

    if(!(await checkAddEmail(email, time))){
        res.status(403)
        res.send({message: 'POST Error: Vote has already been registered with this email'})
        return
    }

    await updateVote(time, req.body.vote)
    console.log("POST Request: Vote Added/Updated")
    res.status(200).send({message: 'POST Success: Vote Added/Updated'})
})

app.get('/', async (req, res) => {
    const query = req.query
    const keys = Object.keys(query)

    if(isValidQuery(keys)){
        res.status(400)
        res.send({message: "GET Error: Invalid parameters"})
        return
    }

    const data = await getTimeRange(query).catch(console.error())
    res.send(data)
})

startDB().then(
    async () => {
        app.listen(process.env.PORT || port, () => {
            console.log(`Listening to port https://localhost:${port}/`)
        })
    }
)