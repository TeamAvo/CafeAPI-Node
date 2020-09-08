const _ = require('lodash')
const moment = require('moment-timezone')

const debug = true

function isBool(bol) {
    if (bol === undefined || typeof (bol) !== 'boolean') {
        log('Err: Invalid boolean')
        return false
    }
    return true
}

function isString(str) {
    if (str === undefined || typeof (str) !== 'string') {
        log('Err: Invalid string')
        return false
    }
    return true
}

function isDate(date) {
    let d
    try {
        d = moment(date)
    } catch{
        log('Err: Invalid date format, value provided is not in a recognized RFC2822 or ISO format.')
        return false
    }

    if (date === undefined) {
        log('Err: Invalid date format, undefined.')
        return false
    }
    return true
}

function isRate(rate) {
    if (rate === undefined || typeof (rate) !== 'number') {
        log('Err: Invalid Rate, undifined or type')
        return false
    } else if (rate < 0.5 && rate > 5) {
        log('Err: Invalid Rate, out of range')
        return false
    }
    return true
}

function isMD5(key) {
    const md5Regex = RegExp('^[a-f0-9]{32}$')
    if (key === undefined) {
        log('Err: Invalid md5, undifined')
        return false
    } else if (!md5Regex.test(key)) {
        log('Err: Invalid md5, not md5 pattern')
        return false
    }
    return true
}

function isEmail(email) {
    const emailRegex = RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
    if (!emailRegex.test(email)) {
        log('Err: Invalid email, not match with format')
        return false
    } else {
        if (!email.endsWith('@avonoldfarms.com')) {
            log('Err: Invalid email, not AOF email')
            return false
        }
    }
    return true
}

function isMealType(meal) {
    if (meal == 0 || meal == 1 || meal == 2) {
        return true
    } else {
        log('Err: Invalid meal type, not match with format')
        return false
    }
}

function isComment(text) {
    if (text === undefined || typeof (text) !== 'string') {
        log('Err: Invalid comment, not match with format')
        return false
    } else if (text.length < 10 && text.length > 500) {
        log('Err: Invalid comment, out of range')
        return false
    }
    return true
}

function isQuery(arr) {
    arr.forEach(item => {
        if (item === undefined) {
            log('Err: Invalid query')
            return false
        }
    });
    return true
}

function log(text) {
    if (debug)
        console.log(text)
}

module.exports = {
    isBool,
    isString,
    isDate,
    isRate,
    isMD5,
    isEmail,
    isMealType,
    isComment,
    isQuery
}