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

    if (vote >= 0.5 && vote <= 5) {
        return true
    } else {
        return false
    }
}

function isValidString(string) {
    if (string === undefined) {
        return false
    }
    return true
}

function isValidMeal(meal) {
    if (meal === undefined) {
        return false
    }

    if (meal === 'Breakfast' || meal === 'Lunch' || meal === 'Dinner') {
        return true
    } else {
        return false
    }
}

function isValidBool(vote) {
    if (vote === undefined || typeof (vote) !== 'boolean') {
        return false
    }
    return true
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

function isValidComment(text) {
    if (text === undefined) {
        return false
    }

    if (text.length >= 10 && text.length <= 500) {
        return true
    } else {
        return false
    }
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
    isValidString,
    isValidMeal,
    isValidBool,
    isValidEmail,
    isValidComment,
    isValidQuery,
}