const env = process.env.NODE_ENV  // 环境参数

// 配置
let MYSQL_CONF
let REDIS_CONF

//如果是开发环境应该什么配置
if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123',
        port: '3306',
        database: 'ssms'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

// 如果是线上环境应该什么配置
if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost', // 因为还是本地的所以就还是localhost
        user: 'root',
        password: '123',
        port: '3306',
        database: 'ssms'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}