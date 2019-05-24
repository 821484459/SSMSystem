const xss = require('xss')
const { exec } = require('../db/mysql')

const newStudent = async (userId) => {
    let sql = `insert into student(userId) values ('${userId}')`
    const data = await exec(sql)
    if (data.affectedRows > 0) {
        return true
    }
    return false
}

const getStudent = async (userId) => {
    let sql = `select * from student where userId = '${userId}' `
    const data = await exec(sql)
    if (data[0]) {
        return data[0]
    }
    return null
}

const delStudent = async (userId) => {
    let sql = `delete from student where userId = '${userId}'`
    const data = await exec(sql)
    if (data.affectedRows > 0) {
        return true
    }
    return false
}

const changeStudent = async (userId, message) => {
    let sql = `
    update student set name='${message.name}', sex='${message.sex}',phone='${message.phone}',
    parent='${message.parent}',work='${message.work}',zhengzhi='${message.zhengzhi}',schoolday='${message.schoolday}',
    birthday='${message.birthday}',address='${message.address}',mingzu='${message.mingzu}' where userId='${userId}'
    `
    const data = await exec(sql)
    console.log(data)
    if (data.affectedRows > 0) {
        return true
    }
    return false
}

module.exports = {
    newStudent,
    getStudent,
    delStudent,
    changeStudent
}