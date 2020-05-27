
function getTimeRange(){
    
}

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
        return false
    }

    if(isYear(time.year) || isMonth(time.month) || 
        isDay(time.day) || isMeal(time.meal)){
        return false
    }
    
    return true
}

module.exports = {
    getTimeRange,
    isValidTime,
}