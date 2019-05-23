const router = require('koa-router')()
const { SuccessModel,ErrorModel } = require('../model/resModel')
const { login } = require('../controller/user')

router.prefix('/user')

router.post('/login',async function (ctx, next) {
    const { userId, password, type } = ctx.request.body
    const data = await login(userId, password, type)
    console.log(data)
    if (data.userId) {
      ctx.body = new SuccessModel(data)
      console.log(new SuccessModel())
      return
    }
    console.log(new ErrorModel('登录失败'))
    ctx.body = new ErrorModel('登录失败')
})


module.exports = router
