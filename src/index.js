if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const { startDB, } = require('./database/mongo')
const { updateVote, } = require('./database/mealEntries')

startDB().then(
    async () => {
        await updateVote("3000")
    }
)