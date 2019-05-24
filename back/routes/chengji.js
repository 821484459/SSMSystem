const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { 
  newScore,
  getScore,
  changeScore
 } = require('../controller/chengji')

 router.prefix('/chengji')

// 创建成绩
router.post('/new', async (ctx, next) => {
    const { userId,nianji,banji,course,score } = ctx.request.body
    let data = false
    try {
        data = await newScore(userId,nianji,banji,course,score)
    } catch (err) {
        data = false
    }
    if (data) {
       ctx.body = new SuccessModel(data)
       return 
    }
     ctx.body = new ErrorModel("插入失败")
  })

  // 查成绩
  router.post('/get', async (ctx, next) => {
      const {userId} = ctx.request.body
      const data = await getScore(userId)
      if (data) {
          ctx.body = new SuccessModel(data)
          return 
      }
      ctx.body = new ErrorModel("查无此人")
  })

  // 修改成绩
  router.post('/change', async (ctx, next) => {
    const { id,userId,nianji,banji,course,score } = ctx.request.body
    let data = false
    try {
        data = await changeScore(id,userId,nianji,banji,course,score)
    } catch (err) {
        data = false
    }
    if (data) {
       ctx.body = new SuccessModel(data)
       return 
    }
     ctx.body = new ErrorModel("修改失败")
  })

  module.exports = router