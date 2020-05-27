const isYear = (num) => {
    return num > 999 && num <= 9999 && typeof(num) === 'number'
}

const isMonth = (num) => {
    return num >= 0 && num <= 11 && typeof(num) === 'number'
}

const isDay = (num) => {
    return num >= 0 && num <= 30 && typeof(num) === 'number'
}

const isMeal = (num) => {
    return num >= 0 && num <= 2 && typeof(num) === 'number'
}

function isValidTime(time){
    if(time.year === undefined || time.month === undefined
        || time.day === undefined || time.meal === undefined){
        console.log("Subtime undefined")
        return false
    }

    if(!isYear(time.year) || !isMonth(time.month) || 
        !isDay(time.day) || !isMeal(time.meal)){
        console.log("Subtime Incorrect Range")
        return false
    }
    
    return true
}

function isValidBool(vote){
    if(vote === undefined || typeof(vote) !== 'boolean'){
        return false
    }
    return true
}

function isValidEmail(email){
    // This may need to change as we will use hashes instead of raw emails
    const emailRegex = RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
    return emailRegex.test(email)
}

module.exports = {
    isValidTime,
    isValidBool,
    isValidEmail,
}