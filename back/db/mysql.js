const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)


// 开始连接
con.connect()

// 统一执行sql的函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return 
            }
           resolve(result)
        })
    })
    return promise
}

// 单例模式 不能关闭con连接，因为con连接只创建了一次

module.exports = {
    exec,
    escape: mysql.escape
}