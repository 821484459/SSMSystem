const router = require('koa-router')()
const { SuccessModel,ErrorModel } = require('../model/resModel')
const { login } = require('../controller/user')

router.prefix('/api/user')

router.post('/login',async function (ctx, next) {
    const { userId, password, type } = ctx.request.body
    const data = await login(userId, password, type)
    console.log(data)
    if (data.userId) {
      ctx.body = new SuccessModel(data)
      return
    }
    ctx.body = new ErrorModel('登录失败')
})


module.exports = router
