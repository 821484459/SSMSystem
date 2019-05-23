const { ErrorModel } = require('../model/resModel')

// 中间件，可以直接用！！！不用再里面使用if语句来判断
module.exports = async (ctx, next) => {
    if (ctx.session.username) {
        await next() // 直接执行下一个
        return
    }
    ctx.body =  new ErrorModel('未登录')
}