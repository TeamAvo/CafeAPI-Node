const _ = require('lodash')
import moment from 'moment-timezone'

const debug = true

export function bool(bol) {
    if (bol === undefined || typeof (bol) !== 'boolean') {
        log('Err: Invalid boolean')
        return false
    }
    return true
}

export function string(str) {
    if (str === undefined || typeof (str) !== 'string') {
        log('Err: Invalid string')
        return false
    }
    return true
}

export function time(time) {
    const time = moment(time)
    if (time._f === undefined) {
        log('Err: Invalid time format, undefined.')
        return false
    }
    return true
}

export function vote(vote) {
    if (vote === undefined || typeof (vote) !== 'number') {
        log('Err: Invalid vote, undifined or type')
        return false
    } else if (vote < 0.5 && vote > 5) {
        log('Err: Invalid vote, out of range')
        return false
    }
    return true
}

export function md5(key) {
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

export function email(email) {
    // This may need to change as we will use hashes instead of raw emails
    // Do we?
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

export function mealType(meal) {
    if (meal == 0 || meal == 1 || meal == 2) {
        return true
    } else {
        log('Err: Invalid meal type, not match with format')
        return false
    }
}

export function comment(text) {
    if (text === undefined || typeof (text) !== 'string') {
        log('Err: Invalid comment, not match with format')
        return false
    } else if (text.length < 10 && text.length > 500) {
        log('Err: Invalid comment, out of range')
        return false
    }
    return true
}

export function query(arr) {
    arr.forEach(item => {
        if (item === undefined) {
            log('Err: Invalid query')
            return false
        }
    });
    return true
}

export function log(text) {
    if (debug)
        console.log(text)
}