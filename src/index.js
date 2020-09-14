// Backend Ver: v2.0.3

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
const {
  isBool,
  isString,
  isDate,
  isRate,
  isMD5,
  isHexadecimal,
  isEmail,
  isMealType,
  isComment
} = require('./modules/valid')

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

/* VOTE */
app.post('/vote', async (req, res) => {
  // Getting parameters from API
  let date = new Date(moment(req.body.date).tz('America/New_York').format('YYYY-MM-DD'))
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
    callback(res, 400, 'POST Error: Invalid date format.')
    return
  }

  if (!isMealType(meal)) {
    callback(res, 400, 'POST Error: Invalid meal type.')
    return
  }

  if (!isEmail(email)) {
    callback(res, 400, 'POST Error: Invalid email.')
    return
  }

  if (!isRate(rate)) {
    callback(res, 400, 'POST Error: Invalid rate.')
    return
  }

  const r = await updateVote(date, meal, email, rate).catch((error) => {
    if (error == 403) {
      callback(res, 403, 'POST Error: Vote has already been registered with this email.')
    } else {
      callback(res, 500, 'POST Error: MongoDB connection error - Collection: Voting.'
      )
      console.error(error)
    }
  })
  if (r) {
    callback(res, 200, 'POST Success: User rate has been successfully reflected.'
    )
  }
})

app.get('/vote', async (req, res) => {
  let date1 = new Date(moment(req.query.date1).tz('America/New_York').format('YYYY-MM-DD'))
  let date2 = new Date(moment(req.query.date2).tz('America/New_York').format('YYYY-MM-DD'))

  if (debug) {
    console.log(date1)
    console.log(date2)
  }

  if (!isDate(date1) || !isDate(date2)) {
    callback(res, 400, 'GET Error: Invalid parameters.')
    return
  }

  const data = await getVote(date1, date2).catch((error) => {
    callback(res, 500, 'GET Error: MongoDB connection error - Collection: Voting.')
    console.error(error)
    return
  })
  console.log('GET Success: Vote data has been successfully returned.')
  res.status(200).send(data)
})

/* COMMENT */
app.post('/comment', async (req, res) => {
  let date = new Date(moment(req.body.date).tz('America/New_York').format('YYYY-MM-DD')) // Date
  let name = req.body.name // string
  let email = req.body.email //string
  let pw = req.body.pw // MD5 string  4a7d1ed414474e4033ac29ccb8653d9b
  let meal = req.body.meal // int
  let menu = req.body.menu // string
  let like = req.body.like // bool
  let comment = req.body.comment // string

  if (debug) {
    console.log(date)
    console.log(name)
    console.log(email)
    console.log(pw)
    console.log(meal)
    console.log(like)
    console.log(comment)
  }

  if (!isDate(date)) {
    callback(res, 400, 'POST Error: Invalid date format.')
    return
  }

  if (!isString(name)) {
    callback(res, 400, 'POST Error: Invalid name.')
    return
  }

  if (!isEmail(email)) {
    callback(res, 400, 'POST Error: Invalid email.')
    return
  }

  if (!isMD5(pw)) {
    callback(res, 400, 'POST Error: Invalid password.')
    return
  }

  if (!isMealType(meal)) {
    callback(res, 400, 'POST Error: Invalid meal type.')
    return
  }

  if (!isString(menu)) {
    callback(res, 400, 'POST Error: Invalid menu.')
    return
  }

  if (!isBool(like)) {
    callback(res, 400, 'POST Error: Invalid bool type.')
    return
  }

  if (!isComment(comment)) {
    callback(res, 400, 'POST Error: Invalid comment text.')
    return
  }

  const r = await addComment(date, name, email, pw, meal, menu, like, comment).catch((error) => {
    if (error === 403) {
      callback(res, 403, 'POST Error: Vote has already been registered with this email.')
    } else {
      callback(res, 500, 'POST Error: MongoDB connection error - Collection: Comment.')
      console.error(error)
    }
  })
  if (r) {
    callback(res, 200, 'POST Success: Comment Added.')
  }
})

app.post('/delete_comment', async (req, res) => {
  let id = ObjectID(req.body.id) // Hexadecimal
  let email = req.body.email
  let pw = req.body.pw // MD5

  if (debug) {
    console.log(id)
    console.log(email)
    console.log(pw)
  }

  if (!isHexadecimal(id)) {
    callback(res, 400, 'POST Error: Invalid comment id.')
    return
  }

  if (!isEmail(email)) {
    callback(res, 400, 'POST Error: Invalid email.')
    return
  }

  if (!isMD5(pw)) {
    callback(res, 400, 'POST Error: Invalid password.')
    return
  }

  const r = await deleteComment(id, email, pw).catch((error) => {
    if (error === 403) {
      callback(res, 403, 'POST Error: Cannot find the comment to delete.')
    } else {
      callback(res, 500, 'POST Error: MongoDB connection error - Collection: Comment.')
      console.error(error)
    }
  })
  if (r) {
    callback(res, 200, 'POST Success: Comment Removed.')
  }
})

app.get('/comment', async (req, res) => {
  let date1 = new Date(moment(req.query.date1).tz('America/New_York').format('YYYY-MM-DD'))
  let date2 = new Date(moment(req.query.date2).tz('America/New_York').format('YYYY-MM-DD'))

  if (debug) {
    console.log(date1)
    console.log(date2)
  }

  if (!isDate(date1) || !isDate(date2)) {
    callback(res, 400, 'GET Error: Invalid parameters.')
    return
  }

  let data = await getComment(date1, date2).catch((error) => {
    callback(res, 500, 'POST Error: MongoDB connection error - Collection: Comment.')
    console.error(error)
    return
  })
  console.log('GET Success: Comment data has been successfully returned.')
  res.status(200).send(data)
})

function callback(res, code, text) {
  //if (debug) {
  console.log(text)
  //}
  res.status(code).send({ message: text })
}

startDB().then(async () => {
  app.listen(process.env.PORT || port, () => {
    console.log(
      `Listening to port https://localhost:${process.env.PORT || port}/`
    )
  })
})
