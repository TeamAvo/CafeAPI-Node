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

const app = express()

// God im so mature
const port = 6969

app.use(helmet())
app.use(cors())
app.use(morgan('combined'))

app.post('/api/', async (req, res) => {
    
})

startDB().then(
    async () => {
        await updateVote(
            {year: 2020, month: 05, day: 27, meal: 0}
        )
    }
)