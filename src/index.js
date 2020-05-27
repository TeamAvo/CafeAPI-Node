if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const { startDB, getDB } = require('./database/mongo')

