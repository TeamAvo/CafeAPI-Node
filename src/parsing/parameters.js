const _ = require('lodash')

function isValidTime(time) {
    let t = new Date(time)

    if (t === undefined) {
        console.log("Subtime undefined")
        return false
    }
    return true
}

function isValidVote(vote) {
    if (vote === undefined) {
        return false
    }

    if (vote >= 0 && vote <= 5) {
        return true
    } else {
        return false
    }
}

function isValidEmail(email) {
    // This may need to change as we will use hashes instead of raw emails
    const emailRegex = RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
    if (!emailRegex.test(email)) {
        return false
    } else {
        if (!email.endsWith('@avonoldfarms.com')) {
            return false
        }
    }
    return true
}

function isValidQuery(arr) {
    if (arr.date1 === undefined || arr.date2 === undefined) {
        return false
    }
    return true
}

module.exports = {
    isValidTime,
    isValidVote,
    isValidEmail,
    isValidQuery,
}