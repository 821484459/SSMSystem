const xss = require('xss')
const { exec } = require('../db/mysql')

const newScore = async (userId,nianji,banji,course,score) => {
    console.log(999)
    let sql = `insert into score(userId,nianji,banji,course,score) 
    values ('${userId}','${nianji}','${banji}','${course}','${score}')`
    const data = await exec(sql)
    if (data.affectedRows > 0) {
        return true
    }
    return false
}

const getScore = async (userId) => {
    let sql = `select * from score where userId = '${userId}' `
    const data = await exec(sql)
    console.log(data)
    if (data) {
        return data
    }
    return null
}

const changeScore = async (id,score) => {
    let sql = `
    update score set score='${score}' where id='${id}'
    `
    const data = await exec(sql)
    if (data.affectedRows > 0) {
        return true
    }
    return false
}

module.exports = {
    newScore,
    getScore,
    changeScore
}