// Importing Environmental Variables
import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

// Importing external libraries
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import moment from 'moment-timezone'

import * as test from './modules/valid.js'


const debug = true



// Importing local script functions
// const { startDB } = require('./database/mongo')
// const { updateVote } = require('./database/mealEntries')
// const { addComment, deleteComment, getComment } = require('./database/comment')

// const { isValidTime, isValidVote, isValidString, isValidMeal, isValidBool, isValidEmail, isValidComment, isValidQuery } = require('./parsing/parameters')
// const { checkAddEmail } = require('./database/emails')
// const { getTimeRange } = require('./time/time')
// const { ObjectID } = require('mongodb')


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

console.log(moment(moment()))

/* POST */
app.post('/', async (req, res) => {
    callback(res, 'post', 200)
})

app.get('/', async (req, res) => {
    callback(res, 'get', 200)
})

function callback(res, text, code) {
    if (debug)
        console.log(text)

    res.status(code).send({ message: text })
}