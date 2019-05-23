const { exec, escape } = require('../db/mysql')


const login = async (userId, password, type) => {
    // 对特殊符号进行转义例如转义掉注释符号
    // userId = escape(userId)
    console.log(userId,password,type)
    const sql = `
        select userId,type from user where userId='${userId}' and password='${password}' and type='${type}'
    `
    const rows = await exec(sql)
    return rows[0] || {}
}

module.exports = {
    login
}