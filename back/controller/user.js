const { exec } = require('../db/mysql')


const login = async (userId, password, type) => {
    const sql = `
        select userId,type from user where userId='${userId}' and password='${password}' and type='${type}'
    `
    const rows = await exec(sql)
    return rows[0] || {}
}

module.exports = {
    login
}