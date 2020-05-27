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
const { isValidTime, isValidBool, isValidEmail } = require('./parsing/time')
const { checkAddEmail } = require('./database/emails')

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
        res.json({message: 'Invalid `time` json data'})
        return
    }

    if(!isValidBool(vote)){
        res.status(400)
        res.json({message: 'Invalid `vote` json data'})
        return
    }

    if(!isValidEmail(email)){
        res.status(400)
        res.json({message: 'Invalid `email` format'})
        return
    }

    if(!(await checkAddEmail(email, time))){
        res.status(403)
        res.json({message: 'Vote has already been registered with this email'})
        return
    }

    await updateVote(time, req.body.vote)
    console.log("Vote Added/Updated")
    res.status(204).send()
})

startDB().then(
    async () => {
        app.listen(port, () => {
            console.log(`Listening to port https://localhost:${port}/`)
        })
    }
)